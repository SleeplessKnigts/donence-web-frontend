import {Button, Container, Grid, GridItem, Center} from "@chakra-ui/react";
import React, {useState} from "react";
import RecyclePoint from "./RecyclePoint";
import AddRecyclePoint from "./AddRecyclePoint";


export const AdminPanel = () => {
    const [showRecPointList, setShowRecPointList] = useState(false);
    const [showAddRecPoint, setShowAddRecPoint] = useState(false);


    return (
        <div>
            <Grid
                h="800px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={2} bg="#C6F6D5">
                    <Container m={2} centerContent>
                        <Button colorScheme="teal" onClick={() => {
                            setShowRecPointList(true)
                            setShowAddRecPoint(false)
                        }}>
                            Get Recycle Point List
                        </Button>
                    </Container>
                    <Container m={2} centerContent>
                        <Button colorScheme="teal" onClick={() => {
                            setShowAddRecPoint(true)
                            setShowRecPointList(false)
                        }}>
                            Add Recycle Point
                        </Button>
                    </Container>
                </GridItem>
                {showRecPointList && (
                    <GridItem colSpan={4} bg="#EDF2F7">
                        <Center><RecyclePoint/></Center>
                    </GridItem>
                )}
                {showAddRecPoint && (
                    <GridItem colSpan={4} bg="#EDF2F7">
                        <Center><AddRecyclePoint/></Center>
                    </GridItem>
                )}

            </Grid>
        </div>
    );
}

export default AdminPanel;