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
                            return <div onMouseOver={this.props.onHover} onClick={this.props.onClick} className={`component-text ${this.props.className ?? ''}`} style={this.props.style ? { ...({ '--max-line': this.props.maxLine ?? 2 } as CSSProperties), ...this.props.style } : ({ '--max-line': this.props.maxLine ?? 2 } as CSSProperties)}>{this.props.children}</div>
              }
}