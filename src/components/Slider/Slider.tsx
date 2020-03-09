import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Slider.scss';
// import firstImg from './images/dui21-deluxe-room1.add1.low-res.jpg';
// import secondImg from './images/manila_14.jpg';
// import thirdImg from './images/3-high-res-restaurant-30.jpg';

export const Slider: React.FC = (): JSX.Element => {
    return (
        <Carousel indicators={false} controls={false} interval={2000} fade={true} className="slider">
            <Carousel.Item>
                <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/dui21-deluxe-room1.add1.low-res.jpg'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 " src={process.env.PUBLIC_URL + '/images/manila_14.jpg'} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/3-high-res-restaurant-30.jpg'} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
};
