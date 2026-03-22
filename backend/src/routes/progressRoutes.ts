import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getSubjectProgress, getVideoProgress, updateVideoProgress } from '../controllers/progressController';

const router = Router();

router.use(protect);

router.get('/subjects/:subjectId', getSubjectProgress);
router.get('/videos/:videoId', getVideoProgress);
router.post('/videos/:videoId', updateVideoProgress);

export default router;
