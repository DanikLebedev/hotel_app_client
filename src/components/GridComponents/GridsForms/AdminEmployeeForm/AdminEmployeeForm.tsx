import { Container } from 'react-bootstrap';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Data, Employee, Status } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { StatusService } from '../../../../APIServices/statusService';
import { EmployeeService } from '../../../../APIServices/employeeService';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../ErrorsComponents/ErrorMessage';
import { Close } from '@material-ui/icons';
import { handleClickOutside } from '../../../../sharedMethods/outsideClick';
import { Button } from '@material-ui/core';


type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface AdminEmployeeForm {
    closeModal: () => void;
    show: boolean;
    editProps: Employee;
    isEdit: boolean;
    update: () => void;
}

interface AdminEmployeeFormData {
    email: string;
    password: string;
    status: string;
}

export const AdminEmployeeForm: React.FC<AdminEmployeeForm> = (props: AdminEmployeeForm) => {
    const [employeeForm, setEmployeeForm] = useState<Employee>(props.editProps);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const { register, handleSubmit, errors } = useForm<AdminEmployeeFormData>();

    const addEmployeeHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await EmployeeService.updateEmployee(JSON.stringify(employeeForm), {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const data: Data = await EmployeeService.updateEmployee(employeeForm, {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
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
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickOutside(event, 'overlay-edit-employee', props)
            }
            id={'overlay-edit-employee'}
            fluid={true}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>Employee form</h3>
                    <label htmlFor="employee-email">Enter the Title</label>
                    <input
                        onChange={employeeChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={employeeForm.email}
                        name="email"
                        id="employee-email"
                        placeholder="xxx@xxx.xxx"
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
                    <ErrorMessage error={errors.email} type={'error'} />
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
                        ref={register({ required: true })}
                    />
                    <ErrorMessage error={errors.password} type={'error'} />
                    <label htmlFor="status">Choose status</label>
                    <select
                        ref={register({ required: true })}
                        name="status"
                        className={'form-control'}
                        onChange={selectChangeHandler}
                        id="status"
                    >
                        {statusOptions}
                    </select>
                    <ErrorMessage error={errors.password} type={'error'} />
                    <Button onClick={handleSubmit(addEmployeeHandler)} color="primary" variant="contained" className="mt-3">
                        {props.isEdit ? 'Update' : 'Create'} Employee
                    </Button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
