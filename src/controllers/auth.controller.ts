import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import ResponseService from '../utils/response';

export const numaAuthCONTROLLER: RequestHandler = async (req, res) => {
  await AuthService.initiateNumaAuth();
  return ResponseService.success(res, 'Authentication Successful');
};
