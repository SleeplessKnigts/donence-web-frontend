import React, { useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Logo } from "../atoms/Logo";
import { MenuToggle, MenuToggleProps } from "../atoms/MenuToggle";
import { MenuItem } from "../atoms/MenuItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Menu: React.FC<MenuToggleProps> = (props) => {
    const { isOpen, toggle } = props;
    const { isAuthenticated } = useContext(AuthContext);

    const authenticatedMenuElements = (
        <>
            <MenuItem to={"/very-authenticated-1"}>very-authenticated-1</MenuItem>
            <MenuItem to={"/very-authenticated-1"}>very-authenticated-2</MenuItem>
        </>
    );



    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="brand.900" color="white">
            <Flex align="center" mr={5}>
                <Logo />
            </Flex>
            <MenuToggle isOpen={isOpen} toggle={toggle} />
            <Box
                display={{ sm: isOpen ? "block" : "none", md: "flex" }}
                width={{ sm: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
            >
                <MenuItem to={"/haberler"}>Haberler</MenuItem>
                <MenuItem to={"/loL"}>lol</MenuItem>
                {isAuthenticated && authenticatedMenuElements}
            </Box>

            <Box display={{ sm: isOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
                <Link to="/giris-yap">
                    <Button bg="transparent" _hover={{ bg: "brand.700", border: "none" }} border="1px">
                        Giriş Yap
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
};
