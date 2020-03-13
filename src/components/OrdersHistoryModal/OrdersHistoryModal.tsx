import React, { useState } from 'react';
import { Container,Table } from 'react-bootstrap';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close } from '@material-ui/icons';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { Pagination } from '../Pagination/Pagination';
import { Tooltip } from '@material-ui/core';
import { sortNumbersTypes } from '../../config';

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
    const [field, setField] = useState('');
    const [currentSort, setCurrentSort] = useState<string>('default');

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
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

    const currentPosts: OrderCart[] = props.data
        .sort(sortNumbersTypes(field)[currentSort].fn)
        .slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-history', props)}
            fluid={true}
            id={'overlay-history'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form">
                    <h3>Orders history</h3>
                    <div className="grid-table-wrapper">
                        <Table responsive='sm' className="m-3 order-page-history">
                            <thead>
                                <tr>
                                    <th><p>Category</p></th>
                                    <th>
                                        <p>Check In</p>
                                        <Tooltip title={'Sort'}>
                                            <button className="sort-button" onClick={() => onSortChange('checkIn')}>
                                                <i
                                                    className={
                                                        field === 'approved'
                                                            ? `fas fa-${sortNumbersTypes('checkIn')[currentSort].class}`
                                                            : 'fas fa-sort'
                                                    }
                                                />
                                            </button>
                                        </Tooltip>
                                    </th>
                                    <th>
                                        <p>Check Out</p>
                                        <Tooltip title={'Sort'}>
                                            <button className="sort-button" onClick={() => onSortChange('checkOut')}>
                                                <i
                                                    className={
                                                        field === 'approved'
                                                            ? `fas fa-${
                                                                  sortNumbersTypes('checkOut')[currentSort].class
                                                              }`
                                                            : 'fas fa-sort'
                                                    }
                                                />
                                            </button>
                                        </Tooltip>
                                    </th>
                                    <th><p>Status</p></th>
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
                        </Table>
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
