import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react';

interface Props {
    onShowSidebar: Function;
    showSidebarButton?: boolean;
    titleText: string;
}

const Header = ({
    showSidebarButton = true,
    onShowSidebar,
    titleText,
}: Props) => {
    return (
        <Flex bg='green.700' p={4} color='white' justifyContent='center'>
            <Box flex='1'>
                {showSidebarButton && (
                    <IconButton
                        icon={<HamburgerIcon w={8} h={8} />}
                        colorScheme='white'
                        variant='outline'
                        onClick={() => onShowSidebar}
                        aria-label='Toggle'
                    />
                )}
            </Box>
            <Center flex='1' h='40px'>
                <Text fontSize='xl'>{titleText}</Text>
            </Center>
            <Box flex='1' />
        </Flex>
    );
};

export default Header;
