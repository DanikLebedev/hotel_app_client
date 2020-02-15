import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

export const AdminNavigation: React.FC = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item className={'mr-2'}>
                <NavLink to="/admin/info">Info</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/admin/create">Add content</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink onClick={logoutHandler} to="/">
                    Logout
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};
