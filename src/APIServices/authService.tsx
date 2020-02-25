import { UserData } from '../interfaces/clientInterfaces';
import { CRUDServices } from './CRUDServices';

export class AuthService {
    public static async loginUser(body: {}, headers?: {}): Promise<UserData> {
        const response: UserData = await CRUDServices.postData('/api/auth/login', body, headers);
        return response;
    }

    public static async registerUser(body: {}, headers?: {}): Promise<UserData> {
        const response: UserData = await CRUDServices.postData('/api/auth/register', body, headers);
        return response;
    }

    public static async loginAdmin(body: {}, headers?: {}): Promise<UserData> {
        const response: UserData = await CRUDServices.postData('/api/admin/login', body, headers);
        return response;
    }



}
