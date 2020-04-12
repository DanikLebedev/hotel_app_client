import { shallow } from 'enzyme';
import React from 'react';
import AuthPage from '../../pages/AuthPage/AuthPage';
import { AuthAdminPage } from '../../pages/AuthAdminPage/AuthAdminPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

it('should renders without crashing', function() {
    const wrapper = shallow(
        <Router history={createMemoryHistory()}>
            <AuthPage />
        </Router>,
    );
    expect(wrapper).toMatchSnapshot();
});

it('should renders without crashing', function() {
    const wrapper = shallow(
        <Router history={createMemoryHistory()}>
            <AuthAdminPage />
        </Router>,
    );
    expect(wrapper).toMatchSnapshot();
});
