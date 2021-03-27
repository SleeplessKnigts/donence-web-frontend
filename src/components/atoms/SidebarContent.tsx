import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

type SidebarContentProps = {
    setComponent?: Function;
    buttonTitles?: string[];
};

export const SidebarContent: React.FC<SidebarContentProps> = ({
    setComponent,
    buttonTitles,
}) => {
    const [buttonNames, setButtonNames] = useState<string[]>([]);

    useEffect(() => {
        if (buttonTitles) {
            setButtonNames(buttonTitles);
        }
    }, []);

    const handleClick = (name: string) => {
        if (setComponent) {
            setComponent(name);
        }
    };

    return (
        <VStack>
            {buttonNames.map((name) => (
                <>
                    <Button w='100%' onClick={() => handleClick(name)}>
                        {name}
                    </Button>
                </>
            ))}
        </VStack>
    );
};
