import AsyncHandler from '../utils/asyncHandler';
import { theResponse } from '../utils/interface';
import NumaIntegration from '../Integrations/numa.integration';
import Utils from '../utils/utils';

interface ServiceInterface {
  listReservations(body: { from?: Date; to?: Date }): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
}

const Service: ServiceInterface = {
  async listReservations(body: { from?: Date; to?: Date }) {
    const { from, to } = body;

    const payload: { [key: string]: any } = {};
    if (from) payload['arrival[gte]'] = from;
    if (to) payload['arrival[lte]'] = to;

    const reservation = await NumaIntegration.listReservations(payload);
    const { success, message, data } = reservation;
    const VIPReservations = Utils.filterAndCreateObject(data.data, 'vip', false, 'propertyId', 'arrival');
    return AsyncHandler.sendObjectResponse(message || 'Reservations retrieved successfully', VIPReservations);
  },
};
export default Service;
