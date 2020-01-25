import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'

const routes = useRoutes(false)

const App: React.FC = () => {
    return (
       <Router>
           <div>
               {routes}
           </div>
       </Router>
    )
}
//
export default App;


