import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import './Navigation.scss'
import  engLogo from '../../assets/images/united_kingdom_640.png'
import rusLogo from '../../assets/images/russia_round_icon_64.png'
import hotelLogo from '../../assets/images/Rixos_Hotels_logo_logotype.png'
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
                            <li className='d-flex justify-content-center align-items-center swith-language__wrapper'>
                                <button><img src={rusLogo}
                                             width={40} height={30} alt="russia"/></button>
                                <button><img
                                    src={engLogo}
                                    width={40} height={30} alt="england"/></button>
                            </li>
                            <li className='userInfo'>
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
                <Navbar>
                    <NavbarBrand href='/'><img
                        style={{filter: 'brightness(5)'}}
                        src={hotelLogo}
                        width={180} height={70} alt="logo"/></NavbarBrand>
                    <Nav className='mr-auto ml-auto justify-content-center nav__list_links'>
                        <NavLink className={'mr-5 link'} to='/'>
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