import { Box } from "@chakra-ui/layout";
import { GoogleMap, InfoWindow, LoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
import React, { useState } from "react";
import { TitleToColorMapping } from "../../constants/Mappings";
import { EventPoints } from "../../pages/User/EventPoints";
import { CollectionEvent, RecyclePoint, UserRequest } from "../../shared/types";

export interface MapPoinstProps {
    recyclePoints?: RecyclePoint[];
    center?: { lat: number | undefined; lng: number | undefined };
    userRequestPoints?: UserRequest[];
    eventPoints?: CollectionEvent[];
}

const options = {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

const containerStyle = {
    width: "100%",
    height: "600px",
};

function createKey(location: any) {
    return location.lat + location.lng + Math.random() * 3000;
}

function isRecyclePoint(object: any): object is RecyclePoint {
    return "recyclePointDetail" in object;
}

export const MapPoints: React.FC<MapPoinstProps> = ({
    recyclePoints,
    center = { lat: 39.925533, lng: 32.866287 },
    userRequestPoints,
    eventPoints,
}) => {
    const [position, setPosition] = useState<RecyclePoint | CollectionEvent | null>(null);
    let data: any;

    if (userRequestPoints) {
        data = userRequestPoints.map((el) => {
            return {
                lat: el.issuer.latitude,
                lng: el.issuer.longitude,
            };
        });
    }
    let markers;
    if (recyclePoints) {
        markers = (
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
        );
    } else if (userRequestPoints) {
        markers = (
            <MarkerClusterer options={options}>
                {(clusterer) =>
                    data.map((location: any) => (
                        <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                    ))
                }
            </MarkerClusterer>
        );
    } else {
        markers = (
            <>
                {eventPoints?.map((el: CollectionEvent, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{ lat: el.lat, lng: el.lng }}
                            title={el.eventDetail}
                            onClick={() => setPosition(el)}
                        />
                    );
                })}
            </>
        );
    }

    return (
        <LoadScript googleMapsApiKey="AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                {markers}
                {(recyclePoints || eventPoints) && position && (
                    <InfoWindow
                        position={{ lat: position.lat, lng: position.lng }}
                        onCloseClick={() => setPosition(null)}
                    >
                        <Box p="4">{isRecyclePoint(position) ? position.recyclePointDetail : position.eventDetail}</Box>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};
