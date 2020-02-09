import React from 'react'
import RoomsList from '../../components/RoomsList/RoomsList'
import {Container} from "react-bootstrap";
import './RoomsPage.scss'

export const RoomsPage = () => {
    return (
        <div className='room-page'>
            <div className='room-page-bg'></div>
            <Container className='room-page-wrapper'>
                <h1>Book Room</h1>
                <RoomsList/>
            </Container>

        </div>
    )
}

export default RoomsPage