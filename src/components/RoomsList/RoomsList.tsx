import React, {useEffect, useState} from 'react'
import RoomItem from "../RoomItem/RoomItem";
import Loader from "../Loader/Loader";
import {RoomService} from "../../APIServices/roomService";
import {Room} from "../../interfaces/clientInterfaces";

export const RoomsList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([])
    useEffect(() => {
        RoomService.getAllRooms().then(({rooms}) => setRooms(rooms))
    }, [RoomService.getAllRooms])


    return (
        <div>
            {!rooms[0] ? <Loader/> : rooms.map((room: Room, i: number) => {
                return <RoomItem key={room.title + i} roomInfo={room}/>
            })}
        </div>
    )
}

export default RoomsList