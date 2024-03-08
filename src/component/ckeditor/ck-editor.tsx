import React, { CSSProperties } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import './ck-editor.css'

interface CKEditorProps<TEditor extends Editor> {
    config?: EditorConfig,
    style?: CSSProperties,
    className?: string,
    value?: string,
    disabled?: boolean,
    onReady?: (editor: TEditor) => void;
    onError?: (error: Error, details: any) => void;
    onChange?: (event: EventInfo, editor: TEditor) => void;
    onFocus?: (event: EventInfo, editor: TEditor) => void;
    onBlur?: (event: EventInfo, editor: TEditor) => void;
}

export class CustomCKEditor<TEditor extends Editor> extends React.Component<CKEditorProps<TEditor>, {}> {
    render(): React.ReactNode {
        return <div className={`col ck-editor-container ${this.props.className ?? ''}`} style={this.props.style} >
            <CKEditor
                editor={ClassicEditor}
                config={{ ...this.props.config }}
                data={this.props.value}
                disabled={this.props.disabled}
                onReady={this.props.onReady}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                onError={this.props.onError}
            />
        </div>
    }
}