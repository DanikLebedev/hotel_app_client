import React from 'react';
import './HomePage.scss';
import HomePageAboutUs from '../../components/HomePageComponents/HomePageAboutUs';
import { HomePageRooms } from '../../components/HomePageComponents/HomePageRooms';
import { HomePageFeedback } from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageFeatures } from '../../components/HomePageComponents/HomePageFeatures';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { HomePageArticles } from '../../components/HomePageComponents/HomePageArticles';
import { BookForm } from '../../components/BookForm/BookForm';

export const HomePage: React.FC = () => {
    return (
        <>
            <BookForm />
            <HomePageAboutUs />
            <LazyLoadComponent>
                <HomePageRooms />
            </LazyLoadComponent>
            <HomePageFeedback />
            <HomePageFeatures />
            <HomePageArticles />
        </>
    );
};
