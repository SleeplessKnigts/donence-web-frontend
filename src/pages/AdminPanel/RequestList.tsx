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
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { MapPoints } from '../../components/molecules/MapPoints';
import { api } from '../../shared/api/api';
import Geocode from 'react-geocode';
import { Heading } from '@chakra-ui/layout';

export const RequestList: React.FC = () => {
    const { data: requestList, isFetched } = useQuery(
        'getRequestList',
        api.admin.getRequestList
    );
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
    let component = <Spinner size='lg' />;
    let map = null;
    if (isFetched) {
        component = (
            <Grid m={4}>
                <Select name='isActive' colorScheme='green.100'>
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
                        </Tr>
                    </Thead>

                    <Tbody color='black'>
                        {requestList?.map((request) => (
                            <Tr>
                                <Td>{request.requestType}</Td>
                                <Td>{request.creationDate}</Td>
                                <Td>{request.issuer.fname}</Td>
                                <Td></Td>
                            </Tr>
                        ))}
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Materyal</Th>
                            <Th>Tarih</Th>
                            <Th>Kullanıcı</Th>
                            <Th>Adres</Th>
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
