import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import './ArticlesPage.scss';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import {withTranslation} from "react-i18next";

const ArticlesPage: FC = ({t}:any): JSX.Element => {
    return (
        <div className="articles-page">
            <FindRoomForm />
            <div className="articles-page-bg d-flex justify-content-center align-items-end">
                <h1>{t('news.label')}</h1>
            </div>
            <Container className="articles-page-wrapper">
                <ArticlesList />
            </Container>
        </div>
    );
};

export default withTranslation()(ArticlesPage);
