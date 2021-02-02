import React, {useState} from 'react'
import './map.css'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';


type MapProps = {
    setCurrentLoc: Function;
}
const containerStyle = {
    width: '800px',
    height: '400px'
};

const defaultLocation = {
    lat: 39.904239006864785,
    lng: 32.87195490942385
};

export const Map: React.FC<MapProps> = ({setCurrentLoc}) => {
    const [show, setShow] = useState(false);
    setCurrentLoc(defaultLocation);
    let lat = 0,lng = 0;
    const onMarkerDragEnd = (values: any) => {
        lat = values?.lat();
        lng = values?.lng();
        setCurrentLoc({ lat, lng});
    };

    return (
        <div className="map">
            <h2 className="map-h2">ADD RECYCLE POINT FROM THE MAP BELOW</h2>
            <div className="google-map">
                <LoadScript
                    googleMapsApiKey="AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={defaultLocation}
                        zoom={15}
                    >
                        <Marker key="Example"
                                onClick={() => setShow(true)}
                                position={defaultLocation}
                                draggable={true}
                                onDragEnd={(e) => onMarkerDragEnd(e.latLng)}
                        />
                        {show && (
                            <InfoWindow
                                position={{ lat, lng}}
                                onCloseClick={() => setShow(false)}
                            >
                                <p>Deneme</p>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Map;