import { Image } from "@chakra-ui/image";
import { Container, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useQuery } from "react-query";
import { MapPoints } from "../../components/molecules/MapPoints";
import { TitleToColorMapping } from "../../constants/Mappings";
import { api } from "../../shared/api/api";
import { CollectionEvent, UserInfo } from "../../shared/types";

export const EventPoints: React.FC = () => {
    const { data: userInfo, isFetched } = useQuery<UserInfo>("getProfileInfo", api.user.getProfileInfo);
    const { data: eventPoints } = useQuery<CollectionEvent[]>("eventPoints", api.user.getEventList);

    let component = <Spinner size="lg" />;

    if (isFetched) {
        component = (
            <Container maxW="container.lg">
                <Heading marginY="8">Etkinlik Noktaları</Heading>
                <Text marginBottom="12">
                    Aşağıda çevrenizdeki etkinlik noktalarını bulabilirsiniz. Etkinlik noktaları mahalledeki veya
                    civardaki yoğunluğa göre belirlenir ve değişiklik gösterebilir. İşaretçilerin üstüne tıkladığınızda
                    etkinliklerin tam yerini ve zamanını öğrenebilirsiniz.
                    <List spacing={3}>
                        {Object.keys(TitleToColorMapping).map((el, _idx) => {
                            const src = Object.values(TitleToColorMapping)[_idx];
                            return (
                                <ListItem key={el} display="inline" marginRight="8">
                                    <ListIcon as={Image} src={src} />
                                    {el}
                                </ListItem>
                            );
                        })}
                    </List>
                </Text>
                <MapPoints center={ userInfo?.lat ? {lat: userInfo?.lat, lng: userInfo?.lng} : undefined} eventPoints={eventPoints} />
            </Container>
        );
    }
    return (
        <Container centerContent maxW="container.lg">
            {component}
        </Container>
    );
};
