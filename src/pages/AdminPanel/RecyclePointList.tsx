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
    Container,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '../../shared/api/api';
import { useEffect, useState } from 'react';
import { RecyclePoint } from '../../shared/types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddRecyclePoint from './AddRecyclePoint';
import { GoogleMap } from '@react-google-maps/api';
import { MapPoints } from '../../components/molecules/MapPoints';

export const RecyclePointList = () => {
    //TODO useQuery
    // const {data, error} = useQuery("points", api.admin.getRecyclePoints);
    // if(error) return <span>Error when loading data</span>
    // if(!data) return <span>Loading...</span>
    const [points, setPoints] = useState<RecyclePoint[]>([]);
    const [clickedPoint, setClickedPoint] = useState<RecyclePoint>();
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        api.admin
            .getRecyclePoints()
            .then((response) => {
                setPoints(response);
            })
            .catch((e) => console.error(e));
    }, []);

    const handleUpdateClick = (point: RecyclePoint) => {
        setClickedPoint(point);
        setShowUpdatePopup(true);
        console.log(point);
        onOpen();
    };
    return (
        <Container centerContent maxW='container.lg'>
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
                            <Th>Geri Dönüşüm Noktasi isimleri</Th>
                            <Th isNumeric>Latitude</Th>
                            <Th isNumeric>Longitude</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {points.map((point) => (
                            <Tr>
                                <Td>{point.recyclePointDetail}</Td>
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
                                    <Center>
                                        <Button colorScheme='red'>
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
                            <Th>Geri Dönüşüm Noktasi İsimleri</Th>
                            <Th isNumeric>Latitude</Th>
                            <Th isNumeric>Longitude</Th>
                        </Tr>
                    </Tfoot>
                </Table>
                {showUpdatePopup && (
                    <Modal isOpen={isOpen} onClose={onClose} size='full'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                Geri Dönüşüm Noktasi Güncelleme
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <AddRecyclePoint currentPoint={clickedPoint} />
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button variant='ghost'>
                                    Secondary Action
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Grid>
        </Container>
    );
};

export default RecyclePointList;
