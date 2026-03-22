import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/authRoutes';
import subjectRoutes from './routes/subjectRoutes';
import videoRoutes from './routes/videoRoutes';
import progressRoutes from './routes/progressRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';
import contactRoutes from './routes/contactRoutes';
import certificateRoutes from './routes/certificateRoutes';
import aiRoutes from './routes/aiRoutes';
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('App Password loaded?', process.env.SMTP_PASS ? 'YES' : 'NO');
console.log('User loaded:', process.env.SMTP_USER);

