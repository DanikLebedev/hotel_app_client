import { CRUDServices } from './CRUDServices';
import { Data, Employees } from '../interfaces/clientInterfaces';
export class EmployeeService {
    public static async getAllEmployee(): Promise<Employees> {
        const customers: Employees = await CRUDServices.getData('/api/admin/employee');
        return customers;
    }

    public static async postEmployee(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/employee', body, headers);
        return response;
    }
}
