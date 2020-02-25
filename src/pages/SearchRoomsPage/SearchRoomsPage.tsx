import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FindRoomForm } from '../../components/FindRoomForm/FindRoomForm';
import { Room } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import { SearchRoomsList } from '../../components/SearchRoomList/SearchRoomList';
import './SearchRoomsPage.scss'

interface LocationState {
    category: string;
}

export const SearchRoomsPage: FC = () => {
    const location = useLocation();
    const historyState: any = location.state;
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>();

    const fetchRooms = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => {
            const filteredRooms = rooms.filter(room => {
                return room.category === historyState.category;
            });
            setFetchedRooms(filteredRooms);
        });
    }, [historyState.category]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return (
        <div className="search-room-page">
            <FindRoomForm />
            <div className="search-room-page-bg"></div>
            <Container>{fetchedRooms ? <SearchRoomsList rooms={fetchedRooms} /> : null}</Container>
        </div>

    );
};
