/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import ReactDOM from 'react-dom'
import './date-picker.css'
import { Ultis } from '../../Utils'

const calendar = (
  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
    <path d='M12.3876 2.99967V1.88856C12.3876 1.74122 12.3291 1.59991 12.2249 1.49573C12.1207 1.39154 11.9794 1.33301 11.832 1.33301C11.6847 1.33301 11.5434 1.39154 11.4392 1.49573C11.335 1.59991 11.2765 1.74122 11.2765 1.88856V2.99967H12.3876Z' fill='#282829' fillOpacity='0.6' />
    <path d='M5.72092 2.99967V1.88856C5.72092 1.74122 5.66239 1.59991 5.5582 1.49573C5.45401 1.39154 5.31271 1.33301 5.16536 1.33301C5.01802 1.33301 4.87671 1.39154 4.77253 1.49573C4.66834 1.59991 4.60981 1.74122 4.60981 1.88856V2.99967H5.72092Z' fill='#282829' fillOpacity='0.6' />
    <path d='M13.4987 14.1108H3.4987C3.05667 14.1108 2.63275 13.9352 2.32019 13.6226C2.00763 13.3101 1.83203 12.8861 1.83203 12.4441V5.2219C1.83203 4.77987 2.00763 4.35595 2.32019 4.04339C2.63275 3.73082 3.05667 3.55523 3.4987 3.55523H13.4987C13.9407 3.55523 14.3646 3.73082 14.6772 4.04339C14.9898 4.35595 15.1654 4.77987 15.1654 5.2219V12.4441C15.1654 12.8861 14.9898 13.3101 14.6772 13.6226C14.3646 13.9352 13.9407 14.1108 13.4987 14.1108ZM14.0543 6.33301H2.94314V12.4441C2.94314 12.5915 3.00167 12.7328 3.10586 12.837C3.21005 12.9411 3.35136 12.9997 3.4987 12.9997H13.4987C13.646 12.9997 13.7873 12.9411 13.8915 12.837C13.9957 12.7328 14.0543 12.5915 14.0543 12.4441V6.33301Z' fill='#282829' fillOpacity='0.6' />
    <path d='M6.27648 7.44412H4.05425V9.11079H6.27648V7.44412Z' fill='#282829' fillOpacity='0.6' />
    <path d='M9.60981 7.44412H7.38759V9.11079H9.60981V7.44412Z' fill='#282829' fillOpacity='0.6' />
    <path d='M6.27648 10.2219H4.05425V11.8886H6.27648V10.2219Z' fill='#282829' fillOpacity='0.6' />
    <path d='M9.60981 10.2219H7.38759V11.8886H9.60981V10.2219Z' fill='#282829' fillOpacity='0.6' />
    <path d='M12.9431 7.44412H10.7209V9.11079H12.9431V7.44412Z' fill='#282829' fillOpacity='0.6' />
  </svg>
)
const iconAngleLeft = (
  <svg width='100%' height='100%' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M10.6597 3.60698L6.63274 8L10.6597 12.393C10.8917 12.6461 10.8917 13.0509 10.6597 13.3039C10.4201 13.5654 10.025 13.5654 9.78542 13.3039L5.34097 8.45546C5.109 8.20239 5.109 7.7976 5.34097 7.54454L9.78542 2.69605C10.025 2.43465 10.4201 2.43465 10.6597 2.69605C10.8917 2.94912 10.8917 3.35391 10.6597 3.60698Z' fill='#4b6281' fillOpacity={0.6} />
  </svg>
)
const iconDoubleAngleLeft = (
  <svg width='100%' height='100%' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M7.65968 3.60698L3.63274 8L7.65968 12.393C7.89165 12.6461 7.89165 13.0509 7.65968 13.3039C7.42005 13.5654 7.02504 13.5654 6.78542 13.3039L2.34097 8.45546C2.109 8.2024 2.109 7.79761 2.34097 7.54454L6.78542 2.69605C7.02504 2.43465 7.42005 2.43465 7.65968 2.69605C7.89165 2.94912 7.89165 3.35391 7.65968 3.60698Z' fill='#4b6281' fillOpacity={0.6} />
    <path d='M13.6597 3.60698L9.63274 8L13.6597 12.393C13.8917 12.6461 13.8917 13.0509 13.6597 13.3039C13.4201 13.5654 13.025 13.5654 12.7854 13.3039L8.34097 8.45546C8.109 8.2024 8.109 7.79761 8.34097 7.54454L12.7854 2.69605C13.025 2.43465 13.4201 2.43465 13.6597 2.69605C13.8917 2.94912 13.8917 3.35391 13.6597 3.60698Z' fill='#4b6281' fillOpacity={0.6} />
  </svg>
)
const iconAngleRight = (
  <svg width='100%' height='100%' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M6.21523 2.69605C5.97561 2.43465 5.5806 2.43465 5.34097 2.69605C5.109 2.94912 5.109 3.35391 5.34097 3.60698L9.36791 8L5.34097 12.393C5.109 12.6461 5.109 13.0509 5.34097 13.3039C5.5806 13.5654 5.97561 13.5654 6.21523 13.3039L10.6597 8.45546C10.8917 8.2024 10.8917 7.79761 10.6597 7.54454L6.21523 2.69605Z' fill='#4b6281' fillOpacity={0.6} />
  </svg>
)
const iconDoubleAngleRight = (
  <svg width='100%' height='100%' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
    <path d='M9.21523 2.69605C8.97561 2.43465 8.5806 2.43465 8.34097 2.69605C8.109 2.94912 8.109 3.35391 8.34097 3.60698L12.3679 8L8.34097 12.393C8.109 12.6461 8.109 13.0509 8.34097 13.3039C8.5806 13.5654 8.97561 13.5654 9.21523 13.3039L13.6597 8.45546C13.8917 8.2024 13.8917 7.79761 13.6597 7.54454L9.21523 2.69605Z' fill='#4b6281' fillOpacity={0.6} />
    <path d='M3.21523 2.69605C2.97561 2.43465 2.5806 2.43465 2.34097 2.69605C2.109 2.94912 2.109 3.35391 2.34097 3.60698L6.36791 8L2.34097 12.393C2.109 12.6461 2.109 13.0509 2.34097 13.3039C2.5806 13.5654 2.97561 13.5654 3.21523 13.3039L7.65968 8.45546C7.89165 8.2024 7.89165 7.79761 7.65968 7.54454L3.21523 2.69605Z' fill='#4b6281' fillOpacity={0.6} />
  </svg>
)

