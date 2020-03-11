import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorComponents.scss';

const NotFound: React.FC = (): JSX.Element => (
    <>
        <div className="order-page-bg" />
        <div className="d-flex justify-content-center align-items-start not-found-page">
            <Link className={'button btn-black mt-3'} to="/">
                Return to Home Page
            </Link>
        </div>
    </>
);
export default NotFound;
