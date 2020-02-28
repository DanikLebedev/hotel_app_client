import React, { FC, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { SearchRoomsList } from '../../components/SearchRoomList/SearchRoomList';
import './SearchRoomsPage.scss';
import { ClientContext } from '../../context/client.context';
import { Room } from '../../interfaces/clientInterfaces';

export const SearchRoomsPage: FC = () => {
    const location = useLocation();
    const historyState: any = location.state;
    const fetchedRooms: Room[] = useContext(ClientContext).fetchedRooms.filter(room => {
        return room.category === historyState.category;
    });

    return (
        <div className="search-room-page">
            <FindRoomForm />
            <div className="search-room-page-bg" />
            <Container>{fetchedRooms ? <SearchRoomsList rooms={fetchedRooms} /> : null}</Container>
        </div>
    );
};
