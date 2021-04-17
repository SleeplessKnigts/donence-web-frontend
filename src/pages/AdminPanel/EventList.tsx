import { Heading } from '@chakra-ui/layout';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Center,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
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
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { MapPoints } from '../../components/molecules/MapPoints';
import { api } from '../../shared/api/api';
import { CollectionEvent, UserRequest } from '../../shared/types';
import { useHistory } from 'react-router';

export const EventList: React.FC = () => {
    let history = useHistory();
    const { data: eventList, isFetched, refetch } = useQuery(
        'getEventList',
        api.admin.getEventList
    );
    const [clickedEvent, setClickedEvent] = useState<CollectionEvent>();
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateClick = (collectionEvent: CollectionEvent) => {
        //previous state
        history.push({
            pathname: '/admin/etkinlik-ekle'
        });
    };

    const handleDeleteClick = (event: CollectionEvent) => {
        setClickedEvent(event);
        setShowDeletePopup(true);
        onOpen();
    };

    const deleteEvent = () => {
        if (clickedEvent)
            api.admin
                .deleteEvent(clickedEvent.collectionEventId)
                .then(() => {
                    onClose();
                    refetch();
                });
    };

    let component = <Spinner size='lg' />;
    let map = null;
    if (isFetched) {
        console.log(eventList);
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
                    color='green.700'
                    fontWeight='bold'
                >
                    <TableCaption color='green.700'>
                        Atık Toplama Etkinlikleri
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Etkinlik</Th>
                            <Th>Tarih</Th>
                            <Th>Materyal</Th>
                            <Th>Latitude</Th>
                            <Th>Longitude</Th>
                            <Th>Güncelle</Th>
                            <Th>Sil</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {eventList?.map((collectionEvent) => (
                            <Tr>
                                <Td>{collectionEvent.eventDetail}</Td>
                                <Td>{collectionEvent.collectionEventDate}</Td>
                                <Td>{collectionEvent.materialType}</Td>
                                <Td isNumeric>{collectionEvent.lat}</Td>
                                <Td isNumeric>{collectionEvent.lng}</Td>
                                <Td>
                                    <Center>
                                        <Button colorScheme='blue'>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() =>
                                                    handleUpdateClick(
                                                        collectionEvent
                                                    )
                                                }
                                            />
                                        </Button>
                                    </Center>
                                </Td>
                                <Td>
                                    <Center>
                                        <Button colorScheme='red'
                                            onClick={() =>
                                                handleDeleteClick(collectionEvent)
                                            }>
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                            />
                                        </Button>
                                    </Center>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Etkinlik</Th>
                            <Th>Tarih</Th>
                            <Th>Materyal</Th>
                            <Th>Latitude</Th>
                            <Th>Longitude</Th>
                            <Th>Güncelle</Th>
                            <Th>Sil</Th>
                        </Tr>
                    </Tfoot>
                </Table>
                {showDeletePopup && (
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                Toplama etkinliğini silmek istiyor musunuz?
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalFooter>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Kapat
                                </Button>
                                <Button colorScheme='red' onClick={deleteEvent}>
                                    Sil
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Grid>
        );
        map = <MapPoints eventPoints={eventList} />;
    }

    return (
        <Container maxW='container.lg'>
            <Heading>Atık Toplama Etkinliklerini Listele</Heading>
            <Tabs m={2} variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Etkinlikler</Tab>
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
