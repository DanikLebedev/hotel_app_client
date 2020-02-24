import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { AdminContext } from '../../context/admin.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const AdminNavigation: React.FC = () => {
    const auth = useContext(AdminContext);
    const history = useHistory();
    const logoutHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
                <NavLink onClick={logoutHandler} to="/">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};
