import { Container } from "@chakra-ui/layout";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { useQuery } from "react-query";
import { api } from "../../shared/api/api";
import { RecyclePoint } from "../../shared/types";

export interface MapPoinstProps {
    points: RecyclePoint[] | undefined;
    center?: { lat: number | undefined; lng: number | undefined };
}

const containerStyle = {
    width: "100%",
    height: "600px",
};

export const MapPoints: React.FC<MapPoinstProps> = ({ points, center={lat: 39.925533, lng: 32.866287}}) => {
    console.log(center);
    return (
        <LoadScript googleMapsApiKey="AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                {points?.map((el) => {
                    return <Marker position={{ lat: el.lat, lng: el.lng }} label={el.recyclePointDetail}></Marker>;
                })}
            </GoogleMap>
        </LoadScript>
    );
};
