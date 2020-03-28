import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { AdminContext } from '../../context/admin.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faChartLine, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';


export const AdminNavigation: React.FC = () => {
    const auth: AdminContext = useContext(AdminContext);
    const history = useHistory();
    const logoutHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        auth.logoutUser();
        history.push('/');
    };

    return (
        <Nav className="justify-content-center flex-column" activeKey="/admin/home">
            <Nav.Item>
                <NavLink to="/admin/home">
                    <FontAwesomeIcon color={'#fff'} icon={faHome} /> Home
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/admin/charts">
                    <FontAwesomeIcon color={'#fff'} icon={faChartLine} /> Charts
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/admin/edit">
                    <FontAwesomeIcon color={'#fff'} icon={faEdit} /> Edit
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink onClick={logoutHandler} to="/">
                    <FontAwesomeIcon color={'#fff'} icon={faSignOutAlt} /> Logout
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};
