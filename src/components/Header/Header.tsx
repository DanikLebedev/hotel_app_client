import React from 'react';
import './Header.scss';
import Navigation from '../Navigation/Navigation';
import { Translation } from 'react-i18next';

const Header: React.FC = () => {
    return (
        <header>
            <Translation>
                {
                    (t, { i18n }) => <Navigation />
                }
            </Translation>
        </header>
    );
};

export default Header;
