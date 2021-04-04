import { Image } from "@chakra-ui/image";
import { Container, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useQuery } from "react-query";
import { ObjectFlags } from "typescript";
import { MapPoints } from "../../components/molecules/MapPoints";
import { TitleToColorMapping } from "../../constants/Mappings";
import { api } from "../../shared/api/api";

export const RecyclingPoints: React.FC = () => {
    const { data: userInfo, isFetched } = useQuery("getProfileInfo", api.user.getProfileInfo);
    const { data: recylingPoints } = useQuery("recyclingPoints", api.user.getRecyclingPoints);

    let component = <Spinner size="lg" />;

    if (isFetched) {
        component = (
            <Container maxW="container.lg">
                <Heading marginY="8">Geri Dönüşüm Noktaları</Heading>
                <Text marginBottom="12">
                    Aşağıda çevrenizdeki geri dönüşüm noktalarını bulabilirsiniz. Bu geri dönüşüm noktaları sabittir ve
                    istediğiniz zaman katkıda bulunmanıza olanak sağlar.
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
                <MapPoints center={{ lat: userInfo?.lat, lng: userInfo?.lng }} recyclePoints={recylingPoints} />
            </Container>
        );
    }
    return (
        <Container centerContent maxW="container.lg">
            {component}
        </Container>
    );
};
