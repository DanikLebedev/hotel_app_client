import React from 'react'
import './Header.scss'
import Navigation from "../Navigation/Navigation";
import { Container } from 'react-bootstrap';
import {NavLink} from "react-router-dom";


const Header: React.FC = () => {
    return (
        <header>
            <Navigation/>
            <Container>
                <h1 className='header__title'>Welcome to Rixos Hotel</h1>
              <div className={"button__container"}>
                  <NavLink to={'/rooms'} >
                      <button className={'button'}>See rooms</button>
                  </NavLink>
                  <NavLink to={'/about'} >
                      <button className={'button'}>About us</button>
                  </NavLink>
              </div>
            </Container>

        </header>
    )
}


export default Header