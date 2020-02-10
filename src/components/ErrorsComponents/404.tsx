import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorComponents.scss'

const NotFound = () => (
    <div className='d-flex justify-content-center align-items-start not-found-page'>
         <Link  className={'button btn-black'} to="/">Return to Home Page</Link>
    </div>
);
export default NotFound;