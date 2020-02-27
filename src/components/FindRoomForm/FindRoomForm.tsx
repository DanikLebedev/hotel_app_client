import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import './FindRoomForm.scss';
import { Category, OrderCart, OrderCarts } from '../../interfaces/clientInterfaces';
import { useHistory } from 'react-router-dom';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { FormControl, InputLabel, MenuItem, makeStyles, Select } from '@material-ui/core';
import { OrderService } from '../../APIServices/orderService';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../ErrorsComponents/ErrorMessage';
import { ClientContext } from '../../context/client.context';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: '#c6a47e',
        },
        '&:after': {
            borderColor: '#c6a47e',
        },
    },
    label: {
        color: '#c6a47e',
    },
}));

interface FindRoomFormData {
    checkIn: string;
    checkOut: string;
    category: string;
}

export const FindRoomForm: React.FC = ({ t }: any) => {
    const { register, handleSubmit, errors } = useForm<FindRoomFormData>();
    const auth = useContext(ClientContext).isAuthenticated;
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);
    const fetchedCategories = useContext(ClientContext).fetchedCategories;
    const [findRoomForm, setFindRoomForm] = useState({
        checkIn: '',
        checkOut: '',
        category: '',
    });
    const history = useHistory();
    const selectOrderChangeHandler = (event: any): void => {
        setFindRoomForm({ ...findRoomForm, [event.target.name]: event.target.value });
    };

    const CheckRoomHandler = async (): Promise<void> => {
        if (auth) {
            const { ordercarts }: OrderCarts = await OrderService.getAllOrders();
            const bookedOrders: OrderCart[] = ordercarts.filter(order => {
                return (
                    order.category === findRoomForm.category &&
                    Date.parse(order.checkOut) > Date.parse(findRoomForm.checkIn) &&
                    order.status === 'booked'
                );
            });
            const filteredByCategoryOrders: OrderCart[] = ordercarts.filter(order => {
                return order.category === findRoomForm.category;
            });
            if (bookedOrders.length !== 0) {
                toaster.notify('sorry all rooms are booked', {
                    duration: 2000,
                });
            } else {
                history.push(`/searchRooms`, {
                    category: filteredByCategoryOrders[0].category,
                });
            }
        } else {
            history.push('/auth');
        }
    };
    const changeDateOrderHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFindRoomForm({ ...findRoomForm, [event.target.name]: event.target.value });
    };

    const options: JSX.Element[] = fetchedCategories.map(({ title }, index) => {
        return (
            <MenuItem key={title + index} value={title}>
                {title}
            </MenuItem>
        );
    });

    const ToggleFormHandler = (): void => {
        setShowForm(!showForm);
    };
    return (
        <div className={showForm ? 'fixed-form-wrapper fixed-form-active' : 'fixed-form-wrapper'}>
            <div className="toggle-fixed-form" onClick={ToggleFormHandler}>
                {t('book-room.label')}
            </div>
            <div>
                <div className="find-room-form">
                    <label htmlFor={'checkIn'}>Check In</label>
                    <input
                        ref={register({ required: true })}
                        type="date"
                        id="checkIn"
                        onChange={changeDateOrderHandler}
                        name="checkIn"
                    />
                    <ErrorMessage error={errors.checkIn} type={'error'} />
                    <label htmlFor={'checkOut'}>Check Out</label>
                    <input
                        ref={register({ required: true })}
                        type="date"
                        id="checkIn"
                        onChange={changeDateOrderHandler}
                        name="checkOut"
                    />
                    <ErrorMessage error={errors.checkOut} type={'error'} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" className={classes.label}>
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={'category'}
                            className={classes.select}
                            value={findRoomForm.category}
                            onChange={selectOrderChangeHandler}
                        >
                            {options}
                        </Select>
                    </FormControl>
                    <button onClick={handleSubmit(CheckRoomHandler)}>Check rooms</button>
                </div>
            </div>
        </div>
    );
};

export default withTranslation()(FindRoomForm);
