import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Grid,
    useDisclosure,
    Spinner,
    Container,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
} from '@chakra-ui/react';
import { useMutation, useQuery } from 'react-query';
import { MapPoints } from '../../components/molecules/MapPoints';
import { api } from '../../shared/api/api';
import Geocode from 'react-geocode';
import { Center, Heading } from '@chakra-ui/layout';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const RequestList: React.FC = () => {
    const [active, setActive] = useState<boolean|''>('');
    const { data: requestList, isFetched, refetch } = useQuery(
        ['getRequestList',active],
        () => api.admin.getRequestList(active)
    );
    const [showCompleteButton, setShowCompleteButton] = useState<boolean>(false);
    const mutation = useMutation(api.admin.makeRequestCompleted, {
        onSuccess: () => alert('Kullanıcı isteği tamamlandı olarak işaretlendi.'),
    });
    Geocode.setApiKey('AIzaSyAaMe1ol3asoFB2sHw0g1LlMq6CalKi9-Y');
    Geocode.setLanguage('tr');
    Geocode.setRegion('tr');
    {
        Geocode.fromLatLng('42', '35').then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    const handleActive = (event: any) => {
        const select = event?.target.value;
        if(select==='Aktif'){
            setActive(true);
            refetch();
            setShowCompleteButton(false);
        } else if(select==='Tamamlanmış'){
            setActive(false);
            refetch();
            setShowCompleteButton(true);
        } else{
            setActive('');
            refetch();
            setShowCompleteButton(true);
        }
    }

    const handleClick = (requestId:string) => {
        mutation.mutate(requestId);
        refetch();
    }

    let component = <Spinner size='lg' />;
    let map = null;
    if (isFetched) {
        component = (
            <Grid m={4}>
                <Select name='isActive' colorScheme='green.100' onChange={handleActive}>
                    <option value='Hepsi'>Hepsi</option>
                    <option value='Aktif'>Aktif</option>
                    <option value='Tamamlanmış'>Tamamlanmış</option>
                </Select>
                <Table
                    variant='simple'
                    colorScheme='teal'
                    size='sm'
                    color='green.100'
                    fontWeight='bold'
                >
                    <TableCaption>Kullanıcı İstekleri</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Materyal</Th>
                            <Th>Tarih</Th>
                            <Th>Kullanıcı</Th>
                            <Th>Adres</Th>
                            <Th>Tamamlandı</Th>                           
                        </Tr>
                    </Thead>

                    <Tbody color='black'>
                        {requestList?.map((request) => (
                            <Tr>
                                <Td>{request.requestType}</Td>
                                <Td>{request.creationDate}</Td>
                                <Td>{request.issuer.fname}</Td>
                                <Td>
                                    <Center>
                                        <Button isDisabled={showCompleteButton} colorScheme='green'>
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                onClick={() => handleClick(request.requestId)}
                                            />
                                        </Button>
                                    </Center>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Materyal</Th>
                            <Th>Tarih</Th>
                            <Th>Kullanıcı</Th>
                            <Th>Adres</Th>
                            <Th>Tamamlandı</Th> 
                        </Tr>
                    </Tfoot>
                </Table>
            </Grid>
        );
        map = <MapPoints userRequestPoints={requestList} />;
    }

    return (
        <Container maxW='container.lg'>
            <Heading>İstekleri Listele</Heading>
            <Tabs m={2} variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>İstek Listesi</Tab>
                    <Tab>Haritada Görüntüle</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>{component}</TabPanel>
                    <TabPanel>{map}</TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};
