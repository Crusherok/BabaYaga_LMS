import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getCertificateStatus } from '../controllers/certificateController';

const router = Router();

router.use(protect);

router.get('/:subjectId', getCertificateStatus);

export default router;
