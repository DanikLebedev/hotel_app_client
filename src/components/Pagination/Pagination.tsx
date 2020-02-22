import React from 'react';
import { func, number } from 'prop-types';

interface Pagination {
    postPerPage: number;
    totalPosts: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

export const Pagination: React.FC<Pagination> = ({ postPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        <p onClick={() => paginate(number)} className="page-link">
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
};

Pagination.propTypes = {
    postPerPage: number.isRequired,
    totalPosts: number.isRequired,
    paginate: func.isRequired,
    currentPage: number.isRequired,
};
