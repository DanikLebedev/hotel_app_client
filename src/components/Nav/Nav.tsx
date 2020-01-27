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


    const authComponents =  (
         <div style={{display: "flex"}}>
             <NavLink onClick={logoutHandler} to='"/"'><li>Logout</li></NavLink>
             <NavLink to='/orders'><li>orders</li></NavLink>
             <div style={{display: "flex"}}>
                 <NavLink to='/admin'><li>admin</li></NavLink>
             </div>
         </div>
    )

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
                {isAuthenticated ? authComponents:  <NavLink to='/auth'><li>login</li></NavLink> }
            </ul>
            <a className='btn ' href="/">Book Room</a>
        </nav>
    )
}

export default Nav