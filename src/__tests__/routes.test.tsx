import React from 'react';
import { mount } from 'enzyme';
import NotFound from '../components/ErrorsComponents/404';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { useRoutes } from '../routes';
import { OrderPage } from '../pages/OrdersPage/OrdersPage';
import RoomsPage from '../pages/RoomsPage/RoomsPage';
import { AdminPage } from '../pages/AdminPage/AdminPage';
import  RoomInfoPage  from '../pages/RoomInfoPage/RoomInfoPage';
import { AdminPageInfo } from '../components/AdminPageInfo/AdminPageInfo';

describe('react router tests', () => {
    const routes: JSX.Element = useRoutes(true, '');

    test('render routes which depends on having token', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/orders']}>{routes}</MemoryRouter>);
        expect(wrapper.find(OrderPage)).toHaveLength(1);
    });

    test('invalid path should redirect to 404', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/%6012']}>{routes}</MemoryRouter>);
        expect(wrapper.find(NotFound)).toHaveLength(1);
    });

    test('valid path should render home page', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/']}>{routes}</MemoryRouter>);
        expect(wrapper.find(HomePage)).toHaveLength(1);
    });

    test('valid path should render rooms page', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/rooms']}>{routes}</MemoryRouter>);
        expect(wrapper.find(RoomsPage)).toHaveLength(1);
    });

    test('valid path should render admin page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/admin/info']}>
                <AdminPage />
            </MemoryRouter>,
        );
        expect(wrapper.find(AdminPageInfo)).toHaveLength(1);
    });

    test('valid path should render room info page', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/rooms/123']}>{routes}</MemoryRouter>);
        expect(wrapper.find(RoomInfoPage)).toHaveLength(1);
    });
});
