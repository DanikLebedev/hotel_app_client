import React, { ContextType, useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Order } from '../../interfaces/clientInterfaces';
import { AuthContext } from '../../context/auth.context';
import toaster from 'toasted-notes';
import { Container } from 'react-bootstrap';
import { OrderItem } from '../../components/OrderItem/OrderItem';

export const OrderPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders: CallableFunction = useCallback(async () => {
        const { orders } = await OrderService.getUserOrders({ Authorization: `Bearer ${auth.token}` });
        setOrders(orders);
    }, [auth.token]);

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const formData: FormData = new FormData();
        formData.append('_id', target.id);
        if (target) {
            const filteredOrders: Order[] = orders.filter(order => {
                return order._id === target.id;
            });
            setOrders(filteredOrders);
            const data = await OrderService.deleteOrder(formData);
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders, orders]);

    if (orders) {
        return (
            <div>
                <div className="order-page-bg d-flex justify-content-center align-items-end">
                    <h1 className="text-white">Your Orders</h1>
                </div>
                <Container className="room-page-wrapper pb-5 d-flex justify-content-around align-items-center">
                    {orders.length !== 0 ? (
                        orders.map((item: Order, key: number) => {
                            return <OrderItem key={key} order={item} onDelete={deleteOrderHandler} />;
                        })
                    ) : (
                        <h1>There no orders yet</h1>
                    )}
                </Container>
            </div>
        );
    }
    return null;
};
