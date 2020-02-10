import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Order } from '../../interfaces/clientInterfaces';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../../context/auth.context';

export const OrderPage = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders = useCallback(async () => {
        const { orders } = await OrderService.getUserOrders({ Authorization: `Bearer ${auth.token}` });
        setOrders(orders);
    }, [auth.token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    console.log(orders);

    if (orders) {
        return (
            <div>
                {orders.map((item, key) => {
                    return (
                        <ul key={key}>
                            <li>{item.category}</li>
                            <li>{item.checkIn}</li>
                            <li>{item.checkOut}</li>
                            <li>{item.guests}</li>
                            <button id={item._id}>Delete order</button>
                        </ul>
                    );
                })}
            </div>
        );
    }

    return <p>There no orders yet</p>;
};
