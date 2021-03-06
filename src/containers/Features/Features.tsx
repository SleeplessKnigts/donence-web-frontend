import { Heading, SimpleGrid } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';

export interface FeaturesProps {
    title: string;
    children: ReactNode;
}

export const Features: React.FC<FeaturesProps> = ({ title, children }) => {
    return (
        <>
            <Heading marginY='8' marginX='auto'>
                {title}
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing='8'>
                {children}
            </SimpleGrid>
        </>
    );
};
