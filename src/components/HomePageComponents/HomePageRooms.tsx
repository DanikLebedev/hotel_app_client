import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import roomImage3 from "../../assets/images/14_tokyo-prince-hotel-rooms-4-8FSuperiorTwinRoom-noon-.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faBuilding, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {Room} from "../../interfaces/clientInterfaces";
import {RoomService} from "../../APIServices/roomService";
import Loader from "../Loader/Loader";
import {config} from "../../config";

export const HomePageRooms = () => {
    const [frooms, setRooms] = useState<Room[]>([])
    // @ts-ignore
    const [mainRoom, setMainRoom] = useState<Room>({})

    useEffect(() => {
        RoomService.getAllRooms().then(({rooms}) => {
            setRooms(rooms)
            setMainRoom(frooms[0])
        })
    },[RoomService.getAllRooms])




    return (
        <section className={'home__page-rooms'}>
            <Container fluid={true}>
                <Row>
                    <Col lg={6} md={6} className='p-0'>
                        <img src={roomImage3} className={'home__page-rooms-photo'} alt="room"/>
                    </Col>
                    <Col lg={6} md={6}>
                        <h2 className={'room__title section__title'}>{mainRoom ? mainRoom.title: null}</h2>
                        <div className={'room-info'}>
                            <p><span>{mainRoom ? mainRoom.price: null}</span>/Per Night</p>
                            <span className={'home-page-separator'}></span>
                            <p>Status: <span>5 Rooms left</span></p>
                        </div>
                        <div className={'room__icons'}>
                            <span><FontAwesomeIcon icon={faBed}/>{mainRoom? mainRoom.rooms: null} rooms</span>
                            <span><FontAwesomeIcon icon={faUserAlt}/>{mainRoom? mainRoom.guests: null} guests</span>
                            <span><FontAwesomeIcon icon={faBuilding}/>{mainRoom? mainRoom.area: null}m<sup>2</sup></span>
                        </div>
                        <p className={'home__page-rooms-description'}>{mainRoom? mainRoom.description: null}</p>
                        <div className={"button__container"}>
                            <button className={'button'}>Book Room</button>
                            <NavLink to={'/rooms'}>
                                <button className={'button'}>See Room</button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-content-around flex-nowrap mt-3 mr-2 ml-2 d-flex align-items-center'>
                    {frooms? frooms.map((item) => {
                        return (
                            <Col lg={3} md={3} className={'home__page-rooms-item'}>
                                <div className={'home__page-rooms-item-title'}>
                                    <span>{item.title}</span><span>{item.price}</span>
                                    <img src={config.baseUrl +item.image} width={100} height={100} alt=""/>
                                </div>
                            </Col>
                        )
                    }): <Loader/>}
                </Row>
            </Container>
        </section>
    )
}