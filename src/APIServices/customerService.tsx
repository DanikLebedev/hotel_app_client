import { CRUDServices } from './CRUDServices';
import { Customers } from '../interfaces/clientInterfaces';
export class CustomerService {
    public static async getAllCustomers(): Promise<Customers> {
        const customers: Customers = await CRUDServices.getData('/api/admin/customers');
        return customers;
    }

}
