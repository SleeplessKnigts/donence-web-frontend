import {Button, Center, FormControl, Input} from "@chakra-ui/react";
import React, {useState} from "react";
import Map from "../../components/organisms/Map/Map";
import {useForm} from "react-hook-form";

export const AddRecyclePoint = () => {
    const [currentLoc, setCurrentLoc] = useState({});
    const {handleSubmit, register, formState} = useForm();

    function onSubmit(values: { name: string; location: {}; }) {
        //TODO send query
        values.location = currentLoc;
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Map setCurrentLoc={setCurrentLoc}/>
            </FormControl>
            <FormControl>
                <Input
                    m={2}
                    name="name"
                    placeholder="Description"
                    focusBorderColor="lime"
                    borderColor="green.700"
                    isRequired={true}
                    ref={register({required: true})}
                />
            </FormControl>
            <Center>
                <Button
                    colorScheme="teal"
                    m={2}
                    isLoading={formState.isSubmitting}
                    type="submit"
                >
                    Add Point
                </Button>
            </Center>
        </form>
    );
}

export default AddRecyclePoint;