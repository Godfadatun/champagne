import express, { Request, Response } from 'express';

// eslint-disable-next-line prettier/prettier
import authRouter from './auth.routes';
import reservationRouter from './reservations.routes';

const router = express.Router();

router.get('/', (_, res) => res.json({ success: true, message: 'User gateway v1 up.' }));

router.use('/auth', authRouter);
router.use('/reservations', reservationRouter);

router.get('/test', (req: Request, res: Response) => {
  res.json({ greeting: `Hello, Good Morning` });
});

export default router;
