import { Box } from '@chakra-ui/layout';
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    MarkerClusterer,
} from '@react-google-maps/api';
import React, { useState } from 'react';
import { TitleToColorMapping } from '../../constants/Mappings';
import { RecyclePoint, UserRequest } from '../../shared/types';

export interface MapPoinstProps {
    recyclePoints?: RecyclePoint[];
    center?: { lat: number | undefined; lng: number | undefined };
    userRequestPoints?: UserRequest[];
}

const options = {
    imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
};

const containerStyle = {
    width: '100%',
    height: '600px',
};

function createKey(location: any) {
    return location.lat + location.lng + Math.random() * 3000;
}

export const MapPoints: React.FC<MapPoinstProps> = ({
    recyclePoints,
    center = { lat: 39.925533, lng: 32.866287 },
    userRequestPoints,
}) => {
    const [position, setPosition] = useState<RecyclePoint | null>(null);
    let data: any;
    if (userRequestPoints) {
        data = userRequestPoints.map((el) => {
            return {
                lat: el.issuer.latitude,
                lng: el.issuer.longitude,
            };
        });
    }

    const markers = recyclePoints ? (
        <>
            {recyclePoints?.map((el: RecyclePoint, index) => {
                return (
                    <Marker
                        key={index}
                        icon={TitleToColorMapping[el.recyclePointPlaceType]}
                        position={{ lat: el.lat, lng: el.lng }}
                        title={el.recyclePointDetail}
                        onClick={() => setPosition(el)}
                    />
                );
            })}
        </>
    ) : (
        <MarkerClusterer options={options}>
            {(clusterer) =>
                data.map((location: any) => (
                    <Marker
                        key={createKey(location)}
                        position={location}
                        clusterer={clusterer}
                    />
                ))
            }
        </MarkerClusterer>
    );

    return (
        <LoadScript googleMapsApiKey='AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                {markers}
                {recyclePoints && position && (
                    <InfoWindow
                        position={{ lat: position.lat, lng: position.lng }}
                        onCloseClick={() => setPosition(null)}
                    >
                        <Box p='4'>{position.recyclePointDetail}</Box>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};
