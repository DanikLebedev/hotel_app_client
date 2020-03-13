import React, { FC } from 'react';
import RoomsList from '../../components/RoomsList/RoomsList';
import { Container } from 'react-bootstrap';
import './RoomsPage.scss';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import  FindRoomForm  from '../../components/FindRoomForm/FindRoomForm';
import {withTranslation} from "react-i18next";

const RoomsPage: FC = ({t}: any): JSX.Element => {
    return (
        <div className="room-page">
            <FindRoomForm />
            <div className="room-page-bg d-flex justify-content-center align-items-end">
                <h1>{t('see-rooms.label')}</h1>
            </div>
            <Container className="room-page-wrapper">
                <LazyLoadComponent>
                    <RoomsList />
                </LazyLoadComponent>
            </Container>
        </div>
    );
};

export default withTranslation()(RoomsPage);
