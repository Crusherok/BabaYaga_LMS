import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getVideoById, getFirstVideo } from '../controllers/videoController';

const router = Router();

router.use(protect);

router.get('/:videoId', getVideoById);
// We moved getFirstVideo to subjectRoutes /api/subjects/:subjectId/first-video conceptually, 
// but we can mount it here or there.
// If the design is /api/subjects/:subjectId/first-video, it's better to put it in subjectRoutes.
// Let's just expose it directly here at /first-video/:subjectId for simplicity if we wish, or we keep it clean.

export default router;
