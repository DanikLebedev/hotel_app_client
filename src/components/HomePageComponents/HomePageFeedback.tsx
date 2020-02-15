import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

export const HomePageFeedback: React.FC = (): JSX.Element => {
    return (
        <section className="home-page__feedback mt-5 mb-5">
            <Container>
                <Row>
                    <Col lg={12} className="text-center">
                        <h2 className={'home-page__feedback-title section__title'}>Testimonials</h2>
                        <h4 className={'home-page__feedback-subtitle'}>what our happy cusomers said about us</h4>
                        <Carousel controls={false} className="p-2 home-page__feedback-slider">
                            <Carousel.Item>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nisi quisquam
                                    sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nisi
                                    quisquam sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
                                    nisi quisquam sapiente.
                                </p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>
                                    L12312321orem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nisi
                                    quisquam sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
                                    nisi quisquam sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Commodi nisi quisquam sapiente.
                                </p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>
                                    12312Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nisi quisquam
                                    sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nisi
                                    quisquam sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
                                    nisi quisquam sapiente.
                                </p>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
