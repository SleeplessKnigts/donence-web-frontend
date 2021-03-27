import { Button, Center, FormControl, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Map from '../../components/organisms/Map/Map';
import { useForm } from 'react-hook-form';
import { api } from '../../shared/api/api';
import { RecyclePoint } from '../../shared/types';

type AddRecyclePointProps = {
    currentPoint?: RecyclePoint;
};

export const AddRecyclePoint: React.FC<AddRecyclePointProps> = ({
    currentPoint,
}) => {
    const [currentLoc, setCurrentLoc] = useState<RecyclePoint>({
        recyclePointDetail: 'Geri donusum noktasi',
        lat: 39.904239006864785,
        lng: 32.87195490942385,
    });

    useEffect(() => {
        if (currentPoint) {
            setCurrentLoc(currentPoint);
            console.log(currentPoint);
            console.log(currentLoc);
        }
    }, [currentPoint]);
    const { handleSubmit, register, formState } = useForm();

    function onSubmit(values: {
        recyclePointDetail: string;
        lat: number;
        lng: number;
    }) {
        //TODO react-query
        values.lat = currentLoc.lat;
        values.lng = currentLoc.lng;
        api.admin.newRecyclePoint(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Map
                    setCurrentLoc={setCurrentLoc}
                    addPoint={true}
                    currentLoc={currentLoc}
                />
            </FormControl>
            <FormControl>
                <Input
                    m={2}
                    name='recyclePointDetail'
                    placeholder='Detay Giriniz'
                    focusBorderColor='lime'
                    borderColor='green.700'
                    isRequired={true}
                    ref={register({ required: true })}
                />
            </FormControl>
            <Center>
                <Button
                    colorScheme='teal'
                    m={2}
                    isLoading={formState.isSubmitting}
                    type='submit'
                >
                    Uygula
                </Button>
            </Center>
        </form>
    );
};

export default AddRecyclePoint;
