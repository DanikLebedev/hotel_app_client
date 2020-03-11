import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AdminNavigation } from '../../components/AdminNavigation/AdminNavigation';
import { AdminPageInfo } from '../../components/AdminPageInfo/AdminPageInfo';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CometChatSupport from '../../components/CometChatSupport/CometChatSupport';


export const AdminPage: React.FC = () => {
    const routes: JSX.Element = (
        <Switch>
            <Route path="/admin/info" exact>
                <AdminPageInfo />
            </Route>
            <Redirect to={'/admin/info'} />
        </Switch>
    );

    return (
        <Router>
            <div className={'admin-page-wrapper'}>
                <h1 className="text-center m-3">Admin Page</h1>
                <AdminNavigation />
                {routes}
            </div>
        </Router>
    );
};
