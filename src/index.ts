/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import router from './routes';
import { PORT } from './utils/secrets';

dotenv.config();
const port = PORT || '3000';

async function startServer(): Promise<void> {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors());
  app.use(helmet());

  app.use('/api', router);

  app.use((req, res, _next): void => {
    res.status(404).send({
      status: false,
      error: 'resource not found',
    });
  });

  // handle unexpected errors
  app.use((err: any, req: Request, res: Response, _next: NextFunction): void => {
    res.status(err.status || 500).send({
      success: false,
      error: 'Internal server error.',
    });
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port} !`);
  });
}

startServer();
