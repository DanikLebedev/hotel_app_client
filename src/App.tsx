import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminPage from "./components/AdminPage/AdminPage";
import Rooms from "./components/Rooms/Rooms";



const App: React.FC = () => {
  return (
        <BrowserRouter>
            <Header/>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/rooms" component={Rooms}/>

                </Switch>
        </BrowserRouter>
  );
}

export default App;

// import React, {Component} from 'react';
// import './App.css';
//
// interface IUser {
//     id: number,
//     username: string
// }
//
// class App extends Component {
//     state = {users: []}
//
//     componentDidMount() {
//         fetch('/admin')
//             .then(res => res.json())
//             .then(users => this.setState({users}));
//     }
//
//     render() {
//         return (
//             <div className="App">
//                 <h1>Users</h1>
//                 {this.state.users.map((user:IUser) =>
//                     <div key={user.id}>{user.username}</div>
//                 )}
//             </div>
//         );
//     }
// }
//
// export default App
