import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Order, Room } from '../../interfaces/clientInterfaces';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { RoomService } from '../../APIServices/roomService';
import { Col, Container, Row } from 'react-bootstrap';
import { config } from '../../config';
import Loader from '../../components/Loader/Loader';
import './RoomInfoPage.scss';
import { OrderService } from '../../APIServices/orderService';
import toaster from 'toasted-notes';
import { AuthContext } from '../../context/auth.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck, faBuilding, faUserFriends, faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/auth.hook';
import { Modal, Button } from 'react-bootstrap';

export const RoomInfoPage: React.FC = () => {
    const userEmail = useAuth().userEmail;
    const [show, setShow] = useState(false);

    const [roomInfo, setRoomInfo] = useState<Room[]>([]);
    const [order, setOrder] = useState<Order>({
        category: '',
        checkIn: '',
        checkOut: '',
        comment: '',
        guests: 1,
        price: 0,
        userEmail,
    });
    const params: { id?: string } = useParams();
    const roomId: string | undefined = params.id;
    const auth = useContext(AuthContext);
    const isAuthenticated: boolean = auth.isAuthenticated;
    const history = useHistory();
    const location = useLocation();
    console.log(location.state);
    const fetchRoomInfo: CallableFunction = useCallback(() => {
        RoomService.getRoomById(roomId).then(({ rooms }) => setRoomInfo(rooms));
    }, []);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    };

    const onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setOrder({
            ...order,
            [event.target.name]: event.target.value,
            category: roomInfo[0].category,
            price: roomInfo[0].price,
            userEmail,
        });
    };

    const addOrderHandler = async (): Promise<void> => {
        if (order.checkIn > order.checkOut) {
            toaster.notify('incorrect Date, please try again', {
                duration: 2000,
            });
            return;
        }
        const data = await OrderService.postOrder(
            { ...order },
            {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        );
        order.checkIn = '';
        order.checkOut = '';
        order.guests = 1;
        order.comment = '';
        history.push('/orders');
        toaster.notify(data.message, {
            duration: 2000,
        });
        if (!isAuthenticated) {
            history.push('/auth');
        }
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchRoomInfo();
    }, [fetchRoomInfo]);

    const roomInfoLayout: JSX.Element[] = roomInfo.map((room, key) => {
        return (
            <Row key={key}>
                <Col lg={6} md={6} sm={6}>
                    <img style={{ width: '100%', height: '100%' }} src={config.baseUrl + room.image} alt="room" />
                </Col>
                <Col>
                    <h3 className={'room-info-page-title'}>{room.title.toString()}</h3>
                    <h5 className={'room-info-page-subtitle'}>{room.category}</h5>
                    <p className={'room-info-page-description'}>
                        {room.description}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dignissimos ducimus in laboriosam
                        libero optio quis rem sed voluptate voluptatibus. Ab assumenda dignissimos id inventore iste
                        nesciunt pariatur, possimus veniam?
                    </p>
                    <div className="d-flex justify-content-around room-info-page-icons">
                        <span>
                            <FontAwesomeIcon color="green" icon={faMoneyCheck} /> Price: {room.price}$
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faBuilding} /> Area: {room.area}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faUserFriends} /> Number of guests: {room.guests}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faHome} /> Number of rooms: {room.rooms}
                        </span>
                    </div>
                </Col>
            </Row>
        );
    });

    return (
        <div className="room-info-page">
            <div className="room-info-page-bg d-flex justify-content-center align-items-end"></div>
            <Container className="room-info-page-wrapper">
                {roomInfo.length !== 0 ? roomInfoLayout : <Loader />}
                <div className="booking-form">
                    <div className="form-header">
                        <h1>Make your reservation</h1>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Check In</span>
                                    <input
                                        className="form-control"
                                        onChange={onChangeHandler}
                                        value={order.checkIn}
                                        name={'checkIn'}
                                        type="date"
                                        required
                                    />
                                </div>
                                <span className="in-out hidden-xs hidden-sm">&#8652;</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Check out</span>
                                    <input
                                        className="form-control"
                                        onChange={onChangeHandler}
                                        value={order.checkOut}
                                        name={'checkOut'}
                                        type="date"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-md-3">
                                <span className="form-label">Number of guests</span>
                                <input
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    value={order.guests}
                                    name={'guests'}
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <span className="form-label">Your Wishes</span>
                                <textarea
                                    onChange={onChangeTextAreaHandler}
                                    className={'form-control'}
                                    name={'comment'}
                                    placeholder="enter your wishes"
                                    value={order.comment}
                                    id={'comment'}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="form-btn">
                                    <button onClick={handleShow} className="submit-btn">
                                        Check availability
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm your data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Check In: {order.checkIn}</li>
                        <li>Check Out: {order.checkOut}</li>
                        <li>Category: {order.category}</li>
                        <li>Price: {order.price}$</li>
                        <li>Comment: {order.comment}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button className="button-book" onClick={handleClose}>
                        Close
                    </button>
                    <button className="button-book" onClick={addOrderHandler}>
                        Add order
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
