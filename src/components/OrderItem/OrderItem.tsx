import React from 'react';
import { Order } from '../../interfaces/clientInterfaces';

interface OrderProps {
    key: number;
    order: Order;
    onDelete: (event: React.MouseEvent<EventTarget, MouseEvent>) => Promise<void>;
    classes: string[];
}
export const OrderItem: React.FC<OrderProps> = (props: OrderProps): JSX.Element => {
    return (
        <div className={props.classes.join(' ')}>
            <ul className="order-info">
                <li>Room&apos;s category: {props.order.category}</li>
                <li>Check In: {props.order.checkIn.split('T')[0]}</li>
                <li>Check Out: {props.order.checkOut.split('T')[0]}</li>
                <li>Number of Guests: {props.order.guests}</li>
                <li>Status: {props.order.status}</li>
                <li>Price: {props.order.price}$</li>
                <li>Wishes: {props.order.comment}</li>
            </ul>
            <button className={'button'} onClick={props.onDelete} id={props.order._id}>
                Delete order
            </button>
        </div>
    );
};
