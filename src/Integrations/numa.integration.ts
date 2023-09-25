import axios from 'axios';
import { URLSearchParams } from 'url';
import { theResponse } from '../utils/interface';
import { NUMA_AUTH_URL, NUMA_BASE_URL, NUMA_CLIENTID, NUMA_CLIENT_SECRET } from '../utils/secrets';
import FailedDependencyError from '../utils/failedDependencyError';
import AsyncHandler from '../utils/asyncHandler';

const headers: {
  'Content-Type': string;
  'Source-Id'?: string;
  Authorization?: string;
} = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Source-Id': 'SWAGGER-API-CALL',
};

const Integration = {
  axiosInstance: axios.create({
    baseURL: NUMA_AUTH_URL,
    headers,
  }),

  async authorizeNumaAPIs(): Promise<void> {
    try {
      const requestData = new URLSearchParams();
      requestData.append('grant_type', 'client_credentials');
      requestData.append('client_id', NUMA_CLIENTID);
      requestData.append('client_secret', NUMA_CLIENT_SECRET);
      Integration.axiosInstance.defaults.baseURL = NUMA_AUTH_URL;
      const response = await Integration.axiosInstance.post('/oauth2/token', requestData);
      const accessToken = response.data.access_token;
      headers.Authorization = `Bearer ${accessToken}`;

      //  Updating the axios configuration
      Integration.axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      Integration.axiosInstance.defaults.headers['Content-Type'] = 'application/json';
      Integration.axiosInstance.defaults.baseURL = NUMA_BASE_URL;
    } catch (error: any) {
      console.log({ error });
      throw new FailedDependencyError('Numa-Core-API:authorizeNumaAPIs', error.response.data);
    }
  },

  async listReservations(requestData: any): Promise<theResponse> {
    try {
      if (!headers.Authorization) await Integration.authorizeNumaAPIs();
      const response = await Integration.axiosInstance.get('/api/reservations', { params: requestData });
      return AsyncHandler.sendObjectResponse('Reservations retrieved successfully', response.data.data);
    } catch (error: any) {
      console.log({ error: error.message });
      throw new FailedDependencyError('Numa-Core-API:listReservations', error);
    }
  },

  async listGuests(requestData: any): Promise<theResponse> {
    try {
      if (!headers.Authorization) await Integration.authorizeNumaAPIs();
      const response = await Integration.axiosInstance.get('/api/guests', { params: requestData });
      return AsyncHandler.sendObjectResponse('Retrieved Guests', response.data);
    } catch (error: any) {
      console.log({ error });
      throw new FailedDependencyError('Numa-Core-API:listGuests', error);
    }
  },

  // todo: List Guests
  // todo: Create Guest
  // todo: List Reservation
  // todo: Create Reservation
  // todo: Create a Wine Service for the Reservation
  // todo: Create a Wine Selection

  // Tasks
  // todo: How many bottles each property needs/per week
  // todo: Each VIP Guests should have a champagne bottle waiting
  // todo: Endpoint accepts date range, returns number of VIP reservations/property for date range
};

export default Integration;
