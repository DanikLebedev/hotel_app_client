import React, { useCallback, useState, useEffect } from 'react';
import { Article } from '../../interfaces/clientInterfaces';
import { useParams } from 'react-router-dom';
import { ArticleService } from '../../APIServices/articleService';
import { Col, Container, Row } from 'react-bootstrap';
import { config } from '../../config';
import Loader from '../../components/Loader/Loader';
import './ArticleInfoPage.scss';

export const ArticleInfoPage: React.FC = () => {
    const [articleInfo, setArticleInfo] = useState<Article[]>([]);
    const params: { id?: string } = useParams();
    const articleId: string | undefined = params.id;
    const fetchArticleInfo: CallableFunction = useCallback(() => {
        ArticleService.getArticleById(articleId).then(({ article }) => {
            setArticleInfo(article);
        });
    }, [articleId]);

    useEffect(() => {
        fetchArticleInfo();
    }, [fetchArticleInfo]);

    const articleInfoLayout: JSX.Element[] = articleInfo.map((article, key) => {
        return (
            <Row key={key}>
                <Col lg={6} md={6} sm={6}>
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={config.baseUrl + article.image}
                        alt="room"
                    />
                </Col>
                <Col>
                    <h3 className={'article-info-page-title'}>{article.title.toString()}</h3>
                    <h5>{new Date(article.createdAt).toLocaleDateString()}</h5>
                    <p className={'article-info-page-description'}>{article.text}</p>
                </Col>
            </Row>
        );
    });

    return (
        <div className="article-info-page">
            <div className="article-info-page-bg d-flex justify-content-center align-items-end" />
            <Container className="article-info-page-wrapper">
                {articleInfo.length !== 0 ? (
                    articleInfoLayout
                ) : (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Loader />
                    </div>
                )}
            </Container>
        </div>
    );
};
