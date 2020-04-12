import React from 'react';
import { AdminPage } from '../../pages/AdminPage/AdminPage';
import { shallow } from 'enzyme';
import { AdminPageInfo } from '../../components/AdminPageInfo/AdminPageInfo';
import { CategoryDataGrid } from '../../components/GridComponents/Grids/CategoryDataGrid/CategoryDataGrid';
import { EmployeeDataGrid } from '../../components/GridComponents/Grids/EmployeeDataGrid/EmployeeDataGrid';
import { FeedbackDataGrid } from '../../components/GridComponents/Grids/FeedbackDataGrid/FeedbackDataGrid';
import { RoomDataGrid } from '../../components/GridComponents/Grids/RoomDataGrid/RoomDataGrid';
import { OrderDataGrid } from '../../components/GridComponents/Grids/OrderDataGrid/OrderDataGrid';
import { AdminCategoryForm } from '../../components/GridComponents/GridsForms/AdminCategoryForm/AdminCategoryForm';
import { AdminEmployeeForm } from '../../components/GridComponents/GridsForms/AdminEmployeeForm/AdminEmployeeForm';
import { AdminFeedbackForm } from '../../components/GridComponents/GridsForms/AdminFeedbackForm/AdminFeedbackForm';
import { RoomForm } from '../../components/GridComponents/GridsForms/AdminRoomForm/RoomForm';
import {ArticleDataGrid} from "../../components/GridComponents/Grids/ArticleDataGrid/ArticleDataGrid";
import {AdminPageCharts} from "../../components/AdminPageCharts/AdminPageCharts";
import {AdminPageHome} from "../../components/AdminPageHome/AdminPageHome";

describe('admin page test tests', () => {
    it('should renders admin page without crashing', function() {
        const wrapper = shallow(<AdminPage />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders admin page info without crashing', function() {
        const wrapper = shallow(<AdminPageInfo />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders admin page info without crashing', function() {
        const wrapper = shallow(<AdminPageCharts />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders admin page info without crashing', function() {
        const wrapper = shallow(<AdminPageHome />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('admin page data grid tests', () => {
    it('should renders without crashing', function() {
        const wrapper = shallow(<CategoryDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should renders without crashing', function() {
        const wrapper = shallow(<EmployeeDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should renders without crashing', function() {
        const wrapper = shallow(<FeedbackDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should renders without crashing', function() {
        const wrapper = shallow(<RoomDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should renders without crashing', function() {
        const wrapper = shallow(<OrderDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(<ArticleDataGrid />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('admin page create form tests', () => {
    const mockFunc = jest.fn();
    it('should renders without crashing', function() {
        const wrapper = shallow(
            <AdminCategoryForm
                show={false}
                isEdit={false}
                update={mockFunc}
                closeModal={mockFunc}
                editProps={{ title: '' }}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(
            <AdminEmployeeForm
                show={false}
                isEdit={false}
                update={mockFunc}
                closeModal={mockFunc}
                editProps={{ email: '', password: '', status: '' }}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(
            <AdminFeedbackForm
                show={false}
                isEdit={false}
                update={mockFunc}
                closeModal={mockFunc}
                editProps={{ approved: false, message: '', userEmail: '', userLastName: '', userName: '' }}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without crashing', function() {
        const wrapper = shallow(
            <RoomForm
                show={false}
                isEdit={false}
                update={mockFunc}
                closeModal={mockFunc}
                editProps={{
                    area: 0,
                    category: '',
                    description: '',
                    guests: 0,
                    image: '',
                    isBooked: false,
                    price: 0,
                    rooms: 0,
                    title: '',
                    food: '',
                    beds: 0,
                }}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
