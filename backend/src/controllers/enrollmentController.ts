import { Response as ExpressResponse } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const enrollSubject = async (req: AuthRequest, res: ExpressResponse) => {
  const { subjectId } = req.params;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        user_id_subject_id: {
          user_id: userId,
          subject_id: subjectId,
        },
      },
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'You are already enrolled in this course' });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        user_id: userId,
        subject_id: subjectId,
      },
    });

    return res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enrollment error:', error);
    return res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

export const checkEnrollment = async (req: AuthRequest, res: ExpressResponse) => {
  const { subjectId } = req.params;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        user_id_subject_id: {
          user_id: userId,
          subject_id: subjectId,
        },
      },
    });

    return res.json({ enrolled: !!enrollment });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check enrollment' });
  }
};
export const getMyCourses = async (req: AuthRequest, res: ExpressResponse) => {
  const userId = req.userId;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { user_id: userId },
      include: {
        subject: {
          include: {
            sections: {
              include: {
                videos: {
                  include: {
                    progress: {
                      where: { user_id: userId }
                    }
                  }
                }
              }
            }
          }
        },
      },
    });

    const subjects = enrollments.map(e => {
      const allVideos = e.subject.sections.flatMap(s => s.videos);
      const totalVideosCount = allVideos.length;
      const completedVideosCount = allVideos.filter(v => 
        v.progress.length > 0 && v.progress[0].is_completed
      ).length;

      const videos_completed = totalVideosCount > 0 && completedVideosCount === totalVideosCount;

      return {
        ...e.subject,
        enrollment_status: {
          passed_exam: e.passed_exam,
          videos_completed: videos_completed,
          completed_count: completedVideosCount,
          total_count: totalVideosCount
        }
      };
    });

    return res.json(subjects);
  } catch (error) {
    console.error('Fetch enrolled courses error:', error);
    return res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
};
