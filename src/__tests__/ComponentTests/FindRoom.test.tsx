import { mount, shallow } from 'enzyme';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
it('should render without crashing', function() {
    const wrapper = shallow(<FindRoomForm />);
    expect(wrapper).toMatchSnapshot();
});

it('should toggle fixed form', function() {
    const history = createMemoryHistory();
    history.push('/rooms/1', { category: '123' });
    const wrapper = mount(
        <Router history={history}>
            <FindRoomForm />
        </Router>,
    );
    const unToggledForm = wrapper.find('#fixed-form-wrapper');
    expect(unToggledForm).toMatchSnapshot();
    expect(unToggledForm.hasClass('fixed-form-wrapper')).toBeTruthy();
    const button = wrapper.find('.toggle-fixed-form');
    button.simulate('click');
    expect(unToggledForm).toThrowErrorMatchingSnapshot();
});
