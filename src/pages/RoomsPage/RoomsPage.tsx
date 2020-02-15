import React, { FC } from 'react';
import RoomsList from '../../components/RoomsList/RoomsList';
import { Container } from 'react-bootstrap';
import './RoomsPage.scss';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export const RoomsPage: FC = () => {
    return (
        <div className="room-page">
            <div className="room-page-bg d-flex justify-content-center align-items-end">
                <h1>Book Room</h1>
            </div>
            <Container className="room-page-wrapper">
                <LazyLoadComponent>
                    <RoomsList />
                </LazyLoadComponent>
            </Container>
        </div>
    );
};

export default RoomsPage;
