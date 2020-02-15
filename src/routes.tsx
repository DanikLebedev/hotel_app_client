import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { OrderPage } from './pages/OrdersPage/OrdersPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthAdminPage } from './pages/AuthAdminPage/AuthAdminPage';
import NotFound from './components/ErrorsComponents/404';
import { AboutUsPage } from './pages/AboutUsPage/AboutUsPage';
import { RoomInfoPage } from './pages/RoomInfoPage/RoomInfoPage';

export const useRoutes: (isAuthenticated: boolean, userStatus: string) => any = (
    isAuthenticated: boolean,
    userStatus: string,
) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/rooms" exact>
                    <RoomsPage />
                </Route>
                <Route path="/orders" exact>
                    <OrderPage />
                </Route>
                <Route path="/about" exact>
                    <AboutUsPage />
                </Route>
                <Route path="/rooms/:id">
                    <RoomInfoPage />
                </Route>
                <Route component={NotFound} />
            </Switch>
        );
    }

    if (userStatus === 'admin') {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/rooms" exact>
                    <RoomsPage />
                </Route>
                <Route path="/orders" exact>
                    <OrderPage />
                </Route>
                <Route path="/admin/login" exact>
                    <AuthAdminPage />
                </Route>
                <Route component={NotFound} />
                <Redirect to="/" />
            </Switch>
        );
    }

    if (userStatus === 'manager') {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/rooms" exact>
                    <RoomsPage />
                </Route>
                <Route path="/orders" exact>
                    <OrderPage />
                </Route>
                <Route path="/admin/login" exact>
                    <AuthAdminPage />
                </Route>
                <Route path="/about" exact>
                    <AboutUsPage />
                </Route>
                <Route component={NotFound} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/admin/login" exact>
                <AuthAdminPage />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/rooms" exact>
                <RoomsPage />
            </Route>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Route path="/about" exact>
                <AboutUsPage />
            </Route>
            <Route path="/rooms/:id">
                <RoomInfoPage />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
};
