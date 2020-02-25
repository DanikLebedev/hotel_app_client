import { CRUDServices } from './CRUDServices';
import { Customers, Customer, Data } from '../interfaces/clientInterfaces';
export class CustomerService {
    public static async getAllCustomers(): Promise<Customers> {
        const customers: Customers = await CRUDServices.getData('/api/admin/customers');
        return customers;
    }

    public static async getCustomer(headers: {}): Promise<Customer> {
        const customers: Customer = await CRUDServices.getData('/api/client/customer', headers);
        return customers;
    }

    public static async updateCustomer(body: {}, headers: {}): Promise<Data> {
        const customer: Data = await CRUDServices.putData('/api/client/customer/update', body, headers);
        return customer;
    }
}
