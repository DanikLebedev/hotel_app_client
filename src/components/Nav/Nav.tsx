import React from "react";
import {Link, NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <div className="logo"></div>
            <ul>
                <Link to='/'>
                    <li>
                        Home
                    </li>
                </Link>
                <Link to='/rooms'>
                    <li>
                        Rooms
                    </li>
                </Link>
                <Link to='/admin'>
                    <li>
                        admin
                    </li>
                </Link>
            </ul>
            <a className='btn ' href="/">Book Room</a>
        </nav>
    )
}

export default Nav