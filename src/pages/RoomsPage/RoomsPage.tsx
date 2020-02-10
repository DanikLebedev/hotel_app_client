import React, { FC } from 'react';
import RoomsList from '../../components/RoomsList/RoomsList';
import { Container } from 'react-bootstrap';
import './RoomsPage.scss';

export const RoomsPage: FC = () => {
    return (
        <div className="room-page">
            <div className="room-page-bg d-flex justify-content-center align-items-center">
                <h1>Book Room</h1>
            </div>
            <Container className="room-page-wrapper">
                <RoomsList />
            </Container>
        </div>
    );
};

export default RoomsPage;
