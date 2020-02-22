import { Container } from 'react-bootstrap';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Data, Employee, Status } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { CategoryService } from '../../../../APIServices/categoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { StatusService } from '../../../../APIServices/statusService';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface AdminEmployeeForm {
    closeModal: () => void;
    show: boolean;
    editProps: Employee;
    isEdit: boolean;
}

export const AdminEmployeeForm: React.FC<AdminEmployeeForm> = (props: AdminEmployeeForm) => {
    const [employeeForm, setEmployeeForm] = useState<Employee>(props.editProps);
    const [statuses, setStatuses] = useState<Status[]>([]);

    const addEmployeeHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await CategoryService.updateCategory(JSON.stringify(employeeForm), {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
        } else {
            const data: Data = await CategoryService.postCategory(employeeForm, {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
        props.closeModal();
    };
    const fetchStatuses: CallableFunction = useCallback(() => {
        StatusService.getAllStatuses().then(({ statuses }) => setStatuses(statuses));
    }, []);

    const employeeChangeHandler = (event: InputEvent): void => {
        setEmployeeForm({ ...employeeForm, [event.target.name]: event.target.value });
    };

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setEmployeeForm({ ...employeeForm, [event.target.name]: event.target.value });
    };

    const statusOptions = statuses.map(({ title }, key) => {
        return (
            <option key={key} value={title}>
                {title}
            </option>
        );
    });

    useEffect(() => {
        if (props.isEdit) {
            setEmployeeForm(props.editProps);
        } else {
            setEmployeeForm({ email: '', password: '', status: '' });
        }
        fetchStatuses();
    }, [props.isEdit, props.editProps, fetchStatuses]);
    return (
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>room form</h3>
                    <label htmlFor="email">Enter the Title</label>
                    <input
                        onChange={employeeChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={employeeForm.email}
                        name="email"
                        id="email"
                        placeholder="xxx@xxx.xxx"
                    />
                    <label htmlFor="email">Enter the Password</label>
                    <input
                        onChange={employeeChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={employeeForm.password}
                        name="password"
                        id="password"
                        placeholder="password"
                        disabled={props.isEdit}
                    />
                    <label htmlFor="status">Choose status</label>
                    <select name="status" className={'form-control'} onChange={selectChangeHandler} id="status">
                        {statusOptions}
                    </select>
                    <button onClick={addEmployeeHandler} className="btn btn-primary mt-3">
                        Add Category
                    </button>
                </div>
                <button className={'close-button'} onClick={() => props.closeModal()}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        </Container>
    );
};
