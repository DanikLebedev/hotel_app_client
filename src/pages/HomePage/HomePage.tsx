import React from 'react';
import './HomePage.scss';
import { HomePageAboutUs } from '../../components/HomePageComponents/HomePageAboutUs';
import { HomePageRooms } from '../../components/HomePageComponents/HomePageRooms';
import { HomePageFeedback } from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageFeatures } from '../../components/HomePageComponents/HomePageFeatures';
import { HomePageBookForm } from '../../components/HomePageComponents/HomePageBookForm';


export const HomePage = () => {
    return (
        <>
            <HomePageAboutUs />
            <HomePageRooms />
            <HomePageBookForm />
            <HomePageFeedback />
            <HomePageFeatures />
        </>
    );
};
