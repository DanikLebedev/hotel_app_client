import { CRUDServices } from './CRUDServices';
import { Categories, Data } from '../interfaces/clientInterfaces';

export class CategoryService {
    public static async getAllCategories(): Promise<Categories> {
        const categories: Categories = await CRUDServices.getData('/api/admin/category');
        return categories;
    }

    public static async postCategory(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/category', body, headers);
        return response;
    }
}
