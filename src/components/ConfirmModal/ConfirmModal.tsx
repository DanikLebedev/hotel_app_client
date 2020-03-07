import React from 'react';
import { Container } from 'react-bootstrap';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close, Send, CalendarTodayOutlined, List, MoneyRounded, Comment } from '@material-ui/icons';
import { Order} from '../../interfaces/clientInterfaces';

interface ConfirmModal {
    show: boolean;
    addOrder: () => Promise<void>;
    order: Order;
    closeModal: () => void;
}

export const ConfirmModal: React.FC<ConfirmModal> = (props: ConfirmModal) => {
    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-feedback', props)}
            fluid={true}
            id={'overlay-feedback'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form">
                    <h3>Confirm your Data</h3>
                    <ul>
                        <li>
                            <CalendarTodayOutlined /> Check In: {props.order.checkIn}
                        </li>
                        <li>
                            <CalendarTodayOutlined /> Check Out: {props.order.checkOut}
                        </li>
                        <li>
                            <List /> Category: {props.order.category}
                        </li>
                        <li>
                            <MoneyRounded /> Price: {props.order.price}$
                        </li>
                        <li>
                            <Comment /> Comment: {props.order.comment}
                        </li>
                    </ul>
                    <button onClick={props.addOrder} className={'button btn-black'}>
                        Add order <Send />
                    </button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
