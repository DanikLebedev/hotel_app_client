import React from 'react';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { Delete } from '@material-ui/icons';

interface OrderProps {
    key: number;
    order: OrderCart;
    onDelete: (event: React.MouseEvent<EventTarget, MouseEvent>) => Promise<void>;
    classes: string[];
}
export const OrderItem: React.FC<OrderProps> = (props: OrderProps): JSX.Element => {
    return (
        <div className={props.classes.join(' ')}>
            <ul className="order-info">
                <li>Room&apos;s category: {props.order.category}</li>
                <li>Check In: {new Date(props.order.checkIn).toLocaleDateString()}</li>
                <li>Check Out: {new Date(props.order.checkOut).toLocaleDateString()}</li>
                <li>Number of Guests: {props.order.guests}</li>
                <li>Status: {props.order.status}</li>
                <li>Price: {props.order.price}$</li>
                <li>Wishes: {props.order.comment}</li>
            </ul>
            <button className={'button'} onClick={props.onDelete} id={props.order._id}>
                Delete order <Delete />
            </button>
        </div>
    );
};
