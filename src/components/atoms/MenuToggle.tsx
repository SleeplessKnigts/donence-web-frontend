import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MenuToggleProps {
    toggle: () => void;
    isOpen: boolean;
}

export const MenuToggle: React.FC<MenuToggleProps> = (props) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={props.toggle}>
            {props.isOpen ? (
                <IconButton variant="outline" aria-label="Close" icon={<FontAwesomeIcon icon={faTimes} />} />
            ) : (
                <IconButton variant="outline" aria-label="Close" icon={<FontAwesomeIcon icon={faBars} />} />
            )}
        </Box>
    );
};
