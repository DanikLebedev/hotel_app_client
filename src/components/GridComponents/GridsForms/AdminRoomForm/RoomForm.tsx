import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import toaster from 'toasted-notes';
import { useHttp } from '../../../../hooks/http.hook';
import Loader from '../../../Loader/Loader';
import { CategoryService } from '../../../../APIServices/categoryService';
import { Category, Data, Room } from '../../../../interfaces/clientInterfaces';
import { Container } from 'react-bootstrap';
import '../../../../assets/rglstyles.css';
import '../../../../assets/resizablestyles.css';
import './RoomForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from '../../../../APIServices/roomService';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface RoomForm {
    closeModal: () => void;
    show: boolean;
    editProps: Room;
    isEdit: boolean;
}

export const RoomForm: React.FC<RoomForm> = (props: RoomForm) => {
    const { error, clearError } = useHttp();
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [roomForm, setRoomForm] = useState<Room>(props.editProps);
    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        if (props.isEdit) {
            const data: Data = await RoomService.updateRoom(formData);
            toaster.notify(data.message, {
                duration: 2000,
            });
        } else {
            const response: Response = await fetch('/api/admin/room', {
                method: 'POST',
                body: formData,
            });
            const data: Data = await response.json();
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
        props.closeModal();
    };

    const roomChangeHandler = (event: InputEvent): void => {
        setRoomForm({ ...roomForm, [event.target.name]: event.target.value });
    };

    const fileChangeHandler = (event: InputEvent): void => {
        if (event.target.files) {
            setRoomForm({ ...roomForm, [event.target.name]: event.target.files[0] });
        }
    };

    const selectRoomChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setRoomForm({ ...roomForm, category: event.target.value });
        console.log(roomForm);
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
        fetchCategories();
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
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [error, clearError, fetchCategories, props.isEdit, props.editProps]);

    if (!fetchedCategories[0]) {
        return <Loader />;
    }

    return (
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <form onSubmit={addRoomHandler} className="admin-form ">
                    <h3>create room</h3>
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
                    <label htmlFor="image">Add Image</label>
                    <input
                        type="file"
                        onChange={fileChangeHandler}
                        className={'form-control'}
                        name="image"
                        id="image"
                        defaultValue={roomForm.image}
                        placeholder="image"
                    />
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
                    {props.isEdit ? <input type="hidden" name="_id" value={roomForm._id} /> : null}
                    <button className="btn btn-primary mt-3">Add Room</button>
                </form>
                <button className={'close-button'} onClick={(): void => props.closeModal()}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        </Container>
    );
};
