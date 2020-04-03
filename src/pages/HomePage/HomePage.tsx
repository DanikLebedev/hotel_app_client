import React from 'react';
import './HomePage.scss';
import HomePageAboutUs from '../../components/HomePageComponents/HomePageAboutUs';
import HomePageRooms from '../../components/HomePageComponents/HomePageRooms';
import HomePageFeedback from '../../components/HomePageComponents/HomePageFeedback';
import HomePageFeatures from '../../components/HomePageComponents/HomePageFeatures';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { HomePageArticles } from '../../components/HomePageComponents/HomePageArticles';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { MapComponent } from '../../components/YandexMap/YandexMap';
import ErrorBoundary from '../../components/ErrorsComponents/ErrorBoundary';

export const HomePage: React.FC = () => {
    return (
        <>
            <FindRoomForm />
            <HomePageAboutUs />
            <ErrorBoundary>
                <LazyLoadComponent>
                    <HomePageRooms />
                </LazyLoadComponent>
            </ErrorBoundary>
            <ErrorBoundary>
                <HomePageFeedback />
            </ErrorBoundary>
            <HomePageFeatures />
            <ErrorBoundary>
                <HomePageArticles />
            </ErrorBoundary>
            <MapComponent />
        </>
    );
};
