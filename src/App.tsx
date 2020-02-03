import React from 'react';
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header/Header";


const App: React.FC = () => {
    const {login, logout, token, userId} = useAuth()
    const isAuthenticated: boolean = !!token
    const routes: JSX.Element = useRoutes(isAuthenticated)


    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
            <Header/>
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}
export default App;


