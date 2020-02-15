import React from 'react';
import './HomePage.scss';
import HomePageAboutUs from '../../components/HomePageComponents/HomePageAboutUs';
import { HomePageRooms } from '../../components/HomePageComponents/HomePageRooms';
import { HomePageFeedback } from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageFeatures } from '../../components/HomePageComponents/HomePageFeatures';
import { HomePageBookForm } from '../../components/HomePageComponents/HomePageBookForm';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export const HomePage: React.FC = () => {
    return (
        <>
            <HomePageAboutUs />
            <LazyLoadComponent>
                <HomePageRooms />
            </LazyLoadComponent>
            <HomePageBookForm />
            <HomePageFeedback />
            <HomePageFeatures />
        </>
    );
};
