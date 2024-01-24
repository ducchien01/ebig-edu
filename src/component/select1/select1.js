import {
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactDOM from 'react-dom'
import './select1.css'
import { Controller } from 'react-hook-form'

export class Select1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      offset: { x: 0, y: 0 },
      isOpen: false,
      onSelect: null,
      search: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value || prevProps.options !== this.props.options) {
      this.setState({
        ...this.state,
        value: this.props.value
      })
    }
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      const thisPopupRect = document.body.querySelector('.select1-popup').getBoundingClientRect()
      if (thisPopupRect.right > document.body.offsetWidth) {
        var style = {
          top: this.state.offset.y + this.state.offset.height + 2 + 'px',
          width: this.state.offset.width + 'px',
          right: document.body.offsetWidth - this.state.offset.right + 'px'
        }
      }
      if (thisPopupRect.bottom > document.body.offsetHeight) {
        style = style ? {
          ...style,
          top: null,
          bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
        } : {
          left: this.state.offset.x + 'px',
          width: this.state.offset.width + 'px',
          bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
        }
      }
      if (style) this.setState({
        ...this.state,
        style: style
      })
    }
  }

  onChangeValue(ev, field) {
    if (this.state.onSelect?.classList?.contains('select1-tile')) {
      const item = this.props.options.find(e => e.id == this.state.onSelect.id)
      this.setState({
        ...this.state,
        isOpen: false,
        onSelect: null,
        value: item.id
      })
      if (field) field.onChange(item.id)
      if (this.props.onChange) this.props.onChange(item)
    } else if (this.state.onSelect) {
      ev.target.focus()
    } else {
      this.setState({
        ...this.state,
        isOpen: false,
        onSelect: null
      })
    }
  }

  renderUI(selectedValue, field) {
    return (
      <div
        className={`select1-container row input-border ${this.props.disabled ? 'disabled' : ''} ${this.props.control && this.props.errors[this.props.name] && 'helper-text'}`}
        helper-text={this.props.control && this.props.errors[this.props.name]?.message}
        onClick={ev => {
          if (!this.state.isOpen) {
            this.setState({
              ...this.state,
              isOpen: true,
              offset: ev.target
                .closest('.select1-container')
                .getBoundingClientRect(),
              style: null
            })
          }
        }}
      >
        {selectedValue?.name ? (
          <div className='select1-value-name'>{selectedValue.name}</div>
        ) : (
          <div className='select1-placeholder'>{this.props.placeholder}</div>
        )}
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
                width: this.state.offset.width + 'px'
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
                            .includes(ev.target.value.trim().toLowerCase())
                        )
                      })
                    } else {
                      this.setState({
                        ...this.state,
                        search: null
                      })
                    }
                  }}
                  onBlur={ev => {
                    this.onChangeValue(ev, field)
                  }}
                />
              </div>
              <div className='col select1-body'>
                <div className='col select1-scroll-view'>
                  {(this.state.search ?? this.props.options ?? []).map(item => (
                    <button
                      type='button'
                      key={item.id}
                      className='select1-tile row'
                      id={item.id}
                    >
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
    )
  }

  render() {
    const selectedValue = this.props.options.find(
      e => e.id === this.state.value
    )
    return this.props.control ? (
      <Controller
        name={this.props.name}
        control={this.props.control}
        rules={{ required: this.props.required === true ? `Vui lòng nhập ${this.props.label.toLowerCase()}` : null }}
        render={({ field }) => {
          return this.renderUI(selectedValue, field)
        }}
      />
    ) : (
      this.renderUI(selectedValue)
    )
  }
}
