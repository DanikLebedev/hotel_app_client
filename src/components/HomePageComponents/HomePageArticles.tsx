import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import galleryPhoto1 from '../../../public/images/cream_candles_flowers_green_therapy_11044_1600x1200.jpg';
import galleryPhoto2 from '../../../public/images/thumb-1920-206717.jpg';
import galleryPhoto3 from '../../../public/images/10-103370_salad-food-wallpaper-food-images-high-resolution.jpg';
import galleryPhoto4 from '../../../public/images/colombo_2.jpg';
import { ClientContext } from '../../context/client.context';
import Loader from '../Loader/Loader';
import { config } from '../../config';

export const HomePageArticles = () => {
    const articles = useContext(ClientContext).fetchedAllArticles;
    return (
        <Container fluid={true}>
            <Row>
                {!articles ? (
                    <Loader />
                ) : (
                    articles.slice(0, 3).map((article, key) => {
                        return (
                            <Col
                                key={article._id}
                                lg={4}
                                md={4}
                                sm={4}
                                className={'home-page-articles-item'}
                                style={{
                                    background: `url(${config.baseUrl + article.image}) center center / cover`,
                                    height: '20rem',
                                }}
                            >
                                <div className={'article-info'}>
                                    <h4>{article.title}</h4>
                                    <NavLink to={`/articles/${article._id}`}>Read More</NavLink>
                                </div>
                            </Col>
                        );
                    })
                )}
                {/*    <Col*/}
                {/*        lg={4}*/}
                {/*        md={4}*/}
                {/*        sm={4}*/}
                {/*        className={'home-page-articles-item'}*/}
                {/*        style={{ background: `url(${galleryPhoto1}) center center / cover`, height: '20rem' }}*/}
                {/*    >*/}
                {/*        <div className={'article-info'}>*/}
                {/*            <h4>Health SPA</h4>*/}
                {/*            <p>Lorem ipsum dolor sit amet.</p>*/}
                {/*            <a href="/">Read more</a>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*    <Col*/}
                {/*        lg={4}*/}
                {/*        md={4}*/}
                {/*        sm={4}*/}
                {/*        className={'home-page-articles-item'}*/}
                {/*        style={{ background: `url(${galleryPhoto2}) center center / cover`, height: '20rem' }}*/}
                {/*    >*/}
                {/*        <div className={'article-info'}>*/}
                {/*            <h4>Golf</h4>*/}
                {/*            <p>Lorem ipsum dolor sit amet.</p>*/}
                {/*            <a href="/">Read more</a>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*    <Col*/}
                {/*        lg={4}*/}
                {/*        md={4}*/}
                {/*        sm={4}*/}
                {/*        className={'home-page-articles-item'}*/}
                {/*        style={{ background: `url(${galleryPhoto3}) center center / cover `, height: '20rem' }}*/}
                {/*    >*/}
                {/*        <div className={'article-info'}>*/}
                {/*            <h4>Food</h4>*/}
                {/*            <p>Lorem ipsum dolor sit amet.</p>*/}
                {/*            <a href="/">Read more</a>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Row>
            <Row>
                <Col
                    lg={12}
                    md={12}
                    sm={12}
                    style={{ background: `url(${process.env.PUBLIC_URL + '/images/colombo_2.jpg'}) center center / cover `, height: '20rem' }}
                />
            </Row>
        </Container>
    );
};
