import { Container, Heading, SimpleGrid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useQuery } from "react-query";
import { Card } from "../../components/molecules/Card";
import { api } from "../../shared/api/api";

export const News: React.FC = () => {
    const { data: allNews, isFetched } = useQuery("getAllNews", api.user.getAllNews);

    let comp = <Spinner size="xl" marginY="16" />;

    if (isFetched && allNews) {
        console.log(allNews);
        comp = (
            <>
                <Heading my="4">Güncel Haberler</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingY="8" spacingX="4">
                    {allNews.map((el) => {
                        return (
                            <Card
                                content={el.content.substring(el.content.indexOf("\n"))}
                                heading={el.heading}
                                imageUrl={el.imageUrl}
                                url={`/haberler/${el.id}`}
                            />
                        );
                    })}
                </SimpleGrid>
            </>
        );
    }

    return (
        <Container maxW="container.lg" centerContent>
            {comp}
        </Container>
    );
};
