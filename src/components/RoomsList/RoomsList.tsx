import React, { useCallback, useContext, useEffect, useState } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import Loader from '../Loader/Loader';
import { RoomService } from '../../APIServices/roomService';
import { Room } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';

export const RoomsList: React.FC = (): JSX.Element => {
    const fetchedRooms = useContext(ClientContext).fetchedRooms;
    return (
        <div>
            {!fetchedRooms[0] ? (
                <Loader />
            ) : (
                fetchedRooms.map((room: Room, i: number) => {
                    return <RoomItem searchRoom={false} key={room.title + i} roomInfo={room} />;
                })
            )}
        </div>
    );
};

export default RoomsList;
