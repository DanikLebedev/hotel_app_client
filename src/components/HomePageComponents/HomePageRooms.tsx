import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faUserAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { config } from '../../config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { withTranslation } from 'react-i18next';
import { ClientContext } from '../../context/client.context';
import {kitcut} from '../ArticleItem/ArticleItem'

const HomePageRooms: React.FC = ({ t }: any): JSX.Element => {
    const [index, setIndex] = useState<number>(0);
    const fetchedRooms = useContext(ClientContext).fetchedRooms;

    const changeMainRoomHandler = (key: number): void => {
        setIndex(key);
    };

    if (!fetchedRooms[index]) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Loader />
            </div>
        );
    }

    return (
        <section className={'home__page-rooms'}>
            <Container fluid={true}>
                <Row className="home__page-rooms-preview">
                    <Col lg={6} md={6} sm={12} xs={12} className="p-0 home__page-rooms-preview-main-photo">
                        <LazyLoadImage effect="opacity" src={config.baseUrl + fetchedRooms[index].image} alt="room" />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2 className={'room__title section__title'}>
                            {fetchedRooms[index] ? fetchedRooms[index].title : null}
                        </h2>
                        <div className={'room-info'}>
                            <p>
                                <span className={'home__page-rooms-price'}>
                                    {fetchedRooms[index] ? fetchedRooms[index].price : null}$
                                </span>
                                /{t('home-page-rooms.per-night.label')}
                            </p>
                        </div>
                        <div className="room__icons">
                            <span>
                                <FontAwesomeIcon className={'mr-2'} icon={faHome} />
                                {fetchedRooms[index] ? fetchedRooms[index].rooms : null}{' '}
                                {t('home-page-rooms.rooms.label')}
                            </span>
                            <span>
                                <FontAwesomeIcon className={'mr-2'} icon={faUserAlt} />
                                {fetchedRooms[index] ? fetchedRooms[index].guests : null}{' '}
                                {t('home-page-rooms.guests.label')}
                            </span>
                            <span>
                                <FontAwesomeIcon className={'mr-2'} icon={faBuilding} />
                                {fetchedRooms[index] ? fetchedRooms[index].area : null}m<sup>2</sup>
                            </span>
                        </div>
                        <p className={'home__page-rooms-description'}>
                            {fetchedRooms[index]
                                ? kitcut(t(`home-page-rooms.${fetchedRooms[index].category}.description`), 300)
                                : null}
                        </p>
                        <div className={'button__container'}>
                            <NavLink
                                to={fetchedRooms[index] ? `/rooms/${fetchedRooms[index]._id}` : '/rooms'}
                                id={fetchedRooms[index] ? fetchedRooms[index]._id : ''}
                                className={'button btn-black'}
                            >
                                {t('book-room.label')}
                            </NavLink>
                            <NavLink to={'/rooms'}>
                                <button className={'button btn-black'}>{t('see-rooms.label')}</button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <div className="justify-content-center home-page-rooms-row mt-3 d-flex align-items-center">
                    {fetchedRooms.slice(0, 4).map((item, key) => {
                        return (
                            <div
                                onClick={() => changeMainRoomHandler(key)}
                                key={key}
                                className="home__page-rooms-item col-lg-3 col-md-6 col-sm-12 pl-0 mb-2"
                            >
                                <LazyLoadImage effect="opacity" src={config.baseUrl + item.image} alt="room" />
                                <div className={'home__page-rooms-item-title'}>
                                    <span>{item.title}</span>
                                    <span>{item.price}$</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default withTranslation()(HomePageRooms);
