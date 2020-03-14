import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import logo from '../../../public/images/Rixos_Hotels_logo_logotype.png';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import {withTranslation} from "react-i18next";

export const Footer: React.FC = ({t}: any) => {
    return (
        <footer>
            <Container fluid={true}>
                <Row className="d-flex justify-content-between align-content-center ml-3 ">
                    <Col lg={8} md={8} sm={8} className="justify-content-center ">
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <img
                                    src={process.env.PUBLIC_URL + '/images/Rixos_Hotels_logo_logotype.png'}
                                    alt="logo"
                                    width={180}
                                    height={70}
                                    style={{ filter: 'brightness(5)' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex footer-contacts-wrapper" lg={4} md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faEnvelope} color="#C6A47E" /> {t('email.label')}
                                </span>
                                <span className="font-weight-bold">RixosHotelMail.ru</span>
                            </Col>
                            <Col lg={4} className="d-flex footer-contacts-wrapper" md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faPhone} color="#C6A47E" /> {t('phone.label')}
                                </span>
                                <span className="font-weight-bold">+34654891321</span>
                            </Col>
                            <Col className="d-flex footer-contacts-wrapper" lg={4} md={4} sm={4}>
                                <span>
                                    <FontAwesomeIcon icon={faMapMarked} color="#C6A47E" /> {t('adress.label')}
                                </span>
                                <span className="font-weight-bold">{t('street.label')}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="justify-content-end ">
                        <Row>
                            <h3 className={'footer__title'}>{t('subscribe-text.label')}</h3>
                        </Row>
                        <Row className="mb-3">
                            <input type="text" placeholder="Your email..." className={'subsribe_input'} />
                            <button className={'button'}> {t('subscribe.label')}</button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default withTranslation()(Footer)