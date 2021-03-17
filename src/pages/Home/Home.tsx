import { Button, ButtonGroup } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Container, Heading, Text } from "@chakra-ui/layout";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { FcAndroidOs } from "react-icons/fc";
import { Link } from "react-router-dom";
import LandingPageImage from "../../assets/ac29042cc76a0c2abb33ba12dc30f37f.png";
import RecycleElements from "../../assets/Donence1.png";
import Feature1 from "../../assets/features1.png";
import Feature2 from "../../assets/features2.png";
import Feature3 from "../../assets/features3.png";
import Feature4 from "../../assets/features4.png";
import { Feature } from "../../components/molecules/Feature";
import { Features } from "../../containers/Features/Features";
import { AuthContext } from "../../context/AuthContext";
import { AdminHomePage } from "./AdminHomePage";
import { UserHomePage } from "./UserHomePage";

export const Home: React.FC = () => {
    const { isAuthenticated, userType } = useContext(AuthContext);

    let layout = (
        <>
            <Box position="relative" color="brand.800">
                <Image
                    src={LandingPageImage}
                    alt="Landing Page Image"
                    objectFit="cover"
                    maxHeight="80vh"
                    width="full"
                    opacity="0.5"
                />
                <Box maxWidth="16rem" position="absolute" left="10%" top="8%">
                    <Heading>Haydi sen de</Heading>
                    <Text
                        bgGradient="linear(to-r, #478ad2,#0f263d)"
                        bgClip="text"
                        fontSize="4xl"
                        fontWeight="extrabold"
                    >
                        dönüştür.
                    </Text>
                </Box>
            </Box>
            <Container color="brand.800" maxWidth="container.lg">
                <Heading marginY="8">Neden?</Heading>
                <Feature
                    title="Her gün daha da büyüyen dünyada atıkların yönetimi gayrı resmi ve dağıtık firmalar
                        tarafından yönetilmektedir."
                    description="Hal böyle olunca belediyeler ve daha büyük çaplı organizatörler geri dönüşümü efektif bir şekilde yönetmeyi başaramıyorlar. Dönence ise tek bir sistemden bütün verilere ve kaynaklara erişime izin vererek bu problemi çözmeyi amaçlıyor."
                    imageSource={RecycleElements}
                    direction="row"
                />

                <Features title="Çözümler">
                    <Feature
                        title="Haritalama"
                        description="Kullanıcılar, bulundukları adres üzerinde farklı isteklerde bulanabilirler."
                        imageSource={Feature1}
                    />
                    <Feature
                        title="Farkındalık"
                        description="Kullanıcılar, sağladıkları faydayı takip edebilirler."
                        imageSource={Feature2}
                    />
                    <Feature
                        title="Monitörleme"
                        description="Belediyeler mahalle ölçeğinde geri dönüşüm verisi toplayabilirler."
                        imageSource={Feature3}
                    />
                    <Feature
                        title="Toplama"
                        description="Belediyeler toplama noktaları oluşturup, kullanıcaların isteklerine cevap verebilirler."
                        imageSource={Feature4}
                    />
                </Features>
                <Center marginY="12">
                    <ButtonGroup
                        spacing="12"
                        variant="outline"
                        colorScheme="brand"
                    >
                        <Button rightIcon={<FcAndroidOs />} borderRadius="full">
                            İndirin
                        </Button>
                        <Link to="/giris-yap">
                            <Button
                                rightIcon={<FontAwesomeIcon icon={faUser} />}
                                borderRadius="full"
                            >
                                Üye olun
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Center>
            </Container>
        </>
    );

    if (
        isAuthenticated &&
        userType === "8a6ee639-a7e6-456f-af12-2b714df5fecd"
    ) {
        layout = <UserHomePage />;
    } else if (
        isAuthenticated &&
        userType === "395cc606-30da-4789-9bd3-acc1add79ef9"
    ) {
        layout = <AdminHomePage />;
    }

    return <>{layout}</>;
};
