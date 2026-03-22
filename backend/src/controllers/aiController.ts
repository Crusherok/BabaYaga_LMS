import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();

const getGenerativeModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing in env variables.");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

export const chatAssistant = async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;

    const prompt = `
    You are an expert AI Learning Assistant for the NextLMS platform. 
    A student is asking you a question. Please be helpful, concise, and educational.

    Context of their current learning:
    ${context || 'General Platform Usage'}

    Student Question: ${message}
    `;

    const model = getGenerativeModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ reply: response.text() });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response. Make sure Gemini API Key is valid.' });
  }
};

export const generateExam = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;

    // Fetch curriculum details to strictly ground the AI
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        sections: {
          include: { videos: true }
        }
      }
    });

    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    let curriculumText = `Course: ${subject.title}\nDescription: ${subject.description}\n\nSyllabus:\n`;
    subject.sections.forEach(sec => {
      curriculumText += `Section: ${sec.title}\n`;
      sec.videos.forEach(vid => {
        curriculumText += `- Video: ${vid.title} (${vid.description || ''})\n`;
      });
    });

    const prompt = `
      Create a highly professional 10-question Multiple Choice Exam based EXCLUSIVELY on the following course curriculum.
      Make sure the difficulty matches a professional certification exam.
      
      Curriculum Context:
      ${curriculumText}

      Format the output STRICTLY as a JSON array exactly matching this structure, with no markdown or extra text:
      [
        {
          "question": "Question text here",
          "options": ["A", "B", "C", "D"],
          "correctAnswerIndex": 1
        }
      ]
    `;

    const model = getGenerativeModel();
    const result = await model.generateContent(prompt);

    // Clean JSON response
    let jsonString = result.response.text().trim();
    if (jsonString.startsWith('\`\`\`json')) jsonString = jsonString.slice(7);
    if (jsonString.startsWith('\`\`\`')) jsonString = jsonString.slice(3);
    if (jsonString.endsWith('\`\`\`')) jsonString = jsonString.slice(0, -3);

    const questions = JSON.parse(jsonString);
    res.json({ questions });

  } catch (error: any) {
    console.error('Exam Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate exam.' });
  }
};

export const submitExam = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;
    const { score } = req.body; // e.g., 85 (percentage)
    const userId = (req as any).userId;

    if (score === undefined || score < 0 || score > 100) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    if (score >= 70) {
      // Mark as passed in Enrollment
      await prisma.enrollment.update({
        where: { user_id_subject_id: { user_id: userId, subject_id: subjectId } },
        data: { passed_exam: true }
      });
      res.json({ success: true, passed: true, message: 'Congratulations! Certificate Unlocked.' });
    } else {
      res.json({ success: true, passed: false, message: 'Score too low. Please try again.' });
    }

  } catch (error: any) {
    console.error('Submit Exam Error:', error);
    res.status(500).json({ error: 'Failed to submit exam.' });
  }
};
