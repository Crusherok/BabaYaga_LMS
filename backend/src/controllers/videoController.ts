import { Request, Response } from 'express';
import prisma from '../config/db';

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: { section: true }
    });

    if (!video) return res.status(404).json({ error: 'Video not found' });

    // Assuming we want to return next_video_id and previous_video_id
    // This requires finding the global sequence.
    const allVideos = await prisma.video.findMany({
      where: { section: { subject_id: video.section.subject_id } },
      include: { section: true },
      orderBy: [
        { section: { order_index: 'asc' } },
        { order_index: 'asc' }
      ]
    });

    const currentIndex = allVideos.findIndex(v => v.id === video.id);
    const previous_video_id = currentIndex > 0 ? allVideos[currentIndex - 1].id : null;
    const next_video_id = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1].id : null;

    res.json({ ...video, previous_video_id, next_video_id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFirstVideo = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;
    
    const firstSection = await prisma.section.findFirst({
      where: { subject_id: subjectId },
      orderBy: { order_index: 'asc' }
    });

    if (!firstSection) return res.status(404).json({ error: 'No sections found' });

    const firstVideo = await prisma.video.findFirst({
      where: { section_id: firstSection.id },
      orderBy: { order_index: 'asc' }
    });

    if (!firstVideo) return res.status(404).json({ error: 'No videos found' });

    res.json(firstVideo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
