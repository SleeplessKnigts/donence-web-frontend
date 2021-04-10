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
import { useLocation } from 'react-router-dom';
import { Heading } from '@chakra-ui/layout';

type AddRecyclePointProps = {
    currentPoint?: RecyclePoint;
};

export const AddRecyclePoint: React.FC<AddRecyclePointProps> = ({
    currentPoint,
}) => {
    const location = useLocation<{ currentPoint: RecyclePoint }>();
    const [update, setUpdate] = useState<boolean>(false);
    const updateMutation = useMutation(api.admin.updateRecyclePoint, {
        onSuccess: () => {
            alert('Geri Donusum Noktasi Basariyla Güncellendi');
        },
    });
    const addMutation = useMutation(api.admin.newRecyclePoint, {
        onSuccess: () => alert('Geri Donusum Noktasi Basariyla Eklendi'),
    });

    const [currentLoc, setCurrentLoc] = useState<RecyclePoint>({
        recyclePointId: 0,
        recyclePointDetail: 'Geri donusum noktasi',
        lat: 39.904239006864785,
        lng: 32.87195490942385,
        recyclePointPlaceType: 'Plastik',
    });

    useEffect(() => {
        if (location.state?.currentPoint) {
            setUpdate(true);
            setCurrentLoc(location.state.currentPoint);
        } else if (currentPoint) {
            setCurrentLoc(currentPoint);
        }
    }, [currentPoint]);

    let map = null;
    if (location.state?.currentPoint) {
        map = (
            <Map
                setCurrentLoc={setCurrentLoc}
                addPoint={true}
                currentLoc={location.state.currentPoint}
            />
        );
    } else {
        map = (
            <Map
                setCurrentLoc={setCurrentLoc}
                addPoint={true}
                currentLoc={currentLoc}
            />
        );
    }

    const { handleSubmit, register, formState } = useForm();
    function onSubmit(values: any) {
        console.log(values);
        values.lat = currentLoc.lat;
        values.lng = currentLoc.lng;
        if (update) {
            values.recyclePointId = currentLoc.recyclePointId;
            updateMutation.mutate(values);
        } else {
            addMutation.mutate(values);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Geri Dönüşüm Noktası Ekle/Güncelle</Heading>
            <FormControl>
                <h2 className='map-h2'>İŞARETLEYİCİ İLE ADRESİ BELİRLEYİN</h2>
                {map}
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
                        defaultValue={
                            location.state?.currentPoint
                                ? location.state.currentPoint.recyclePointDetail
                                : currentLoc.recyclePointDetail
                        }
                    />
                </FormControl>
                <FormControl>
                    <Select
                        variant='filled'
                        name='recyclePointPlaceType'
                        ref={register({ required: true })}
                        defaultValue={
                            location.state?.currentPoint
                                ? location.state.currentPoint
                                      .recyclePointPlaceType
                                : currentLoc.recyclePointPlaceType
                        }
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
                    Onayla
                </Button>
            </Center>
        </form>
    );
};

export default AddRecyclePoint;
