import { Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Data } from "@react-google-maps/api";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Card } from "../../components/molecules/Card";
import { api } from "../../shared/api/api";

export const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const { data: newsDetail, isFetched } = useQuery(["news", id], () => api.user.getNewsById(id));

    let resp = <Spinner size="lg" alignSelf="center" />;

    if (isFetched && newsDetail) {
        resp = (
            <Card
                content={newsDetail.content.substring(newsDetail.content.indexOf("\n"))}
                heading={newsDetail.heading}
                imageUrl={newsDetail.imageUrl}
            />
        );
    }

    return (
        <Container maxWidth="container.lg" marginY="8">
            {resp}
        </Container>
    );
};
