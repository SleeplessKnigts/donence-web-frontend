import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Heading, VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../shared/api/api";
import { News } from "../../shared/types";
import { useMutation } from "react-query";
import { useHistory } from "react-router";

export const AddNews: React.FC = (props) => {
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
    const mutation = useMutation(api.admin.createNews, {
        onSuccess: () => {
            alert("Haber başarıyla yayımlandı!");
            history.replace("/haberler")
        },
    });

    const handleEditorChange = (content: any, editor: any) => {
        setContent(content);
    };

    const handleImageUrlChange = (event: any) => {
        setImageUrl(event.target.value);
    };

    const onSaveClick = () => {
        const news: News = { content: content, heading: content.split("\n")[0], imageUrl: imageUrl };
        console.group();
        console.log("Image Url: ", imageUrl);
        console.log("Content: ", content);
        console.groupEnd();
        mutation.mutate(news);
    };

    return (
        <VStack margin={4}>
            <Heading>Yeni Haber Ekle</Heading>
            <InputGroup maxWidth="1200px">
                <InputLeftElement pointerEvents="none" children={<FontAwesomeIcon icon={faLink} />} />
                <Input
                    type="text"
                    placeholder="Resim Urlsi"
                    bg="white"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                />
            </InputGroup>

            <Editor
                initialValue="<p>Haber içeriğini giriniz...</p>"
                apiKey="h27j6p939ub3eb4vxgiuhrl2jvqv804qivr94actdhlbm1nw"
                init={{
                    height: 500,
                    width: 1200,
                    menubar: true,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={handleEditorChange}
            />

            <Button bg="brand.400" color="white" variant="outlined" onClick={onSaveClick}>
                Yayınla
            </Button>
        </VStack>
    );
};
