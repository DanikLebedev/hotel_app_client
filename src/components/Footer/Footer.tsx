import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/images/Rixos_Hotels_logo_logotype.png';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarked } from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <Row className="d-flex justify-content-between align-content-center ml-3 ">
                    <Col lg={8} md={8} sm={8} className="justify-content-center align-items-center">
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <img
                                    src={logo}
                                    alt="logo"
                                    width={180}
                                    height={70}
                                    style={{ filter: 'brightness(5)' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-column" lg={4} md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faEnvelope} color="#C6A47E" /> Email Adress
                                </span>
                                <span className="font-weight-bold">RixosHotelMail.ru</span>
                            </Col>
                            <Col lg={4} className="d-flex flex-column" md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faPhone} color="#C6A47E" /> Mobile Phone
                                </span>
                                <span className="font-weight-bold">+34654891321</span>
                            </Col>
                            <Col className="d-flex flex-column" lg={4} md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faMapMarked} color="#C6A47E" /> Hotel Adress
                                </span>
                                <span className="font-weight-bold">RixosHotelMail.ru</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="justify-content-end align-items-center">
                        <Row>
                            <h3 className={'footer__title'}>Sign Up For special offers</h3>
                        </Row>
                        <Row className="mb-3 align-items-center">
                            <input type="text" placeholder="Your email..." className={'subsribe_input'} />
                            <button className={'button'}>Subscribe</button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
