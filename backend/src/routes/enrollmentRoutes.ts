import { Router } from 'express';
import { enrollSubject, checkEnrollment, getMyCourses } from '../controllers/enrollmentController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/:subjectId/enroll', protect as any, enrollSubject as any);
router.get('/my-courses', protect as any, getMyCourses as any);
router.get('/:subjectId/status', protect as any, checkEnrollment as any);

export default router;
