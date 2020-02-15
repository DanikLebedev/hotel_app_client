import { CRUDServices } from './CRUDServices';
import {Categories, Category, Data} from '../interfaces/clientInterfaces';

export class CategoryService {
    public static async getAllCategories(): Promise<Categories> {
        const categories: Categories = await CRUDServices.getData('/api/admin/category');
        return categories;
    }

    public static async postCategory(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/category', body, headers);
        return response;
    }

    public static async deleteCategory(body: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/category/delete', body);
        return response;
    }

    public static async updateCategory(body: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/category/update', body);
        return response;
    }
}
