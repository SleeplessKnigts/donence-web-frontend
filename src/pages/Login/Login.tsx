import React from "react";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export const Login: React.FC = (props) => {
    return (
        <a href="http://localhost:8080/api/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect">
            <Button leftIcon={<FcGoogle />} bg="brand.700" _hover={{ bg: "brand.800", color: "white" }}>
                Google ile devam et
            </Button>
        </a>
    );
};
