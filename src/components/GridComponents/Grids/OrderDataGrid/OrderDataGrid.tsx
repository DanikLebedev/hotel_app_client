import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { OrderCart } from '../../../../interfaces/clientInterfaces';
import { OrderService } from '../../../../APIServices/orderService';
import { Pagination } from '../../../Pagination/Pagination';
import { IconButton, TextField } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import toaster from 'toasted-notes';
import { AdminOrderForm } from '../../GridsForms/AdminOrderForm/AdminOrderForm';
import { AdminContext } from '../../../../context/admin.context';
import { sortNumbersTypes } from '../../../../config';

export const OrderDataGrid: React.FC = () => {
    const fetchedOrders = useContext(AdminContext).fetchedAllOrders;
    const [orders, setOrders] = useState<OrderCart[]>(fetchedOrders);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<OrderCart>({
        category: '',
        checkIn: '',
        checkOut: '',
        orderId: '',
        status: '',
        userEmail: '',
    });
    const [search, setSearch] = useState('');
    const [inputName, setInputName] = useState('');
    const [currentSort, setCurrentSort] = useState<string>('default');
    const [field, setField] = useState('');

    const filteredOrders = (): OrderCart[] => {
        if (inputName === 'category-input') {
            return orders.filter(order => {
                return order.category.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'user-email-input') {
            return orders.filter(order => {
                return order.userEmail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'checkIn-input') {
            return orders.filter(order => {
                return order.checkIn.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'checkOut-input') {
            return orders.filter(order => {
                return order.checkOut.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else {
            return orders;
        }
    };

    function update(): void {
        OrderService.getAllOrders().then(({ ordercarts }) => setOrders(ordercarts));
    }

    const editOrderHandler = (event: React.MouseEvent<EventTarget>): void => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredOrders = orders.find(order => {
            return order._id === target.id;
        });
        if (filteredOrders) {
            setEditProps({ ...filteredOrders });
            setShowModal(true);
        }
    };

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        orders.filter(order => {
            return order._id !== target.id;
        });
        const formData = new FormData();
        formData.append('_id', target.id);
        await OrderService.deleteAdminOrder(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
        update();
    };

    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        setInputName(event.target.name);
    };

    const addOrderHandler = (): void => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const onSortChange = (field: string): void => {
        setField(field);
        let nextSort;
        if (currentSort === 'down') {
            nextSort = 'up';
            setCurrentSort(nextSort);
        } else if (currentSort === 'up') {
            nextSort = 'default';
            setCurrentSort(nextSort);
        } else if (currentSort === 'default') {
            nextSort = 'down';
            setCurrentSort(nextSort);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = filteredOrders()
        .sort(sortNumbersTypes(field)[currentSort].fn)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        update();
    }, [fetchedOrders]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>
                            <p>Category</p>
                            <TextField
                                id="standard-basic"
                                name="category-input"
                                onChange={dataSearch}
                                label=" Search by category"
                            />
                        </th>
                        <th>
                            <p>Check In</p>
                            <TextField
                                id="standard-basic"
                                name="checkIn-input"
                                onChange={dataSearch}
                                label="Search by checkIn"
                            />
                            <button className="sort-button" onClick={(): void => onSortChange('checkIn')}>
                                <i
                                    className={
                                        field === 'checkIn'
                                            ? `fas fa-${sortNumbersTypes('checkIn')[currentSort].class}`
                                            : 'fas fa-sort'
                                    }
                                />
                            </button>
                        </th>
                        <th>
                            <p>Check Out</p>
                            <TextField
                                id="standard-basic"
                                name="checkOut-input"
                                onChange={dataSearch}
                                label="Search by checkOut"
                            />
                            <button className="sort-button" onClick={(): void => onSortChange('checkOut')}>
                                <i
                                    className={
                                        field === 'checkOut'
                                            ? `fas fa-${sortNumbersTypes('checkOut')[currentSort].class}`
                                            : 'fas fa-sort'
                                    }
                                />
                            </button>
                        </th>
                        <th>
                            <p>Status</p>
                            <TextField
                                id="standard-basic"
                                name="status-input"
                                onChange={dataSearch}
                                label=" Search by status"
                            />
                        </th>
                        <th>
                            <p>User Email</p>
                            <TextField
                                id="standard-basic"
                                name="user-email-input"
                                onChange={dataSearch}
                                label=" Search by user email"
                            />
                        </th>
                        <th>
                            Actions
                            <IconButton className={'icon-buttons'} onClick={addOrderHandler}>
                                <Add />
                            </IconButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length
                        ? currentPosts.map((order, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{order.category}</td>
                                      <td>{new Date(order.checkIn).toLocaleDateString()}</td>
                                      <td>{new Date(order.checkOut).toLocaleDateString()}</td>
                                      <td>{order.status}</td>
                                      <td>{order.userEmail}</td>
                                      <td>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={order._id}
                                              onClick={deleteOrderHandler}
                                          >
                                              <Delete color="error" />
                                          </IconButton>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={order._id}
                                              onClick={editOrderHandler}
                                          >
                                              <Edit color="primary" />
                                          </IconButton>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            <AdminOrderForm
                update={update}
                isEdit={isEdit}
                closeModal={closeModal}
                editProps={editProps}
                show={showModal}
            />
            <Pagination
                postPerPage={postPerPage}
                totalPosts={orders.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};
