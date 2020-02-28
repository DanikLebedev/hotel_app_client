import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export const MapComponent = () => {
    return (
        <YMaps>
            <div id="map">
                <Map defaultState={{ center: [53.91172, 27.633786], zoom: 15 }} width="100%" height="400px">
                    <Placemark geometry={[53.91172, 27.633786]} />
                </Map>
            </div>
        </YMaps>
    );
};
