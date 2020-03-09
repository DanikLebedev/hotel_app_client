import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Slider } from '../Slider/Slider';
import roomImage1 from '%PUBLIC_URL%/images/vertical-city-hotel.jpg';
import  roomImage2 from '%PUBLIC_URL%/images/Image-5.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';

const HomePageAboutUs: React.FC = ({ t }: any): JSX.Element => {
    return (
        <section className="home-page__about-us">
            <div className="home-page__header d-flex justify-content-center align-items-center flex-column text-left">
                <Slider />
                <h1 className="header__title">{t('mainPageTitle.label')} Rixos Hotel</h1>
                <p className={'header__subtitle'}>{t('mainPageSubtitle.label')}</p>
                <div className={'button__container'}>
                    <NavLink to={'/rooms'}>
                        <button className="button">{t('see-rooms.label')}</button>
                    </NavLink>
                    <NavLink to={'/about'}>
                        <button className={'btn-transparent button'}>{t('about.label')}</button>
                    </NavLink>
                </div>
                <FontAwesomeIcon className={'arrow-icon'} icon={faArrowDown} color="#fff" />
            </div>
            <Container fluid={true}>
                <Row>
                    <Col
                        lg={6}
                        sm={12}
                        md={6}
                        className={'d-flex justify-content-center align-items-center flex-column'}
                    >
                        <h2 className={'section__title home-page__about-us-title'}>{t('home-page-about.label')}</h2>
                        <p className={'home-page__about-us-text'}>{t('home-page-about.p1')}</p>
                        <p className={'home-page__about-us-text'}>{t('home-page-about.p2')}</p>
                        <NavLink to={'/about'}>
                            <button className={'button btn-black'}>{t('about.label')}</button>
                        </NavLink>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Row className={'home-page__about-us-photos d-flex justify-content-around align-items-start mt-1'}>
                            <Col
                                className="d-flex justify-content-center align-items-center"
                                lg={6}
                                sm={6}
                                md={6}
                                xs={12}
                            >
                                <img src={process.env.PUBLIC_URL + '/images/Image-5.jpg' } alt="room" />
                            </Col>
                            <Col
                                className="d-flex justify-content-center align-items-center"
                                lg={6}
                                sm={6}
                                md={6}
                                xs={12}
                            >
                                <img src={process.env.PUBLIC_URL + '/images/vertical-city-hotel.jpg' } alt="room" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default withTranslation()(HomePageAboutUs);
