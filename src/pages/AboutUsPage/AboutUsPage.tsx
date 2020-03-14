import React from 'react';
import './AboutUsPage.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { config } from '../../config';
// import galleryPhoto1 from './images/7112.jpg';
// import galleryPhoto2 from './images/dui21-deluxe-room1.add1.low-res.jpg';
// import galleryPhoto3 from './images/3-high-res-restaurant-30.jpg';
// import galleryPhoto4 from '../../../public/images/528941482_200fcf18b2_b.jpg';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { withTranslation } from 'react-i18next';

const AboutUsPage: React.FC = ({ t }: any) => {
    return (
        <div>
            <FindRoomForm />
            <video className="videoTag" autoPlay loop muted>
                <source src={config.baseUrl + 'video.mp4'} type="video/mp4" />
            </video>
            <Container className="about-us__page">
                <h1 className="text-white text-center">{t('about.label')}</h1>
                <Row>
                    <Col lg={6} className="about-us__page-photo" md={6} sm={6} />
                    <Col lg={6} md={6} sm={6} className="about-us__page-text">
                        <h3>{t('about-page-subtitle')}</h3>
                        <p>{t('about-page-text')}</p>
                    </Col>
                </Row>
            </Container>
            <Container fluid={true}>
                <Row className={'about-us__page-gallery'}>
                    <div className="grid">
                        <figure className="effect-layla">
                            <img src={process.env.PUBLIC_URL + '/images/7112.jpg'} alt="img1" />
                            <figcaption>
                                <h2>
                                    <span>{t('about-page.best-prices.title')}</span>
                                </h2>
                                <p>{t('about-page.best-prices.text')}</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={process.env.PUBLIC_URL + '/images/dui21-deluxe-room1.add1.low-res.jpg'} alt="img03" />
                            <figcaption>
                                <h2>
                                    <span>{t('about-page.stuff.title')}</span>
                                </h2>
                                <p>{t('about-page.stuff.text')}</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={process.env.PUBLIC_URL + '/images/3-high-res-restaurant-30.jpg'} alt="img03" />
                            <figcaption>
                                <h2>
                                    <span>{t('about-page.food.title')}</span>
                                </h2>
                                <p>{t('about-page.food.text')}</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={process.env.PUBLIC_URL + '/images/528941482_200fcf18b2_b.jpg'} alt="img03" />
                            <figcaption>
                                <h2>
                                    <span>{t('about-page.choice.title')}</span>
                                </h2>
                                <p>{t('about-page.choice.text')}</p>
                            </figcaption>
                        </figure>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default withTranslation()(AboutUsPage);
