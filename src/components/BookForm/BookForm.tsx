import React, { useState } from 'react';
import './BookForm.scss';
import { Container } from 'react-bootstrap';

export const BookForm = () => {
    const [showForm, setShowForm] = useState(false);

    const ToggleFormHandler = () => {
        setShowForm(!showForm);
    };
    return (
        <div className={showForm ? 'fixed-form-wrapper fixed-form-active' : 'fixed-form-wrapper'}>
            <div className="toggle-fixed-form" onClick={ToggleFormHandler}></div>
            <div>
                <div className="booking-form">
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Check In</span>
                                    <input className="form-control" name={'checkIn'} type="date" required />
                                </div>
                                <span className="in-out hidden-xs hidden-sm">&#8652;</span>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Check out</span>
                                    <input className="form-control" name={'checkOut'} type="date" required />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-md-5">
                                <div className="form-btn">
                                    <button className="submit-btn">Check availability</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
