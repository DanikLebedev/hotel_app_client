import React from 'react';
import './HomePage.scss';
import { HomePageAboutUs } from '../../components/HomePageComponents/HomePageAboutUs';
import { HomePageRooms } from '../../components/HomePageComponents/HomePageRooms';
import { HomePageFeedback } from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageFeatures } from '../../components/HomePageComponents/HomePageFeatures';

export const HomePage = () => {
    return (
        <>
            <HomePageAboutUs />
            <HomePageRooms />
            <HomePageFeedback />
            <HomePageFeatures />
        </>
    );
};
