import { Col, Container, Row } from 'react-bootstrap';
import React, { ChangeEvent, useContext, useEffect, useState, useCallback } from 'react';
import {Category, Data, OrderCart, Room} from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { CategoryService } from '../../../../APIServices/categoryService';
import { OrderService } from '../../../../APIServices/orderService';
import { handleClickOutside } from '../../../../sharedMethods/outsideClick';
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface AdminOrderForm {
    closeModal: () => void;
    show: boolean;
    editProps: OrderCart;
    isEdit: boolean;
    update: () => void;
}

export const AdminOrderForm: React.FC<AdminOrderForm> = (props: AdminOrderForm) => {
    const [orderForm, setOrderForm] = useState<OrderCart>(props.editProps);
    const fetchedRooms: Room[] = useContext(AdminContext).fetchedRooms;
    const fetchedCategories = useContext(AdminContext).fetchedCategories;
    const [categories, setCategories] = useState<Category[]>(fetchedCategories);
    const [roomTypes, setRoomTypes] = useState<Room[]>([])
    const token = useContext(AdminContext).token;

    const addOrderHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await OrderService.updateAdminOrder(JSON.stringify(orderForm), {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const data: Data = await OrderService.postAdminOrder(orderForm, {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });
            setOrderForm({
                orderId: '',
                status: '',
                userEmail: '',
                category: '',
                checkOut: '',
                checkIn: '',
                comment: '',
                guests: 0,
                userId: '',
                price: 0,
                title: '',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        }
        props.closeModal();
    };

    const orderChangeHandler = (event: InputEvent): void => {
        setOrderForm({ ...orderForm, [event.target.name]: event.target.value });
    };

    const onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setOrderForm({
            ...orderForm,
            [event.target.name]: event.target.value,
        });
    };

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        event.persist();
        const filteredByCategoryRooms = fetchedRooms.filter(room => room.category === event.target.value);
        setRoomTypes(filteredByCategoryRooms)
        setOrderForm({
            ...orderForm,
            [event.target.name]: event.target.value,
        });
    };

    const RoomTypeOptions = roomTypes.map(({title} , index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        )
    })

    const options = categories.map(({ title }, index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        );
    });

    const update = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setCategories(categories));
    }, []);

    useEffect(() => {
        if (props.isEdit) {
            setOrderForm(props.editProps);
        } else {
            setOrderForm({
                orderId: '',
                status: '',
                userEmail: '',
                category: '',
                checkOut: '',
                checkIn: '',
                comment: '',
                guests: 0,
                userId: '',
                price: 0,
                title: '',
            });
        }
        update();
    }, [props.isEdit, props.editProps, fetchedCategories, update]);

    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickOutside(event, 'overlay-edit-order', props)
            }
            id={'overlay-edit-order'}
            fluid={true}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>Order form</h3>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="category">Choose category</label>
                            <select
                                name="category"
                                className={'form-control'}
                                onChange={selectChangeHandler}
                                id="category"
                            >
                                {options}
                            </select>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="userEmail">Customer Email</label>
                            <input
                                onChange={orderChangeHandler}
                                type="text"
                                className={'form-control'}
                                value={orderForm.userEmail}
                                name="userEmail"
                                id="userEmail"
                                placeholder="xxx@xxx.xxx"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <label htmlFor="roomTitle">Choose type of room</label>
                            <select name="title" id="roomTitle" className={'form-control'}  value={orderForm.title} onChange={selectChangeHandler}>
                                {RoomTypeOptions}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="checkIn">Check In</label>
                            <input
                                onChange={orderChangeHandler}
                                type="date"
                                className={'form-control'}
                                value={orderForm.checkIn}
                                name="checkIn"
                                id="checkIn"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="checkOut">Check Out</label>
                            <input
                                onChange={orderChangeHandler}
                                type="date"
                                className={'form-control'}
                                value={orderForm.checkOut}
                                name="checkOut"
                                id="checkOut"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="guests">Guests</label>
                            <input
                                onChange={orderChangeHandler}
                                type="number"
                                className={'form-control'}
                                value={orderForm.guests}
                                name="guests"
                                id="guests"
                                placeholder="guests"
                            />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="price">Price</label>
                            <input
                                onChange={orderChangeHandler}
                                type="number"
                                className={'form-control'}
                                value={orderForm.price}
                                name="price"
                                id="price"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="status">Choose status</label>
                            <select
                                name="status"
                                value={orderForm.status}
                                className={'form-control'}
                                onChange={selectChangeHandler}
                                id="status"
                            >
                                <option value="completed">completed</option>
                                <option value="booked">booked</option>
                                <option value="canceled">canceled</option>
                            </select>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <label htmlFor="price">Comment</label>
                            <textarea
                                onChange={onChangeTextAreaHandler}
                                className={'form-control'}
                                name={'comment'}
                                placeholder="enter your wishes"
                                id={'comment'}
                                value={orderForm.comment}
                            />
                        </Col>
                    </Row>
                    <Button onClick={addOrderHandler} color="primary" variant="contained" className="mt-3">
                        {props.isEdit ? 'Update' : 'Create'} Order
                    </Button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
