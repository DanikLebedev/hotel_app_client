import React from 'react'
import { Nav } from 'react-bootstrap'
import {NavLink} from "react-router-dom";

export const AdminNavigation = () => {
    return (
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item className={'mr-2'}>
                <NavLink to="/admin/info">Info</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to='/admin/create'>Add content</NavLink>
            </Nav.Item>
        </Nav>
    )
}