import React from 'react'
import './Header.scss'
import Navigation from "../Navigation/Navigation";
import { Container } from 'react-bootstrap';
import {NavLink} from "react-router-dom";


const Header: React.FC = () => {
    return (
        <header>
            <Navigation/>
        </header>
    )
}


export default Header