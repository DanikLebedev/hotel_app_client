import React, { PropsWithChildren } from 'react';
import { config } from '../../config';
import { Room } from '../../interfaces/clientInterfaces';
import { Col, Container, Row } from 'react-bootstrap';
import './RoomItem.scss';

interface RoomItemProps {
    roomInfo: Room;
}

export const RoomItem: ({ roomInfo }: RoomItemProps) => any = ({ roomInfo }: RoomItemProps) => {
    return (
        <Container>
            <Row className="rooms-page__item mb-3">
                <Col
                    lg={6}
                    className="room-page__item-img"
                    style={{ background: `url(${config.baseUrl + roomInfo.image}) center center / cover` }}
                >
                    {/*<img style={{width: '80%', height: '80%'}} src={config.baseUrl + props.roomInfo.image } alt="img"/>*/}
                </Col>
                <Col lg={6}>
                    <h3>{roomInfo.title}</h3>
                    <div className="d-flex">
                        <p>Category: {roomInfo.category}</p>
                        <p>Price: {roomInfo.price}</p>
                    </div>
                    <div className="d-flex">
                        <p>Area: {roomInfo.area}</p>
                        <p>Guests: {roomInfo.guests}</p>
                        <p>Rooms: {roomInfo.rooms}</p>
                    </div>
                    <p>Description: {roomInfo.description}</p>
                    <button className="button btn-black">Book Room</button>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomItem;
