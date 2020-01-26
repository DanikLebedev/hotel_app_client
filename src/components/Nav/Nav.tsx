import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import './Nav.scss'


const Nav = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const isAuthenticated = auth.isAuthenticated;
    const logoutHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <nav>
            <div className="logo"></div>
            <ul>
                <NavLink to='/'>
                    <li>
                        Home
                    </li>
                </NavLink>
                <NavLink to='/rooms'>
                    <li>
                        Rooms
                    </li>
                </NavLink>
                {isAuthenticated ? <NavLink to='/admin'><li>admin</li></NavLink> : null}
                <NavLink to='/orders'>
                    <li>
                        orders
                    </li>
                </NavLink>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
            <a className='btn ' href="/">Book Room</a>
        </nav>
    )
}

export default Nav