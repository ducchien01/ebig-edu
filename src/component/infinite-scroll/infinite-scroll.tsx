import React, { CSSProperties, ReactNode } from 'react';


interface InfiniteScrollProps {
    className?: string,
    style?: CSSProperties,
    handleScroll?: (ev: React.UIEvent<HTMLDivElement, UIEvent>) => Promise<any>,
    children?: ReactNode,
    totalCount?: number,
}

interface InfiniteScrollState {
    loading: boolean
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollState> {
    state: Readonly<InfiniteScrollState> = {
        loading: false
    }

    render() {
        return <div onScroll={async (ev) => {
            if (this.props.handleScroll) {
                this.setState({ ...this.state, loading: true })
                let scrollElement = ev.target as HTMLDivElement
                if (Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1)) {
                    await this.props.handleScroll(ev)
                    this.setState({ loading: false })
                }
            }
        }} className={`infinite-scroll ${this.state.loading ? 'loading' : ''} ${this.props.className ?? 'col'}`} style={this.props.style ?? { 'overflow': 'hidden auto' }}>
            {this.props.children}
        </div>
    }
}
