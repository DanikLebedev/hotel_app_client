import { CRUDServices } from './CRUDServices';
import { Articles, Data } from '../interfaces/clientInterfaces';

export class ArticleService {
    public static async getAllArticles(): Promise<Articles> {
        const articles: Articles = await CRUDServices.getData('/api/admin/articles');
        return articles;
    }

    public static async posArticles(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/articles/create', body, headers);
        return response;
    }

    public static async getArticleById(id: string | undefined): Promise<Articles> {
        console.log(id)
        const articles: Articles = await CRUDServices.getData(`/api/client/article/${id}`);
        return articles;
    }

    public static async deleteArticle(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/articles/delete', body, headers);
        return response;
    }

    public static async updateArticle(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/articles/update', body, headers);
        return response;
    }
}
