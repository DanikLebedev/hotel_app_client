import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Room } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import Loader from '../Loader/Loader';
import { config } from '../../config';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const HomePageRooms: React.FC = (): JSX.Element => {
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [index, setIndex] = useState<number>(0);

    const fetchRooms: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => {
            setFetchedRooms(rooms);
        });
    }, []);

    const changeMainRoomHandler = (key: number): void => {
        setIndex(key);
    };

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return (
        <section className={'home__page-rooms'}>
            <Container fluid={true}>
                <Row className={'home__page-rooms-preview'}>
                    <Col lg={6} md={6} className="p-0">
                        {fetchedRooms[index] ? (
                            <LazyLoadImage
                                effect="opacity"
                                src={config.baseUrl + fetchedRooms[index].image}
                                alt="room"
                            />
                        ) : (
                            <Loader />
                        )}
                    </Col>
                    <Col lg={6} md={6}>
                        <h2 className={'room__title section__title'}>
                            {fetchedRooms[index] ? fetchedRooms[index].title : null}
                        </h2>
                        <div className={'room-info'}>
                            <p>
                                <span>{fetchedRooms[index] ? fetchedRooms[index].price : null}</span>/Per Night
                            </p>
                            <span className={'home-page-separator'}></span>
                        </div>
                        <div className={'room__icons'}>
                            <span>
                                <FontAwesomeIcon icon={faBed} />
                                {fetchedRooms[index] ? fetchedRooms[index].rooms : null} rooms
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faUserAlt} />
                                {fetchedRooms[index] ? fetchedRooms[index].guests : null} guests
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBuilding} />
                                {fetchedRooms[index] ? fetchedRooms[index].area : null}m<sup>2</sup>
                            </span>
                        </div>
                        <p className={'home__page-rooms-description'}>
                            {fetchedRooms[index] ? fetchedRooms[index].description : null}
                        </p>
                        <div className={'button__container'}>
                            <button
                                id={fetchedRooms[index] ? fetchedRooms[index]._id : ''}
                                className={'button btn-black'}
                            >
                                Book Room
                            </button>
                            <NavLink to={'/rooms'}>
                                <button className={'button btn-black'}>See Room</button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-around flex-nowrap mt-3 mr-2 ml-2 d-flex align-items-center">
                    {fetchedRooms ? (
                        fetchedRooms.slice(0, 4).map((item, key) => {
                            return (
                                <div
                                    onClick={() => changeMainRoomHandler(key)}
                                    key={key}
                                    className="home__page-rooms-item col-lg-3 col-md-3 col-sm-3 pl-0"
                                >
                                    <LazyLoadImage
                                        effect='opacity'
                                        src={config.baseUrl + item.image}
                                        alt="room"
                                    />
                                    <div className={'home__page-rooms-item-title'}>
                                        <span>{item.title}</span>
                                        <span>{item.price}$</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <Loader />
                    )}
                </Row>
            </Container>
        </section>
    );
};
