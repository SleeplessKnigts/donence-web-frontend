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
} from '@chakra-ui/react';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { MapPoints } from '../../components/molecules/MapPoints';
import { api } from '../../shared/api/api';
import { UserRequest } from '../../shared/types';

export const RequestList: React.FC = () => {
    const { data: requestList, isFetched } = useQuery(
        'getRequestList',
        api.admin.getRequestList
    );
    const [clickedRequest, setClickedRequest] = useState<UserRequest>();
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateClick = (request: UserRequest) => {
        setClickedRequest(request);
        setShowUpdatePopup(true);
        console.log(request);
        onOpen();
    };

    let component = <Spinner size='lg' />;
    let map = null;
    if (isFetched) {
        console.log(requestList);
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
                        </Tr>
                    </Thead>

                    <Tbody color="black">
                        {requestList?.map((request) => (
                            <Tr>
                                <Td>{request.requestType}</Td>
                                <Td>{request.creationDate}</Td>
                                <Td>
                                    <Center>
                                        <Button colorScheme='blue'>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() =>
                                                    handleUpdateClick(request)
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
                            <Th>Materyal</Th>
                            <Th>Tarih</Th>
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
                            <ModalBody>Temp</ModalBody>

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
        );
        map = <MapPoints userRequestPoints={requestList}/> 
    }

    return (
        <Container centerContent maxW='container.lg'>
            {component}
            {map}
        </Container>
    );
};
