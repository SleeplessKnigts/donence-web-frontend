import {
    Button,
    Center,
    FormControl,
    HStack,
    Input,
    Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Map from '../../components/organisms/Map/Map';
import { useForm } from 'react-hook-form';
import { api } from '../../shared/api/api';
import { RecyclePoint } from '../../shared/types';
import { useMutation } from 'react-query';

type AddRecyclePointProps = {
    currentPoint?: RecyclePoint;
};

export const AddRecyclePoint: React.FC<AddRecyclePointProps> = ({
    currentPoint,
}) => {
    const mutation = useMutation(api.admin.newRecyclePoint, {
        onSuccess: () => alert('Geri Donusum Noktasi Basariyla Eklendi'),
    });

    const [currentLoc, setCurrentLoc] = useState<RecyclePoint>({
        recyclePointDetail: 'Geri donusum noktasi',
        lat: 39.904239006864785,
        lng: 32.87195490942385,
        recyclyPointPlaceType: 'Plastik',
    });

    useEffect(() => {
        if (currentPoint) {
            setCurrentLoc(currentPoint);
        }
    }, [currentPoint]);
    const { handleSubmit, register, formState } = useForm();
    function onSubmit(values: any) {
        console.log(values);
        values.lat = currentLoc.lat;
        values.lng = currentLoc.lng;
        mutation.mutate(values);
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
            <HStack margin='4' spacing='8'>
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
                <FormControl>
                    <Select
                        variant='filled'
                        name='recyclePointPlaceType'
                        ref={register({ required: true })}
                    >
                        <option value='Plastik'>Plastik</option>
                        <option value='Elektronik'>Elektronik</option>
                        <option value='Kağıt'>Kağıt</option>
                        <option value='Pil'>Pil</option>
                        <option value='Cam'>Cam</option>
                        <option value='Yağ'>Yağ</option>
                    </Select>
                </FormControl>
            </HStack>
            <Center>
                <Button
                    colorScheme='teal'
                    m={2}
                    isLoading={formState.isSubmitting}
                    type='submit'
                >
                    Ekle
                </Button>
            </Center>
        </form>
    );
};

export default AddRecyclePoint;
