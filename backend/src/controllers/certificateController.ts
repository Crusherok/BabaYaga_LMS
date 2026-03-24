import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getCertificateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId } = req.params;
    const userId = req.userId!;

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        sections: {
          include: { videos: true }
        }
      }
    });

    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const allVideos = subject.sections.flatMap(s => s.videos);
    const totalVideos = allVideos.length;

    if (totalVideos === 0) {
      return res.json({ unlocked: false });
    }

    const completedProgress = await prisma.videoProgress.count({
      where: {
        user_id: userId,
        video_id: { in: allVideos.map(v => v.id) },
        is_completed: true
      }
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    const enrollment = await prisma.enrollment.findUnique({
      where: { user_id_subject_id: { user_id: userId, subject_id: subjectId } }
    });
    
    const passedExam = enrollment?.passed_exam || false;
    let unlocked = false;
    if (completedProgress === totalVideos && totalVideos > 0) {
      unlocked = passedExam;
    }

    res.json({ 
      unlocked, 
      user, 
      subject,
      totalVideos,
      completedVideos: completedProgress,
      passedExam
    });
  } catch (error) {
    console.error('Certificate check error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
