import { Container, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react'
import { useQuery } from 'react-query';
import { MapPoints } from '../../components/molecules/MapPoints';
import { api } from '../../shared/api/api';

export const EventPoints: React.FC = () => {
    const { data: userInfo, isFetched } = useQuery("getProfileInfo", api.user.getProfileInfo);
    // const { data: eventPoints } = useQuery("eventPoints", api.admin.getEventPoints);

    let component = <Spinner size="lg" />;

    if (isFetched) {
        component = (
            <Container maxW="container.lg">
                <Heading marginY="8">Etkinlik Noktaları</Heading>
                <MapPoints
                    center={{ lat: userInfo?.lat, lng: userInfo?.lng }}
                    points={[]}
                />
            </Container>
        );
    }
    return <Container centerContent maxW="container.lg">{component}</Container>;

}