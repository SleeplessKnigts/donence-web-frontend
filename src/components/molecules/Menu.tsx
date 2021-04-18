import React, { useContext } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Logo } from '../atoms/Logo';
import { MenuToggle, MenuToggleProps } from '../atoms/MenuToggle';
import { MenuItem } from '../atoms/MenuItem';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Menu: React.FC<MenuToggleProps> = (props) => {
    const { isOpen, toggle } = props;
    const { isAuthenticated, logout, userType } = useContext(AuthContext);

    let authenticatedMenuElements;

    switch (userType) {
        case '395cc606-30da-4789-9bd3-acc1add79ef9':
            authenticatedMenuElements = <></>;
            break;
        case '8a6ee639-a7e6-456f-af12-2b714df5fecd':
            authenticatedMenuElements = (
                <>
                </>
            );
            break;
        default:
            break;
    }

    return (
        <Flex
            as='nav'
            align='center'
            justify='space-between'
            wrap='wrap'
            padding='1rem'
            bg='brand.900'
            color='white'
        >
            <Flex align='center' mr={5}>
                <Logo />
            </Flex>
            <MenuToggle isOpen={isOpen} toggle={toggle} />
            <Box
                display={{ sm: isOpen ? 'block' : 'none', md: 'flex' }}
                width={{ sm: 'full', md: 'auto' }}
                alignItems='center'
                flexGrow={1}
            >
                {isAuthenticated && authenticatedMenuElements}
                <MenuItem to={'/haberler'}>Haberler</MenuItem>
            </Box>

            <Box
                display={{ sm: isOpen ? 'block' : 'none', md: 'block' }}
                mt={{ base: 4, md: 0 }}
            >
                {isAuthenticated ? (
                    <Link to='/'>
                        <Button
                            bg='transparent'
                            _hover={{ bg: 'brand.700', border: 'none' }}
                            onClick={logout}
                            border='1px'
                        >
                            Çıkış Yap
                        </Button>
                    </Link>
                ) : (
                    <Link to='/giris-yap'>
                        <Button
                            bg='transparent'
                            _hover={{ bg: 'brand.700', border: 'none' }}
                            border='1px'
                        >
                            Giriş Yap
                        </Button>
                    </Link>
                )}
            </Box>
        </Flex>
    );
};
