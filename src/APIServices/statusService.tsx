import { CRUDServices } from './CRUDServices';
import { Data, Statuses } from '../interfaces/clientInterfaces';

export class StatusService {
    public static async getAllStatuses(): Promise<Statuses> {
        const statuses: Statuses = await CRUDServices.getData('/api/admin/status');
        return statuses;
    }

    public static async postStatus(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/status', body, headers);
        return response;
    }
}
