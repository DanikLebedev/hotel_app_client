import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import roomImage3 from "../../assets/images/14_tokyo-prince-hotel-rooms-4-8FSuperiorTwinRoom-noon-.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faBuilding, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

export const HomePageRooms = () => {
    return (
        <section className={'home__page-rooms'}>
            <Container fluid={true}>
                <Row>
                    <Col lg={6} md={6} className='p-0'>
                        <img src={roomImage3} className={'home__page-rooms-photo'} alt="room"/>
                    </Col>
                    <Col lg={6} md={6}>
                        <h2 className={'room__title section__title'}>Deluxe Room</h2>
                        <div className={'room-info'}>
                            <p><span>199$</span>/Per Night</p>
                            <span className={'home-page-separator'}></span>
                            <p>Status: <span>5 Rooms left</span></p>
                        </div>
                        <div className={'room__icons'}>
                            <span><FontAwesomeIcon icon={faBed}/>2 bed</span>
                            <span><FontAwesomeIcon icon={faUserAlt}/>4 guests</span>
                            <span><FontAwesomeIcon icon={faBuilding}/>50m<sup>2</sup></span>
                        </div>
                        <p className={'home__page-rooms-description'}>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Aliquam dolores eos exercitationem minima mollitia, numquam quisquam
                            similique ut veniam voluptatum. Accusantium, alias aliquid assumenda consectetur
                            consequuntur culpa delectus deleniti dignissimos, doloribus harum in libero nostrum,
                            odit pariatur placeat quia repellendus similique sit ut voluptas. Accusantium dolorem
                            iusto quos repellat temporibus.</p>
                        <div className={"button__container"}>
                            <button className={'button'}>Book Room</button>
                            <NavLink to={'/rooms'}>
                                <button className={'button'}>See Room</button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-content-around flex-nowrap mt-3 mr-2 ml-2 d-flex align-items-center'>
                    <Col lg={3} md={3} className={'home__page-rooms-item'}>
                        <div className={'home__page-rooms-item-title'}>
                            <span>Family Room</span><span>70$</span>
                        </div>
                    </Col>
                    <Col lg={3} md={3} className={'home__page-rooms-item'}>
                        <div className={'home__page-rooms-item-title'}>
                            <span>Family Room</span><span>70$</span>
                        </div>
                    </Col>
                    <Col lg={3} md={3} className={'home__page-rooms-item'}>
                        <div className={'home__page-rooms-item-title'}>
                            <span>Family Room</span><span>70$</span>
                        </div>
                    </Col>
                    <Col lg={3} md={3} className={'home__page-rooms-item'}>
                        <div className={'home__page-rooms-item-title'}>
                            <span>Family Room</span><span>70$</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}