import React, { ChangeEvent, ContextType, useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Customer, Feedback, Order } from '../../interfaces/clientInterfaces';
import { AuthContext } from '../../context/auth.context';
import toaster from 'toasted-notes';
import { Container, Col, Row } from 'react-bootstrap';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import { CustomerService } from '../../APIServices/customerService';
import Loader from '../../components/Loader/Loader';
import { FeedbackService } from '../../APIServices/feedbackService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import {FindRoomForm} from "../../components/FindRoomForm/FindRoomForm";

export const OrderPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [userInfo, setUserInfo] = useState<Customer>({ email: '', lastName: '', name: '', order: [], password: '' });
    const [feedbackForm, setFeedbackForm] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: '',
        userLastName: '',
        userName: '',
    });
    const [cls, setCls] = useState<Array<string>>(['order-item']);
    const fetchOrders: CallableFunction = useCallback(async () => {
        const { orders } = await OrderService.getUserOrders({ Authorization: `Bearer ${auth.token}` });
        setOrders(orders);
    }, [auth.token]);

    const fetchCustomerInfo: CallableFunction = useCallback(async () => {
        const customer: Customer = await CustomerService.getCustomer({ Authorization: `Bearer ${auth.token}` });
        setUserInfo(customer);
    }, [auth.token]);

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const formData: FormData = new FormData();
        formData.append('_id', target.id);
        if (target) {
            const filteredOrders: Order[] = orders.filter(order => {
                return order._id === target.id;
            });
            setCls((prevState: string[]) => [...prevState, 'deleted-order']);
            setOrders(filteredOrders);
            const data = await OrderService.deleteOrder(formData);
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
    };

    const changeFeedbackTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value });
    };

    const addFeedbackHandler = async (): Promise<void> => {
        const data = await FeedbackService.postFeedback(
            { ...feedbackForm, userEmail: userInfo.email, userName: userInfo.name, userLastName: userInfo.lastName },
            { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'application/json' },
        );
        toaster.notify(data.message, {
            duration: 2000,
        });
    };

    useEffect(() => {
        fetchOrders();
        fetchCustomerInfo();
    }, [fetchOrders, fetchCustomerInfo, orders]);

    return (
        <div className="order-page">
            <FindRoomForm />
            <div className="order-page-bg"></div>
            <Container className="order-page-wrapper">
                <Row>
                    <Col lg={3} md={3} sm={3} xs={12}>
                        {userInfo ? (
                            <div className="order-page-user-info">
                                <h4>Your Info</h4>
                                <p>
                                    <FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}{' '}
                                    <button className={'icon-buttons'}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faUser} /> Full name: {userInfo.name} {userInfo.lastName}{' '}
                                    <button className={'icon-buttons'}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <Loader />
                        )}
                        <div className={'feedback-form'}>
                            <h4>Leave your feedback</h4>
                            <textarea
                                rows={5}
                                cols={45}
                                className={'form-control'}
                                placeholder={'your feedback...'}
                                onChange={changeFeedbackTextHandler}
                                name={'message'}
                            />
                            <button onClick={addFeedbackHandler} className={'button'}>
                                Send feedback
                            </button>
                        </div>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={12} className="d-flex justify-content-around align-items-center flex-column">
                        <h4>Your Orders</h4>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            {orders ? (
                                orders.map((item: Order, key: number) => {
                                    return (
                                        <OrderItem key={key} classes={cls} order={item} onDelete={deleteOrderHandler} />
                                    );
                                })
                            ) : (
                                <h2>There no orders yet</h2>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
