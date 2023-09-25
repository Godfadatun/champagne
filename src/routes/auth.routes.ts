import express from 'express';
import AsyncHandler from '../utils/asyncHandler';
import { numaAuthCONTROLLER } from '../controllers/auth.controller';

const router = express.Router();

router.post('/token', AsyncHandler.catchErrors(numaAuthCONTROLLER));

export default router;
