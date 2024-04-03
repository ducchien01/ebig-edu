import { editorConfiguration } from "../../../../../assets/const/const-list"
import { CustomCKEditor } from "../../../../../component/export-component"

export default function EditParagraph({ data, onChange }) {
    return <CustomCKEditor
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