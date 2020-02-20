import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import galleryPhoto1 from '../../assets/images/cream_candles_flowers_green_therapy_11044_1600x1200.jpg';
import galleryPhoto2 from '../../assets/images/thumb-1920-206717.jpg'
import galleryPhoto3 from '../../assets/images/10-103370_salad-food-wallpaper-food-images-high-resolution.jpg';
import galleryPhoto4 from '../../assets/images/high-resolution-gif-1.gif';

export const HomePageArticles = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col
                    lg={4}
                    md={3}
                    sm={3}
                    className={'home-page-articles-item'}
                    style={{ background: `url(${galleryPhoto1}) center center / cover`, height: '20rem' }}
                >
                    <div className={'article-info'}>
                        <h4>Health SPA</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <a href="/">Read more</a>
                    </div>
                </Col>
                <Col
                    lg={4}
                    md={3}
                    sm={3}
                    className={'home-page-articles-item'}
                    style={{ background: `url(${galleryPhoto2}) center center / cover`, height: '20rem' }}
                >
                    <div className={'article-info'}>
                        <h4>Golf</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <a href="/">Read more</a>
                    </div>
                </Col>
                <Col
                    lg={4}
                    md={3}
                    sm={3}
                    className={'home-page-articles-item'}
                    style={{ background: `url(${galleryPhoto3}) center center / cover `, height: '20rem' }}
                >
                    <div className={'article-info'}>
                        <h4>Food</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <a href="/">Read more</a>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col
                    lg={12}
                    md={12}
                    sm={12}
                    style={{ background: `url(https://media1.giphy.com/media/l0ErNCJXTuHPQIUZq/giphy.gif?cid=790b7611fc6a5b2663ae7eec0a9d42b8cc9e97735e537279&rid=giphy.gif) center / contain `, height: '20rem' }}
                ></Col>
            </Row>
        </Container>
    );
};
