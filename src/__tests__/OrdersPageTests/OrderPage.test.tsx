import { shallow } from 'enzyme';
import React from 'react';
import { OrderPage } from '../../pages/OrdersPage/OrdersPage';

describe('order page test tests', () => {
    it('should renders order page without crashing', function() {
        shallow(<OrderPage />);
    });
});
