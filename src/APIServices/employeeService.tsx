import {CRUDServices} from "./CRUDServices";
import {Data, Employees} from '../interfaces/clientInterfaces'
export class EmployeeService {
    public static async getAllEmployee() :Promise<Employees> {
        const rooms: Employees = await CRUDServices.getData('/api/admin/employee')
        return rooms
    }

    public static async postEmployee(body: {}, headers?:{}) : Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/employee', body, headers)
        return response
    }
}