import React, {useCallback, useEffect, useState} from 'react'
import RoomItem from "../RoomItem/RoomItem";
import Loader from "../Loader/Loader";
import {RoomService} from "../../APIServices/roomService";
import {Room} from "../../interfaces/clientInterfaces";

export const RoomsList: React.FC = () => {
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([])

    const fetchRoom = useCallback( () => {
        RoomService.getAllRooms().then(({rooms}) => setFetchedRooms(rooms))
    },[])

    useEffect(() => {
        fetchRoom()
    }, [fetchRoom])

    return (
        <div>
            {!fetchedRooms[0] ? <Loader/> : fetchedRooms.map((room: Room, i: number) => {
                return <RoomItem key={room.title + i} roomInfo={room}/>
            })}
        </div>
    )
}

export default RoomsList