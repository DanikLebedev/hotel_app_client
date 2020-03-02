import { mount, shallow } from 'enzyme';
import React from 'react';
import { OrderPage } from '../../pages/OrdersPage/OrdersPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('order page test tests', () => {
    const history = createMemoryHistory();
    it('should renders order page without crashing', function() {
        const wrapper = shallow(<OrderPage />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should toggle toolbar', function() {
        const wrapper = mount(
            <Router history={history}>
                <OrderPage />
            </Router>,
        );

        const ToggledToolBar = wrapper.find('.setting-wrapper');
        expect(ToggledToolBar).toMatchSnapshot();
        expect(ToggledToolBar.hasClass('open-settings')).toBeFalsy();
        const button = wrapper.find('#toggle-settings-button');
        button.first().simulate('click');
        expect(ToggledToolBar).toThrowErrorMatchingSnapshot();
    });

    it('should show feedback modal', function() {
        const wrapper = mount(
            <Router history={history}>
                <OrderPage />
            </Router>,
        );
        const button = wrapper.find('#show-edit-modal');
        button.first().simulate('click');
        expect(wrapper.find('.edit-user-modal')).toBeDefined();
    });
});
