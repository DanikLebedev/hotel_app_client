import React from 'react';
import './AboutUsPage.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { config } from '../../config';
import galleryPhoto1 from '../../assets/images/7112.jpg';
import galleryPhoto2 from '../../assets/images/dui21-deluxe-room1.add1.low-res.jpg';
import galleryPhoto3 from '../../assets/images/3-high-res-restaurant-30.jpg';
import galleryPhoto4 from '../../assets/images/528941482_200fcf18b2_b.jpg';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { withTranslation } from 'react-i18next';

const AboutUsPage: React.FC = ({ t }: any) => {
    return (
        <>
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
                            <img src={galleryPhoto1} alt="img1" />
                            <figcaption>
                                <h2>
                                    Best <span>Prices</span>
                                </h2>
                                <p>We offered the best prices for best rooms</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={galleryPhoto2} alt="img03" />
                            <figcaption>
                                <h2>
                                    Honest and HardWorking <span>Stuff</span>
                                </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, tempora!</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={galleryPhoto3} alt="img03" />
                            <figcaption>
                                <h2>
                                    Delicious <span>Food</span>
                                </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, vitae.</p>
                            </figcaption>
                        </figure>
                        <figure className="effect-layla">
                            <img src={galleryPhoto4} alt="img03" />
                            <figcaption>
                                <h2>
                                    Best <span>Choice</span>
                                </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, quas.</p>
                            </figcaption>
                        </figure>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default withTranslation()(AboutUsPage);
