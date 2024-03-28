import React, { CSSProperties, ReactNode } from 'react';

interface InfiniteScrollProps {
    className?: string,
    style?: CSSProperties,
    handleScroll?: (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {},
    children?: ReactNode,
    totalCount?: number,
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps> {
    render() {
        return <div onScroll={(ev) => {
            let scrollElement = ev.target as HTMLDivElement
            if (Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1)) {
                if (this.props.handleScroll) this.props.handleScroll(ev)
            }
        }} className={this.props.className ?? 'col'} style={this.props.style ?? { 'overflow': 'hidden auto' }}>
            {this.props.children}
        </div>
    }
}
