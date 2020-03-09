import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ClientContext } from '../../context/client.context';
import './Navigation.scss';
import engLogo from '../../assets/images/united_kingdom_640.png';
import rusLogo from '../../assets/images/russia_round_icon_64.png';
import hotelLogo from '../../assets/images/Rixos_Hotels_logo_logotype.png';
import { Navbar, NavbarBrand, Nav, Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faVk } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faSignInAlt, faEnvelope, faPhone, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import toaster from 'toasted-notes';

const Navigation: React.FC = (): JSX.Element => {
    const auth: ClientContext = useContext(ClientContext);
    const location = useLocation().pathname;
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [token] = useState('');
    const history = useHistory();
    const isAuthenticated: boolean = auth.isAuthenticated;
    const logoutHandler = (event: { preventDefault: () => void }): void => {
        setShowMenu(false);
        event.preventDefault();
        auth.logoutUser();
        history.push('/');
    };

    const checkToken = () => {
        const token = localStorage.getItem('userData');
        if (token === null && location === '/orders') {
            toaster.notify('Authorization time is out, please log in', {
                duration: 2000,
            });
            auth.logoutUser();
            history.push('/auth');
        }
    };

    const showMenuHandler = (): void => {
        setShowMenu(!showMenu);
    };

    const cls: string[] = ['nav-wrapper'];

    if (showMenu) {
        cls.push('active', 'transition');
    } else {
        cls.push('disabled');
    }
    const { t, i18n } = useTranslation();

    const changeLang = (event: ChangeEvent<HTMLInputElement>): void => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        checkToken();
    }, [token, location, checkToken]);

    const authComponents: JSX.Element = (
        <>
            <NavLink
                id={'navigation-link'}
                onClick={(): void => setShowMenu(false)}
                activeClassName={'active-link'}
                className={'mr-5'}
                to="/orders"
            >
                {t('orders.label')}
            </NavLink>
        </>
    );

    return (
        <>
            <Container>
                <Row className="pt-3">
                    <Col lg={6} md={5} sm={4}>
                        <ul className="header__contacts">
                            <li>
                                <span>
                                    <FontAwesomeIcon icon={faEnvelope} /> Email
                                </span>
                                <span className="font-weight-bold">hotel@mail.ru</span>
                            </li>
                            <div className="separator" />
                            <li>
                                <span>
                                    <FontAwesomeIcon icon={faPhone} /> {t('phone.label')}
                                </span>
                                <span className="font-weight-bold">+39752180</span>
                            </li>
                            <div className="separator" />
                            <li>
                                <span>
                                    <FontAwesomeIcon icon={faMapMarked} /> {t('adress.label')}
                                </span>
                                <span className="font-weight-bold">{t('street.label')}</span>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={6} md={7} sm={8}>
                        <ul className="d-flex justify-content-between settings-wrapper">
                            <li className="switсh-language__wrapper">
                                <div onChange={changeLang}>
                                    <label htmlFor="en" id={'england'}>
                                        <img src={engLogo} width={40} height={30} alt="england" />
                                    </label>
                                    <input
                                        type="radio"
                                        hidden={true}
                                        value="en"
                                        name="language"
                                        id={'en'}
                                        defaultChecked
                                    />
                                    <label htmlFor="ru" id={'russian'}>
                                        <img src={rusLogo} width={40} height={30} alt="russia" />
                                    </label>
                                    <input type="radio" hidden={true} value="ru" name="language" id={'ru'} />
                                </div>
                            </li>
                            <li className="userInfo">
                                {isAuthenticated ? (
                                    <Nav>
                                        <NavLink className={'auth-link'} onClick={logoutHandler} to="/">
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            {t('logout.label')}
                                        </NavLink>
                                    </Nav>
                                ) : (
                                    <NavLink
                                        to="/auth"
                                        onClick={(): void => setShowMenu(false)}
                                        className={'auth-link'}
                                    >
                                        <FontAwesomeIcon icon={faSignInAlt} /> {t('login.label')}
                                    </NavLink>
                                )}
                            </li>
                            <div className="separator" />
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
                <Navbar id={'navbar'}>
                    <NavbarBrand href="/">
                        <img style={{ filter: 'brightness(5)' }} src={hotelLogo} width={180} height={70} alt="logo" />
                    </NavbarBrand>
                    <div className={cls.join(' ')}>
                        <Nav id={'nav__list_links'} className="nav__list_links mr-auto ml-auto  ">
                            <div className="switсh-language__wrapper-burger-menu">
                                <div onChange={changeLang}>
                                    <label htmlFor="en" id={'england'}>
                                        <img src={engLogo} width={40} height={30} alt="england" />
                                    </label>
                                    <input
                                        type="radio"
                                        hidden={true}
                                        value="en"
                                        name="language"
                                        id={'en'}
                                        defaultChecked
                                    />
                                    <label htmlFor="ru" id={'russian'}>
                                        <img src={rusLogo} width={40} height={30} alt="russia" />
                                    </label>
                                    <input type="radio" hidden={true} value="ru" name="language" id={'ru'} />
                                    <NavLink id={'auth-link-burger-menu'} className={'auth-link '} to="/admin/login">
                                        admin
                                    </NavLink>
                                    {isAuthenticated ? (
                                        <NavLink
                                            id={'auth-link-burger-menu'}
                                            className={'auth-link '}
                                            onClick={logoutHandler}
                                            to="/"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            {t('logout.label')}
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            to="/auth"
                                            id={'auth-link-burger-menu'}
                                            onClick={(): void => setShowMenu(false)}
                                            className={'auth-link '}
                                        >
                                            <FontAwesomeIcon icon={faSignInAlt} /> {t('login.label')}
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                            <NavLink
                                id={'navigation-link'}
                                onClick={(): void => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5 link'}
                                to="/"
                            >
                                {t('home.label')}
                            </NavLink>
                            <NavLink
                                id={'navigation-link'}
                                onClick={(): void => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5'}
                                to="/rooms"
                            >
                                {t('rooms.label')}
                            </NavLink>
                            <NavLink
                                id={'navigation-link'}
                                onClick={(): void => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5'}
                                to="/about"
                            >
                                {t('about.label')}
                            </NavLink>
                            <NavLink
                                id={'navigation-link'}
                                onClick={(): void => setShowMenu(false)}
                                activeClassName={'active-link'}
                                className={'mr-5 link'}
                                to="/articles"
                            >
                                {t('articles.label')}
                            </NavLink>
                            {isAuthenticated ? authComponents : null}
                        </Nav>
                    </div>
                    <div className={showMenu ? 'drawer open-drawer' : 'drawer'} />
                </Navbar>
            </Container>
            <div id="burger-button" className={showMenu ? 'change' : ''} onClick={showMenuHandler}>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
            </div>
        </>
    );
};

export default Navigation;
