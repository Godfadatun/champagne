import express from 'express';
import { listReservationsCONTROLLER } from '../controllers/reservations.controller';
import AsyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/', AsyncHandler.catchErrors(listReservationsCONTROLLER));

export default router;
