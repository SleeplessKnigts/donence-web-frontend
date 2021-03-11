import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ReactComponent as WorldLogo } from "../../assets/planet-earth.svg";
import { Link } from "react-router-dom";

interface LogoProps {
    height?: number;
    width?: number;
}

export const Logo: React.FC<LogoProps> = ({ height = 48, width = 48 }) => {
    return (
        <Box>
            <Text fontSize="lg" fontWeight="bold">
                <Link to={"/"}>
                    <WorldLogo height={height} width={width} />
                </Link>
            </Text>
        </Box>
    );
};
