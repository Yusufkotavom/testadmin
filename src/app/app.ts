import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { mockAuth } from './middlewares/auth';
import { router } from './routes';
import { seedMockData } from './utils/seed';

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(mockAuth);

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api', router);

  app.use(errorHandler);
  // Ensure some demo data exists
  seedMockData();
  return app;
};

