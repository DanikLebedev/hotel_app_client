import React from 'react';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage';
import { shallow } from 'enzyme';

describe('about us page tests', () => {
    it('should renders without crashind', function() {
        shallow(<AboutUsPage />);
    });
});
