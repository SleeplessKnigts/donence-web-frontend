import React from "react";
import {Editor} from '@tinymce/tinymce-react'

export const AddNews: React.FC = (props) => {
    const handleEditorChange = (content: any, editor: any) => {
        console.log('Content was updated', content);
        
    }
    
    return (
        <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            apiKey="h27j6p939ub3eb4vxgiuhrl2jvqv804qivr94actdhlbm1nw"
            init={{
                height: 500,
                menubar: false,
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
    );
};
