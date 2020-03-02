import React from 'react';
import { HomePage } from '../../pages/HomePage/HomePage';
import { shallow } from 'enzyme';
import HomePageAboutUs from '../../components/HomePageComponents/HomePageAboutUs';
import HomePageRooms from '../../components/HomePageComponents/HomePageRooms';
import HomePageFeatures from '../../components/HomePageComponents/HomePageFeatures';
import HomePageFeedback from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageArticles } from '../../components/HomePageComponents/HomePageArticles';

it('should renders without crashing', function() {
    shallow(<HomePage />);
});


describe('render home page components', () => {
    it('should renders without crashing', function() {
        shallow(<HomePageAboutUs />);
    });

    it('should renders without crashing', function() {
        shallow(<HomePageRooms />);
    });

    it('should renders without crashing', function() {
        shallow(<HomePageFeatures />);
    });

    it('should renders without crashing', function() {
        shallow(<HomePageFeedback />);
    });

    it('should renders without crashing', function() {
        shallow(<HomePageArticles />);
    });
});

describe('testing base logic on home page', () => {
    it('should change image by click', function () {
        
    });
})
