import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";


export interface MenuItemProps {
    to: string;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <Link to={props.to}>
            <Text display="block" margin={2}>
                {props.children}
            </Text>
        </Link>
    );
};


