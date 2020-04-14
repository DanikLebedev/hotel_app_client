import React from 'react';
import { config } from '../../config';
import { Room } from '../../interfaces/clientInterfaces';
import { Col, Container, Row } from 'react-bootstrap';
import './RoomItem.scss';
import { NavLink } from 'react-router-dom';

interface RoomItemProps {
    roomInfo: Room;
    searchRoom: boolean;
}

const RoomItem: ({ roomInfo, searchRoom }: RoomItemProps) => any = ({ roomInfo, searchRoom }: RoomItemProps) => {
    return (
        <Container className={'rooms-page__wrapper'}>
            <Row className={searchRoom ? 'search-room-page__item mb-3' : 'rooms-page__item mb-3'}>
                <Col
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    className="room-page__item-img"
                    style={{ background: `url(${config.baseUrl + roomInfo.image}) center center / cover` }}
                />
                <Col lg={6} md={6} sm={6} xs={6}>
                    <h3 className={'rooms-page__item-title'}>{roomInfo.title}</h3>
                    <div className="rooms-page__item-text">
                        <p>Category: {roomInfo.category}</p>
                        <p>Price: {roomInfo.price}$</p>
                    </div>
                    <NavLink to={`/rooms/${roomInfo._id}`} id={`redirect-button`} className="button btn-black">
                        Show More
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomItem;
