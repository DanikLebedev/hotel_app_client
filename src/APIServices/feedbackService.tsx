import { CRUDServices } from './CRUDServices';
import { Data, Feedbacks } from '../interfaces/clientInterfaces';

export class FeedbackService {
    public static async getAllFeedbacks(): Promise<Feedbacks> {
        const feedbacks: Feedbacks = await CRUDServices.getData('/api/admin/feedbacks');
        return feedbacks;
    }

    public static async postFeedback(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/client/feedback/add', body, headers);
        return response;
    }

    public static async deleteFeedback(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/feedbacks/delete', body, headers);
        return response;
    }

    public static async updateFeedback(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/feedbacks/update', body, headers);
        return response;
    }
}
