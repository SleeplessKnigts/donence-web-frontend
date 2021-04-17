import {
    Button,
    Center,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import tr from 'date-fns/locale/tr';
import Map from '../../components/organisms/Map/Map';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useMutation } from 'react-query';
import { api } from '../../shared/api/api';

export const AddEvent = () => {
    const { handleSubmit, register, formState } = useForm();
    const [startDate, setStartDate] = useState<Date | [Date, Date] | null>(new Date());
    const [eventLoc, setEventLoc] = useState({
        lat: 39.904239006864785,
        lng: 32.87195490942385,
    });
    registerLocale('tr', tr);
    const mutation = useMutation(api.admin.newEventList, {
        onSuccess: () => alert('Atık Toplama Etkinliği Basariyla Oluşturuldu'),
    });

    function onSubmit(values: any) {
        values.collectionEventDate=startDate
        values.lat = eventLoc.lat;
        values.lng = eventLoc.lng;
        console.log(values);
        mutation.mutate(values);
    }

    return (
        <Container maxW='container.lg'>
            <Heading>Atık Toplama Etkinliği</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl m={4}>
                    <FormLabel>Etkinlik Tarihi</FormLabel>
                    <ReactDatePicker
                        locale='tr'
                        //@TODO set date
                        selected={startDate as Date}
                        onChange={(date) => setStartDate(date)}
                    />
                </FormControl>
                <FormControl>
                    <Select
                        variant='filled'
                        name='materialType'
                        ref={register({ required: true })}
                        defaultValue='Plastik'
                    >
                        <option value='Plastik'>Plastik</option>
                        <option value='Elektronik'>Elektronik</option>
                        <option value='Kağıt'>Kağıt</option>
                        <option value='Pil'>Pil</option>
                        <option value='Cam'>Cam</option>
                        <option value='Yağ'>Yağ</option>
                    </Select>
                </FormControl>
                <FormControl m={4}>
                    <FormLabel>Etkinlik Yeri</FormLabel>
                    <Map addPoint={false} setCurrentLoc={setEventLoc}></Map>
                </FormControl>
                <FormControl>
                    <Input
                        m={2}
                        name='eventDetail'
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
                        Onayla
                    </Button>
                </Center>
            </form>
        </Container>
    );
};

export default AddEvent;
