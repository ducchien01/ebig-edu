import React from 'react'
import ReactDOM from 'react-dom'
import './dialog.css'

const inforSvg = (
  <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M18.0003 3.41669C15.116 3.41669 12.2965 4.27198 9.89826 5.87442C7.50005 7.47686 5.63087 9.75446 4.52709 12.4192C3.42331 15.084 3.13451 18.0162 3.69721 20.8451C4.25991 23.674 5.64884 26.2725 7.68836 28.312C9.72787 30.3515 12.3264 31.7404 15.1553 32.3031C17.9842 32.8658 20.9164 32.577 23.5811 31.4733C26.2459 30.3695 28.5235 28.5003 30.1259 26.1021C31.7284 23.7039 32.5837 20.8843 32.5837 18C32.5795 14.1336 31.0417 10.4267 28.3077 7.69266C25.5737 4.95867 21.8668 3.42087 18.0003 3.41669V3.41669ZM19.2496 26.1715H16.7401V15.5695H19.2496V26.1715ZM19.0418 12.2384C18.9034 12.3653 18.7407 12.463 18.5637 12.5256C18.3866 12.5883 18.1987 12.6146 18.0113 12.603C17.8204 12.6157 17.6289 12.5899 17.4481 12.5273C17.2673 12.4647 17.101 12.3664 16.9588 12.2384C16.8333 12.1032 16.7363 11.9441 16.6737 11.7706C16.611 11.5971 16.584 11.4127 16.5943 11.2285C16.5815 11.04 16.6073 10.8509 16.67 10.6727C16.7327 10.4945 16.8309 10.3309 16.9588 10.1919C17.1013 10.0644 17.2678 9.96649 17.4484 9.9039C17.6291 9.84131 17.8204 9.81526 18.0113 9.82728C18.1987 9.81637 18.3864 9.843 18.5633 9.90561C18.7403 9.96822 18.903 10.0655 19.0418 10.1919C19.1697 10.3309 19.268 10.4945 19.3307 10.6727C19.3934 10.8509 19.4191 11.04 19.4064 11.2285C19.4166 11.4127 19.3896 11.5971 19.327 11.7706C19.2644 11.9441 19.1674 12.1032 19.0418 12.2384Z' fill='#366AE2' />
  </svg>
)

const errorSvg = (
  <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M18.0003 3.41669C15.116 3.41669 12.2965 4.27198 9.89826 5.87442C7.50005 7.47686 5.63087 9.75446 4.52709 12.4192C3.42331 15.084 3.13451 18.0162 3.69721 20.8451C4.25991 23.674 5.64884 26.2725 7.68836 28.312C9.72787 30.3515 12.3264 31.7404 15.1553 32.3031C17.9842 32.8658 20.9164 32.577 23.5811 31.4733C26.2459 30.3695 28.5235 28.5003 30.1259 26.1021C31.7284 23.7039 32.5837 20.8843 32.5837 18C32.5724 14.1357 31.0324 10.4329 28.2999 7.70044C25.5674 4.96797 21.8646 3.42791 18.0003 3.41669V3.41669ZM24.016 22.2972L22.2976 24.0156L18.0003 19.7184L13.7031 24.0156L11.9847 22.2972L16.2819 18L11.9847 13.7028L13.7031 11.9844L18.0003 16.2816L22.2976 11.9844L24.016 13.7028L19.7187 18L24.016 22.2972Z' fill='#E14337' />
  </svg>
)

const warningSvg = (
  <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M32.1516 25.8877L21.3215 5.41379C21.0014 4.81074 20.5231 4.30622 19.938 3.95437C19.3529 3.60252 18.6831 3.41663 18.0003 3.41663C17.3176 3.41663 16.6477 3.60252 16.0626 3.95437C15.4775 4.30622 14.9993 4.81074 14.6792 5.41379L3.84901 25.8877C3.54781 26.459 3.39954 27.0984 3.41863 27.744C3.43771 28.3895 3.6235 29.0191 3.95793 29.5716C4.29235 30.1241 4.76404 30.5806 5.32713 30.8969C5.89022 31.2131 6.52555 31.3783 7.17136 31.3763H28.8293C29.4751 31.3783 30.1104 31.2131 30.6735 30.8969C31.2366 30.5806 31.7083 30.1241 32.0427 29.5716C32.3771 29.0191 32.5629 28.3895 32.582 27.744C32.6011 27.0984 32.4528 26.459 32.1516 25.8877ZM18.0003 27.7294C17.6397 27.7294 17.2871 27.6224 16.9873 27.4221C16.6874 27.2217 16.4537 26.9369 16.3157 26.6037C16.1776 26.2705 16.1415 25.9039 16.2119 25.5502C16.2823 25.1965 16.4559 24.8715 16.7109 24.6165C16.966 24.3615 17.2909 24.1878 17.6446 24.1175C17.9983 24.0471 18.3649 24.0832 18.6981 24.2212C19.0313 24.3593 19.3161 24.593 19.5165 24.8928C19.7168 25.1927 19.8238 25.5453 19.8238 25.9059C19.8238 26.3895 19.6317 26.8533 19.2897 27.1953C18.9477 27.5373 18.4839 27.7294 18.0003 27.7294ZM19.216 21.6512H16.7847L16.1769 11.926H19.8238L19.216 21.6512Z' fill='#FC6B03' />
  </svg>
)

