import React, { useContext } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import { ClientContext } from '../../context/client.context';
import { Feedback } from '../../interfaces/clientInterfaces';

export const HomePageFeedback: React.FC = (): JSX.Element => {
    const fetchedFeedbacks: Feedback[] = useContext(ClientContext).fetchedFeedbacks;

    return (
        <section className="home-page__feedback mt-5 mb-5">
            <Container>
                <Row>
                    <Col lg={12} className="text-center">
                        <h2 className={'home-page__feedback-title section__title'}>Testimonials</h2>
                        <h4 className={'home-page__feedback-subtitle'}>what our happy cusomers said about us</h4>
                        <Carousel controls={false} interval={3000} className="p-2 home-page__feedback-slider">
                            {fetchedFeedbacks ? (
                                fetchedFeedbacks
                                    .filter(feedback => feedback.approved)
                                    .map((feedback, key) => {
                                        return (
                                            <Carousel.Item key={key}>
                                                <p>{feedback.message}</p>
                                                <p>
                                                    {feedback.userName} {feedback.userLastName}
                                                </p>
                                            </Carousel.Item>
                                        );
                                    })
                            ) : (
                                <Loader />
                            )}
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
