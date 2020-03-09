import React, { useContext } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import Loader from '../Loader/Loader';
import { Article, Room } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import ArticleItem from '../ArticleItem/ArticleItem';

export const ArticlesList: React.FC = (): JSX.Element => {
    const fetchedArticles: Article[] = useContext(ClientContext).fetchedAllArticles;
    return (
        <div>
            {!fetchedArticles ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Loader />
                </div>
            ) : (
                fetchedArticles.map((article: Article, i: number) => {
                    return <ArticleItem key={article.title + i} articleInfo={article} />;
                })
            )}
        </div>
    );
};

export default ArticlesList;
