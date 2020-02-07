import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import './Navigation.scss'
import engLogo from '../../assets/images/united_kingdom_640.png'
import rusLogo from '../../assets/images/russia_round_icon_64.png'
import hotelLogo from '../../assets/images/Rixos_Hotels_logo_logotype.png'
import {Navbar, NavbarBrand, Nav, Row, Col, Modal, Button} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faVk} from '@fortawesome/free-brands-svg-icons'
import {Category} from "../../interfaces/clientInterfaces";
import {CategoryService} from "../../APIServices/categoryService";
import {OrderService} from "../../APIServices/orderService";
import toaster from "toasted-notes";
import {useHttp} from "../../hooks/http.hook";


const Navigation = () => {
    const {error, clearError} = useHttp()
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([])
    const [order, setOrder] = useState({})
    const auth = useContext(AuthContext)
    const history = useHistory()
    const isAuthenticated = auth.isAuthenticated;
    const userStatus = auth.userStatus
    const logoutHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const adminComponents = (
        <>
            <NavLink className={'mr-5'} to='/admin'>
                admin
            </NavLink>
        </>
    )

    const authComponents = (
        <>
            <NavLink className={'mr-5'} to='/orders'>
                orders
            </NavLink>
        </>

    )

    const fetchCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({categories}) => setFetchedCategories(categories))
    }, [])


    const options = fetchedCategories.map(({title}, index) => {
        return (
            <option key={title + index} value={title}>{title}</option>
        )
    })

    const selectOrderChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        setOrder({...order, category: event.target.value})
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOrder({...order, [event.target.name]: event.target.value} )
    }

    const addOrderHandler = async () => {
          const data = await OrderService.postOrder({...order}, {
              Authorization: `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
          })
          toaster.notify(data.message, {
              duration: 2000
          })
    }

    useEffect(() => {
        fetchCategories()
        toaster.notify(error, {
            duration: 2000
        });
        clearError()
    }, [fetchCategories, error, clearError])

    return (
        <>
            <Container>
                <Row className='pt-3'>
                    <Col lg={6} md={6}>
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
                    <Col lg={6} md={6}>
                        <ul className='d-flex justify-content-between'>
                            <li className='d-flex justify-content-center align-items-center switсh-language__wrapper'>
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
                                <span>{userStatus? <span>{userStatus}</span>: null}</span>
                            </li>
                            <div className='separator'></div>
                            <li>
                                <ul className='d-flex justify-content-center'>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon className={'icon'}
                                                                                             icon={faFacebookF}
                                    /></a></li>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon icon={faTwitter}
                                                                                             className={'icon'}
                                    /></a></li>
                                    <li className='social_icon'><a href="/"><FontAwesomeIcon icon={faVk}
                                                                                             className={'icon'}/></a>
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
                        {userStatus === 'admin' ? adminComponents: null}
                    </Nav>
                    <button className='button header_button' onClick={handleShow} >Book Room</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <select  onChange={selectOrderChangeHandler} name="category" id="">
                                    {options}
                                </select>
                                <input name={'checkIn'} onChange={onChangeHandler} type="date"/>
                                <input name={'checkOut'}  onChange={onChangeHandler} type="date"/>
                                <input name={'guests'}  onChange={onChangeHandler} type="number"/>
                                <button  onClick={addOrderHandler}>
                                    Send
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Navbar>
            </Container>
        </>
    )
}

export default Navigation