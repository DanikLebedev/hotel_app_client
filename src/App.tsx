import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'
import Nav from "./components/Nav/Nav";



const App: React.FC = () => {
    const {login, logout, token, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token , login, logout, userId, isAuthenticated
        }}>
       <Router>
           <Nav/>
           <div>
               {routes}
           </div>
       </Router>
        </AuthContext.Provider>
    )
}
//
export default App;


