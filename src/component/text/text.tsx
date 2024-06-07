import React, { CSSProperties, ReactNode } from 'react';
import './text.css';

interface TextProps {
    children?: ReactNode,
    style?: CSSProperties,
    className?: string,
    maxLine?: number,
    showMore?: boolean,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    onHover?: React.MouseEventHandler<HTMLDivElement>,
}

interface TextState {
    toggle?: boolean
}

export class Text extends React.Component<TextProps, TextState> {
    render(): React.ReactNode {
        let convertStyle: CSSProperties = this.props.style ?? {}
        if (this.props.maxLine) {
            convertStyle = { ...convertStyle, '--max-line': this.state?.toggle ? undefined : this.props.maxLine } as CSSProperties
        }
        return <div ref={ref => {
            if (ref && this.props.showMore && this.props.maxLine && this.state?.toggle === undefined) {
                let _lineH: number | string = window.getComputedStyle(ref).lineHeight.replaceAll('px', '')
                if (_lineH === 'normal') {
                    _lineH = parseFloat(window.getComputedStyle(ref).fontSize.replaceAll('px', ''))
                } else {
                    _lineH = parseFloat(_lineH)
                }
                if (Math.round(_lineH * this.props.maxLine) < ref.offsetHeight) {
                    this.setState({ toggle: false })
                }
            }
        }}
            onMouseOver={this.props.onHover}
            onClick={this.props.onClick}
            className={`comp-text ${this.props.onClick ? 'type-button' : ''} ${this.props.className ?? ''}`}
            style={convertStyle}>
            {this.props.children}
            {this.props.showMore ?
                <button
                    className={this.state?.toggle ? '' : 'get-more'}
                    style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', padding: '0 0.4rem' }}
                    onClick={() => { this.setState({ toggle: !this.state?.toggle }) }}>
                    <div style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', color: 'var(--primary-color)' }}>
                        {this.state?.toggle ? 'Ẩn bớt' : 'Xem thêm'}</div>
                </button> :
                undefined}
        </div>
    }
}