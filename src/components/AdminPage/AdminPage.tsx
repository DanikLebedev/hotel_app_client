
import React, {Component} from 'react';

interface IUser {
    id: number,
    username: string
}

class AdminPage extends Component {
    // state = {users: []}
    //
    // componentDidMount() {
    //     fetch('/admin'  )
    //         .then(res => res.json())
    //         .then(users => this.setState({users}));
    // }

    render() {
        return (
            <div className="App">
                <h1>Admin</h1>
                {/*{this.state.users.map((user:IUser) =>*/}
                {/*    <div key={user.id}>{user.username}</div>*/}
                {/*)}*/}
            </div>
        );
    }
}




export default AdminPage