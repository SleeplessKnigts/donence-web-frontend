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
    Grid
} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {api} from '../../shared/api/api';
import React, {useEffect, useState} from 'react';
import {RecyclePoint} from '../../shared/types';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';


export const RecyclePointList = () => {
    //TODO useQuery
    // const {data, error} = useQuery("points", api.admin.getRecyclePoints);
    // if(error) return <span>Error when loading data</span>
    // if(!data) return <span>Loading...</span>
    const [points, setPoints] = useState<RecyclePoint[]>([]);
    useEffect(() => {
        api.admin.getRecyclePoints()
            .then((response) => {
                    setPoints(response);
                }
            ).catch((e) => console.error(e));
    }, []);
    return (
        <Grid m={4}>
            <Table variant="simple" colorScheme="teal" size="sm">
                <TableCaption>Recycle Point Locations</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Recycle point name</Th>
                        <Th isNumeric>Latitude</Th>
                        <Th isNumeric>Longitude</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {points.map(point => (
                        <Tr>
                            <Td>{point.recyclePointDetail}</Td>
                            <Td isNumeric>{point.lat}</Td>
                            <Td isNumeric>{point.lng}</Td>
                            <Td><Center><Button colorScheme="blue"><FontAwesomeIcon
                                icon={faEdit}/></Button></Center></Td>
                            <Td><Center><Button colorScheme="red"><FontAwesomeIcon icon={faTrashAlt}/></Button></Center></Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Recycle point name</Th>
                        <Th isNumeric>Latitude</Th>
                        <Th isNumeric>Longitude</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </Grid>

    );
};

export default RecyclePointList;