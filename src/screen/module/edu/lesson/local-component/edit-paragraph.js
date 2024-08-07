import { editorConfiguration } from "../../../../../assets/const/const-list"
import { CustomCKEditor } from "../../../../../project-component/ckeditor/ck-editor"

export default function EditParagraph({ data, onChange }) {
    return <CustomCKEditor
        className="lesson-paragraph-ck-editor"
        config={editorConfiguration}
        style={{ flex: 1, height: '100%' }}
        value={data?.content ?? ''}
        onBlur={(_, editor) => {
            console.log(editor.getData())
            if (onChange) onChange({
                ...data,
                content: editor.getData()
            })
        }}
    />
}