const successSvg = (
  <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M18.0003 3.41669C15.116 3.41669 12.2965 4.27198 9.89826 5.87442C7.50005 7.47686 5.63087 9.75446 4.52709 12.4192C3.42331 15.084 3.13451 18.0162 3.69721 20.8451C4.25991 23.674 5.64884 26.2725 7.68836 28.312C9.72787 30.3515 12.3264 31.7404 15.1553 32.3031C17.9842 32.8658 20.9164 32.577 23.5811 31.4733C26.2459 30.3695 28.5235 28.5003 30.1259 26.1021C31.7284 23.7039 32.5837 20.8843 32.5837 18C32.5724 14.1357 31.0324 10.4329 28.2999 7.70044C25.5674 4.96797 21.8646 3.42791 18.0003 3.41669V3.41669ZM15.5698 24.5795L8.99026 18L10.7087 16.2816L15.5698 21.1427L25.292 11.4205L27.0104 13.1389L15.5698 24.5795Z' fill='#39AC6D' />
  </svg>
)

export const enum DialogStatus {
  INFOR,
  ERROR,
  WARNING,
  SUCCSESS,
}

interface DialogState {
  readonly open?: boolean,
  title: string,
  status: DialogStatus,
  content: string,
  onSubmit: Function,
  submitTitle?: string,
}

export const showDialog = ({ ref, title, status, content, onSubmit, submitTitle }: {
  ref: React.MutableRefObject<Dialog>,
  title?: string,
  status?: DialogStatus,
  content?: string,
  onSubmit?: Function,
  submitTitle?: string,
}) => {
  ref.current.showDialogNoti({
    title: title ?? '',
    status: status ?? DialogStatus.INFOR,
    content: content ?? '',
    onSubmit: onSubmit ?? (() => { }),
    submitTitle: submitTitle
  })
}

export class Dialog extends React.Component<Object, DialogState> {
  state: Readonly<DialogState> = {
    open: false,
    title: '',
    status: DialogStatus.INFOR,
    content: '',
    onSubmit: () => { }
  }
  showDialogNoti(data: DialogState) {
    this.setState({ open: true, ...data })
  }

  closeDialog() {
    this.setState({ open: false })
  }

  showStatus() {
    switch (this.state.status) {
      case DialogStatus.INFOR:
        return inforSvg
      case DialogStatus.ERROR:
        return errorSvg
      case DialogStatus.WARNING:
        return warningSvg
      case DialogStatus.SUCCSESS:
        return successSvg
      default:
        return inforSvg
    }
  }

  render() {
    return (
      <div>
        {this.state.open &&
          ReactDOM.createPortal(
            <div className='dialog-overlay'>
              <div className='dialog-container col' style={{ width: '414rem' }}
                dialog-type={this.state.status} onClick={e => e.stopPropagation()} >
                <div key={'dialog-body'} className='dialog-body col'>
                  <div className='dialog-status row'>{this.showStatus()}</div>
                  <div className='dialog-title'>{this.state.title}</div>
                  <div className='dialog-content'>{this.state.content}</div>
                </div>,
                <div key={'dialog-footer'} className='dialog-footer row'>
                  <button type='button' onClick={() => this.setState({ open: false })} className='dialog-action'>Quay lại</button>
                  <button onClick={() => {
                    this.state.onSubmit();
                    this.setState({ open: false });
                  }} type='button' className='dialog-action dialog-submit' >
                    {this.state.submitTitle ?? 'Xác nhận'}
                  </button>
                </div>
                <button type='button' onClick={() => this.setState({ open: false })} className='dialog-close-btn row' >
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
