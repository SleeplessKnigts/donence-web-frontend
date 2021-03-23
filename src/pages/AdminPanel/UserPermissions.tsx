import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Container, Heading, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "react-hook-form";
import React from "react";
import { useMutation } from "react-query";
import { api } from "../../shared/api/api";

export const UserPermissions: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const mutation = useMutation(api.admin.assignNewRole);

    const onSubmit = (data: any) => {
        console.log(data)
        mutation.mutate(data)
        if(mutation.isSuccess){
            alert("İşleminiz başarıyla gerçekleştirildi.")
        }
    };



    return (
        <Container maxW="container.lg">
            <Heading marginY="8">Kullanıcı yetkilerini düzenle</Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack>
                    <Input
                        name="email"
                        type="email"
                        _hover={{ bgColor: "white" }}
                        variant="filled"
                        placeholder="Email giriniz"
                        ref={register({required:true})}
                    />
                    <Select name="role" _hover={{ bgColor: "white" }} variant="filled" ref={register}>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_DRIVER">Driver</option>
                        <option value="ROLE_USER">User</option>
                    </Select>
                    <Button _hover={{ bgColor: "white" }} bgColor="gray.50" paddingX="8" type="submit">
                        Güncelle
                    </Button>
                </HStack>
            </form>
        </Container>
    );
};
