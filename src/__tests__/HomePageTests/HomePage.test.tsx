import React from 'react';
import { HomePage } from '../../pages/HomePage/HomePage';
import { shallow } from 'enzyme';
import HomePageAboutUs from '../../components/HomePageComponents/HomePageAboutUs';
import HomePageRooms from '../../components/HomePageComponents/HomePageRooms';
import HomePageFeatures from '../../components/HomePageComponents/HomePageFeatures';
import HomePageFeedback from '../../components/HomePageComponents/HomePageFeedback';
import { HomePageArticles } from '../../components/HomePageComponents/HomePageArticles';

it('should renders without crashing', function() {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
});

describe('render home page components', () => {
    it('should renders without crashing', function() {
        const wrapper = shallow(<HomePageAboutUs />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(<HomePageRooms />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(<HomePageFeatures />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(<HomePageFeedback />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(<HomePageArticles />);
        expect(wrapper).toMatchSnapshot();
    });
});
