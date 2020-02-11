import {CRUDServices} from "./CRUDServices";
import {Data, Room, Rooms} from '../interfaces/clientInterfaces'




export class RoomService {
    public static async getAllRooms() :Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData('/api/admin/room')
        return rooms
    }

    public static async postRoom(body: {}, headers?:{}) : Promise<Data> {
          const response: Data = await CRUDServices.postData('/api/admin/room', body, headers)
          return response
    }

    public static async getRoomByCategory(body: {}): Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData('/api/admin/room')
        return rooms
    }
}