import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AdminNavigation } from '../../components/AdminNavigation/AdminNavigation';
import { AdminPageInfo } from '../../components/AdminPageInfo/AdminPageInfo';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Col, Row } from 'react-bootstrap';

export const AdminPage: React.FC = () => {
    const routes: JSX.Element = (
        <Switch>
            <Route path="/admin/edit" exact>
                <AdminPageInfo />
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
                <Col lg={3} md={3} sm={3}/>
                <Col lg={8} md={8} sm={8}>
                    {routes}
                </Col>
            </div>
        </Router>
    );
};
