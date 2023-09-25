import { RequestHandler } from 'express';
import ReservationsService from '../services/reservations.service';
import ResponseService from '../utils/response';

export const listReservationsCONTROLLER: RequestHandler = async (req, res) => {
  const response = await ReservationsService.listReservations({ ...req.query });
  const { data, message } = response;
  return ResponseService.success(res, message, data);
};
