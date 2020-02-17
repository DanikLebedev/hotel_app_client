import React from 'react';
import { Order } from '../../interfaces/clientInterfaces';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

interface OrderProps {
    key: number;
    order: Order;
    onDelete: (event: React.MouseEvent<EventTarget, MouseEvent>) => Promise<void>;
    classes: string[];
    deleted: boolean;
}
export const OrderItem: React.FC<OrderProps> = (props: OrderProps): JSX.Element => {
    return (
        <Card
            className={props.deleted ? 'order-item deleted-order' : 'order-item'}
            bg="dark"
            text="white"
            style={{ width: '18rem' }}
        >
            <Card.Header>Order №{props.order._id}</Card.Header>
            <Card.Body>
                <Card.Title>Room&apos;s category: {props.order.category}</Card.Title>
                <Card.Text>Check In: {props.order.checkIn.split('T')[0]}</Card.Text>
                <Card.Text>Check Out: {props.order.checkOut.split('T')[0]}</Card.Text>
                <Card.Text>Number of Guests: {props.order.guests}</Card.Text>
                <Card.Text>Status: {props.order.status}</Card.Text>
                <Card.Text>Price: {props.order.price}</Card.Text>
                <Card.Text>Wishes: {props.order.comment}</Card.Text>

                <Button variant="light" id={props.order._id} onClick={props.onDelete}>
                    Delete Order
                </Button>
            </Card.Body>
        </Card>
    );
};
