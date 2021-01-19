import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ReactComponent as WorldLogo } from "../../assets/planet-earth.svg";
import { Link } from "react-router-dom";

export const Logo: React.FC = (props) => {
    return (
        <Box {...props}>
            <Text fontSize="lg" fontWeight="bold">
                <Link to={"/"}>
                    <WorldLogo height="48" width="48" />
                </Link>
            </Text>
        </Box>
    );
};
