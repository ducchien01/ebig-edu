import React from 'react'
import ReactDOM from 'react-dom'
import './dialog.css'
import { ComponentStatus, getStatusIcon } from '../export-component'


export enum DialogAlignment {
    start = 'start',
    center = 'center',
    end = 'end'
}

interface DialogState {
    readonly open?: boolean,
    title: string,
    status: ComponentStatus,
    content: string,
    onSubmit: Function,
    submitTitle?: string,
    alignment?: DialogAlignment,
}

export const showDialog = ({ ref, title, status, content, onSubmit, submitTitle, alignment }: {
    ref: React.MutableRefObject<Dialog>,
    title?: string,
    status?: ComponentStatus,
    content?: string,
    onSubmit?: Function,
    submitTitle?: string,
    alignment?: DialogAlignment
}) => {
    ref.current.showDialogNoti({
        title: title ?? '',
        status: status ?? ComponentStatus.INFOR,
        content: content ?? '',
        onSubmit: onSubmit ?? (() => { }),
        submitTitle: submitTitle,
        alignment: alignment
    })
}

export class Dialog extends React.Component<Object, DialogState> {
    state: Readonly<DialogState> = {
        open: false,
        title: '',
        status: ComponentStatus.INFOR,
        content: '',
        onSubmit: () => { }
    }
    showDialogNoti(data: DialogState) {
        this.setState({ open: true, ...data })
    }

    closeDialog() {
        this.setState({ open: false })
    }

    render() {
        return (
            <>
                {this.state.open &&
                    ReactDOM.createPortal(
                        <div className='dialog-overlay'>
                            <div className='dialog-container col' style={{ width: '41.4rem', alignItems: this.state.alignment }} dialog-type={this.state.status} onClick={e => e.stopPropagation()} >
                                <div key={'dialog-body'} className='dialog-body col' style={{ alignItems: 'inherit' }}>
                                    <div className='dialog-status row'>{getStatusIcon(this.state.status)}</div>
                                    <div className='dialog-title' style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.title}</div>
                                    <div className='dialog-content' style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.content}</div>
                                </div>
                                <div key={'dialog-footer'} className='dialog-footer row'>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => this.setState({ open: false })} className='dialog-action'>Quay lại</button>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => {
                                        this.state.onSubmit();
                                        this.setState({ open: false });
                                    }} className='dialog-action dialog-submit' >
                                        {this.state.submitTitle ?? 'Xác nhận'}
                                    </button>
                                </div>
                                <button type='button' onClick={() => this.setState({ open: false })} className='dialog-close-btn row' >
                                    <svg width='100%' height='100%' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ width: '2rem', height: '2rem' }} >
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
