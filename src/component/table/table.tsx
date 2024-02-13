import React, { CSSProperties, ReactNode } from 'react';
import './table.css'

type TbCellProps = {
    fixed?: boolean,
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
}

export class TbCell extends React.Component<TbCellProps> {
    render(): React.ReactNode {
        return <td style={this.props.style} className={`tb-cell ${this.props.className ?? ''} ${this.props.fixed ? 'tb-cell-fixed' : ''}`}>{this.props.children}</td>
    }
}

interface TbRowProps {
    children?: Array<TbCell>,
    className?: string,
    style?: CSSProperties,
}


export class TbRow extends React.Component<TbRowProps> {
    render(): React.ReactNode {
        return <tr style={this.props.style} className={`tb-row ${this.props.className ?? ""}`}>
            {(this.props.children ?? []).map((e: TbCell, i: number) => {
                let ox: number | string = 0
                if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                    ox = `calc(${this.props.children.slice(0, i).map(tb => {
                        const wValue = tb.props.style?.minWidth ?? tb.props.style?.width
                        return wValue ? typeof wValue === 'number' ? `${wValue}px` : wValue : '60px';
                    }).join(" + ")})`
                }
                return <TbCell
                    key={`tb-cell-${i}`}
                    children={e.props.children}
                    fixed={e.props.fixed}
                    style={e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? { right: 0 } : { left: ox } : e.props.style}
                    className={e.props.className} />;
            })}
        </tr>
    }
}

export class TbHeader extends React.Component<TbRowProps> {
    render() {
        return <thead style={this.props.style} className={`tb-header ${this.props.className ?? ""}`}>
            <tr>
                {(this.props.children ?? []).map((e: TbCell, i: number) => {
                    let ox: number | string = 0
                    if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                        ox = `calc(${this.props.children.slice(0, i).map(tb => tb.props.style?.width ? typeof tb.props.style.width === 'number' ? `${tb.props.style.width}px` : tb.props.style.width : '60px').join(" + ")})`
                    }
                    return <TbCell
                        key={`tb-cell-${i}`}
                        children={e.props.children}
                        fixed={e.props.fixed}
                        style={e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? { right: 0 } : { left: ox } : e.props.style}
                        className={e.props.className} />;
                })}
            </tr>
        </thead>
    }
}

interface TbBodyProps {
    children?: Array<TbRow>,
    className?: string,
    style?: CSSProperties,
}

export class TbBody extends React.Component<TbBodyProps> {
    render(): React.ReactNode {
        return <tbody>{this.props.children as ReactNode}</tbody>
    }
}

interface TableProps {
    children?: Array<TbBody | TbHeader>,
    className?: string,
    style?: CSSProperties,
}

export class Table extends React.Component<TableProps> {
    render(): React.ReactNode {
        return <table className={`custom-table ${this.props.className}`} style={this.props.style}>{this.props.children as ReactNode}</table>
    }
}
