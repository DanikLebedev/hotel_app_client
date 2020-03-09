import React from 'react';
import { config } from '../../config';
import { Article, Room } from '../../interfaces/clientInterfaces';
import { Col, Container, Row } from 'react-bootstrap';
import './ArticleItem.scss';
import { NavLink } from 'react-router-dom';

interface ArticleItemProps {
    articleInfo: Article;
}

function kitcut(text, limit) {
    text = text.trim();
    if (text.length <= limit) return text;

    text = text.slice(0, limit);
    const lastSpace = text.lastIndexOf(' ');

    if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
    }
    return text + '...';
}

const ArticleItem: ({ articleInfo }: ArticleItemProps) => any = ({ articleInfo }: ArticleItemProps) => {
    return (
        <Container className={'articles-page__wrapper'}>
            <Row className={'articles-page__item mb-3'}>
                <Col
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    className="articles-page__item-img"
                    style={{ background: `url(${config.baseUrl + articleInfo.image}) center center / cover` }}
                />
                <Col lg={6} md={6} sm={6} xs={6}>
                    <h3>{articleInfo.title}</h3>
                    <div className="rooms-page__item-text">
                        <p>{new Date(articleInfo.createdAt).toLocaleDateString()}</p>
                        <p>{kitcut(articleInfo.text, 100)}</p>
                    </div>
                    <NavLink to={`/articles/${articleInfo._id}`} id={`redirect-button`} className="button btn-black">
                        Read More
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
};

export default ArticleItem;
