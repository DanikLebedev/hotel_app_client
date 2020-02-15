import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Order, Room } from '../../interfaces/clientInterfaces';
import { useParams, useHistory } from 'react-router-dom';
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


export const RoomInfoPage: React.FC = () => {
    const userEmail = useAuth().userEmail;
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

    const fetchRoomInfo: CallableFunction = useCallback(() => {
        RoomService.getRoomById(roomId).then(({ rooms }) => setRoomInfo(rooms));
    }, []);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    };

    const onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    };

    const addOrderHandler = async (): Promise<void> => {
        if (order.checkIn > order.checkOut) {
            toaster.notify('incorrect Date, please try again', {
                duration: 2000,
            });
            return;
        }
        const data = await OrderService.postOrder(
            { ...order, category: roomInfo[0].category, price: roomInfo[0].price, userEmail },
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
                    <h3 className={'room-info-page-title'}>{room.title}</h3>
                    <h5 className={'room-info-page-subtitle'}>{room.category}</h5>
                    <p className={'room-info-page-description'}>
                        {room.description}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dignissimos ducimus in laboriosam
                        libero optio quis rem sed voluptate voluptatibus. Ab assumenda dignissimos id inventore iste
                        nesciunt pariatur, possimus veniam?
                    </p>
                    <div className="d-flex justify-content-around">
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
            <div className="room-info-page-bg d-flex justify-content-center align-items-end">
                <h1 className="text-white">Room Info Page</h1>
            </div>
            <Container className="room-info-page-wrapper">
                {roomInfo.length !== 0 ? roomInfoLayout : <Loader />}
                <Row>
                    <Col lg={12} md={12} sm={12} className="mt-3">
                        <h3 className="text-center">Book Room</h3>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <input
                                className={'form-control w-50'}
                                name={'checkIn'}
                                onChange={onChangeHandler}
                                type="date"
                                value={order.checkIn}
                            />
                            <input
                                className={'form-control w-50'}
                                name={'checkOut'}
                                onChange={onChangeHandler}
                                type="date"
                                value={order.checkOut}
                            />
                            <input
                                className={'form-control w-50'}
                                name={'guests'}
                                placeholder="number of guests"
                                onChange={onChangeHandler}
                                type="number"
                                value={order.guests}
                            />
                            <textarea
                                onChange={onChangeTextAreaHandler}
                                className={'form-control w-50'}
                                name={'comment'}
                                placeholder="enter your wishes"
                                value={order.comment}
                            />
                            <button className={'button btn-black'} onClick={addOrderHandler}>
                                book room
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
