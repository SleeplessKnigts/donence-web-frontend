import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/layout";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface CardProps {
    heading: string;
    content: string;
    imageUrl: string;
    url?: string;
}

export const Card: React.FC<CardProps> = ({ heading, content, imageUrl, url }) => {
    return (
        <Box borderRadius="md" overflow="hidden" boxShadow="dark-lg">
            <Image src={imageUrl} alt={imageUrl} width="100%" />
            <Box p="2">
                <VStack alignItems="start" marginY="2" spacing="1">
                    <Box height={url ? "140px" : "full"} marginX="8" overflow="hidden">
                        <Heading
                            fontSize={url ? "2xl" : "3xl"}
                            fontWeight="bold"
                            flexWrap="nowrap"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        ></Heading>
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Box>
                    {url && (
                        <Link as={RouterLink} to={url} alignSelf="flex-end" color="GrayText">
                            Devamını Oku
                            <Icon as={FontAwesomeIcon} icon={faChevronRight} mx="1" />
                        </Link>
                    )}
                </VStack>
            </Box>
        </Box>
    );
};
