import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import './Navigation.scss'
import {Navbar, NavbarBrand, Nav, Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faVk} from '@fortawesome/free-brands-svg-icons'
import {Slider} from "../Slider/Slider";


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
            <NavLink className={'mr-5'} to='/orders'>
                orders
            </NavLink>
            <NavLink className={'mr-5'} to='/admin'>
                admin
            </NavLink>
        </>

    )

    return (
        <>
            <Container>
                <Row className='pt-3'>
                    <Col md={6}>
                        <ul className='d-flex justify-content-between header__contacts'>
                            <li>
                                <span>Email</span>
                                <span className='font-weight-bold'>hotel@mail.ru</span>
                            </li>
                            <div className='separator'></div>
                            <li>
                                <span>Phone</span>
                                <span className='font-weight-bold'>+39752180</span>
                            </li>
                            <div className='separator'></div>
                            <li>
                                <span>Adress</span>
                                <span className='font-weight-bold'>Minsk, Filimonova 15</span>
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <ul className='d-flex justify-content-between'>
                            <li className='d-flex justify-content-center align-items-center'>
                                <button><img src="http://img.freeflagicons.com/thumb/round_icon/russia/russia_640.png"
                                             width={40} height={30} alt="russia"/></button>
                                <button><img
                                    src="http://img.freeflagicons.com/thumb/round_icon/united_kingdom/united_kingdom_640.png"
                                    width={40} height={30} alt="england"/></button>
                            </li>
                            <li>
                                {isAuthenticated ? <Nav>
                                    <NavLink onClick={logoutHandler} to='/'>
                                        Logout
                                    </NavLink>
                                </Nav> : <NavLink to='/auth'>
                                    login
                                </NavLink>}
                                <img src="" alt=""/>
                                <span>user name</span>
                            </li>
                            <div className='separator'></div>
                            <li>
                                <ul className='d-flex justify-content-center'>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon icon={faFacebookF}
                                                                                             color='#000'/></a></li>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon icon={faTwitter}
                                                                                             color='#000'/></a></li>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon icon={faVk} color='#000'/></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Navbar className='nav__list_links'>
                    <NavbarBrand href='/'><img
                        src='https://logos-download.com/wp-content/uploads/2016/11/Rixos_Hotels_logo_logotype.png'
                        width={180} height={70} alt="logo"/></NavbarBrand>
                    <Nav className='mr-auto ml-auto justify-content-center '>
                        <NavLink className={'mr-5'} to='/'>
                            Home
                        </NavLink>
                        <NavLink className={'mr-5'} to='/rooms'>
                            Rooms
                        </NavLink>
                        {isAuthenticated ? authComponents : null}
                    </Nav>
                    <button className='button header_button'>Book Room</button>
                </Navbar>
            </Container>
            <Slider/>
        </>
    )
}

export default Navigation