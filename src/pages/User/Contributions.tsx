import { Box, Container, Divider, Heading, HStack, Spacer, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";
import { api } from "../../shared/api/api";
import { status } from "../../shared/api/User/user-resource";
import { requestTypes } from "../../shared/types";

const data = [
    {
        month: "March",
        count: 24,
    },
    {
        month: "April",
        count: 22,
    },
    {
        month: "May",
        count: 21,
    },
    {
        month: "June",
        count: 14,
    },
];

export const Contributions: React.FC = () => {
    const [tabStatus, setTabStatus] = useState<status>("active");
    const [requestType, setRequestType] = useState<requestTypes | null>("Cam");

    const handleTabChange = (index: number) => {
        if (index == 0) setTabStatus("active");
        else setTabStatus("completed");
    };

    const { data: userData } = useQuery(["contributions", tabStatus], () => api.user.getAllRequestsByStatus(tabStatus));

    console.log(userData);

    return (
        <Container maxW="container.lg">
            <Heading>Katkılarım</Heading>
            <Tabs variant="enclosed" isFitted isLazy borderColor="black" onChange={handleTabChange}>
                <TabList>
                    <Tab>Aktif</Tab> <Tab>Tamamlanmış</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {userData?.map((el: any) => (
                            <>
                                <HStack marginX="20" marginY="2">
                                    <Text fontWeight="bold">{el.requestType}</Text>
                                    <Spacer />
                                    <Text fontWeight="normal">{el.creationDate.split("T")[0]}</Text>
                                </HStack>
                                <Divider borderColor="black" width="full"/>
                            </>
                        ))}
                    </TabPanel>
                    <TabPanel>
                        <BarChart width={730} height={250} data={data}>
                            <XAxis dataKey="month"></XAxis>
                            <YAxis />
                            <Legend />
                            <Bar dataKey="count" fill="#091220" />
                        </BarChart>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};
