import { Container } from 'react-bootstrap';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Category, Data, OrderCart } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { CategoryService } from '../../../../APIServices/categoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../../../../APIServices/orderService';

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
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);

    const addOrderHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await OrderService.updateAdminOrder(JSON.stringify(orderForm), {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const data: Data = await OrderService.postOrder(orderForm, {
                'Content-Type': 'application/json',
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

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setOrderForm({ ...orderForm, [event.target.name]: event.target.value });
    };

    const options = fetchedCategories.map(({ title }, index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        );
    });

    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    useEffect(() => {
        if (props.isEdit) {
            setOrderForm(props.editProps);
        } else {
            setOrderForm({ category: '', checkIn: '', checkOut: '', orderId: '', status: '', userEmail: '' });
        }
        fetchCategories();
    }, [props.isEdit, props.editProps, fetchCategories]);

    return (
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>Order form</h3>
                    <label htmlFor="email">Customer Email</label>
                    <input
                        onChange={orderChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={orderForm.userEmail}
                        name="email"
                        id="email"
                        placeholder="xxx@xxx.xxx"
                    />
                    <label htmlFor="checkIn">Check In</label>
                    <input
                        onChange={orderChangeHandler}
                        type="date"
                        className={'form-control'}
                        value={orderForm.checkIn}
                        name="checkIn"
                        id="checkIn"
                    />
                    <label htmlFor="checkOut">Check Out</label>
                    <input
                        onChange={orderChangeHandler}
                        type="date"
                        className={'form-control'}
                        value={orderForm.checkOut}
                        name="checkOut"
                        id="checkOut"
                    />
                    <label htmlFor="status">Choose status</label>
                    <select name="status" className={'form-control'} onChange={selectChangeHandler} id="status">
                        <option value="completed">completed</option>
                        <option value="booked">booked</option>
                        <option value="canceled">canceled</option>
                    </select>
                    <label htmlFor="category">Choose category</label>
                    <select name="category" className={'form-control'} onChange={selectChangeHandler} id="category">
                        {options}
                    </select>
                    <button onClick={addOrderHandler} className="btn btn-primary mt-3">
                        {props.isEdit ? 'Update' : 'Create'} Order
                    </button>
                </div>
                <button className={'close-button'} onClick={() => props.closeModal()}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        </Container>
    );
};
