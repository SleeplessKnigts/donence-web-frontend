import {Button, Grid, GridItem, Center} from '@chakra-ui/react';
import React, {useState} from 'react';
import RecyclePointList from './RecyclePointList';
import AddRecyclePoint from './AddRecyclePoint';


export const AdminPanel = () => {
    const [showRecPointList, setShowRecPointList] = useState(false);
    const [showAddRecPoint, setShowAddRecPoint] = useState(false);


    return (
        <Grid
            container
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={2} bg="#C6F6D5">
                <Center m={4}>
                    <Button colorScheme="teal" size="lg" width="200px" onClick={() => {
                        setShowRecPointList(true);
                        setShowAddRecPoint(false);
                    }}>
                        Get Recycle Point List
                    </Button>
                </Center>
                <Center m={2}>
                    <Button colorScheme="teal" size="lg" width="200px" onClick={() => {
                        setShowAddRecPoint(true);
                        setShowRecPointList(false);
                    }}>
                        Add Recycle Point
                    </Button>
                </Center>
            </GridItem>
            {showRecPointList && (
                <GridItem colSpan={4} bg="#EDF2F7">
                    <Center><RecyclePointList/></Center>
                </GridItem>
            )}
            {showAddRecPoint && (
                <GridItem colSpan={4} bg="#EDF2F7">
                    <Center><AddRecyclePoint/></Center>
                </GridItem>
            )}
        </Grid>
    );
};

export default AdminPanel;