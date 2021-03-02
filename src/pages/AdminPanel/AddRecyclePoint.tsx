import {Button, Center, FormControl, Input} from '@chakra-ui/react';
import React, {useState} from 'react';
import Map from '../../components/organisms/Map/Map';
import {useForm} from 'react-hook-form';
import {api} from '../../shared/api/api';

export const AddRecyclePoint = () => {
    const [currentLoc, setCurrentLoc] = useState({
        lat: 0,
        lng: 0
    });
    const {handleSubmit, register, formState} = useForm();

    function onSubmit(values: { recyclePointDetail: string; lat: number; lng: number }) {
        //TODO react-query
        values.lat = currentLoc.lat;
        values.lng = currentLoc.lng;
        api.admin.newRecyclePoint(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Map setCurrentLoc={setCurrentLoc}/>
            </FormControl>
            <FormControl>
                <Input
                    m={2}
                    name="recyclePointDetail"
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
};

export default AddRecyclePoint;