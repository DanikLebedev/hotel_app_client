import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice, faKey, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';

 const HomePageFeatures: React.FC = ({ t }: any): JSX.Element => {
    return (
        <section className="home-page__features mb-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faBreadSlice} />
                                <Card.Title>{t('home-page-features-breakfast-title')}</Card.Title>
                                <Card.Text>{t('home-page-features-breakfast-text')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faUserFriends} />
                                <Card.Title>{t('home-page-features-stuff-title')}</Card.Title>
                                <Card.Text>
                                    {t('home-page-features-stuff-text')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faKey} />
                                <Card.Title>{t('home-page-features-room-title')}</Card.Title>
                                <Card.Text>
                                    {t('home-page-features-room-text')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default withTranslation()(HomePageFeatures);
