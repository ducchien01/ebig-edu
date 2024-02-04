import React, { CSSProperties, FocusEvent } from 'react'
import {
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
import './select1.css'

interface ObjWithKnownKeys {
  [k: string]: any;
}

interface Select1Props {
  value?: any,
  options: Array<ObjWithKnownKeys>,
  onChange?: Function,
  label?: string,
  placeholder?: string,
  name?: string,
  disabled: boolean,
  className?: string,
  helperText?: string,
  helperTextColor?: string,
  style?: CSSProperties,
};

interface Select1State {
  value: any,
  offset: DOMRect,
  isOpen: boolean,
  onSelect: any,
  search?: Array<ObjWithKnownKeys>,
  style?: Object
};

export class Select1 extends React.Component<Select1Props, Select1State> {
  state: Select1State = {
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

  props: Readonly<Select1Props> = {
    options: [],
    disabled: false
  }

  parseValue(value: any) {
    if (value === null || value === undefined || value === '') {
      return null
    }
    switch (typeof this.props.options[0].id) {
      case 'boolean':
        return value === 'true'
      case 'number':
        return parseFloat(value)
      default:
        return value
    }
  }

  componentDidUpdate(prevProps: Select1Props, prevState: Select1State) {
    if (prevProps.value !== this.props.value || prevProps.options !== this.props.options) {
      this.setState({
        ...this.state,
        value: this.props.value
      })
    }
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      const thisPopupRect = document.body.querySelector('.select1-popup')?.getBoundingClientRect()
      if (thisPopupRect) {
        let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
        if (thisPopupRect.right > document.body.offsetWidth) {
          style = {
            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
            width: `${this.state.offset.width / 10}rem`,
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
            width: `${this.state.offset.width / 10}rem`,
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

  onChangeValue(ev: FocusEvent) {
    if (this.state.onSelect?.classList?.contains('select1-tile')) {
      const item = this.props.options.find(e => e.id === this.parseValue(this.state.onSelect.id))
      this.setState({
        ...this.state,
        isOpen: false,
        onSelect: null,
        value: item?.id
      })
      if (this.props.onChange) this.props.onChange(item)
    } else if (this.state.onSelect) {
      (ev.target as HTMLInputElement).focus()
    } else {
      this.setState({
        ...this.state,
        isOpen: false,
        onSelect: null
      })
    }
  }

  render() {
    const selectedValue: ObjWithKnownKeys | undefined = this.props.options.find(e => e.id === this.state.value)
    return <div
      className={`select1-container row input-border ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
      helper-text={this.props.helperText}
      style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
      onClick={ev => {
        if (!this.state.isOpen) {
          document.body.getBoundingClientRect()
          this.setState({
            ...this.state,
            isOpen: true,
            offset: ((ev.target as HTMLDivElement).closest('.select1-container') ?? (ev.target as HTMLDivElement)).getBoundingClientRect(),
            style: undefined
          })
        }
      }}
    >
      {selectedValue?.name ? (<div className='select1-value-name'>{selectedValue.name}</div>) : (<div className='select1-placeholder'>{this.props.placeholder}</div>)}
      <FontAwesomeIcon
        icon={this.state.isOpen ? faCaretUp : faCaretDown}
        style={{ fontSize: 11, color: '#888' }}
      />
      {this.state.isOpen &&
        ReactDOM.createPortal(
          <div
            className='select1-popup col'
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
              <input autoFocus={true} placeholder={'Tìm kiếm'}
                onChange={ev => {
                  if (ev.target.value.trim().length) {
                    this.setState({
                      ...this.state,
                      search: this.props.options.filter(e =>
                        e.name
                          .toLowerCase()
                          .includes(ev.target.value.trim().toLowerCase())
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
                  this.onChangeValue(ev)
                }}
              />
            </div>
            <div className='col select1-body'>
              <div className='col select1-scroll-view'>
                {(this.state.search ?? this.props.options).map(item => (
                  <button type='button' key={item.id} className='select1-tile row' id={item.id} >
                    {item.title ?? item.name}
                  </button>
                ))}
                {(this.state.search?.length === 0 || this.props.options?.length === 0) && (
                  <div className='no-results-found'>No result found</div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  }
}
