import { Box, Container, Divider, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Days, Months } from "../../constants/Mappings";
import { api } from "../../shared/api/api";
import { status } from "../../shared/api/User/user-resource";
import { requestTypes } from "../../shared/types";

export const Contributions: React.FC = () => {
    const [tabStatus, setTabStatus] = useState<status>("active");

    const handleTabChange = (index: number) => {
        if (index === 0) setTabStatus("active");
        else setTabStatus("completed");
    };

    const { data: userData } = useQuery(["contributions", tabStatus], () => api.user.getAllRequestsByStatus(tabStatus));

    const groupBy = (arr: Array<any>, prop: string): { [key: string]: Array<any> } => {
        let initialVal: { [key: string]: Array<any> } = { Ocak: [] };
        Months.forEach((el) => {
            initialVal[el] = [];
        });
        return arr.reduce((acc: { [key: string]: Array<any> }, obj) => {
            let key;
            if (prop === "creationDate") {
                const date = new Date(obj[prop]);
                key = Months[date.getMonth()];
            } else key = obj[prop];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, initialVal);
    };
    let rawChartData: { [x: string]: any[] } = {};
    let chartData;
    if (userData) {
        rawChartData = groupBy(userData, "creationDate");
        chartData = Object.keys(rawChartData).map((key) => {
            return {
                month: key,
                count: rawChartData[key].length,
            };
        });
        console.log(rawChartData);
    }

    return (
        <Container maxW="container.lg">
            <Heading>Katkılarım</Heading>
            <Tabs variant="enclosed" isFitted isLazy borderColor="black" onChange={handleTabChange}>
                <TabList>
                    <Tab>Aktif</Tab> <Tab>Tamamlanmış</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {userData?.map((el) => {
                            const date = new Date(el.creationDate);
                            return (
                                <>
                                    <HStack marginX="20" marginY="2">
                                        <Text fontWeight="bold">{el.requestType}</Text>
                                        <Spacer />
                                        <Text fontWeight="normal">
                                            {el &&
                                                date.getDate() +
                                                    " " +
                                                    Months[date.getMonth()] +
                                                    " " +
                                                    date.getFullYear() +
                                                    " " +
                                                    Days[date.getDay()]}
                                        </Text>
                                    </HStack>
                                    <Divider borderColor="black" width="full" />
                                </>
                            );
                        })}
                    </TabPanel>
                    <TabPanel>
                        <BarChart width={800} height={400} data={chartData}>
                            <XAxis dataKey="month"></XAxis>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#091220" />
                        </BarChart>
                        {Object.keys(rawChartData)?.map((el) => {
                            const monthArr = rawChartData[el];
                            return (
                                <>
                                    {monthArr.length > 0 ? (
                                        <>
                                            <Heading>{el + " 2021"}</Heading>
                                            <Divider borderColor="black" borderWidth="5"/>
                                            {monthArr.map((el) => {
                                                const date = new Date(el.creationDate);
                                                return (
                                                    <>
                                                        <HStack marginX="20" marginY="2">
                                                            <Text fontWeight="bold">{el.requestType}</Text>
                                                            <Spacer />
                                                            <Text fontWeight="normal">
                                                                {el &&
                                                                    date.getDate() +
                                                                        " " +
                                                                        Months[date.getMonth()] +
                                                                        " " +
                                                                        date.getFullYear() +
                                                                        " " +
                                                                        Days[date.getDay()]}
                                                            </Text>
                                                        </HStack>
                                                        <Divider borderColor="black"/>
                                                    </>
                                                );
                                            })}
                                        </>
                                    ) : null}
                                </>
                            );
                        })}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};
