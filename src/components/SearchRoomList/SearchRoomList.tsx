import React from 'react';
import Loader from '../Loader/Loader';
import { Room, Rooms } from '../../interfaces/clientInterfaces';
import { array } from 'prop-types';
import RoomItem from '../RoomItem/RoomItem';

export const SearchRoomsList: React.FC<Rooms> = (props: Rooms): JSX.Element => {
    return (
        <div>
            <h2 className="text-white">Search results</h2>
            {!props.rooms[0] ? (
                <Loader />
            ) : (
                props.rooms.map((room: Room, i: number) => {
                    return (
                        <div key={i}>
                            <RoomItem searchRoom={true} key={i} roomInfo={room} />
                        </div>
                    );
                })
            )}
        </div>
    );
};

SearchRoomsList.propTypes = {
    rooms: array.isRequired,
};
