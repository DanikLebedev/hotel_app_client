import React, { useCallback, useEffect, useState } from 'react';
import { OrderCart } from '../../../../interfaces/clientInterfaces';
import { OrderService } from '../../../../APIServices/orderService';
import { Pagination } from '../../../Pagination/Pagination';

export const OrderDataGrid = () => {
    const [orders, setOrders] = useState<OrderCart[]>([]);
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

    const fetchOrders: CallableFunction = useCallback(() => {
        OrderService.getAllOrders().then(({ ordercarts }) => {
            setOrders(ordercarts);
        });
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders, orders]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>category</th>
                        <th>checkIn</th>
                        <th>checkOut</th>
                        <th>status</th>
                        <th>userEmail</th>
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
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            <Pagination
                postPerPage={postPerPage}
                totalPosts={orders.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};
