import React from 'react';
import './Header.scss';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
    return (
        <header>
            <Navigation />
        </header>
    );
};

export default Header;
