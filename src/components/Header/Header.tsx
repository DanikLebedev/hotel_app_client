import React from 'react'
import './Header.scss'
import Nav from "../Nav/Nav";



const Header: React.FC = () => {
    return (
            <header>
                <div className="contacts">
                    <ul className='contacts__list'>
                        <li className='contacts__list-item'>
                            <p>Email Adress</p>
                            <span>csamHotel@mail.ru</span>
                        </li>
                        <li>
                            <p>Phone Number</p>
                            <span>+31654789321</span>
                        </li>
                        <li>
                            <p>Hotel Adress</p>
                            <span>Minsk, st. Filimonova 15</span>
                        </li>
                    </ul>
                </div>
                <Nav/>
                <div className="header__title__wrapper">
                    <h1 className="header__title">Welcome to SAM Hotel</h1>
                    <p className="header__subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                        commodi, est explicabo optio provident quasi?</p>
                    <div className="header__title__buttons">
                        <a href="/about" className='about-button btn'>About</a>
                        <a href="/rooms" className='see-rooms-button btn'>See room</a>
                    </div>
                </div>
            </header>

    )
}


export default Header