function differentInDay(date1, date2) {
  return (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
}

function inRangeTime(date, startDate, endDate) {
  return (
    differentInDay(date, startDate) > -1 && differentInDay(endDate, date) > -1
  )
}

const today = new Date()
const startDate = new Date(
  today.getFullYear() - 100,
  today.getMonth(),
  today.getDate()
)
const endDate = new Date(
  today.getFullYear() + 100,
  today.getMonth(),
  today.getDate()
)

export class DatePicker extends React.Component {
  constructor(props) {
    const newValue = this.getNewValue(props.value)
    this.state = {
      value: props.value,
      selectDate: (newValue ?? today).getDate(),
      selectMonth: (newValue ?? today).getMonth(),
      selectYear: (newValue ?? today).getFullYear(),
      offset: { x: 0, y: 0 },
      isOpen: false,
      onPicker: null,
      pickerType: props.pickerType, // date, month, year
    }
  }

  getNewValue = (value) => {
    const params = value ?? this.state.value
    if (params?.trim()?.length) return Ultis.stringToDate(params)
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value || prevProps.options !== this.props.options) {
      const newValue = this.getNewValue(props.value)
      this.setState({
        ...this.state,
        value: this.props.value,
        selectDate: (newValue ?? today).getDate(),
        selectMonth: (newValue ?? today).getMonth(),
        selectYear: (newValue ?? today).getFullYear(),
      })
    }
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      const thisPopupRect = document.body.querySelector('.date-picker-container').getBoundingClientRect()
      if (thisPopupRect.right > document.body.offsetWidth) {
        var style = {
          top: this.state.offset.y + this.state.offset.height + 2 + 'px',
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
          bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
        }
      }
      if (style) this.setState({
        ...this.state,
        style: style
      })
    }
  }

  showDateInMonth() {
    let lineWeekDay = []
    const newValue = this.getNewValue()
    for (let i = 0; i < 7; i++) {
      switch (i) {
        case 0:
          var weekdayTitle = 'Su'
          break
        case 1:
          weekdayTitle = 'Mo'
          break
        case 2:
          weekdayTitle = 'Tu'
          break
        case 3:
          weekdayTitle = 'We'
          break
        case 4:
          weekdayTitle = 'Th'
          break
        case 5:
          weekdayTitle = 'Fr'
          break
        case 6:
          weekdayTitle = 'Sa'
          break
        default:
          weekdayTitle = ''
          break
      }
      lineWeekDay.push(
        <div id={'date-title' + i} className='date-picker-circle'>
          {weekdayTitle}
        </div>
      )
    }
    let firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1)
    let dateWeekLines = []
    for (let j = 0; j < 6; j++) {
      dateWeekLines.push(
        <div id={'weekline' + j}>
          {(() => {
            let dateInLine = []
            for (let i = 0; i < 7; i++) {
              let dateNumber = i + j + j * 6 - firstDayOfMonth.getDay()
              const timeValue = new Date(this.state.selectYear, this.state.selectMonth, dateNumber + 1)
              let style = {}
              let additionProps = {}
              if (dateNumber + 1 === today.getDate() && this.state.selectMonth === today.getMonth() && this.state.selectYear === today.getFullYear()) {
                style = { border: '1px solid #366AE2' }
              }
              if (!inRangeTime(timeValue, startDate, endDate)) {
                additionProps = { 'in-range': 'false' }
              } else if (!inRangeTime(timeValue, this.props.min ?? startDate, this.props.max ?? endDate)) {
                style = {
                  ...style,
                  color: '#9FB0C7',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }
              } else if (newValue?.valueOf() === timeValue.valueOf()) {
                additionProps = { ...additionProps, 'is-select': 'true' }
              } else if (timeValue.getMonth() !== selectMonth) {
                style = { ...style, color: '#9FB0C7' }
              }
              dateInLine.push(
                <div id={timeValue.toString()} className='date-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    this.setState({ ...this.state, onPicker: null, isOpen: false, value: Ultis.datetoString(timeValue) })
                    if (this.props.onChange) this.props.onChange(Ultis.datetoString(timeValue))
                  }}
                >
                  {timeValue.getDate()}
                </div>
              )
            }
            return dateInLine
          })()}
        </div>
      )
    }

    return [<div id='weekline'>{lineWeekDay}</div>, dateWeekLines]
  }

  showMonthInYear() {
    const newValue = this.getNewValue()
    let monthLines = []
    for (let i = 0; i < 4; i++) {
      monthLines.push(
        <div id={'month-line' + i}>
          {(() => {
            let monthPicker = []
            for (let j = 0; j < 3; j++) {
              let monthNumber = i * 3 + j
              switch (monthNumber) {
                case 0:
                  var monthTitle = 'Jan'
                  break
                case 1:
                  monthTitle = 'Feb'
                  break
                case 2:
                  monthTitle = 'Mar'
                  break
                case 3:
                  monthTitle = 'Apr'
                  break
                case 4:
                  monthTitle = 'May'
                  break
                case 5:
                  monthTitle = 'Jun'
                  break
                case 6:
                  monthTitle = 'Jul'
                  break
                case 7:
                  monthTitle = 'Aug'
                  break
                case 8:
                  monthTitle = 'Sep'
                  break
                case 9:
                  monthTitle = 'Oct'
                  break
                case 10:
                  monthTitle = 'Nov'
                  break
                case 11:
                  monthTitle = 'Dec'
                  break
                default:
                  break
              }
              let timeValue = new Date(this.state.selectYear, monthNumber, 1)
              let style = {}
              let additionProps = {}
              if (this.state.selectYear === today.getFullYear() && today.getMonth() === monthNumber) {
                style = { border: '1px solid #366AE2' }
              } else if (!inRangeTime(new Date(this.state.selectYear, this.state.selectMonth), this.props.min ?? startDate, this.props.max ?? endDate)) {
                if (this.state.selectYear === this.state.selectDate.getFullYear() && this.state.selectDate.getMonth() === monthNumber) {
                  style = {
                    color: '#9FB0C7',
                    opacity: 0.7,
                    pointerEvents: 'none'
                  }
                }
              }
              if (this.state.selectYear === newValue?.getFullYear() && monthNumber === newValue?.getMonth()) {
                additionProps = { 'is-select': 'true' }
              }
              monthPicker.push(
                <div id={timeValue} className='month-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    if (this.props.pickerType === 'month') {
                      this.setState({ ...this.state, onPicker: null, isOpen: false, value: monthNumber })
                      if (this.props.onChange) this.props.onChange(monthNumber)
                    } else {
                      this.setState({ ...this.state, selectMonth: monthNumber, pickerType: 'date' })
                    }
                  }}
                >
                  {monthTitle}
                </div>
              )
            }
            return monthPicker
          })()}
        </div>
      )
    }
    return monthLines
  }

  showYearInRange() {
    const newValue = this.getNewValue()
    let yearLines = []
    for (let i = 0; i < 4; i++) {
      yearLines.push(
        <div id={'year-picker-line' + i}>
          {(() => {
            let yearPicker = []
            for (let j = 0; j < 3; j++) {
              let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
              let yearNumber = i * 3 + j + firstYearInTable
              let additionProps = {}
              let style = {}
              if (yearNumber === today.getFullYear()) {
                style = { border: '1px solid #366AE2' }
              } else if (yearNumber < ((this.props.min ?? startDate).getFullYear()) || yearNumber > ((this.props.max ?? endDate).getFullYear())) {
                style = {
                  color: '#9FB0C7',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }
              }
              if (yearNumber === newValue?.getFullYear()) {
                additionProps = { 'is-select': 'true' }
              }
              yearPicker.push(
                <div id={yearNumber} className='year-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    if (this.props.pickerType === 'year') {
                      this.setState({ ...this.state, onPicker: null, isOpen: false, value: yearNumber })
                      if (this.props.onChange) this.props.onChange(yearNumber)
                    } else {
                      this.setState({ ...this.state, pickerType: 'month', selectYear: yearNumber })
                    }
                  }}
                >
                  {yearNumber}
                </div>
              )
            }
            return yearPicker
          })()}
        </div>
      )
    }
    return yearLines
  }

  getTitle() {
    switch (this.state.pickerType) {
      case 'year':
        let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
        return `${firstYearInTable}-${firstYearInTable + 11}`
      case 'month':
        return this.state.selectYear
      default:
        switch (this.state.selectMonth) {
          case 0:
            var monthName = 'January'
            break
          case 1:
            monthName = 'February'
            break
          case 2:
            monthName = 'March'
            break
          case 3:
            monthName = 'April'
            break
          case 4:
            monthName = 'May'
            break
          case 5:
            monthName = 'June'
            break
          case 6:
            monthName = 'July'
            break
          case 7:
            monthName = 'August'
            break
          case 8:
            monthName = 'September'
            break
          case 9:
            monthName = 'October'
            break
          case 10:
            monthName = 'November'
            break
          case 11:
            monthName = 'December'
            break
          default:
            monthName = ''
            break
        }
        return `${monthName} ${selectYear}`
    }
  }

  renderUI() {
    return <div>
      <div className={`date-picker-container row input-border ${this.props.disabled ? 'disabled' : ''} ${this.props.control && this.props.errors[this.props.name] && 'helper-text'}`}
        helper-text={this.props.control && this.props.errors[this.props.name]?.message}
      >
        <div className='input-field-value' style={{ height: '4rem' }}>
          <input
            autoComplete='off'
            className='regular1'
            style={{ fontSize: '1.2rem' }}
            placeholder={this.props.placeholder}
            maxLength={this.props.pickerType === 'year' ? 4 : type === 'month' ? 7 : 10}
            onFocus={ev => {
              if (!this.state.onPicker && !this.state.isOpen) {
                this.setState({
                  ...this.state,
                  isOpen: true,
                  style: null,
                  offset: ev.target.closest('.date-picker-container').getBoundingClientRect()
                })
              }
            }}
            onBlur={ev => {
              if (this.state.onPicker != null) {
                if (this.state.onPicker !== 'year-picker-circle' && this.state.onPicker !== 'month-picker-circle' && this.state.onPicker !== 'date-picker-circle')
                  ev.target.focus()
              } else {
                const inputValue = ev.target.value.trim()
                switch (inputType) {
                  case 'year':
                    let minYear = (this.props.min ?? startDate).getFullYear()
                    let maxYear = (this.props.max ?? endDate).getFullYear()
                    if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: inputValue })
                      if (this.props.onChange) this.props.onChange(inputValue)
                    } else {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.value ?? '' })
                      if (this.props.onChange) this.props.onChange(this.props.value ?? '')
                    }
                    break
                  case 'month':
                    if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                      let dateValue = Ultis.stringToDate(`1/${inputValue}`, 'dd/MM/yyyy', '/')
                      if (inRangeTime(dateValue, this.props.min ?? startDate, this.props.max ?? endDate)) {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateValue })
                        if (this.props.onChange) this.props.onChange(dateValue)
                      } else {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.value ?? '' })
                        if (this.props.onChange) this.props.onChange(this.props.value ?? '')
                      }
                    } else {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.value ?? '' })
                      if (this.props.onChange) this.props.onChange(this.props.value ?? '')
                    }
                    break
                  default:
                    if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                      let dateValue = Ultis.stringToDate(inputValue, 'dd/MM/yyyy', '/')
                      if (inRangeTime(dateValue, this.props.min ?? startDate, this.props.max ?? endDate)) {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateValue })
                        if (this.props.onChange) this.props.onChange(dateValue)
                      } else if (differentInDay(this.props.min ?? startDate, dateValue) > -1) {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.min ?? startDate })
                        if (this.props.onChange) this.props.onChange(this.props.min ?? startDate)
                      } else if (differentInDay(dateValue, this.props.max ?? endDate) > -1) {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.max ?? endDate })
                        if (this.props.onChange) this.props.onChange(this.props.max ?? endDate)
                      } else {
                        this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.value ?? '' })
                        if (this.props.onChange) this.props.onChange(this.props.value ?? '')
                      }
                    } else {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: this.props.value ?? '' })
                      if (this.props.onChange) this.props.onChange(this.props.value ?? '')
                    }
                    break
                }
              }
            }}
          />
        </div>
        <div className='suffix-btn-txtfd'>{calendar}</div>
        {this.state.isOpen &&
          ReactDOM.createPortal(
            <div
              className='date-picker-popup'
              style={this.state.style ?? { top: offset.y + offset.height + 2 + 'px', left: offset.x + 'px' }}
              onMouseOver={ev => { setOnPicker(ev.target.className) }}
              onMouseOut={() => setOnPicker(null)}
            >
              <div className='header'>
                <button type='button'
                  onClick={() => {
                    switch (this.state.pickerType) {
                      case 'year':
                        if (this.state.selectYear - 20 < startDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear - 20 })
                        }
                        break
                      case 'month':
                        if (this.state.selectYear - 10 < startDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                        }
                        break
                      default:
                        this.setState({ ...this.state, selectYear: this.state.selectYear - 1 })
                        break
                    }
                  }}
                >
                  {iconDoubleAngleLeft}
                </button>
                <button type='button'
                  onClick={() => {
                    switch (this.state.pickerType) {
                      case 'year':
                        if (this.state.selectYear - 10 < startDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                        }
                        break
                      case 'month':
                        if (this.state.selectYear - 1 >= startDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: this.state.selectYear - 1 })
                        }
                        break
                      default:
                        const newDataVl = new Date(this.state.selectYear, this.state.selectMonth - 1, 1)
                        this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                        break
                    }
                  }}
                >
                  {iconAngleLeft}
                </button>
                <span onClick={() => { this.setState({ ...this.state, pickerType: this.state.pickerType === 'date' ? 'month' : type === 'month' ? 'year' : null }) }} >
                  {this.getTitle()}
                </span>
                <button
                  type='button'
                  onClick={() => {
                    switch (this.state.pickerType) {
                      case 'year':
                        if (this.state.selectYear + 10 > endDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                        }
                        break
                      case 'month':
                        if (this.state.selectYear + 1 <= endDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: this.state.selectYear + 1 })
                        }
                        break
                      default:
                        const newDataVl = new Date(this.state.selectYear, this.state.selectMonth + 1, 1)
                        this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                        break
                    }
                  }}
                >
                  {iconAngleRight}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    switch (this.state.pickerType) {
                      case 'year':
                        if (this.state.selectYear + 20 > endDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear + 20 })
                        }
                        break
                      case 'month':
                        if (this.state.selectYear + 10 < endDate.getFullYear()) {
                          this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                        } else {
                          this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                        }
                        break
                      default:
                        this.setState({ ...this.state, selectYear: this.state.selectYear + 1 })
                        break
                    }
                  }}
                >
                  {iconDoubleAngleRight}
                </button>
              </div>
              <div className='body'>
                {this.state.pickerType === 'year' ? this.showYearInRange() : this.state.pickerType === 'month' ? this.showMonthInYear() : this.showDateInMonth()}
              </div>
              <div
                className='footer'
                onClick={() => {
                  this.setState({ ...this.state, onPicker: null, isOpen: false, value: Ultis.datetoString(today) })
                  if (this.props.onChange) this.props.onChange(Ultis.datetoString(today))
                }}
              >
                Today
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  }

  render() {
    return
  }
}