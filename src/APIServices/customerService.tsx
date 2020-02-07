import {CRUDServices} from "./CRUDServices";
import {Customers, Data, Employees} from '../interfaces/clientInterfaces'
export class CustomerService {
    public static async getAllCustomers() :Promise<Customers> {
        const customers: Customers = await CRUDServices.getData('/api/admin/customers')
        return customers
    }

    public static async postEmployee(body: {}, headers?:{}) : Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/employee', body, headers)
        return response
    }
}