import React, {FC} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'
import Navigation from "./components/Navigation/Navigation";



const App: React.FC = () => {
    const {login, logout, token, userId} = useAuth()
    const isAuthenticated: boolean = !!token
    const routes:JSX.Element = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token , login, logout, userId, isAuthenticated
        }}>
           <Router>
               <Navigation/>
               <div>
                   {routes}
               </div>
           </Router>
        </AuthContext.Provider>
    )
}
export default App;


