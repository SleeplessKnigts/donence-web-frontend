import { Box, Container, Heading } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Feature } from "../../components/molecules/Feature";
import { Features } from "../../containers/Features/Features";
import { api } from "../../shared/api/api";

export const UserHomePage = () => {

    const { data } = useQuery("getProfileInfo", api.user.getProfileInfo);

    return (
        <Container maxW="container.lg" paddingY="16" height="100vh">
            <Heading>Merhaba, {data?.fname}</Heading>
            <Box marginY="24">
                <Features title="">
                    <Link to="/donusum-noktalari">
                        <Feature
                            title="Dönüşüm Noktaları"
                            description=""
                            imageSource={
                                "https://cdn.dribbble.com/users/496123/screenshots/4474242/reduce__reuse__recycle.png?compress=1&resize=800x600"
                            }
                        />
                    </Link>
                    <Link to="/toplama-noktalari">
                        <Feature
                            title="Toplama Noktaları"
                            description=""
                            imageSource={
                                "https://cdn.dribbble.com/users/812639/screenshots/8347813/media/351086e33112143e5fbed225d6464dc2.jpg?compress=1&resize=800x600"
                            }
                        />
                    </Link>
                    <Link to="/user/katkilarim">
                        <Feature
                            title="Katkılarım"
                            description=""
                            imageSource={
                                "https://cdn.dribbble.com/users/1731254/screenshots/15197491/media/5ff7be8216c999e7554a23faa099f378.png?compress=1&resize=1000x750"
                            }
                        />
                    </Link>
                    {/* <Link to="/user/me">
                        <Feature title="Kullanıcı Bilgileri" description="" imageSource={data?.imageUrl} />
                    </Link> */}
                </Features>
            </Box>
        </Container>
    );
};
