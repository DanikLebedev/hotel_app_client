import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import './ArticlesPage.scss';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import ArticlesList from '../../components/ArticlesList/ArticlesList';

const ArticlesPage: FC = (): JSX.Element => {
    return (
        <div className="articles-page">
            <FindRoomForm />
            <div className="articles-page-bg d-flex justify-content-center align-items-end">
                <h1>Hotel news</h1>
            </div>
            <Container className="articles-page-wrapper">
                <ArticlesList />
            </Container>
        </div>
    );
};

export default ArticlesPage;
