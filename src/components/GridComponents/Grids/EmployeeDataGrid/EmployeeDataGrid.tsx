import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Employee } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { EmployeeService } from '../../../../APIServices/employeeService';
import { AdminEmployeeForm } from '../../GridsForms/AdminEmployeeForm/AdminEmployeeForm';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';
import { Pagination } from '../../../Pagination/Pagination';
import { ConfirmDeleteModal } from '../../../ConfirmDeleteModal/ConfirmDeleteModal';

export const EmployeeDataGrid = () => {
    const fetchedEmployees = useContext(AdminContext).fetchedAllEmployee;
    const token = useContext(AdminContext).token;
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editProps, setEditProps] = useState<Employee>({ email: '', password: '', status: '' });
    const [search, setSearch] = useState('');
    const [inputName, setInputName] = useState('');
    const [employees, setEmployees] = useState<Employee[]>(fetchedEmployees);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [targetId, setTargetId] = useState<string>('');

    const displayConfirmModal = (event: React.MouseEvent<EventTarget>) => {
        const target = event.target as HTMLButtonElement;
        setTargetId(target.id);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    function update(): void {
        EmployeeService.getAllEmployee().then(({ employees }) => setEmployees(employees));
    }

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

    const deleteEmployeeHandler = async (): Promise<void> => {
        employees.filter(employee => {
            return employee._id !== targetId;
        });
        const formData = new FormData();
        formData.append('_id', targetId);
        await EmployeeService.deleteEmployee(formData, { Authorization: `Bearer ${token}` }).then(data => {
            update();
            setShowConfirmModal(false);
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        setInputName(event.target.name);
    };

    const filteredEmployee = (): Employee[] => {
        if (inputName === 'email-input') {
            return employees.filter(item => {
                return item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'status-input') {
            return employees.filter(item => {
                return item.status.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else {
            return employees;
        }
    };

    const addEmployeeHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentEmployee = filteredEmployee().slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        update();
    }, [fetchedEmployees]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>
                            <p>Email</p>
                            <TextField id="standard-basic" name="email-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>Status</p> <TextField id="standard-basic" name="status-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>Actions</p>
                            <Tooltip title={'Add'}>
                                <IconButton className={'icon-buttons'} onClick={addEmployeeHandler}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployee.length
                        ? currentEmployee.map((employee, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{employee.email}</td>
                                      <td>{employee.status}</td>
                                      <td>
                                          <Tooltip title={'Delete'}>
                                              <IconButton
                                                  className={'icon-buttons'}
                                                  id={employee._id}
                                                  onClick={displayConfirmModal}
                                              >
                                                  <Delete color="error" />
                                              </IconButton>
                                          </Tooltip>
                                          <Tooltip title={'Edit'}>
                                              <IconButton
                                                  className={'icon-buttons'}
                                                  id={employee._id}
                                                  onClick={editEmployeeHandler}
                                              >
                                                  <Edit color="primary" />
                                              </IconButton>
                                          </Tooltip>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            <ConfirmDeleteModal
                show={showConfirmModal}
                id={targetId}
                onDelete={deleteEmployeeHandler}
                closeModal={closeConfirmModal}
            />
            <Pagination
                postPerPage={postPerPage}
                totalPosts={fetchedEmployees.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <AdminEmployeeForm
                update={update}
                closeModal={closeModal}
                show={showModal}
                editProps={editProps}
                isEdit={isEdit}
            />
        </div>
    );
};
