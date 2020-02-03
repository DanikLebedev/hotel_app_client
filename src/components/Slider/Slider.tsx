import React from 'react'
import {Carousel} from "react-bootstrap";
import './Slider.scss'

export const Slider = () => {
    return (
        <Carousel fade={true} className='slider'>
            <Carousel.Item>
                <img
                    className="d-block w-100 vh-100"
                    src="https://images.unsplash.com/photo-1574873215043-44119461cb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 vh-100"
                    src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 vh-100"
                    src="https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}