import React, { useContext, useEffect, useState } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import Loader from '../Loader/Loader';
import { Room } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import { RoomService } from '../../APIServices/roomService';

const RoomsList: React.FC = (): JSX.Element => {
    const fetchedRooms: Room[] = useContext(ClientContext).fetchedRooms;
    const [rooms, setRooms] = useState<Room[]>(fetchedRooms);
    useEffect(() => {
        RoomService.getAllRooms().then(({ rooms }) => setRooms(rooms));
    }, [fetchedRooms]);
    return (
        <div>
            {!rooms ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Loader />
                </div>
            ) : (
                rooms.map((room: Room, i: number) => {
                    return <RoomItem searchRoom={false} key={room.title + i} roomInfo={room} />;
                })
            )}
        </div>
    );
};

export default RoomsList;
