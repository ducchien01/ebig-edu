import React, { CSSProperties } from 'react';
import './switch.css';

interface SwitchProps {
    onChange?: Function,
    value?: boolean,
    disabled: false,
    style: CSSProperties,
    size?: number | string,
    dotColor?: string,
    onBackground?: string,
    offBackground?: string,
    name?: string,
    className?: string,
}

interface SwitchState {
    value?: boolean,
}

export class Switch extends React.Component<SwitchProps, SwitchState> {
    state: Readonly<SwitchState> = {
        value: this.props.value ?? false
    }

    render() {
        const propStyle = {
            '--off-bg': this.props.offBackground ?? 'var(--background)',
            '--on-bg': this.props.onBackground ?? 'var(--primary-color)',
            '--dot-color': this.props.dotColor ?? '#ffffff',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '20px'
        }
        let convertStyle: CSSProperties = {
            height: this.props.size ?? 20,
            width: `calc(${this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '20px'} * 9 / 5)`,
            ...propStyle
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
                ...convertStyle,
            }
        }
        return <label className={`switch-container row ${this.props.className ?? ''}`} style={convertStyle} >
            <input type="checkbox" checked={this.state.value} name={this.props.name} disabled={this.props.disabled}
                onChange={() => {
                    const newValue = !this.state.value
                    this.setState({ value: newValue })
                    if (this.props.onChange) this.props.onChange(newValue)
                }}
            />
            <span className="slider"></span>
        </label>
    }
}