import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Data, Order, Room } from '../../interfaces/clientInterfaces';
import { useParams, useHistory } from 'react-router-dom';
import { RoomService } from '../../APIServices/roomService';
import { Col, Container, Row } from 'react-bootstrap';
import { config } from '../../config';
import Loader from '../../components/Loader/Loader';
import './RoomInfoPage.scss';
import { OrderService } from '../../APIServices/orderService';
import toaster from 'toasted-notes';
import { ClientContext } from '../../context/client.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck, faBuilding, faUserFriends, faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../components/ErrorsComponents/ErrorMessage';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { withTranslation } from 'react-i18next';

interface RoomInfoPageFormData {
    checkIn: string;
    checkOut: string;
    comment: string;
    guests: number;
}

const RoomInfoPage: React.FC = ({ t }: any): JSX.Element => {
    const userEmail: string = useAuth().userEmail;
    const [show, setShow] = useState<boolean>(false);
    const { register, handleSubmit, errors } = useForm<RoomInfoPageFormData>();

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
    const auth: ClientContext = useContext(ClientContext);
    const isAuthenticated: boolean = auth.isAuthenticated;
    const history = useHistory();

    const fetchRoomInfo: CallableFunction = useCallback(() => {
        RoomService.getRoomById(roomId).then(({ rooms }) => setRoomInfo(rooms));
    }, [roomId]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    };

    const onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
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
        const data: Data = await OrderService.postOrder(
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
        if (!data.orders) {
            toaster.notify(data.message, {
                duration: 2000,
            });
            setShow(false);
        } else {
            history.push('/orders');
            toaster.notify(data.message, {
                duration: 2000,
            });
        }

        if (!isAuthenticated) {
            history.push('/auth');
        }
    };
    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

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
                        {t(`home-page-rooms.${room.category}.description`)}
                    </p>
                    <div className="d-flex justify-content-around room-info-page-icons">
                        <span>
                            <FontAwesomeIcon color="green" icon={faMoneyCheck} /> {t('room-info.price')}: {room.price}$
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faBuilding} /> {t('room-info.area')}: {room.area}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faUserFriends} /> {t('room-info.guests')} {room.guests}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faHome} /> {t('room-info.rooms')}: {room.rooms}
                        </span>
                    </div>
                </Col>
            </Row>
        );
    });

    return (
        <div className="room-info-page">
            <div className="room-info-page-bg d-flex justify-content-center align-items-end" />
            <Container className="room-info-page-wrapper">
                {roomInfo.length !== 0 ? (
                    roomInfoLayout
                ) : (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Loader />
                    </div>
                )}
                <div className="booking-form">
                    <div className="form-header">
                        <h1>{t('room-info.title')}</h1>
                    </div>
                    <div>
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <span className="form-label">{t('room-info.checkIn')}</span>
                                    <input
                                        ref={register({ required: true })}
                                        className="form-control"
                                        onChange={onChangeHandler}
                                        name={'checkIn'}
                                        type="date"
                                        required
                                    />
                                </div>
                                <span className="error-field">
                                    <ErrorMessage error={errors.checkOut} type={'error'} />
                                </span>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <span className={'book-form-icon'}>&#8652;</span>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <span className="form-label">{t('room-info.checkOut')}</span>
                                    <input
                                        ref={register({ required: true })}
                                        className="form-control"
                                        onChange={onChangeHandler}
                                        name={'checkOut'}
                                        type="date"
                                        required
                                    />
                                </div>
                                <span className="error-field">
                                    <ErrorMessage error={errors.checkOut} type={'error'} />
                                </span>
                            </div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-md-3 mt-2">
                                <span className="form-label">{t('room-info.guests')}</span>
                                <input
                                    className="form-control"
                                    ref={register({ required: true, min: 1 })}
                                    onChange={onChangeHandler}
                                    name={'guests'}
                                    type="number"
                                    required
                                />
                                <span className="error-field">
                                    <ErrorMessage error={errors.guests} type={'error'} />
                                </span>
                            </div>
                            <div className="col-md-4">
                                <span className="form-label">{t('room-info.wishes')}</span>
                                <textarea
                                    onChange={onChangeTextAreaHandler}
                                    ref={register()}
                                    className={'form-control'}
                                    name={'comment'}
                                    placeholder="enter your wishes"
                                    id={'comment'}
                                />
                                <span className="error-field"></span>
                            </div>
                            <div className="col-md-3">
                                <div className="form-btn">
                                    <SubmitButton onClick={handleSubmit(handleShow)} title={t('book-room.label')} />
                                </div>
                                <span className="error-field" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <ConfirmModal show={show} addOrder={addOrderHandler} order={order} closeModal={handleClose} />
        </div>
    );
};

export default withTranslation()(RoomInfoPage);
