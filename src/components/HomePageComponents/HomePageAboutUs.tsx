import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Slider } from '../Slider/Slider';
import roomImage1 from '../../assets/images/vertical-city-hotel.jpg';
import roomImage2 from '../../assets/images/38736452-luxurious-bed-with-cushion-in-royal-bedroom-interior-hotel-room-in-bright-colors-vertical-orientatio.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export const HomePageAboutUs = () => {
    return (
        <section className="home-page__about-us">
            <div className="home-page__header d-flex justify-content-center align-items-center flex-column text-left">
                <Slider />
                <h1 className="header__title">Welcome to Rixos Hotel</h1>
                <p className={'header__subtitle'}>
                    Chilling out on the bed in your hotel room watching TV, while wearing your own pajamas, is sometimes
                    the best part of vacation.
                </p>
                <div className={'button__container'}>
                    <NavLink to={'/rooms'}>
                        <button className="button">See rooms</button>
                    </NavLink>
                    <NavLink to={'/about'}>
                        <button className={'btn-transparent button'}>About us</button>
                    </NavLink>
                </div>
                <FontAwesomeIcon className={'arrow-icon'} icon={faArrowDown} color="#fff" />
            </div>
            <Container fluid={true}>
                <Row>
                    <Col lg={6} sm={12} md={6} className={'d-flex justify-content-center align-items-center flex-column'}>
                        <h2 className={'section__title home-page__about-us-title'}>Hotels to celebrate life</h2>
                        <p className={'home-page__about-us-text'}>
                            We are proud to say that since our opening in '98 we have been serving our visitors in the
                            best possible way. In Rixos Hotel, where each one of four 17 rooms - with its own
                            personality and style - will help you to feel at home and to live the 'Rixos' experience as
                            you would never have imagined it
                        </p>
                        <p className={'home-page__about-us-text'}>
                            Make memories at Rixos hotel, Amelia Island, where southern charm, magnificent, scenery and
                            casually elegant surroundings exemplify the gentle ambience of his barrier island' luxury
                            beachfront resort
                        </p>
                        <button className={'button btn-black'}>Read more</button>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Row className={'home-page__about-us-photos d-flex justify-content-around align-items-center'}>
                            <Col className='d-flex justify-content-center align-items-center' lg={6} sm={6} md={6}>
                                <img src={roomImage1} alt="room" />
                            </Col>
                            <Col className='d-flex justify-content-center align-items-center' lg={6} sm={6} md={6}>
                                <img src={roomImage2} alt="room" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
