import { Container, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useQuery } from "react-query";
import { MapPoints } from "../../components/molecules/MapPoints";
import { api } from "../../shared/api/api";

export const RecyclingPoints: React.FC = () => {
    const { data: userInfo, isFetched } = useQuery("getProfileInfo", api.user.getProfileInfo);
    const { data: recylingPoints } = useQuery("recyclingPoints", api.admin.getRecyclePoints);

    let component = <Spinner size="lg" />;

    if (isFetched) {
        component = (
            <Container maxW="container.lg">
                <Heading>This is good old geri donusum noktalari</Heading>
                <MapPoints
                    center={{ lat: userInfo?.latitude, lng: userInfo?.longitude }}
                    points={recylingPoints}
                />
            </Container>
        );
    }
    return <Container centerContent maxW="container.lg">{component}</Container>;
};
