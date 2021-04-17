import React, { useEffect, useState } from 'react';
import './map.css';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { RecyclePoint } from '../../../shared/types';

type MapProps = {
    setCurrentLoc: Function;
    addPoint: boolean;
    currentLoc?: RecyclePoint;
    pointList?: RecyclePoint[];
};
const containerStyle = {
    height: '100%',
    width: '100w',
};

export const Map: React.FC<MapProps> = ({
    setCurrentLoc,
    currentLoc,
    addPoint,
    pointList,
}) => {
    const [show, setShow] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<RecyclePoint | null>();
    const [loc, setLoc] = useState({
        lat: currentLoc ? currentLoc?.lat : 39.90206617850302,
        lng: currentLoc ? currentLoc?.lng : 32.87345694647219,
    });
    const [points, setPoints] = useState<RecyclePoint[]>([]);

    const onMarkerDragEnd = (values: any) => {
        loc.lat = values?.lat();
        loc.lng = values?.lng();
        setCurrentLoc(loc);
    };

    return (
        <div className='map'>
            <div className='google-map'>
                <LoadScript googleMapsApiKey='AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={loc}
                        zoom={15}
                    >
                        <Marker
                            key='point'
                            onClick={() => setShow(true)}
                            position={loc}
                            draggable={true}
                            onDragEnd={(e) => onMarkerDragEnd(e.latLng)}
                        />

                        {show && (
                            <InfoWindow
                                position={loc}
                                onCloseClick={() => setShow(false)}
                            >
                                <p>{currentLoc?.recyclePointDetail}</p>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Map;
