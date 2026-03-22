import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getSubjects, getSubjectById, getSubjectTree } from '../controllers/subjectController';
import { getFirstVideo } from '../controllers/videoController';

const router = Router();



router.get('/', getSubjects);
router.get('/:subjectId', getSubjectById);
router.get('/:subjectId/tree', getSubjectTree);
router.get('/:subjectId/first-video', getFirstVideo);

export default router;
