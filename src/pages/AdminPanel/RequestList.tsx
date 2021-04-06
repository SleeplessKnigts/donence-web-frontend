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
import { UserRequest } from '../../shared/types';

export const RequestList: React.FC = () => {
    const { data: requestList, isFetched } = useQuery(
        'getRequestList',
        api.admin.getRequestList
    );
    const [clickedRequest, setClickedRequest] = useState<UserRequest>();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteClick = (request: UserRequest) => {
        setClickedRequest(request);
        setShowDeletePopup(true);
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
                            <Th>Kullanıcı</Th>
                            <Th>Sil</Th>
                        </Tr>
                    </Thead>

                    <Tbody color='black'>
                        {requestList?.map((request) => (
                            <Tr>
                                <Td>{request.requestType}</Td>
                                <Td>{request.creationDate}</Td>
                                <Td>{request.issuer.fname}</Td>
                                <Td>
                                    <Button colorScheme='red'>
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            onClick={() =>
                                                handleDeleteClick(request)
                                            }
                                        />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Materyal</Th>
                            <Th>Tarih</Th>
                            <Th>Kullanıcı</Th>
                            <Th>Sil</Th>
                        </Tr>
                    </Tfoot>
                </Table>
                {showDeletePopup && (
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                İsteğin silinmesini onaylıyor musunuz?
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
                                <Button colorScheme='red'>Sil</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Grid>
        );
        map = <MapPoints userRequestPoints={requestList} />;
    }

    return (
        <Container maxW='container.lg'>
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
