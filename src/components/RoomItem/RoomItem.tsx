import React, {PropsWithChildren} from 'react'
import {config} from '../../config'
import {Room} from "../../interfaces/clientInterfaces";
import {Col, Container, Row} from "react-bootstrap";
import './RoomItem.scss'



export const RoomItem = (props: {roomInfo: Room}) => {
    return (
       <Container>
           <Row className='rooms-page__item mb-3'>
               <Col lg={6}>
                   <img style={{width: '80%', height: '80%'}} src={config.baseUrl + props.roomInfo.image } alt="img"/>
               </Col>
               <Col lg={6}>
                   <h3>{props.roomInfo.title}</h3>
                   <div className='d-flex'>
                       <p>Category: {props.roomInfo.category}</p>
                       <p>Price: {props.roomInfo.price}</p>
                   </div>
                    <div  className='d-flex'>
                        <p>Area: {props.roomInfo.area}</p>
                        <p>Guests: {props.roomInfo.guests}</p>
                        <p>Rooms: {props.roomInfo.rooms}</p>
                    </div>
                   <p>Description: {props.roomInfo.description}</p>
                   <button className='button btn-black'>Book Room</button>
               </Col>
           </Row>
       </Container>
    )
}

export default RoomItem