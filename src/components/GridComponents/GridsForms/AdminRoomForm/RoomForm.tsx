import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import toaster from 'toasted-notes';
import Loader from '../../../Loader/Loader';
import { Data, Room } from '../../../../interfaces/clientInterfaces';
import {  Col, Row } from 'react-bootstrap';
import '../../../../assets/rglstyles.css';
import '../../../../assets/resizablestyles.css';
import './RoomForm.scss';
import { RoomService } from '../../../../APIServices/roomService';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { AdminContext } from '../../../../context/admin.context';
import { handleClickOutside } from '../../../../sharedMethods/outsideClick';
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface RoomForm {
    closeModal: () => void;
    show: boolean;
    editProps: Room;
    isEdit: boolean;
    update: () => void;
}

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
}));

export const RoomForm: React.FC<RoomForm> = (props: RoomForm) => {
    const classes = useStyles();
    const fetchedCategories = useContext(AdminContext).fetchedCategories;
    const [roomForm, setRoomForm] = useState<Room>(props.editProps);
    const token = useContext(AdminContext).token;

    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        if (props.isEdit) {
            const data: Data = await RoomService.updateRoom(formData, {
                Authorization: `Bearer ${token}`,
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const response: Response = await fetch('/api/admin/room', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data: Data = await response.json();
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        }
        props.closeModal();
    };

    const roomChangeHandler = (event: InputEvent): void => {
        setRoomForm({ ...roomForm, [event.target.name]: event.target.value });
    };

    const fileChangeHandler = (event: InputEvent): void => {
        if (event.target.files) {
            setRoomForm({ ...roomForm, [event.target.name]: event.target.files[0].name });
        }
    };

    const selectRoomChangeHandler = (event: any): void => {
        setRoomForm({ ...roomForm, category: event.target.value });
    };

    const options = fetchedCategories.map(({ title }, index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        );
    });

    useEffect(() => {
        if (props.isEdit) {
            setRoomForm(props.editProps);
        } else {
            setRoomForm({
                area: 0,
                category: '',
                description: '',
                guests: 0,
                image: '',
                isBooked: false,
                price: 0,
                rooms: 0,
                title: '',
            });
        }
    }, [props.isEdit, props.editProps]);

    if (!fetchedCategories[0]) {
        return <Loader />;
    }

    return (
        <div
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-edit-room', props)}
            id={'overlay-edit-room'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form">
                    <form onSubmit={addRoomHandler}>
                        <h3>{props.isEdit ? 'Update' : 'Create'} room</h3>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                {' '}
                                <label htmlFor="categories">Choose Category</label>
                                <select
                                    className={'form-control'}
                                    onChange={selectRoomChangeHandler}
                                    name="category"
                                    id="categories"
                                    value={roomForm.category}
                                >
                                    {options}
                                </select>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="title">Enter the Title</label>
                                <input
                                    onChange={roomChangeHandler}
                                    type="text"
                                    className={'form-control'}
                                    value={roomForm.title}
                                    name="title"
                                    id="title"
                                    placeholder="title"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="price">Enter the Price</label>
                                <input
                                    type="number"
                                    onChange={roomChangeHandler}
                                    className={'form-control'}
                                    value={roomForm.price}
                                    name="price"
                                    id="price"
                                    placeholder="price"
                                />
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="guests">Enter number of guests</label>
                                <input
                                    type="number"
                                    className={'form-control'}
                                    onChange={roomChangeHandler}
                                    value={roomForm.guests}
                                    name="guests"
                                    id="guests"
                                    placeholder="guests"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="description">Input Description</label>
                                <input
                                    type="text"
                                    className={'form-control'}
                                    onChange={roomChangeHandler}
                                    name="description"
                                    id="description"
                                    placeholder="description"
                                    value={roomForm.description}
                                />
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="contained-button-file">
                                    Add photo
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={fileChangeHandler}
                                    name="image"
                                    defaultValue={roomForm.image}
                                    placeholder="image"
                                />
                                <span>{roomForm.image}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="rooms">Enter number of rooms</label>
                                <input
                                    type="number"
                                    className={'form-control'}
                                    onChange={roomChangeHandler}
                                    value={roomForm.rooms}
                                    name="rooms"
                                    id="rooms"
                                    placeholder="rooms"
                                />
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <label htmlFor="area">Enter the area</label>
                                <input
                                    type="number"
                                    onChange={roomChangeHandler}
                                    className={'form-control'}
                                    value={roomForm.area}
                                    name="area"
                                    id="area"
                                    placeholder="area"
                                />
                            </Col>
                        </Row>
                        {props.isEdit ? <input type="hidden" name="_id" value={roomForm._id} /> : null}
                        <Button type={'submit'} color="primary" variant="contained" className="mt-3">
                            {props.isEdit ? 'Update' : 'Create'} Room
                        </Button>
                    </form>
                    <button className="close-modal-button" onClick={(): void => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    );
};
