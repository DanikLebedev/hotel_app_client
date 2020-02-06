import React from 'react'
import {config} from '../../config'
import {Room} from "../../interfaces/clientInterfaces";



export const RoomItem = (props:{roomInfo: Room}) => {
    return (
        <div>
            <h3>{props.roomInfo.title}</h3>
            <p>Category: {props.roomInfo.category}</p>
            <p>Price: {props.roomInfo.price}</p>
            <p>Area: {props.roomInfo.area}</p>
            <p>Guests: {props.roomInfo.guests}</p>
            <p>Rooms: {props.roomInfo.rooms}</p>
            <p>Description: {props.roomInfo.description}</p>
            <img style={{width: '100px', height: '100px'}} src={config.baseUrl + props.roomInfo.image } alt="img"/>
        </div>
    )
}

export default RoomItem