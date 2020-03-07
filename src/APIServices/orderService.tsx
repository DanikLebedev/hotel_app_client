import { CRUDServices } from './CRUDServices';
import { Data, Orders, OrderCarts } from '../interfaces/clientInterfaces';
export class OrderService {
    public static async getUserOrders(headers: any): Promise<Orders> {
        const userOrders: Orders = await CRUDServices.getData('/api/client/order', headers);
        return userOrders;
    }

    public static async getAllOrders(): Promise<OrderCarts> {
        const orders: OrderCarts = await CRUDServices.getData('/api/admin/orders');
        return orders;
    }

    public static async postOrder(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/client/order', body, headers);
        return response;
    }

    public static async deleteOrder(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/client/order/delete', body, headers);
        return response;
    }

    public static async getOrdersHistory(headers?: {}): Promise<OrderCarts> {
        const orders: OrderCarts = await CRUDServices.getData('/api/client/orderHistory', headers);
        return orders;
    }

    public static async deleteAdminOrder(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/orders/delete', body, headers);
        return response;
    }

    public static async updateAdminOrder(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/orders/update', body, headers);
        return response;
    }
}
