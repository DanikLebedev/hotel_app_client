import React from 'react'
import {config} from '../../config'
interface Room extends Document {
    category: string;
    userId: string;
    isBooked: boolean;
    title: string;
    price: number;
    area: number;
    guests: number;
    rooms: number;
    description: string;
    image: string
}

export const RoomItem = (props:{data: Room}) => {
    return (
        <div>
            <h3>{props.data.title}</h3>
            <p>Category: {props.data.category}</p>
            <p>Price: {props.data.price}</p>
            <p>Area: {props.data.area}</p>
            <p>Guests: {props.data.guests}</p>
            <p>Rooms: {props.data.rooms}</p>
            <p>Description: {props.data.description}</p>
            <img style={{width: '100px', height: '100px'}} src={config.baseUrl + props.data.image } alt="img"/>
        </div>
    )
}

export default RoomItem