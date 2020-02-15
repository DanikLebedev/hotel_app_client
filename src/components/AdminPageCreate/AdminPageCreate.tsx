import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import toaster from 'toasted-notes';
import { useHttp } from '../../hooks/http.hook';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/auth.context';
import { CategoryService } from '../../APIServices/categoryService';
import { Category, Data, Status } from '../../interfaces/clientInterfaces';
import { StatusService } from '../../APIServices/statusService';
import { EmployeeService } from '../../APIServices/employeeService';
import { Container } from 'react-bootstrap';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import './AdminPageCreate.scss';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const AdminPageCreate: React.FC = () => {
    const auth = useContext(AuthContext);
    const { error, clearError } = useHttp();
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [fetchedStatuses, setFetchedStatuses] = useState<Status[]>([]);
    const [employeeForm, setEmployeeForm] = useState({});

    const addRoomHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        const response: Response = await fetch('/api/admin/room', {
            method: 'POST',
            body: formData,
        });
        const data: Data = await response.json();
        toaster.notify(data.message, {
            duration: 2000,
        });
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

    const employeeChangeHandler = (event: InputEvent): void => {
        setEmployeeForm({ ...employeeForm, [event.target.name]: event.target.value });
    };

    const selectEmployeeChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setEmployeeForm({ ...employeeForm, status: event.target.value });
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
        fetchStatuses();
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [error, clearError, fetchCategories, fetchStatuses]);

    if (!fetchedCategories[0] && !fetchedStatuses[0]) {
        return <Loader />;
    }

    return (
        <Container>
            <div key={1} className="d-flex justify-content-around align-items-center mt-3 ">
                <form onSubmit={addRoomHandler} className="admin-form ">
                    <h3>create room</h3>
                    <select className={'form-control'} name="category" id="categories">
                        {options}
                    </select>
                    <input type="text" className={'form-control'} name="title" id="title" placeholder="title" />
                    <input type="number" className={'form-control'} name="price" id="price" placeholder="price" />
                    <input type="number" className={'form-control'} name="guests" id="guests" placeholder="guests" />
                    <input
                        type="text"
                        className={'form-control'}
                        name="description"
                        id="description"
                        placeholder="description"
                    />
                    <input type="file" className={'form-control'} name="image" id="image" placeholder="image" />
                    <input type="number" className={'form-control'} name="rooms" id="rooms" placeholder="rooms" />
                    <input type="number" className={'form-control'} name="area" id="area" placeholder="area" />
                    <button className="btn btn-primary mt-3">Add Room</button>
                </form>
            </div>
            <div className={'admin-form w-50'}>
                <h3>create employee</h3>
                {!statusOptions ? <Loader /> : null}
                <input
                    onChange={employeeChangeHandler}
                    type="text"
                    className={'form-control'}
                    name="email"
                    id="email"
                    placeholder="email"
                />
                <input
                    onChange={employeeChangeHandler}
                    type="password"
                    className={'form-control'}
                    name="password"
                    id="password"
                    placeholder="password"
                />
                <select onChange={selectEmployeeChangeHandler} className={'form-control'} name="statuses" id="statuses">
                    {statusOptions}
                </select>
                <button className="btn btn-primary mt-3" onClick={addEmployeeHandler}>
                    Add employee
                </button>
            </div>
        </Container>
    );
};
