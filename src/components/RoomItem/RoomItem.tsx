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
    // const arrayBufferToBase64 = (buffer: Buffer) => {
    //     let binary = '';
    //     const bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // };
    //
    //
    // const base64Flag = 'data:image/jpeg;base64,';
    // const imageStr = arrayBufferToBase64(props.data.image.data.data)
    //
    // const decodedUrl = base64Flag + imageStr

    //
    let str: string = props.data.image;   // ..\uploads\some_image.pnh
    let str2 = str.replace(/\\/g,"/")
    str.slice(1)
    //
    return (
        <div>
            <h3>{props.data.title}</h3>
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