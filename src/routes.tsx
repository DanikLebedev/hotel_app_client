import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {OrderPage} from "./pages/OrdersPage/OrdersPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { HomePage } from './pages/HomePage/HomePage';
import {AuthAdminPage} from "./pages/AuthAdminPage/AuthAdminPage";

export const useRoutes: (isAuthenticated: boolean, userStatus:string) => any = (isAuthenticated: boolean, userStatus:string) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact>
                    <HomePage/>
                </Route>
                <Route path='/rooms' exact>
                    <RoomsPage/>
                </Route>
                <Route path='/orders' exact>
                    <OrderPage/>
                </Route>
                <Route path='/admin' exact>
                    <CreatePage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    if (userStatus === 'admin') {
        return  (
            <Switch>
                <Route path='/' exact>
                    <HomePage/>
                </Route>
                <Route path='/rooms' exact>
                    <RoomsPage/>
                </Route>
                <Route path='/orders' exact>
                    <OrderPage/>
                </Route>
                <Route path='/admin' exact>
                    <CreatePage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    if (userStatus === 'manager') {
        return  (
            <Switch>
                <Route path='/' exact>
                    <HomePage/>
                </Route>
                <Route path='/rooms' exact>
                    <RoomsPage/>
                </Route>
                <Route path='/orders' exact>
                    <OrderPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/admin/login' exact >
                <AuthAdminPage/>
            </Route>
            <Route path='/' exact>
                <HomePage/>
            </Route>
            <Route path='/rooms' exact>
                <RoomsPage/>
            </Route>
            <Route path='/auth' exact>
                <AuthPage/>
            </Route>
        </Switch>
    )
}