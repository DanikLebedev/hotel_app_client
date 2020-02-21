import React, { useState } from 'react';
import './FindRoomForm.scss';
import { Container } from 'react-bootstrap';

export const FindRoomForm = () => {
    const [showForm, setShowForm] = useState(false);

    const ToggleFormHandler = () => {
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
                    <select name="" id="">
                        <option value="">asd</option>
                        <option value="">asd</option>
                        <option value="">asd</option>
                        <option value="">asd</option>
                    </select>
                    <button>Check rooms</button>
                </div>
            </div>
        </div>
    );
};
