import React, { useCallback, useContext, useEffect, useState } from 'react';
import { OrderCart } from '../../../../interfaces/clientInterfaces';
import { OrderService } from '../../../../APIServices/orderService';
import { Pagination } from '../../../Pagination/Pagination';
import { IconButton } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import toaster from 'toasted-notes';
import { AdminOrderForm } from '../../GridsForms/AdminOrderForm/AdminOrderForm';
import { AdminContext } from '../../../../context/admin.context';

export const OrderDataGrid = () => {
    const orders = useContext(AdminContext).fetchedAllOrders;
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

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const editOrderHandler = (event: React.MouseEvent<EventTarget>) => {
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
        // setOrders(filteredOrders);
        const formData = new FormData();
        formData.append('_id', target.id);
        await OrderService.deleteAdminOrder(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addOrderHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                        <th>User Email</th>
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
                                      <td>{order.checkIn.split('T')[0]}</td>
                                      <td>{order.checkOut.split('T')[0]}</td>
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
            <AdminOrderForm isEdit={isEdit} closeModal={closeModal} editProps={editProps} show={showModal} />
            <Pagination
                postPerPage={postPerPage}
                totalPosts={orders.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};
