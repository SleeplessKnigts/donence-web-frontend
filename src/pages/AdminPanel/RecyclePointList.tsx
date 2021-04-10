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
    ModalFooter,
    useDisclosure,
    Container,
    Spinner,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '../../shared/api/api';
import { useState } from 'react';
import { RecyclePoint } from '../../shared/types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MapPoints } from '../../components/molecules/MapPoints';
import { useQuery } from 'react-query';

import { useHistory } from 'react-router';
export const RecyclePointList = () => {
    let history = useHistory();
    const { data: recyclePointList, isFetched, refetch } = useQuery(
        'getRecPointList',
        api.admin.getRecyclePoints
    );
    const [clickedPoint, setClickedPoint] = useState<RecyclePoint>();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateClick = (point: RecyclePoint) => {
        history.push({
            pathname: '/admin/geri-donusum-noktasi-ekle',
            state: { currentPoint: point },
        });
    };

    const handleDeleteClick = (point: RecyclePoint) => {
        setClickedPoint(point);
        setShowDeletePopup(true);
        console.log(point);
        onOpen();
    };

    const deletePoint = () => {
        if (clickedPoint)
            api.admin
                .deleteRecyclePoints(clickedPoint.recyclePointId)
                .then(() => {
                    onClose();
                    refetch();
                });
    };

    let component = <Spinner size='lg' />;
    let map = null;
    if (isFetched) {
        component = (
            <Grid m={4}>
                <Table
                    variant='simple'
                    colorScheme='teal'
                    size='sm'
                    color='gray.800'
                    fontWeight='bold'
                >
                    <TableCaption>Geri Dönüşüm Noktaları</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Geri Dönüşüm Noktasi isimleri</Th>
                            <Th>Materyal</Th>
                            <Th isNumeric>Latitude</Th>
                            <Th isNumeric>Longitude</Th>
                            <Th>Güncelle</Th>
                            <Th>Sil</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recyclePointList?.map((point) => (
                            <Tr>
                                <Td>{point.recyclePointId}</Td>
                                <Td>{point.recyclePointDetail}</Td>
                                <Td>{point.recyclePointPlaceType}</Td>
                                <Td isNumeric>{point.lat}</Td>
                                <Td isNumeric>{point.lng}</Td>
                                <Td>
                                    <Center>
                                        <Button colorScheme='blue'>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() =>
                                                    handleUpdateClick(point)
                                                }
                                            />
                                        </Button>
                                    </Center>
                                </Td>
                                <Td>
                                    <Button colorScheme='red'>
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            onClick={() =>
                                                handleDeleteClick(point)
                                            }
                                        />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Geri Dönüşüm Noktasi İsimleri</Th>
                            <Th>Materyal</Th>
                            <Th isNumeric>Latitude</Th>
                            <Th isNumeric>Longitude</Th>
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
                                Geri dönüşüm noktasının silinmesini onaylıyor
                                musunuz?
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
                                <Button colorScheme='red' onClick={deletePoint}>
                                    Sil
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Grid>
        );
        map = <MapPoints recyclePoints={recyclePointList} />;
    }
    return (
        <Container maxW='container.lg'>
            <Tabs m={2} variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Geri Dönüşüm Noktaları</Tab>
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

export default RecyclePointList;
