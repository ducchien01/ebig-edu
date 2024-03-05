import React, { CSSProperties, ReactNode } from "react";
import './text-field.css'

interface TextFieldProps {
    value?: string,
    maxLength?: number,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    className?: string,
    helperText?: string,
    name?: string,
    suffix?: ReactNode,
    prefix?: ReactNode,
    helperTextColor?: string,
    style?: CSSProperties,
    type?: React.HTMLInputTypeAttribute,
}

export class TextField extends React.Component<TextFieldProps> {
    render(): React.ReactNode {
        return <div
            className={`text-field-container row ${this.props.className ?? 'placeholder-2'} ${this.props.helperText?.length && 'helper-text'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
        >
            {this.props.prefix}
            <input
                // autoComplete={autoComplete ? 'on' : 'new-password'}
                maxLength={this.props.maxLength}
                name={this.props.name}
                type={this.props.type ?? 'text'}
                defaultValue={this.props.defaultValue}
                value={this.props.value}
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
            />
            {this.props.suffix}
        </div>
    }
}