import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getSubjectProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId } = req.params;
    const userId = req.userId!;

    const progress = await prisma.videoProgress.findMany({
      where: {
        user_id: userId,
        video: { section: { subject_id: subjectId } }
      }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getVideoProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId!;

    const progress = await prisma.videoProgress.findUnique({
      where: { user_id_video_id: { user_id: userId, video_id: videoId } }
    });

    res.json(progress || { last_position_seconds: 0, is_completed: false });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateVideoProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const { last_position_seconds, is_completed } = req.body;
    const userId = req.userId!;

    // Locking Logic: Ensure previous video is completed before updating this one
    // Only check if they aren't already progressing in this video
    const existingProgress = await prisma.videoProgress.findUnique({
      where: { user_id_video_id: { user_id: userId, video_id: videoId } }
    });

    if (!existingProgress) {
      const video = await prisma.video.findUnique({
        where: { id: videoId },
        include: { section: true }
      });
      if (!video) return res.status(404).json({ error: 'Video not found' });

      const allVideos = await prisma.video.findMany({
        where: { section: { subject_id: video.section.subject_id } },
        include: { section: true },
        orderBy: [{ section: { order_index: 'asc' } }, { order_index: 'asc' }]
      });

      const currentIndex = allVideos.findIndex(v => v.id === video.id);
      if (currentIndex > 0) {
        const previousVideo = allVideos[currentIndex - 1];
        const prevProgress = await prisma.videoProgress.findUnique({
          where: { user_id_video_id: { user_id: userId, video_id: previousVideo.id } }
        });

        if (!prevProgress?.is_completed) {
          return res.status(403).json({ error: 'Previous video must be completed first' });
        }
      }
    }

    const progress = await prisma.videoProgress.upsert({
      where: { user_id_video_id: { user_id: userId, video_id: videoId } },
      update: {
        last_position_seconds: is_completed ? 0 : last_position_seconds,
        is_completed: is_completed || existingProgress?.is_completed || false,
        completed_at: is_completed && !existingProgress?.is_completed ? new Date() : undefined
      },
      create: {
        user_id: userId,
        video_id: videoId,
        last_position_seconds: is_completed ? 0 : last_position_seconds,
        is_completed: is_completed || false,
        completed_at: is_completed ? new Date() : null
      }
    });

    res.json(progress);
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
