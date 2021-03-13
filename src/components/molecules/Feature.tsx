import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

export interface FeatureProps {
    title: string;
    description: string;
    imageSource: string;
    direction?: "column" | "row";
}

export const Feature: React.FC<FeatureProps> = ({ title, description, imageSource, direction = "column" }) => {

    return (
        <Flex direction={{base:"column" ,md: direction}} align="center" >
            <Image src={imageSource} borderRadius="full" alt="Geri donusturelebilir atiklar" marginX="4" marginBottom="4" minHeight="200px"/>
            <Box>
                <Text fontSize="1.15em" fontWeight="bold" textAlign={direction === "row" ? "left" : "center"}>
                    {title}
                </Text>
                <Text fontSize="1em" fontWeight="normal" textAlign={direction === "row" ? "left" : "center"}>
                    {description}
                </Text>
            </Box>
        </Flex>
    );
};
