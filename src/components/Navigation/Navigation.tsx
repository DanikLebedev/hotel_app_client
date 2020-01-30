import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import './Navigation.scss'
import {Navbar, NavbarBrand, Nav, Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

const Navigation = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const isAuthenticated = auth.isAuthenticated;
    const logoutHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    const authComponents = (
        <>
            <NavLink to='/orders'>
                <li>orders</li>
            </NavLink>
            <NavLink to='/admin'>
                <li>admin</li>
            </NavLink>
        </>

    )

    return (
        <Container>
            <Row className='pt-3'>
                <Col md={6}>
                    <ul className='d-flex justify-content-between'>
                        <li>
                            <p>Email</p>
                            <p>hotel@mail.ru</p>
                        </li>
                        <li>
                            <p>Phone</p>
                            <p>+39752180</p>
                        </li>
                        <li>
                            <p>Adress</p>
                            <p>Minsk, Filimonova 15</p>
                        </li>
                    </ul>
                </Col>
                <Col md={6}>
                    <ul className='d-flex justify-content-between'>
                        <li>
                            <select name="language" id="language">
                                <option value="ru">Ru</option>
                                <option value="en">En</option>
                                <option value="by">By</option>
                            </select>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <p>user name</p>
                        </li>
                        <li>
                            <p>Socials</p>
                            <p>twitter..</p>
                        </li>
                    </ul>
                </Col>
            </Row>
            <Navbar sticky='top'>
                <NavbarBrand href='/'>Hotel</NavbarBrand>
                <Nav className='mr-auto justify-content-between'>
                    <NavLink to='/'>
                        <li >
                            Home
                        </li>
                    </NavLink>
                    <NavLink to='/rooms'>
                        <li >
                            Rooms
                        </li>
                    </NavLink>
                    {isAuthenticated ? authComponents : null}
                </Nav>
                {isAuthenticated ? <Nav>
                    <NavLink onClick={logoutHandler} to='/'>
                        <li>Logout</li>
                    </NavLink>
                </Nav> : <NavLink to='/auth'>
                    <li>login</li>
                </NavLink>}
            </Navbar>
        </Container>
    )
}

export default Navigation