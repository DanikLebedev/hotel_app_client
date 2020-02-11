import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { config } from '../../config';
import PropTypes from 'prop-types';
import { Category, Order, Room, Rooms } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { useHttp } from '../../hooks/http.hook';
import { OrderService } from '../../APIServices/orderService';
import { AuthContext } from '../../context/auth.context';
import { useHistory } from 'react-router-dom';

interface OrderModal {
    show: boolean;
    onClose: () => void;
}

export const OrderModal: React.FC<OrderModal> = props => {
    const [showedFreeRooms, setShowedFreeRooms] = useState<Room[]>([]);
    const [order, setOrder] = useState({});
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [price, setPrice] = useState<number | string>();
    const { error, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const isAuthenticated = auth.isAuthenticated;
    const history = useHistory();

    const selectOrderChangeHandler = async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        event.persist();
        const { rooms }: Rooms = await RoomService.getAllRooms();
        const filteredRooms = rooms.filter(item => {
            return item.category.toString() === event.target.value.toString() && !item.isBooked;
        });
        if (filteredRooms.length !== 0) {
            setPrice(filteredRooms[0].price);
        }
        setShowedFreeRooms(filteredRooms);
        setOrder({ ...order, category: event.target.value, price });
    };

    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    };

    const addOrderHandler = async () => {
        const data = await OrderService.postOrder(
            { ...order },
            {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        );
        props.onClose();
        toaster.notify(data.message, {
            duration: 2000,
        });
        if (!isAuthenticated) {
            props.onClose();
            history.push('/auth');
        }
    };

    const options = fetchedCategories.map(({ title }, index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        );
    });

    useEffect(() => {
        fetchCategories();
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [fetchCategories, error, clearError]);

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Book your room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <select className={'form-control'} onChange={selectOrderChangeHandler} name="category" id="">
                        {options}
                    </select>
                    <ul>
                        {showedFreeRooms.length !== 0 ? (
                            showedFreeRooms.map((room, key) => {
                                return (
                                    <Row key={key}>
                                        <Col lg={6}>
                                            <img
                                                src={config.baseUrl + room.image}
                                                style={{ width: '100%', height: '100%' }}
                                                alt="room"
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <li>Category: {room.category}</li>
                                            <li>Price: {room.price}$</li>
                                            <li>Type: {room.title}</li>
                                        </Col>
                                    </Row>
                                );
                            })
                        ) : (
                            <p>Sorry, but all rooms in this category is booked</p>
                        )}
                    </ul>
                    <input className={'form-control'} name={'checkIn'} onChange={onChangeHandler} type="date" />
                    <input className={'form-control'} name={'checkOut'} onChange={onChangeHandler} type="date" />
                    <input
                        className={'form-control'}
                        name={'guests'}
                        placeholder="number of guests"
                        onChange={onChangeHandler}
                        type="number"
                    />
                    <button className={'button btn-black'} onClick={addOrderHandler}>
                        Send
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

OrderModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
