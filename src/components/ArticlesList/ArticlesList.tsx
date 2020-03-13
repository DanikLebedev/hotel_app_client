import React, { useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Article } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import { Row } from 'react-bootstrap';
import ArticleItem from '../ArticleItem/ArticleItem';
import { ArticleService } from '../../APIServices/articleService';

export const ArticlesList: React.FC = (): JSX.Element => {
    const fetchedArticles: Article[] = useContext(ClientContext).fetchedAllArticles;
    const [articles, setArticles] = useState<Article[]>(fetchedArticles);
    useEffect(() => {
        ArticleService.getAllArticles().then(({ article }) => setArticles(article));
    }, [fetchedArticles]);
    return (
        <Row>
            {!articles ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Loader />
                </div>
            ) : (
                articles.map((article: Article, i: number) => {
                    return <ArticleItem key={article.title + i} articleInfo={article} />;
                })
            )}
        </Row>
    );
};

export default ArticlesList;
