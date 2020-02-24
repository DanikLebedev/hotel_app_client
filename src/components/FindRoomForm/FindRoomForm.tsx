import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './FindRoomForm.scss';
import { Category, OrderCart, OrderCarts, Room } from '../../interfaces/clientInterfaces';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { FormControl, InputLabel, MenuItem, makeStyles, Select } from '@material-ui/core';
import { OrderService } from '../../APIServices/orderService';

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

export const FindRoomForm = () => {
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [findRoomForm, setFindRoomForm] = useState({
        checkIn: '',
        checkOut: '',
        category: '',
    });
    const { error, clearError } = useHttp();
    const history = useHistory();
    const selectOrderChangeHandler = (event: any): void => {
        setFindRoomForm({ ...findRoomForm, [event.target.name]: event.target.value });
        // event.persist();
        //         // const { rooms }: Rooms = await RoomService.getAllRooms();
        //         // const filteredRooms: Room[] = rooms.filter(item => {
        //         //     return item.category.toString() === event.target.value.toString();
        //         // });
        //         // setFilteredRooms(filteredRooms);
    };

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const addOrderHandler = async (): Promise<void> => {
        const { ordercarts }: OrderCarts = await OrderService.getAllOrders();
        const filteredOrders = ordercarts.filter(order => {
            return (
                order.category === findRoomForm.category &&
                Date.parse(order.checkOut) > Date.parse(findRoomForm.checkIn)
            );
        });
        if (filteredOrders.length === 0) {
            toaster.notify('sorry all rooms are booked', {
                duration: 2000,
            });
        }
        history.push(`/searchRooms`, {
            category: filteredOrders[0].category,
        });
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

    useEffect(() => {
        fetchCategories();
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [fetchCategories, error, clearError]);

    const ToggleFormHandler = (): void => {
        setShowForm(!showForm);
    };
    return (
        <div className={showForm ? 'fixed-form-wrapper fixed-form-active' : 'fixed-form-wrapper'}>
            <div className="toggle-fixed-form" onClick={ToggleFormHandler}>
                Book Room
            </div>
            <div>
                <div className="find-room-form">
                    <label htmlFor={'checkIn'}>CheckIn</label>
                    <input type="date" id="checkIn" onChange={changeDateOrderHandler} name="checkIn" />
                    <label htmlFor={'checkOut'}>CheckOut</label>
                    <input type="date" id="checkIn" onChange={changeDateOrderHandler} name="checkOut" />
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
                    <button onClick={addOrderHandler}>Check rooms</button>
                </div>
            </div>
        </div>
    );
};
