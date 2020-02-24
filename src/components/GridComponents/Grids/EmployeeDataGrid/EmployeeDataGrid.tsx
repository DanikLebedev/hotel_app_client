import React, { useCallback, useEffect, useState } from 'react';
import { Employee } from '../../../../interfaces/clientInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import toaster from 'toasted-notes';
import { EmployeeService } from '../../../../APIServices/employeeService';
import { AdminEmployeeForm } from '../../GridsForms/AdminEmployeeForm/AdminEmployeeForm';
import { IconButton } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

export const EmployeeDataGrid = () => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editProps, setEditProps] = useState<Employee>({ email: '', password: '', status: '' });

    const closeModal = (): void => {
        setShowModal(false);
    };

    const fetchEmployee: CallableFunction = useCallback(() => {
        EmployeeService.getAllEmployee().then(({ employees }) => setEmployee(employees));
    }, []);

    useEffect(() => {
        fetchEmployee();
    }, [fetchEmployee]);

    const editEmployeeHandler = (event: React.MouseEvent<EventTarget>) => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredEmployees = employees.find(employee => {
            return employee._id === target.id;
        });
        if (filteredEmployees) {
            setEditProps({ ...filteredEmployees });
            setShowModal(true);
        }
    };

    const deleteEmployeeHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const filteredRooms = employees.filter(employee => {
            return employee._id !== target.id;
        });
        setEmployee(filteredRooms);
        const formData = new FormData();
        formData.append('_id', target.id);
        await EmployeeService.deleteEmployee(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addEmployeeHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>
                            Actions
                            <IconButton className={'icon-buttons'} onClick={addEmployeeHandler}>
                                <Add/>
                            </IconButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length
                        ? employees.map((employee, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{employee.email}</td>
                                      <td>{employee.status}</td>
                                      <td>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={employee._id}
                                              onClick={deleteEmployeeHandler}
                                          >
                                            <Delete color='error'/>
                                          </IconButton>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={employee._id}
                                              onClick={editEmployeeHandler}
                                          >
                                             <Edit color='primary'/>
                                          </IconButton>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            <AdminEmployeeForm closeModal={closeModal} show={showModal} editProps={editProps} isEdit={isEdit} />
        </div>
    );
};
