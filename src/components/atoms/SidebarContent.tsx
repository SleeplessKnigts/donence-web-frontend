import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router";

type SidebarContentProps = {
    setComponent?: Function;
    buttonTitles: {
        [key: string]: string;
    };
};

export const SidebarContent: React.FC<SidebarContentProps> = ({ setComponent, buttonTitles }) => {
    let history = useHistory();

    const handleClick = (name: string) => {
        history.push(name);
    };

    return (
        <VStack>
            {Object.keys(buttonTitles).map((key, _idx) => {
                return (
                    <Button
                        key={key}
                        w="100%"
                        color="green.100"
                        bg="green.700"
                        onClick={() => handleClick(buttonTitles[key])}
                    >
                        {key}
                    </Button>
                );
            })}
        </VStack>
    );
};
