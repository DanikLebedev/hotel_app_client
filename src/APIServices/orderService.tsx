import {CRUDServices} from "./CRUDServices";
import { Data, Orders} from '../interfaces/clientInterfaces'
export class OrderService {
    public static async getUserOrders(headers: any) :Promise<Orders> {
        const userOrders: Orders = await CRUDServices.getData('api/client/order', headers)
        return userOrders
    }

    public static async getAllOrders(): Promise<Orders> {
        const orders: Orders = await CRUDServices.getData('api/admin/orders')
        console.log(orders)
        return orders
    }

    public static async postOrder(body: {}, headers?:{}) : Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/client/order', body, headers)
        return response
    }
}