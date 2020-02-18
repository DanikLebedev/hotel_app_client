import React, { ChangeEvent, useCallback, useContext, useEffect, useState, ReactPropTypes } from 'react';
import PropTypes from 'prop-types';
import toaster from 'toasted-notes';
import { useHttp } from '../../hooks/http.hook';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/auth.context';
import { CategoryService } from '../../APIServices/categoryService';
import { Category, Data, Room, Status } from '../../interfaces/clientInterfaces';
import { StatusService } from '../../APIServices/statusService';
import { EmployeeService } from '../../APIServices/employeeService';
import { Container } from 'react-bootstrap';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import './AdminPageCreate.scss';

type InputEvent = React.ChangeEvent<HTMLInputElement>;
interface AdminPageCreate {
    closeModal: () => void;
    show: boolean;
    editProps: Room;
    isEdit: boolean;
}

export const AdminPageCreate: React.FC<AdminPageCreate> = (props: AdminPageCreate) => {
    const auth = useContext(AuthContext);
    const { error, clearError } = useHttp();
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedStatuses, setFetchedStatuses] = useState<Status[]>([]);
    const [employeeForm, setEmployeeForm] = useState({});
    const [roomForm, setRoomForm] = useState<Room>(props.editProps);
    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        if (props.isEdit) {
            const response: Response = await fetch('/api/admin/room/update', {
                method: 'PUT',
                body: formData,
            });
            console.log(response);
            const data: Data = await response.json();
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
    };

    const addEmployeeHandler = async (): Promise<void> => {
        const data: Data = await EmployeeService.postEmployee(
            { ...employeeForm },
            {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        );
        toaster.notify(data.message, {
            duration: 2000,
        });
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

    const statusOptions = fetchedStatuses.map(({ title }) => {
        return (
            <option key={title} value={title}>
                {title}
            </option>
        );
    });

    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const fetchStatuses = useCallback(() => {
        StatusService.getAllStatuses().then(({ statuses }) => setFetchedStatuses(statuses));
    }, []);

    useEffect(() => {
        fetchCategories();
        if (props.isEdit) {
            setRoomForm(props.editProps);
        } else {
            setRoomForm({
                _id: '',
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
    }, [error, clearError, fetchCategories, props.isEdit]);

    if (!fetchedCategories[0] && !fetchedStatuses[0]) {
        return <Loader />;
    }

    return (
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <form onSubmit={addRoomHandler} className="admin-form ">
                    <h3>create room</h3>
                    <select
                        className={'form-control'}
                        onChange={selectRoomChangeHandler}
                        name="category"
                        id="categories"
                        value={roomForm.category}
                    >
                        {options}
                    </select>
                    <input
                        onChange={roomChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={roomForm.title}
                        name="title"
                        id="title"
                        placeholder="title"
                    />
                    <input
                        type="number"
                        onChange={roomChangeHandler}
                        className={'form-control'}
                        value={roomForm.price}
                        name="price"
                        id="price"
                        placeholder="price"
                    />
                    <input
                        type="number"
                        className={'form-control'}
                        onChange={roomChangeHandler}
                        value={roomForm.guests}
                        name="guests"
                        id="guests"
                        placeholder="guests"
                    />
                    <input
                        type="text"
                        className={'form-control'}
                        onChange={roomChangeHandler}
                        name="description"
                        id="description"
                        placeholder="description"
                        value={roomForm.description}
                    />
                    <input
                        type="file"
                        onChange={fileChangeHandler}
                        className={'form-control'}
                        name="image"
                        id="image"
                        defaultValue={roomForm.image}
                        placeholder="image"
                    />
                    <input
                        type="number"
                        className={'form-control'}
                        onChange={roomChangeHandler}
                        value={roomForm.rooms}
                        name="rooms"
                        id="rooms"
                        placeholder="rooms"
                    />
                    <input
                        type="number"
                        onChange={roomChangeHandler}
                        className={'form-control'}
                        value={roomForm.area}
                        name="area"
                        id="area"
                        placeholder="area"
                    />
                    <input type="hidden"  name='_id' value={roomForm._id}/>
                    <button className="btn btn-primary mt-3">Add Room</button>
                </form>
                <button onClick={() => props.closeModal()}>Close</button>
            </div>
            {/*<div className={'admin-form w-50'}>*/}
            {/*    <h3>create employee</h3>*/}
            {/*    {!statusOptions ? <Loader /> : null}*/}
            {/*    <input*/}
            {/*        onChange={employeeChangeHandler}*/}
            {/*        type="text"*/}
            {/*        className={'form-control'}*/}
            {/*        name="email"*/}
            {/*        id="email"*/}
            {/*        placeholder="email"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        onChange={employeeChangeHandler}*/}
            {/*        type="password"*/}
            {/*        className={'form-control'}*/}
            {/*        name="password"*/}
            {/*        id="password"*/}
            {/*        placeholder="password"*/}
            {/*    />*/}
            {/*    <select onChange={selectEmployeeChangeHandler} className={'form-control'} name="statuses" id="statuses">*/}
            {/*        {statusOptions}*/}
            {/*    </select>*/}
            {/*    <button className="btn btn-primary mt-3" onClick={addEmployeeHandler}>*/}
            {/*        Add employee*/}
            {/*    </button>*/}
            {/*</div>*/}
        </Container>
    );
};
