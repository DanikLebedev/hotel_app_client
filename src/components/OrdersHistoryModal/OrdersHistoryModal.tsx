import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { handleClickOutside } from '../../hooks/outsideClick.hook';
import { Button, DialogContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Category, OrderCart } from '../../interfaces/clientInterfaces';
import { Pagination } from '../Pagination/Pagination';

interface OrdersHistoryModal {
    closeModal: () => void;
    show: boolean;
    data: OrderCart[];
}

export const OrdersHistoryModal: React.FC<OrdersHistoryModal> = (props: OrdersHistoryModal) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage] = useState<number>(4);
    const indexOfLastPost: number = currentPage * postPerPage;
    const indexOfFirstPost: number = indexOfLastPost - postPerPage;
    const currentPosts: OrderCart[] = props.data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickOutside(event, 'overlay-history', props)
            }
            fluid={true}
            id={'overlay-history'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form">
                    <h3>Orders history</h3>
                    <div className="grid-table-wrapper">
                        <table className="m-3 grid-table order-page-history">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Status</th>
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
                                              </tr>
                                          );
                                      })
                                    : null}
                            </tbody>
                        </table>
                        <Pagination
                            postPerPage={postPerPage}
                            totalPosts={props.data.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
