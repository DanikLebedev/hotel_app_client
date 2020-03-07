import React, { useContext } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import Loader from '../Loader/Loader';
import { Room } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';

export const RoomsList: React.FC = (): JSX.Element => {
    const fetchedRooms: Room[] = useContext(ClientContext).fetchedRooms;
    return (
        <div>
            {!fetchedRooms  ? (
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <Loader />
                </div>

            ) : (
                fetchedRooms.map((room: Room, i: number) => {
                    return <RoomItem searchRoom={false} key={room.title + i} roomInfo={room} />;
                })
            )}
        </div>
    );
};

export default RoomsList;
