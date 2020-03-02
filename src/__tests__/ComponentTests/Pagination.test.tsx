import { mount, shallow } from 'enzyme';
import React from 'react';
import { Pagination } from '../../components/Pagination/Pagination';

it('should render without crashing', function() {
    const paginate = jest.fn();
    const wrapper = shallow(<Pagination currentPage={2} paginate={paginate} postPerPage={2} totalPosts={10} />);
    expect(wrapper).toMatchSnapshot();
});

it('should change active item ', function() {
    const paginate = jest.fn();
    const wrapper = mount(<Pagination currentPage={2} paginate={paginate} postPerPage={2} totalPosts={10} />);
    expect(wrapper.find('.page-item .active-link')).toBeDefined();
});
