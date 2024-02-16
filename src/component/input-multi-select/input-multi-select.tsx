import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import './input-multi-select.css'

const checkmark = (
    <svg width='100%' height='100%' viewBox='0 0 20 20'>
        <path d='M5.6 9.6 L9.0 13.0 L15.0 6.0' fill='none' strokeLinecap='round' stroke='white' ></path>
    </svg>
)

interface ObjWithKnownKeys {
    [k: string]: any;
}

interface SelectMultipleProps {
    value?: any,
    options: Required<Array<ObjWithKnownKeys>>,
    onChange?: Function,
    placeholder?: string,
    disabled: boolean,
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
}

interface SelectMultipleState {
    value: Array<any>,
    offset: DOMRect,
    isOpen: boolean,
    onSelect: any,
    search?: Array<ObjWithKnownKeys>,
    style?: Object
};

export class SelectMultiple extends React.Component<SelectMultipleProps, SelectMultipleState> {
    state: SelectMultipleState = {
        value: this.props.value,
        offset: {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            toJSON: function () {
                throw new Error('Function not implemented.')
            }
        },
        isOpen: false,
        onSelect: null,
    }

    onCheck(item: ObjWithKnownKeys) {
        if (this.state.value.some(e => e.id === item.id)) {
            var newValue = this.state.value.filter(e => e.id !== item.id)
        } else {
            newValue = [...this.state.value, item]
        }
        this.setState({
            ...this.state,
            value: newValue
        })
        if (this.props.onChange) this.props.onChange(newValue)
    }

    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ...this.state,
                value: this.props.value
            })
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            const thisPopupRect = document.body.querySelector('.select-multi-popup')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        width: `${this.state.offset.width}px`,
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    }
                }
                if (thisPopupRect.bottom > document.body.offsetHeight) {
                    style = style ? {
                        ...style,
                        top: undefined,
                        bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
                    } : {
                        left: this.state.offset.x + 'px',
                        width: `${this.state.offset.width}px`,
                        bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
                    }
                }
                if (style) this.setState({
                    ...this.state,
                    style: style
                })
            }
        }
    }

    render() {
        return <div
            className={`select-multi-container row ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
            onClick={ev => {
                if (!this.state.isOpen) {
                    this.setState({
                        ...this.state,
                        isOpen: true,
                        style: undefined,
                        offset: ((ev.target as HTMLElement).closest('.select1-container') ?? (ev.target as HTMLElement)).getBoundingClientRect(),
                    })
                }
            }}
        >
            {this.state.value?.length ? (
                this.state.value.map(item => (
                    <div
                        className='selected-item-value row'
                        onClick={() => {
                            let newValue = this.state.value.filter(e => e.id !== item.id)
                            this.setState({
                                ...this.state,
                                value: newValue
                            })
                            if (this.props.onChange) this.props.onChange(newValue)
                        }}
                    >
                        <div className='selected-value-title'>{item.name}</div>
                        <FontAwesomeIcon className='suffix-icon' icon={faClose} />
                    </div>
                ))
            ) : (
                <div className='select-multi-placeholder'>
                    {this.props.placeholder}
                </div>
            )}
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div
                        className='select-multi-popup col'
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: `${this.state.offset.width / 10}rem`,
                        }}
                        onMouseOver={ev => {
                            this.setState({
                                ...this.state,
                                onSelect: ev.target
                            })
                        }}
                        onMouseOut={() =>
                            this.setState({
                                ...this.state,
                                onSelect: null
                            })
                        }
                    >
                        <div className='row header-search'>
                            <input
                                autoFocus={true}
                                placeholder={'Tìm kiếm'}
                                onChange={ev => {
                                    if (ev.target.value.trim().length) {
                                        this.setState({
                                            ...this.state,
                                            search: this.props.options.filter(e =>
                                                e.name
                                                    .toLowerCase()
                                                    .includes(
                                                        ev.target.value.trim().toLowerCase()
                                                    )
                                            )
                                        })
                                    } else {
                                        this.setState({
                                            ...this.state,
                                            search: undefined
                                        })
                                    }
                                }}
                                onBlur={ev => {
                                    if (this.state.onSelect) {
                                        ev.target.focus()
                                    } else {
                                        this.setState({
                                            ...this.state,
                                            isOpen: false,
                                            onSelect: null
                                        })
                                    }
                                }}
                            />
                        </div>
                        <div className='col select-body'>
                            {(this.state.search ?? this.props.options ?? []).map(
                                item => (
                                    <div className='select-tile row'>
                                        <label className='prefix-checkbox'>
                                            <input
                                                type='checkbox'
                                                checked={this.state.value.some(e => e.id === item.id)}
                                                onChange={() => this.onCheck(item)}
                                            />
                                            {checkmark}
                                        </label>
                                        <div className='select-tile-title'>
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            )}
                            {(this.state.search?.length === 0 || this.props.options?.length === 0) && (
                                <div className='no-results-found'>No result found</div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    }
}
