import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './Navigation.scss';
import engLogo from '../../assets/images/united_kingdom_640.png';
import rusLogo from '../../assets/images/russia_round_icon_64.png';
import hotelLogo from '../../assets/images/Rixos_Hotels_logo_logotype.png';
import { Navbar, NavbarBrand, Nav, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faVk } from '@fortawesome/free-brands-svg-icons';
import { goToAnchor } from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

const Navigation: React.FC = () => {
    configureAnchors({ offset: -100, scrollDuration: 1000 });

    const auth = useContext(AuthContext);
    const history = useHistory();
    const isAuthenticated = auth.isAuthenticated;
    const userStatus = auth.userStatus;
    const userEmail = auth.userEmail;
    const logoutHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };
    const [showMenu, setShowMenu] = useState(false);
    const goToForm = () => {
        goToAnchor('home-page-book-form', false);
    };

    const adminComponents = (
        <>
            <NavLink activeClassName={'active-link'} className={'mr-5'} to="/admin">
                admin
            </NavLink>
        </>
    );

    const authComponents = (
        <>
            <NavLink onClick={() => setShowMenu(false)} activeClassName={'active-link'} className={'mr-5'} to="/orders">
                orders
            </NavLink>
        </>
    );

    const showMenuHandler = () => {
        setShowMenu(!showMenu);
    };

    const cls = ['nav-wrapper'];

    if (showMenu) {
        cls.push('active', 'transition');
    } else {
        cls.push('disabled');
    }

    return (
        <>
            <Container>
                <Row className="pt-3">
                    <Col lg={6} md={6}>
                        <ul className="header__contacts">
                            <li>
                                <span>Email</span>
                                <span className="font-weight-bold">hotel@mail.ru</span>
                            </li>
                            <div className="separator"></div>
                            <li>
                                <span>Phone</span>
                                <span className="font-weight-bold">+39752180</span>
                            </li>
                            <div className="separator"></div>
                            <li>
                                <span>Adress</span>
                                <span className="font-weight-bold">Minsk, Filimonova 15</span>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={6} md={6}>
                        <ul className="d-flex justify-content-between">
                            <li className="d-flex justify-content-center align-items-center switсh-language__wrapper">
                                <button>
                                    <img src={rusLogo} width={40} height={30} alt="russia" />
                                </button>
                                <button>
                                    <img src={engLogo} width={40} height={30} alt="england" />
                                </button>
                            </li>
                            <li className="userInfo">
                                {isAuthenticated ? (
                                    <Nav>
                                        <NavLink onClick={logoutHandler} to="/">
                                            Logout
                                        </NavLink>
                                    </Nav>
                                ) : (
                                    <NavLink to="/auth">login</NavLink>
                                )}
                                <img src="" alt="" />
                                <span>{userStatus ? <span>{userStatus}</span> : null}</span>
                                <span>{userEmail ? <span>{userEmail}</span> : null}</span>
                            </li>
                            <div className="separator"></div>
                            <li>
                                <ul className="d-flex justify-content-center">
                                    <li className="social_icon">
                                        <a href="/">
                                            <FontAwesomeIcon className={'icon'} icon={faFacebookF} />
                                        </a>
                                    </li>
                                    <li className="social_icon">
                                        <a href="/">
                                            <FontAwesomeIcon icon={faTwitter} className={'icon'} />
                                        </a>
                                    </li>
                                    <li className="social_icon">
                                        <a href="/">
                                            <FontAwesomeIcon icon={faVk} className={'icon'} />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Navbar>
                    <NavbarBrand href="/">
                        <img style={{ filter: 'brightness(5)' }} src={hotelLogo} width={180} height={70} alt="logo" />
                    </NavbarBrand>
                    <div className={cls.join(' ')}>
                        <Nav id={'nav__list_links'} className="nav__list_links mr-auto ml-auto  ">
                            <NavLink
                                onClick={() => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5 link'}
                                to="/"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                onClick={() => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5'}
                                to="/rooms"
                            >
                                Rooms
                            </NavLink>
                            <NavLink
                                onClick={() => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5'}
                                to="/about"
                            >
                                About Us
                            </NavLink>
                            {isAuthenticated ? authComponents : null}
                            {userStatus === 'admin' ? adminComponents : null}
                            <button className="button-book header_button" onClick={goToForm}>
                                Book Room
                            </button>
                        </Nav>
                    </div>
                </Navbar>
            </Container>
            <div id={'burger-button'} className={showMenu ? 'change' : ''} onClick={showMenuHandler}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </>
    );
};

export default Navigation;
