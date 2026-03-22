import { Request, Response } from 'express';
import prisma from '../config/db';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { is_published: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId, is_published: true }
    });
    
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSubjectTree = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId, is_published: true },
      include: {
        sections: {
          orderBy: { order_index: 'asc' },
          include: {
            videos: {
              orderBy: { order_index: 'asc' }
            }
          }
        }
      }
    });

    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
