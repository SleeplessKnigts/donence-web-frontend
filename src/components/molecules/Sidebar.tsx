import { Box, Flex } from '@chakra-ui/layout';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/modal';
import { Logo } from '../atoms/Logo';
import { SidebarContent } from '../atoms/SidebarContent';

type SidebarProps = {
    isOpen: boolean;
    onClose: Function;
    variant?: string;
    buttonTitles: {
        [key: string]: string;
    };
};

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    variant,
    buttonTitles,
}) => {
    return variant === 'sidebar' ? (
        <Box
            position='fixed'
            left={0}
            p={5}
            w='300px'
            top={0}
            h='100%'
            bg='brand.900'
            color='green.700'
        >
            <Flex align='center' mb={5}>
                <Logo />
            </Flex>
            <SidebarContent
                buttonTitles={buttonTitles}
            />
        </Box>
    ) : (
        <Drawer isOpen={isOpen} placement='left' onClose={() => onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Admin Paneli</DrawerHeader>
                    <DrawerBody>
                        <SidebarContent
                            buttonTitles={buttonTitles}
                        />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default Sidebar;
