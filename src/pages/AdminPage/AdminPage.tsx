import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AdminNavigation } from '../../components/AdminNavigation/AdminNavigation';
import { AdminPageInfo } from '../../components/AdminPageInfo/AdminPageInfo';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Col, Row } from 'react-bootstrap';
import {AdminPageCharts} from "../../components/AdminPageCharts/AdminPageCharts";
import {AdminPageHome} from "../../components/AdminPageHome/AdminPageHome";

export const AdminPage: React.FC = () => {
    const routes: JSX.Element = (
        <Switch>
            <Route path="/admin/home" exact>
                <AdminPageHome />
            </Route>
            <Route path="/admin/edit" exact>
                <AdminPageInfo />
            </Route>
            <Route path="/admin/charts" exact>
                <AdminPageCharts />
            </Route>
            <Redirect to={'/admin/home'} />
        </Switch>
    );

    return (
        <Router>
            <div className={'admin-page-wrapper'}>
                <div className={'admin-navigation'}>
                    <AdminNavigation />
                </div>
                <Col lg={3} md={3} sm={3} />
                <Col lg={8} md={8} sm={8} className={'pt-3'}>
                    {routes}
                </Col>
            </div>
        </Router>
    );
};
