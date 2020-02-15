import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice, faKey, faUserFriends } from '@fortawesome/free-solid-svg-icons';


export const HomePageFeatures: React.FC = (): JSX.Element => {
    return (
        <section className="home-page__features mb-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faBreadSlice} />
                                <Card.Title>Free Breakfast Every Day</Card.Title>
                                <Card.Text>
                                    Every day in the morning we have a special buffe and it's free. Lorem ipsum dolor
                                    sit amet, consectetur adipisicing elit. Exercitationem, rerum vel. Doloribus
                                    exercitationem iusto laudantium.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faUserFriends} />
                                <Card.Title>Attenive And Open Stuff</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur dicta
                                    dolore, ex, fuga hic in inventore modi nihil nisi officiis possimus qui quo
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0">
                            <Card.Body>
                                <FontAwesomeIcon size={'4x'} icon={faKey} />
                                <Card.Title>Luxurios Rooms</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam corporis
                                    delectus deleniti distinctio, enim exercitationem perspiciatis porro provident,
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
