import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

interface PopupState {
  readonly open?: boolean,
  heading?: ReactNode,
  content?: ReactNode,
  footer?: ReactNode,
  onSubmit: Function,
  clickOverlayClosePopup?: boolean,
}

export const showPopup = ({ ref, heading, content, footer, onSubmit, clickOverlayClosePopup }: {
  ref: React.MutableRefObject<Popup>, 
  heading?: ReactNode,
  content?: ReactNode,
  footer?: ReactNode,
  onSubmit?: Function,
  clickOverlayClosePopup?: boolean
}) => {
  ref.current.onOpen({
    heading: heading,
    content: content,
    footer: footer,
    onSubmit: onSubmit ?? (() => { }),
    clickOverlayClosePopup: clickOverlayClosePopup
  })
}

export const closePopup = (ref: React.MutableRefObject<Popup>) => {
  ref.current.onClose()
}

export class Popup extends React.Component<Object, PopupState> {
  state: Readonly<PopupState> = {
    open: false,
    onSubmit: () => { }
  }

  onOpen(data: PopupState) {
    this.setState({ open: true, ...data })
  }

  onClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <>
        {this.state.open &&
          ReactDOM.createPortal(
            <div className='popup-overlay' onClick={this.state.clickOverlayClosePopup ? (ev) => {
              if ((ev.target as HTMLElement).classList.contains('popup-overlay'))
                this.onClose()
            } : undefined}>
              <div className='popup-container col' onClick={e => e.stopPropagation()} >
                {this.state.heading}
                {this.state.content}
                {this.state.footer}
                <button type='button' onClick={() => this.onClose()} className='popup-close-btn row' >
                  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' >
                    <path fillRule='evenodd' clipRule='evenodd' d='M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z' fill='#00204D' fillOpacity={0.6} />
                  </svg>
                </button>
              </div>
            </div>,
            document.body
          )}
      </>
    )
  }
}
