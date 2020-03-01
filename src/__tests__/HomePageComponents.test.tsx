import React from 'react';
import HomePageAboutUs from '../components/HomePageComponents/HomePageAboutUs';
import { shallow } from 'enzyme';

it('should renders a homePageArticles', function() {
    const wrapper = shallow(<HomePageAboutUs />);
    expect(wrapper).toMatchSnapshot();
});