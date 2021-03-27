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
        lat: currentLoc?.lat,
        lng: currentLoc?.lng,
    });
    const [points, setPoints] = useState<RecyclePoint[]>([]);

    if (pointList) {
        setPoints(pointList);
        console.log(pointList);
    }

    const onMarkerDragEnd = (values: any) => {
        loc.lat = values?.lat();
        loc.lng = values?.lng();
        setCurrentLoc(loc);
    };

    return (
        <div className='map'>
            <h2 className='map-h2'>
                İŞARETLEYİCİ İLE GERİ DÖNÜŞÜM NOKTASINI BELİRLEYİN
            </h2>
            <div className='google-map'>
                <LoadScript googleMapsApiKey='AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={loc}
                        zoom={15}
                    >
                        {addPoint ? (
                            <>
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
                            </>
                        ) : (
                            points.map((point) => (
                                <>
                                    <Marker
                                        key={point.recyclePointDetail}
                                        onClick={() => setSelectedPoint(point)}
                                        position={{
                                            lat: point.lat,
                                            lng: point.lng,
                                        }}
                                    />
                                    {selectedPoint ? (
                                        <InfoWindow
                                            position={loc}
                                            onCloseClick={() => {
                                                setSelectedPoint(null);
                                            }}
                                        >
                                            <p>
                                                {
                                                    selectedPoint.recyclePointDetail
                                                }
                                            </p>
                                        </InfoWindow>
                                    ) : null}
                                </>
                            ))
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Map;
