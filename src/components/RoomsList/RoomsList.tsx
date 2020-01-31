import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import RoomItem from "../RoomItem/RoomItem";
import Loader from "../Loader/Loader";

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
    image: string;
}

export const RoomsList = () => {
    const [rooms, setRooms] = useState([])
    const {loading, request} = useHttp()
    const fetchRooms = useCallback(async () => {
        const fetchedRooms = await request('/api/client/rooms', "GET")
        setRooms(fetchedRooms)
    },[request])
    useEffect(() => {
        fetchRooms()
    },[fetchRooms])
    return (
        <div>
            {loading? <Loader/> : rooms.map(room => {
                return  <RoomItem data={room} />
            })}
        </div>
    )
}

export default RoomsList