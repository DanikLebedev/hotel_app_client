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
                    <AdminNavigation />
                <Col lg={10} md={9} sm={10} className={'admin-pages'}>
                    {routes}
                </Col>
            </div>
        </Router>
    );
};
