import Map from "../../components/organisms/Map/Map";
import {Input, Button, Center} from '@chakra-ui/react';

export const AddRecyclePoint = () => {
    return (
        <div>
            <Map/>
            <Input/>
            <Center>
                <Button colorScheme="teal">Add Point</Button>
            </Center>
        </div>
    );
}

export default AddRecyclePoint;