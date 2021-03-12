import React, { useContext} from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Logo } from "../atoms/Logo";
import { MenuToggle, MenuToggleProps } from "../atoms/MenuToggle";
import { MenuItem } from "../atoms/MenuItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Menu: React.FC<MenuToggleProps> = (props) => {
    const { isOpen, toggle } = props;
    const { isAuthenticated, logout, userType } = useContext(AuthContext);

    let authenticatedMenuElements;

    switch (userType) {
        case "395cc606-30da-4789-9bd3-acc1add79ef9":
            authenticatedMenuElements = (
                <>
                    <MenuItem to={"/admin"}>Admin Panel</MenuItem>
                    <MenuItem to={"/very-authenticated-1"}>Only admin can see this</MenuItem>
                </>
            );
            break;
        case "8a6ee639-a7e6-456f-af12-2b714df5fecd":
            authenticatedMenuElements = (
                <>
                    <MenuItem to={"/panel"}>Only user can see this</MenuItem>
                </>
            );
            break;
        case "2612bedd-ae65-4ed6-a8e1-8c7f868294d6":
            authenticatedMenuElements = (
                <>
                    <MenuItem to={"/panel"}>Only driver can see this</MenuItem>
                </>
            );
            break;
        default:
            break;
    }

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
                {isAuthenticated && authenticatedMenuElements}
            </Box>

            <Box display={{ sm: isOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
                {isAuthenticated ? (
                    <Link to="/">
                        <Button
                            bg="transparent"
                            _hover={{ bg: "brand.700", border: "none" }}
                            onClick={logout}
                            border="1px"
                        >
                            Çıkış Yap
                        </Button>
                    </Link>
                ) : (
                    <Link to="/giris-yap">
                        <Button bg="transparent" _hover={{ bg: "brand.700", border: "none" }} border="1px">
                            Giriş Yap
                        </Button>
                    </Link>
                )}
            </Box>
        </Flex>
    );
};
