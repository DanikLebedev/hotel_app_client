import React, { useEffect, useState } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AdminPage } from './pages/AdminPage/AdminPage';
import i18n from './i18n';


const App: React.FC = () => {
    const { login, logout, token, userId, userStatus, userEmail } = useAuth();
    const isAuthenticated = !!token;
    const routes: JSX.Element = useRoutes(isAuthenticated, userStatus);
    if (userStatus === 'admin') {
        return (
            <AuthContext.Provider
                value={{
                    token,
                    login,
                    logout,
                    userId,
                    isAuthenticated,
                    userStatus,
                    userEmail,
                }}
            >
                <AdminPage />
            </AuthContext.Provider>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
                userStatus,
                userEmail,
            }}
        >
            <Router >
                <Header />
                {routes}
            </Router>
            <Footer />
        </AuthContext.Provider>
    );
};
export default App;
