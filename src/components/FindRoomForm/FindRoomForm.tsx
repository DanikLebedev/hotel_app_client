import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './FindRoomForm.scss';
import { Category, Room, Rooms } from '../../interfaces/clientInterfaces';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { RoomService } from '../../APIServices/roomService';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';

export const FindRoomForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const { error, clearError } = useHttp();
    const history = useHistory();
    const selectOrderChangeHandler = async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        event.persist();
        const { rooms }: Rooms = await RoomService.getAllRooms();
        const filteredRooms: Room[] = rooms.filter(item => {
            return item.category.toString() === event.target.value.toString();
        });
        setFilteredRooms(filteredRooms);
    };

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const addOrderHandler = async (): Promise<void> => {
        history.push(`/rooms/${filteredRooms[0]._id}`, {
            rooms: filteredRooms,
        });
    };

    const options: JSX.Element[] = fetchedCategories.map(({ title }, index) => {
        return (
            <option className={'form-control'} key={title + index} value={title}>
                {title}
            </option>
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
                    <input type="date" id="checkIn" name="checkIn" />
                    <label htmlFor={'checkOut'}>CheckOut</label>
                    <input type="date" id="checkIn" name="checkOut" />
                    <select onChange={selectOrderChangeHandler} name="category" id="category">
                        {options}
                    </select>
                    <button onClick={addOrderHandler}>Check rooms</button>
                </div>
            </div>
        </div>
    );
};
