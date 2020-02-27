import React, { FC, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { SearchRoomsList } from '../../components/SearchRoomList/SearchRoomList';
import './SearchRoomsPage.scss';
import { ClientContext } from '../../context/client.context';

export const SearchRoomsPage: FC = () => {
    const location = useLocation();
    const historyState: any = location.state;
    const fetchedRooms = useContext(ClientContext).fetchedRooms.filter(room => {
        return room.category === historyState.category;
    });

    return (
        <div className="search-room-page">
            <FindRoomForm />
            <div className="search-room-page-bg"></div>
            <Container>{fetchedRooms ? <SearchRoomsList rooms={fetchedRooms} /> : null}</Container>
        </div>
    );
};
