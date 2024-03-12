import React, { CSSProperties, ReactNode } from 'react';
import './text.css';

interface TextProps {
    children?: ReactNode,
    style?: CSSProperties,
    className?: string,
    maxLine?: number,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    onHover?: React.MouseEventHandler<HTMLDivElement>,
}

export class Text extends React.Component<TextProps> {
    render(): React.ReactNode {
        let convertStyle: CSSProperties = this.props.style ?? {}
        if (this.props.maxLine) {
            convertStyle = { ...convertStyle, '--max-line': this.props.maxLine } as CSSProperties
        }
        return <div onMouseOver={this.props.onHover} onClick={this.props.onClick} className={`comp-text ${this.props.onClick ? 'type-button' : ''} ${this.props.className ?? ''}`} style={convertStyle}>{this.props.children}</div>
    }
}