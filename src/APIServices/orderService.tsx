import { CRUDServices } from './CRUDServices';
import { Data, Orders, OrderCarts } from '../interfaces/clientInterfaces';
export class OrderService {
    public static async getUserOrders(headers: any): Promise<Orders> {
        const userOrders: Orders = await CRUDServices.getData('/api/client/order', headers);
        return userOrders;
    }

    public static async getAllOrders(): Promise<Orders> {
        const orders: Orders = await CRUDServices.getData('/api/admin/orders');
        return orders;
    }

    public static async postOrder(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/client/order', body, headers);
        return response;
    }

    public static async deleteOrder(body: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/client/order/delete', body);
        return response;
    }

    public static async deleteAdminOrder(body: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/orders/delete', body);
        return response;
    }
}
