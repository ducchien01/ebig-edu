import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactDOM from 'react-dom'
import './input-multi-select.css'
import { Controller } from 'react-hook-form'

const checkmark = (
  <svg width='100%' height='100%' viewBox='0 0 20 20'>
    <path d='M5.6 9.6 L9.0 13.0 L15.0 6.0' fill='none' strokeLinecap='round' stroke='white' ></path>
  </svg>
)

export class SelectMultiple extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value ?? [],
      offset: { x: 0, y: 0 },
      isOpen: false,
      onSelect: null,
      search: null
    }
  }

  onCheck(item, field) {
    if (this.state.value.some(e => e.id === item.id)) {
      var newValue = this.state.value.filter(e => e.id !== item.id)
    } else {
      newValue = [...this.state.value, item]
    }
    this.setState({
      ...this.state,
      value: newValue
    })
    if (field) field.onChange(newValue)
    if (this.props.onChange) this.props.onChange(newValue)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        ...this.state,
        value: this.props.value
      })
    }
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      const thisPopupRect = document.body.querySelector('.select-multi-popup').getBoundingClientRect()
      if (thisPopupRect.right > document.body.offsetWidth) {
        var style = {
          top: this.state.offset.y + this.state.offset.height + 2 + 'px',
          width: `${this.state.offset.width / 10}rem`,
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

  renderUI(field) {
    return <div
      className={`select-multi-container row input-border ${this.props.disabled ? 'disabled' : ''} ${this.props.control && this.props.errors[this.props.name] && 'helper-text'}`}
      helper-text={this.props.control && this.props.errors[this.props.name]?.message}
      onClick={ev => {
        if (!this.state.isOpen) {
          this.setState({
            ...this.state,
            isOpen: true,
            style: null,
            offset: ev.target.closest('.select-multi-container').getBoundingClientRect()
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
              if (field) field.onChange(newValue)
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
                      search: null
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
                        onChange={() => this.onCheck(item, field)}
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

  render() {
    return this.props.control ? (
      <Controller
        name={this.props.name}
        control={this.props.control}
        render={({ field }) => {
          return this.renderUI(field)
        }}
      />
    ) : this.renderUI()
  }
}
