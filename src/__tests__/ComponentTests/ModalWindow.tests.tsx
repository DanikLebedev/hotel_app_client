import { mount, shallow } from 'enzyme';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import React from 'react';
import { EditUserInfoForm } from '../../components/EditUserInfoForm/EditUserInfo';
it('should render without crashing', function() {
    const closeModal = jest.fn();
    const wrapper = shallow(
        <EditUserInfoForm
            closeModal={closeModal}
            editProps={{ email: '', password: '', name: '', lastName: '', order: [] }}
            isEdit={false}
            show={false}
        />,
    );
    expect(wrapper).toMatchSnapshot();
});
