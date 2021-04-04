import { Box } from "@chakra-ui/layout";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import { TitleToColorMapping } from "../../constants/Mappings";
import { RecyclePoint } from "../../shared/types";

export interface MapPoinstProps {
    points: RecyclePoint[] | undefined;
    center?: { lat: number | undefined; lng: number | undefined };
}

const containerStyle = {
    width: "100%",
    height: "600px",
};

export const MapPoints: React.FC<MapPoinstProps> = ({ points, center = { lat: 39.925533, lng: 32.866287 } }) => {
    const [position, setPosition] = useState<RecyclePoint | null>(null);

    return (
        <LoadScript googleMapsApiKey="AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                {points?.map((el: RecyclePoint, index) => {
                    return (
                        <Marker
                            key={index}
                            icon={TitleToColorMapping[el.recyclyPointPlaceType]}
                            position={{ lat: el.lat, lng: el.lng }}
                            title={el.recyclePointDetail}
                            onClick={() => setPosition(el)}
                        />
                    );
                })}
                {position && (
                    <InfoWindow
                        position={{ lat: position.lat, lng: position.lng }}
                        onCloseClick={() => setPosition(null)}
                    >
                        <Box p="4">{position.recyclePointDetail}</Box>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};
