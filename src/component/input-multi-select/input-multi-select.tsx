import { faChevronDown, faChevronUp, faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import './input-multi-select.css'
import { Checkbox, Text } from '../export-component'

interface ObjWithKnownKeys {
    [k: string]: any;
}

interface SelectMultipleProps {
    value?: Array<any>,
    options: Required<Array<ObjWithKnownKeys>>,
    onChange?: Function,
    placeholder?: string,
    disabled: boolean,
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    handleSearch?: (e: string) => Promise<Array<ObjWithKnownKeys>>
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
    constructor(props: SelectMultipleProps) {
        super(props)
        this.state = {
            value: props.value ?? [],
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
        this.onCheck = this.onCheck.bind(this)
        this.search = this.search.bind(this);
    }

    private onCheck(item: ObjWithKnownKeys) {
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

    private async search(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value.trim().length) {
            if (this.props?.handleSearch) {
                const res = await this.props.handleSearch(ev.target.value.trim())
                this.setState({
                    ...this.state,
                    search: res
                })
            } else {
                this.setState({
                    ...this.state,
                    search: this.props.options.filter(e => e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()))
                })
            }
        } else {
            this.setState({
                ...this.state,
                search: undefined
            })
        }
    }

    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ...this.state,
                value: this.props.value ?? []
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
                if (thisPopupRect.bottom - 12 > document.body.offsetHeight) {
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
                        offset: ((ev.target as HTMLElement).closest('.select-multi-container') ?? (ev.target as HTMLElement)).getBoundingClientRect(),
                    })
                }
            }}
        >
            <div className='row' style={{ overflow: 'auto hidden', flex: 1, width: '100%', gap: '0.8rem' }}>
                {this.state.value?.length ? (
                    this.state.value.map(item => (
                        <div
                            key={item.id}
                            className='selected-item-value row'
                            onClick={(ev) => {
                                ev.stopPropagation()
                                let newValue = this.state.value.filter(e => e.id !== item.id)
                                this.setState({
                                    ...this.state,
                                    value: newValue,
                                    isOpen: true,
                                    style: undefined,
                                    offset: ((ev.target as HTMLElement).closest('.select-multi-container') ?? (ev.target as HTMLElement)).getBoundingClientRect(),
                                })
                                if (this.props.onChange) this.props.onChange(newValue)
                            }}
                        >
                            <div className='selected-value-title'>{item.name}</div>
                            <FontAwesomeIcon icon={faClose} style={{ color: '#161D24E5', fontSize: '1.2rem' }} />
                        </div>
                    ))
                ) : (
                    <div className='select-multi-placeholder'>
                        {this.props.placeholder}
                    </div>
                )}
            </div>
            <FontAwesomeIcon
                icon={this.state.isOpen ? faChevronUp : faChevronDown}
                style={{ fontSize: '1.2rem', color: '#888' }}
            />
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div
                        className='select-multi-popup col'
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: this.state.offset.width,
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
                                onChange={this.search}
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
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.2rem', color: '#161D24D9' }} />
                        </div>
                        <div style={{ padding: '1.2rem 1.6rem', width: '100%', borderTop: '1px solid #161D2414', borderBottom: '1px solid #161D2414' }}>
                            {(() => {
                                const _list = (this.state.search ?? this.props.options ?? [])
                                const isSelectedAll = _list.every(item => this.state.value.some(e => e.id === item.id))
                                return <Text onClick={() => {
                                    if (_list.length) {
                                        if (isSelectedAll) {
                                            this.setState({ ...this.state, value: this.state.value.filter(e => _list.every(item => e.id !== item.id)) })
                                        } else {
                                            this.setState({ ...this.state, value: [...this.state.value, ..._list.filter(item => this.state.value.every(e => e.id !== item.id))] })
                                        }
                                    }
                                }} className='button-text-3' style={{ color: _list.length ? 'var(--primary-color)' : '#00204D99', }}>{_list.length && isSelectedAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</Text>
                            })()}
                        </div>
                        <div className='col select-body'>
                            {(this.state.search ?? this.props.options ?? []).map(
                                item => (
                                    <div key={item.id} className='select-tile row'>
                                        <Checkbox
                                            value={this.state.value.some(e => e.id === item.id)}
                                            onChange={() => { this.onCheck(item) }}
                                            size={'2rem'}
                                        />
                                        <div className='label-3'>
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
