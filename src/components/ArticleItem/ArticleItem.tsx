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
        <Col lg={4} md={4} sm={4} xs={4} className={'mb-4'} >
            <img className="articles-page__item-img" src={config.baseUrl + articleInfo.image} alt="img" />
            <h3>{articleInfo.title}</h3>
            <div className="rooms-page__item-text">
                <p>{articleInfo.createdAt ? new Date(articleInfo.createdAt).toLocaleDateString(): null}</p>
                <p>{kitcut(articleInfo.text, 100)}</p>
            </div>
            <NavLink to={`/articles/${articleInfo._id}`} id={`redirect-button`} className="button btn-black">
                Read More
            </NavLink>
        </Col>
    );
};

export default ArticleItem;
