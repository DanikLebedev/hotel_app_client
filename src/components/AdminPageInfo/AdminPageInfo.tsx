import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import '../../pages/AdminPage/AdminPage.scss';
import { RoomDataGrid } from '../GridComponents/Grids/RoomDataGrid/RoomDataGrid';
import { CategoryDataGrid } from '../GridComponents/Grids/CategoryDataGrid/CategoryDataGrid';
import { OrderDataGrid } from '../GridComponents/Grids/OrderDataGrid/OrderDataGrid';
import { EmployeeDataGrid } from '../GridComponents/Grids/EmployeeDataGrid/EmployeeDataGrid';
import { FeedbackDataGrid } from '../GridComponents/Grids/FeedbackDataGrid/FeedbackDataGrid';

export const AdminPageInfo: React.FC = () => {
    return (
        <Container className={'admin-page'} fluid={true}>
            <Tabs defaultActiveKey="category" id="uncontrolled-tab-example">
                <Tab eventKey="category" className="w-50" title="Categories">
                    <CategoryDataGrid />
                </Tab>
                <Tab eventKey="rooms" title="Rooms">
                    <RoomDataGrid />
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <OrderDataGrid />
                </Tab>
                <Tab title={'Employees'} eventKey="employees">
                    <EmployeeDataGrid />
                </Tab>
                <Tab title={'Feedbacks'} eventKey="feedbacks">
                    <FeedbackDataGrid />
                </Tab>
            </Tabs>
        </Container>
    );
};
