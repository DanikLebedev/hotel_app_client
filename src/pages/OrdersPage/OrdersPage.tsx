import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Order } from '../../interfaces/clientInterfaces';
import { AuthContext } from '../../context/auth.context';
import toaster from 'toasted-notes';

export const OrderPage = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders = useCallback(async () => {
        const { orders } = await OrderService.getUserOrders({ Authorization: `Bearer ${auth.token}` });
        setOrders(orders);
    }, [auth.token]);

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const formData = new FormData();
        formData.append('_id', target.id);
        if (target) {
            const filteredOrders = orders.filter(order => {
                return order._id === target.id;
            });
            setOrders(filteredOrders);
            const response = await fetch('/api/client/order/delete', {
                method: 'DELETE',
                body: formData,
            });
            const data = await response.json();
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
                {}
                {orders.length !== 0 ? (
                    orders.map((item, key) => {
                        return (
                            <ul key={key}>
                                <li>{item.category}</li>
                                <li>{item.checkIn}</li>
                                <li>{item.checkOut}</li>
                                <li>{item.guests}</li>
                                <button onClick={deleteOrderHandler} id={item._id}>
                                    Delete order
                                </button>
                            </ul>
                        );
                    })
                ) : (
                    <h1>There mo orders yet</h1>
                )}
            </div>
        );
    }

    return <p>There no orders yet</p>;
};
