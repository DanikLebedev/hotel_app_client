import { CRUDServices } from './CRUDServices';
import { Data, Room, Rooms } from '../interfaces/clientInterfaces';

export class RoomService {
    public static async getAllRooms(): Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData('/api/admin/room');
        return rooms;
    }

    public static async postRoom(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData('/api/admin/room', body, headers);
        return response;
    }

    public static async getRoomById(id: string | undefined): Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData(`/api/client/rooms/${id}`);
        return rooms;
    }

    public static async deleteRoom(body: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData('/api/admin/room/delete', body);
        return response;
    }
}
