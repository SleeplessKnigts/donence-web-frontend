import React, {useState} from 'react'
import './map.css'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';


type MapProps = {
    location?: string
    zoomLevel?: number
}
const containerStyle = {
    width: '800px',
    height: '400px'
};

const defaultLocation = {
    lat: 36.879621,
    lng: 35.768054
};
const AnyReactComponent = ({text}: any) => <div>{text}</div>;

export const Map: React.FC<MapProps> = () => {
    const [center, setCenter] = useState({lat: 51.0168, lng: 76.9558});
    const [show, setShow] = useState(false);

    const [currentLoc, setCurrentLoc] = useState({})
    const onMarkerDragEnd = (values: any) => {
        const lat = values?.lat();
        const lng = values?.lng();
        setCurrentLoc({ lat, lng});
        console.log(currentLoc);
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
                        center={center}
                        zoom={10}
                    >
                        <Marker key="Example"
                                onClick={() => setShow(true)}
                                position={defaultLocation}
                                draggable={true}
                                onDragEnd={(e) => onMarkerDragEnd(e.latLng)}
                        />
                        {show && (
                            <InfoWindow
                                position={currentLoc}
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