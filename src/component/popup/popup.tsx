import React, { CSSProperties, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

interface PopupState {
    readonly open?: boolean,
    heading?: ReactNode,
    content?: ReactNode,
    footer?: ReactNode,
    clickOverlayClosePopup?: boolean,
    style?: CSSProperties,
    hideButtonClose?: boolean,
}

export const showPopup = ({ ref, heading, content, footer, clickOverlayClosePopup, style, hideButtonClose }: {
    ref: React.MutableRefObject<Popup | undefined>,
    heading?: ReactNode,
    content?: ReactNode,
    footer?: ReactNode,
    clickOverlayClosePopup?: boolean,
    style?: CSSProperties,
    hideButtonClose?: boolean
}) => {
    ref?.current?.onOpen({
        heading: heading,
        content: content,
        footer: footer,
        clickOverlayClosePopup: clickOverlayClosePopup,
        style: style,
        hideButtonClose: hideButtonClose
    })
}

export const closePopup = (ref: React.MutableRefObject<Popup>) => {
    ref.current.onClose()
}

export class Popup extends React.Component<Object, PopupState> {
    private ref: React.RefObject<HTMLDivElement>;
    constructor(props: Object | Readonly<Object>) {
        super(props);
        this.ref = React.createRef();
    }
    state: Readonly<PopupState> = {
        open: false,
    }

    onOpen(data: PopupState) {
        this.setState({ open: true, ...data })
    }

    onClose() {
        this.setState({ open: false })
    }

    componentDidUpdate(prevProps: Readonly<Object>, prevState: Readonly<PopupState>) {
        if (prevState.open !== this.state.open && this.state.open && this.state.style) {
            const thisPopupRect = this.ref.current?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: CSSProperties | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = { ...this.state.style, right: '0.4rem' }
                    delete style.left
                }
                if (thisPopupRect.bottom > document.body.offsetHeight) {
                    style = style ? {
                        ...style,
                        bottom: '0.4rem'
                    } : {
                        ...this.state.style,
                        bottom: '0.4rem'
                    }
                    delete style.top
                }
                if (style) this.setState({ ...this.state, style: style })
            }
        }
    }

    render() {
        return (
            <>
                {this.state.open &&
                    ReactDOM.createPortal(
                        <div className={`popup-overlay ${this.state.clickOverlayClosePopup ? 'hidden-overlay' : ''}`} onClick={this.state.clickOverlayClosePopup ? (ev) => {
                            if ((ev.target as HTMLElement).classList.contains('popup-overlay'))
                                this.onClose()
                        } : undefined}>
                            <div ref={this.ref} className='popup-container col' onClick={e => e.stopPropagation()} style={this.state.style} >
                                {this.state.heading}
                                {this.state.content}
                                {this.state.footer}
                                {this.state.hideButtonClose ? null : <button type='button' onClick={() => this.onClose()} className='popup-close-btn row' >
                                    <svg width='100%' height='100%' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ width: '2rem', height: '2rem' }} >
                                        <path fillRule='evenodd' clipRule='evenodd' d='M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z' fill='#00204D' fillOpacity={0.6} />
                                    </svg>
                                </button>}
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        )
    }
}
