import React, { CSSProperties } from 'react';
import './checkbox.css';

interface CheckboxProps {
    onChange?: (value: boolean) => void,
    value?: boolean,
    checkColor?: string,
    disabled?: false,
    style?: CSSProperties,
    /** default 2.4rem **/ 
    size?: number | string,
}

interface CheckboxState {
    value?: boolean,
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    state: Readonly<CheckboxState> = {
        value: this.props.value ?? false
    }

    componentDidUpdate(prevProps: Readonly<CheckboxProps>): void {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    render() {
        let convertStyle: CSSProperties = {
            width: this.props.size ?? '2.4rem',
            height: this.props.size ?? '2.4rem',
        }
        if (this.props.style) {
            delete this.props.style.width
            delete this.props.style.minWidth
            delete this.props.style.maxWidth
            delete this.props.style.height
            delete this.props.style.minHeight
            delete this.props.style.maxHeight
            convertStyle = {
                ...this.props.style,
                ...convertStyle
            }
        }
        return <label className="checkbox-container row" style={convertStyle} >
            <input type="checkbox" checked={this.state.value} disabled={this.props.disabled}
                onChange={() => {
                    const newValue = !this.state.value
                    this.setState({ value: newValue })
                    if (this.props.onChange) this.props.onChange(newValue)
                }}
            />
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M6.72 11.52 L10.8 15.6 L18 7.2" fill="none" strokeLinecap="round" stroke={this.props.checkColor ?? '#ffffff'} />
            </svg>
        </label>
    }
}