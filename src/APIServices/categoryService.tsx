import { CRUDServices } from './CRUDServices';
import { Categories, Data } from '../interfaces/clientInterfaces';

export class CategoryService {
    public static async getAllCategories(headers?: {}): Promise<Categories> {
        const categories: Categories = await CRUDServices.getData('/api/admin/category', headers);
        return categories;
    }

    public static async postCategory(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/category', body, headers);
        return response;
    }

    public static async deleteCategory(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/category/delete', body,  headers);
        return response;
    }

    public static async updateCategory(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/category/update', body, headers);
        return response;
    }
}
