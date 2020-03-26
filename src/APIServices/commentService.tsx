import { CRUDServices } from './CRUDServices';
import {Data, Feedbacks, Comment, Comments} from '../interfaces/clientInterfaces';

export class CommentService {
    public static async getAllComments(): Promise<Comments> {
        const comments: Comments = await CRUDServices.getData('/api/client/comment');
        return comments;
    }

    public static async postComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/client/comment/add', body, headers);
        return response;
    }

    public static async deleteComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/client/comment/delete', body, headers);
        return response;
    }

    public static async updateComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/client/comment/update', body, headers);
        return response;
    }
}
