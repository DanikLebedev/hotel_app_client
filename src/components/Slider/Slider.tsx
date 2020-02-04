import React from 'react'
import {Carousel} from "react-bootstrap";
import './Slider.scss'
import firstImg from  '../../assets/images/dui21-deluxe-room1.add1.low-res.jpg'
import secondImg from '../../assets/images/manila_14.jpg'
import thirdImg from '../../assets/images/3-high-res-restaurant-30.jpg'

export const Slider = () => {
    return (
        <Carousel controls={false} interval={2000} fade={true} className='slider'>
            <Carousel.Item>
                <img
                    style={{height: '80vh'}}
                    className="d-block w-100"
                    src={firstImg}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: '80vh'}}
                    className="d-block w-100"
                    src={secondImg}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: '80vh'}}
                    className="d-block w-100"
                    src={thirdImg}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}