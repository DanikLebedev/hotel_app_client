import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBreadSlice, faKey, faUserFriends} from "@fortawesome/free-solid-svg-icons";

export const HomePageFeatures = () => {
    return (
        <section className='home-page__features mb-5'>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Card >
                            <Card.Body>
                                <FontAwesomeIcon size={"4x"} icon={faBreadSlice}/>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card >
                            <Card.Body>
                                <FontAwesomeIcon size={"4x"} icon={faUserFriends}/>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card >
                            <Card.Body>
                                <FontAwesomeIcon size={"4x"} icon={faKey}/>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}