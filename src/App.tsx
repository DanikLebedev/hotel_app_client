import React from 'react';
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header/Header";
import { Footer } from './components/Footer/Footer';


const App: React.FC = () => {
    const {login, logout, token, userId, userStatus} = useAuth()
    const isAuthenticated: boolean = !!token
    const routes: JSX.Element = useRoutes(isAuthenticated, userStatus)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated, userStatus
        }}>
            <Router>
            <Header/>
            {routes}
            </Router>
            <Footer/>
        </AuthContext.Provider>
    )
}
export default App;


