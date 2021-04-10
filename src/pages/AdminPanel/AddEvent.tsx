import {
    Button,
    Center,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import tr from 'date-fns/locale/tr';
import Map from '../../components/organisms/Map/Map';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

export const AddEvent = () => {
    const { handleSubmit, register, formState } = useForm();
    function onSubmit(values: any) {}
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [eventLoc, setEventLoc] = useState();
    registerLocale('tr', tr);
    return (
        <Container maxW='container.lg'>
            <Heading>Atık Toplama Etkinliği Oluştur</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl m={4}>
                    <FormLabel>Etkinlik Tarihi</FormLabel>
                    <ReactDatePicker
                        locale='tr'
                        selected={startDate}
                        //@TODO set date
                        onChange={(date) => setStartDate(null)}
                    />
                </FormControl>
                <FormControl m={4}>
                    <FormLabel>Materyaller</FormLabel>
                    <Stack spacing={10} direction='row'>
                        <Checkbox colorScheme='red' defaultIsChecked>
                            Plastik
                        </Checkbox>
                        <Checkbox colorScheme='green' defaultIsChecked>
                            Elektronik
                        </Checkbox>
                        <Checkbox colorScheme='pink' defaultIsChecked>
                            Kağıt
                        </Checkbox>
                        <Checkbox colorScheme='orange' defaultIsChecked>
                            Pil
                        </Checkbox>
                        <Checkbox colorScheme='blue' defaultIsChecked>
                            Cam
                        </Checkbox>
                        <Checkbox colorScheme='yellow' defaultIsChecked>
                            Yağ
                        </Checkbox>
                    </Stack>
                </FormControl>
                <FormControl m={4}>
                    <FormLabel>Etkinlik Yeri</FormLabel>
                    <Map addPoint={false} setCurrentLoc={setEventLoc}></Map>
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
