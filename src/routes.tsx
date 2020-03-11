import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { OrderPage } from './pages/OrdersPage/OrdersPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthAdminPage } from './pages/AuthAdminPage/AuthAdminPage';
import NotFound from './components/ErrorsComponents/404';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import { RoomInfoPage } from './pages/RoomInfoPage/RoomInfoPage';
import Loader from './components/Loader/Loader';
import { SearchRoomsPage } from './pages/SearchRoomsPage/SearchRoomsPage';
import CometChatSupport from './components/CometChatSupport/CometChatSupport';
import { ArticleInfoPage } from './pages/ArticleInfoPage/ArticleInfoPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPage';
import { ManagerDashboard } from './pages/ManagerDashboard/ManagerDashboard';

export const useRoutes: (isAuthenticated: boolean, userStatus: string) => any = (
    isAuthenticated: boolean,
    userStatus: string,
) => {
    if (isAuthenticated && userStatus === 'manager') {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/rooms" exact>
                    <RoomsPage />
                </Route>
                <Route path="/rooms/:id">
                    <RoomInfoPage />
                </Route>
                <Route path="/articles/:id">
                    <ArticleInfoPage />
                </Route>
                <Route path="/articles">
                    <ArticlesPage />
                </Route>
                <Route path="/dashboard" exact>
                    <ManagerDashboard />
                </Route>
                <Route component={NotFound} />
            </Switch>
        );
    }

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/rooms" exact>
                    <Suspense fallback={<Loader />}>
                        <RoomsPage />
                    </Suspense>
                </Route>
                <Route path="/orders" exact>
                    <Suspense fallback={<Loader />}>
                        <OrderPage />
                    </Suspense>
                </Route>
                <Route path="/about" exact>
                    <AboutUsPage />
                </Route>
                <Route path="/rooms/:id">
                    <RoomInfoPage />
                </Route>
                <Route path="/searchRooms">
                    <SearchRoomsPage />
                </Route>
                <Route path="/articles/:id">
                    <ArticleInfoPage />
                </Route>
                <Route path="/articles">
                    <ArticlesPage />
                </Route>
                <Route component={NotFound} />
            </Switch>
        );
    }

    // if (userStatus === 'admin') {
    //     return (
    //         <Switch>
    //             <Route path="/" exact>
    //                 <HomePage />
    //             </Route>
    //             <Route path="/rooms" exact>
    //                 <RoomsPage />
    //             </Route>
    //             <Route path="/orders" exact>
    //                 <Suspense fallback={<Loader />}>
    //                     <OrderPage />
    //                 </Suspense>
    //             </Route>
    //             <Route path="/admin/login" exact>
    //                 <AuthAdminPage />
    //             </Route>
    //             <Route component={NotFound} />
    //             <Redirect to="/" />
    //         </Switch>
    //     );
    // }
    //

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
            <Route path="/articles/:id">
                <ArticleInfoPage />
            </Route>
            <Route path="/articles">
                <ArticlesPage />
            </Route>
            <Route path="/auth/password/:token">
                <ResetPasswordPage />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
};
