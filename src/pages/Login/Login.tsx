import React from "react";
import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Logo } from "../../components/atoms/Logo";

export const Login: React.FC = (props) => {
    return (
        <Flex height="100vh" maxWidth="full" justifyContent="center" alignItems="center">
            <Stack boxShadow="inherit" padding="8" border="1px" borderRadius="lg" spacing="4" alignItems="center">
                <Logo height={128} width={128} />
                <Text fontWeight="bold">Yeni bir adım atmaya hazır mısınız?</Text>
                <a href="https://donence.herokuapp.com/api/oauth2/authorize/google?redirect_uri=https://donence.web.app/oauth2/redirect">
                    <Button
                        leftIcon={<FcGoogle />}
                        bg="brand.700"
                        color="brand.50"
                        _hover={{ bg: "brand.800", color: "white" }}
                    >
                        Google ile devam et
                    </Button>
                </a>
            </Stack>
        </Flex>
    );
};
