import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {OrdersPage} from "./pages/OrdersPage/OrdersPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { HomePage } from './pages/HomePage/HomePage';

export const useRoutes: (isAuthenticated: boolean) => (any) = (isAuthenticated: boolean) => {
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
                    <OrdersPage/>
                </Route>
                <Route path='/admin' exact>
                    <CreatePage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <HomePage/>
            </Route>
            <Route path='/rooms' exact>
                <RoomsPage/>
            </Route>
            <Route path='/auth' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}