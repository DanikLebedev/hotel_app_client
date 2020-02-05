import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import logo from '../../assets/images/Rixos_Hotels_logo_logotype.png'
import './Footer.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPhone,faMapMarked } from '@fortawesome/free-solid-svg-icons'


export const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <Row className='mb-3 align-items-center'>
                    <Col lg={6}>
                        <img src={logo} alt="logo"  width={180} height={70} style={{filter: 'brightness(5)'}}/>
                    </Col>
                    <Col lg={6}>
                        <h3 className={'footer__title'}>Sign Up For special offers</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex flex-column ' lg={2}>
                        <span><FontAwesomeIcon icon={faEnvelope} color='#C6A47E'/> Email Adress</span>
                        <span className='font-weight-bold'>RixosHotelMail.ru</span>
                    </Col>
                    <Col lg={2} className='d-flex flex-column'>
                        <span><FontAwesomeIcon icon={faPhone} color='#C6A47E'/> Mobile Phone</span>
                        <span className='font-weight-bold'>+34654891321</span>
                    </Col>
                    <Col className='d-flex flex-column' lg={2}>
                        <span><FontAwesomeIcon icon={faMapMarked} color='#C6A47E'/> Hotel Adress</span>
                        <span className='font-weight-bold'>RixosHotelMail.ru</span>
                    </Col>
                    <Col lg={6}>
                        <input type="text" placeholder='Your email...' className={'subsribe_input'}/><button className={'button'}>Subscribe</button>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}