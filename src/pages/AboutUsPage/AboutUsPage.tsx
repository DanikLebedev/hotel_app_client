import React from 'react';
import './AboutUsPage.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { config } from '../../config';

export const AboutUsPage: React.FC = () => {
    return (
        <>
            <video className="videoTag" autoPlay loop muted>
                <source src={config.baseUrl + 'video.mp4'} type="video/mp4" />
            </video>
            <Container className="about-us__page">
                <h1 className="text-white text-center">About us</h1>
                <Row>
                    <Col lg={6} className="about-us__page-photo" md={6} sm={6}></Col>
                    <Col lg={6} md={6} sm={6} className="about-us__page-text">
                        <h3>We are the best</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolor ex ipsam mollitia nam
                            neque nobis numquam placeat tempore voluptates! Aut cum dolores inventore iusto nam natus
                            praesentium sit suscipit!
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container fluid={true}>
                <Row className={'about-us__page-gallery'}>
                    <Col lg={3}>asdasd</Col>
                    <Col lg={3}>asd</Col>
                    <Col lg={3}>asd</Col>
                    <Col lg={3}>asd</Col>
                </Row>
            </Container>
        </>
    );
};
