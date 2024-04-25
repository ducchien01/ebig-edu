import React, { CSSProperties } from "react";
import './text-area.css'
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    value?: string,
    maxLength?: number,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    autoFocus?: boolean,
    className?: string,
    helperText?: string,
    name?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    register?: UseFormRegister<{}>,
}

export class TextArea extends React.Component<TextAreaProps> {
    render(): React.ReactNode {
        return <div
            className={`text-area-container row ${this.props.className ?? 'placeholder-2'} ${this.props.helperText?.length && 'helper-text'}`}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
        >
            {this.props.register ?
                <textarea
                    autoFocus={this.props.autoFocus}
                    {...this.props.register}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onFocus={this.props.onFocus}
                /> : <textarea
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                />}
        </div>
    }
}