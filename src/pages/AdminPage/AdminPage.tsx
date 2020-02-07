import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import '../../assets/rglstyles.css'
import '../../assets/resizablestyles.css'
import {AdminNavigation} from "../../components/AdminNavigation/AdminNavigation";
import {AdminPageInfo} from "../../components/AdminPageInfo/AdminPageInfo";
import {AdminPageCreate} from "../../components/AdminPageCreate/AdminPageCreate";


export const AdminPage: React.FC = () => {

    const routes = (
        <Switch>
            <Route path='/admin/info' exact>
                <AdminPageInfo/>
            </Route>
            <Route path='/admin/create' exact>
                <AdminPageCreate/>
            </Route>
            <Redirect to={'/admin/info'}/>
        </Switch>
    )

    return (
        <Router>
            <h1 className='text-center m-3'>Admin Page</h1>
            <AdminNavigation/>
            {routes}
        </Router>
    )
}