import { Router } from 'express';
import { chatAssistant, generateExam, submitExam } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Chat with AI Assistant
router.post('/chat', protect, chatAssistant);

// AI Exam Generation
router.post('/exam/generate/:subjectId', protect, generateExam);

// Submit Exam Score
router.post('/exam/submit/:subjectId', protect, submitExam);

export default router;
