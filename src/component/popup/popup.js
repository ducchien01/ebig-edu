import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

export const showPopup = ({
  ref,
  heading,
  content,
  footer,
  submit = () => { }
}) => {
  ref.current.onOpen({
    heading: heading,
    content: content,
    footer: footer,
    submit: submit
  })
}

export const closePopup = ref => {
  ref.current.onClose()
}

export class Popup2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      heading: '',
      content: <div></div>,
      footer: null,
      submit: () => { }
    }
  }

  onOpen({ heading, content, footer, submit = () => { } }) {
    this.setState({
      open: true,
      heading: heading,
      content: content,
      footer,
      submit: submit
    })
  }

  onClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        {this.state.open &&
          ReactDOM.createPortal(
            <div className='popup-overlay'>
              <div className='popup-container col' onClick={e => e.stopPropagation()} >
                <div className='popup-header row'>{this.state.heading}</div>
                <div className='popup-body col'>{this.state.content}</div>
                <button
                  type='button'
                  onClick={() => this.setState({ open: false })}
                  className='popup-close-btn row'
                >
                  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' >
                    <path fillRule='evenodd' clipRule='evenodd' d='M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z' fill='#00204D' fillOpacity={0.6} />
                  </svg>
                </button>
              </div>
            </div>,
            document.body
          )}
      </div>
    )
  }
}
