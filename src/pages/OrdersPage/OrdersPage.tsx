import React, { ContextType, useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Customer, Order } from '../../interfaces/clientInterfaces';
import { AuthContext } from '../../context/auth.context';
import toaster from 'toasted-notes';
import { Container, Col, Row } from 'react-bootstrap';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import { CustomerService } from '../../APIServices/customerService';
import { HomePageBookForm } from '../../components/HomePageComponents/HomePageBookForm';
import Loader from '../../components/Loader/Loader';

export const OrderPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [userInfo, setUserInfo] = useState<Customer>({ email: '', lastName: '', name: '', order: [], password: '' });
    const [deleted, setDeleted] = useState(false);
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
            setDeleted(true);
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchCustomerInfo();
    }, [fetchOrders, fetchCustomerInfo, orders]);

    return (
        <div className="order-page">
            <div className="order-page-bg d-flex justify-content-center align-items-end"></div>
            <Container className="order-page-wrapper">
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <h2>User Info</h2>
                        {userInfo ? (
                            <div className="order-page-user-info">
                                <p>Email: {userInfo.email}</p>
                                <p>Name: {userInfo.name}</p>
                                <p>Last Name: {userInfo.lastName}</p>
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </Col>
                    <Col lg={8} md={8} sm={8} className="d-flex justify-content-around align-items-center flex-column">
                        <h2>Your Orders</h2>
                        <div className="d-flex flex-column">
                            {orders.length ? (
                                orders.map((item: Order, key: number) => {
                                    return (
                                        <OrderItem
                                            key={key}
                                            deleted={deleted}
                                            classes={cls}
                                            order={item}
                                            onDelete={deleteOrderHandler}
                                        />
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
