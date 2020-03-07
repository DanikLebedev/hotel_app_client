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

    public static async deleteEmployee(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/employee/delete', body, headers);
        return response;
    }

    public static async updateEmployee(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData('/api/admin/employee/update', body, headers);
        return response;
    }
}
