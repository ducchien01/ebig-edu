import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

export class CustomCKEditor extends React.Component {
    render(): React.ReactNode {
        return <CKEditor
            editor={ClassicEditor}
        />
    }
}