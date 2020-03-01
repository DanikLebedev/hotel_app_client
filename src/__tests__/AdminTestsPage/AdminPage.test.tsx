import React from 'react';
import { AdminPage } from '../../pages/AdminPage/AdminPage';
import { shallow } from 'enzyme';
import { AdminPageInfo } from '../../components/AdminPageInfo/AdminPageInfo';
import { CategoryDataGrid } from '../../components/GridComponents/Grids/CategoryDataGrid/CategoryDataGrid';
import { EmployeeDataGrid } from '../../components/GridComponents/Grids/EmployeeDataGrid/EmployeeDataGrid';
import { FeedbackDataGrid } from '../../components/GridComponents/Grids/FeedbackDataGrid/FeedbackDataGrid';
import { RoomDataGrid } from '../../components/GridComponents/Grids/RoomDataGrid/RoomDataGrid';
import { OrderDataGrid } from '../../components/GridComponents/Grids/OrderDataGrid/OrderDataGrid';

describe('admin page test tests', () => {
    it('should renders admin page without crashing', function() {
        shallow(<AdminPage />);
    });

    it('should renders admin page info without crashing', function() {
        shallow(<AdminPageInfo />);
    });
});

describe('admin page data grid tests', () => {
    it('should renders without crashing', function() {
        shallow(<CategoryDataGrid />);
    });
    it('should renders without crashing', function() {
        shallow(<EmployeeDataGrid />);
    });
    it('should renders without crashing', function() {
        shallow(<FeedbackDataGrid />);
    });
    it('should renders without crashing', function() {
        shallow(<RoomDataGrid />);
    });
    it('should renders without crashing', function() {
        shallow(<OrderDataGrid />);
    });
});

describe('admin page create form tests', () => {
    // it('should renders without crashing', function() {
    //     shallow(<AdminCategoryForm closeModal={} />);
    // });
    // it('should renders without crashing', function() {
    //     shallow(<AdminCategoryForm />);
    // });
    // it('should renders without crashing', function() {
    //     shallow(<AdminCategoryForm />);
    // }); it('should renders without crashing', function() {
    //     shallow(<AdminCategoryForm />);
    // });
    //
    //
})
