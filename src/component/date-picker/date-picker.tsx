/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './date-picker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const calendar = (
  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='98%' viewBox='0 0 17 16' fill='none'>
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

const differentInDay = (date1: Date, date2: Date) => (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)

const inRangeTime = (date: Date, startDate: Date, endDate: Date) => (differentInDay(date, startDate) > -1 && differentInDay(endDate, date) > -1)

const dateToString = (x: Date = today, y: string = "dd/mm/yyyy") => {
  let splitDateTime: Array<string> = y.split(" ");
  let dateConvert: string = splitDateTime[0].split(y.includes("/") ? "/" : "-").map(type => {
    switch (type.toLowerCase()) {
      case "dd":
        return x.getDate() < 10 ? `0${x.getDate()}` : `${x.getDate()}`;
      case "mm":
        return (x.getMonth() + 1) < 10 ? `0${(x.getMonth() + 1)}` : `${(x.getMonth() + 1)}`;
      case "yyyy":
        return `${x.getFullYear()}`;
      default:
        return ''
    }
  }).join(y.includes("/") ? "/" : "-");
  if (splitDateTime[1]) {
    let timeConvert = splitDateTime[1].split(":").map(type => {
      switch (type) {
        case "hh":
          return x.getHours() < 10 ? `0${x.getHours()}` : `${x.getHours()}`;
        case "mm":
          return x.getMinutes() < 10 ? `0${x.getMinutes()}` : `${x.getMinutes()}`;
        case "ss":
          return x.getSeconds() < 10 ? `0${x.getSeconds()}` : `${x.getSeconds()}`;
        default:
          return 'D'
      }
    }).join(":")
    return dateConvert + " " + timeConvert;
  }
  return dateConvert;
}

const stringToDate = (_date: string, _format: string = "dd/MM/yyyy", _delimiter: string = "/") => {
  let dayformat: string = _format;
  let hourformat: string = '';
  let day: string = _date;
  let hours: string = '';
  let isHour: boolean = false;
  if (_format.trim().indexOf(" ") > -1) {
    dayformat = _format.trim().split(" ")[0];
    hourformat = _format.trim().split(" ")[1];
    day = _date.trim().split(" ")[0];
    hours = _date.trim().split(" ")[1];
    isHour = true;
  }
  let formatLowerCase: string = dayformat.toLowerCase();
  let formatItems: Array<string> = formatLowerCase.split(_delimiter);
  let dateItems: Array<string> = day.split(_delimiter);
  let monthIndex: number = formatItems.indexOf("mm");
  let dayIndex: number = formatItems.indexOf("dd");
  let yearIndex: number = formatItems.indexOf("yyyy");
  let hour: number = 0;
  let min: number = 0;
  let sec: number = 0;
  if (isHour) {
    let tmpHour: Array<string> = hourformat.split(":");
    let hourindex: number = tmpHour.indexOf("HH");
    if (hourindex < 0) {
      hourindex = tmpHour.indexOf("hh");
    }
    let mmindex: number = tmpHour.indexOf("mm");
    let ssindex: number = tmpHour.indexOf("ss");
    let time: Array<string> = hours.split(":");
    hour = parseInt(time[hourindex] ?? '0'); min = parseInt(time[mmindex] ?? '0'); sec = parseInt(time[ssindex] ?? '0');
  }
  let month: number = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex] ?? '0'), hour, min, sec);
  return formatedDate;
}

export const enum DatePickerType {
  DATE,
  MONTH,
  YEAR
}

interface DatePickerProps {
  value?: string,
  min: Date,
  max: Date,
  onChange?: Function,
  disabled?: boolean,
  helperText?: string,
  helperTextColor?: string,
  placeholder?: string,
  className?: string,
  style?: CSSProperties,
  pickerType: DatePickerType
}

interface DatePickerState {
  value?: string,
  selectDate?: Date,
  selectMonth: number,
  selectYear: number,
  offset: DOMRect,
  isOpen: boolean,
  onPicker: any,
  pickerType: DatePickerType,
  style?: Object
}


export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props)
    const newValue = this.getNewValue(props.value)
    this.state = {
      value: props.value,
      selectDate: newValue,
      selectMonth: (newValue ?? today).getMonth(),
      selectYear: (newValue ?? today).getFullYear(),
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
      onPicker: null,
      pickerType: props.pickerType ?? DatePickerType.DATE
    }
  }

  getNewValue = (value?: string) => {
    const params: string = value ?? this.state?.value ?? ''
    if (params.trim()?.length) {
      switch (this.props.pickerType) {
        case DatePickerType.YEAR:
          return new Date(parseInt(params), 1, 1)
        case DatePickerType.MONTH:
          let splitParams: Array<string> = params.includes('/') ? params.split('/') : params.split('-')
          return new Date(parseInt(splitParams[1] ?? `${today.getFullYear()}`), parseInt(splitParams[0] ?? `${today.getMonth()}`), 1)
        default:
          return stringToDate(params)
      }
    }
    return undefined
  }

  componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
    if (prevProps.value !== this.props.value) {
      const newValue = this.getNewValue(this.props.value)
      this.setState({
        ...this.state,
        value: this.props.value,
        selectDate: newValue,
        selectMonth: (newValue ?? today).getMonth(),
        selectYear: (newValue ?? today).getFullYear(),
      })
    }
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      const thisPopupRect = document.body.querySelector('.date-picker-container')?.getBoundingClientRect()
      if (thisPopupRect) {
        let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
        if (thisPopupRect.right > document.body.offsetWidth) {
          style = {
            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
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
            bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
          }
        }
        if (style) this.setState({ ...this.state, style: style })
      }
    }
  }

  showDateInMonth() {
    let lineWeekDay: Array<ReactNode> = []
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
    let dateWeekLines: Array<ReactNode> = []
    for (let j = 0; j < 6; j++) {
      dateWeekLines.push(
        <div id={'weekline' + j}>
          {(() => {
            let dateInLine: Array<ReactNode> = []
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
              } else if (!inRangeTime(timeValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                style = {
                  ...style,
                  color: '#9FB0C7',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }
              } else if (newValue?.valueOf() === timeValue.valueOf()) {
                additionProps = { ...additionProps, 'is-select': 'true' }
              } else if (timeValue.getMonth() !== this.state.selectMonth) {
                style = { ...style, color: '#9FB0C7' }
              }
              dateInLine.push(
                <div id={timeValue.toString()} className='date-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    this.setState({ ...this.state, onPicker: null, isOpen: false, value: dateToString(timeValue) })
                    if (this.props.onChange) this.props.onChange(dateToString(timeValue))
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
    let monthLines: Array<ReactNode> = []
    for (let i = 0; i < 4; i++) {
      monthLines.push(
        <div id={'month-line' + i}>
          {(() => {
            let monthPicker: Array<ReactNode> = []
            for (let j = 0; j < 3; j++) {
              let monthNumber: number = i * 3 + j
              let monthTitle: string = ''
              switch (monthNumber) {
                case 0:
                  monthTitle = 'Jan'
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
              } else if (!inRangeTime(new Date(this.state.selectYear, this.state.selectMonth), this.props.min ?? startDate, this.props.min ?? endDate)) {
                if (this.state.selectYear === this.state.selectDate?.getFullYear() && this.state.selectDate.getMonth() === monthNumber) {
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
                <div id={timeValue.toString()} className='month-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    if (this.props.pickerType === DatePickerType.MONTH) {
                      this.setState({ ...this.state, onPicker: null, isOpen: false, value: `${monthNumber}/${this.state.selectYear}` })
                      if (this.props.onChange) this.props.onChange(`${monthNumber}/${this.state.selectYear}`)
                    } else {
                      this.setState({ ...this.state, selectMonth: monthNumber, pickerType: DatePickerType.DATE })
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
    let yearLines: Array<ReactNode> = []
    for (let i = 0; i < 4; i++) {
      yearLines.push(
        <div id={'year-picker-line' + i}>
          {(() => {
            let yearPicker: Array<ReactNode> = []
            for (let j = 0; j < 3; j++) {
              let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
              let yearNumber = i * 3 + j + firstYearInTable
              let additionProps = {}
              let style = {}
              if (yearNumber === today.getFullYear()) {
                style = { border: '1px solid #366AE2' }
              } else if (yearNumber < ((this.props.min ?? startDate).getFullYear()) || yearNumber > ((this.props.min ?? endDate).getFullYear())) {
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
                <div id={yearNumber.toString()} className='year-picker-circle' style={style} {...additionProps}
                  onClick={() => {
                    if (this.props.pickerType === DatePickerType.YEAR) {
                      this.setState({ ...this.state, onPicker: null, isOpen: false, value: yearNumber.toString() })
                      if (this.props.onChange) this.props.onChange(yearNumber.toString())
                    } else {
                      this.setState({ ...this.state, pickerType: DatePickerType.MONTH, selectYear: yearNumber })
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
      case DatePickerType.YEAR:
        let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
        return `${firstYearInTable}-${firstYearInTable + 11}`
      case DatePickerType.MONTH:
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
        return `${monthName} ${this.state.selectYear}`
    }
  }

  render() {
    return <label className={`date-picker-container row input-border ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
      helper-text={this.props.helperText}
      style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
    >
      <div className='input-field-value row' style={{ height: '4rem' }}>
        <input
          autoComplete='off'
          className='regular1'
          style={{ fontSize: '1.2rem' }}
          value={this.state.value ?? ''}
          onChange={(ev) => this.setState({ ...this.state, value: ev.target.value })}
          placeholder={this.props.placeholder}
          maxLength={this.props.pickerType === DatePickerType.DATE ? 4 : this.props.pickerType === DatePickerType.MONTH ? 7 : 10}
          onFocus={ev => {
            if (!this.state.onPicker && !this.state.isOpen) {
              this.setState({
                ...this.state,
                isOpen: true,
                style: undefined,
                offset: ((ev.target as HTMLElement).closest('.date-picker-container') ?? (ev.target as HTMLElement)).getBoundingClientRect()
              })
            }
          }}
          onBlur={ev => {
            if (this.state.onPicker != null) {
              if (this.state.onPicker !== 'year-picker-circle' && this.state.onPicker !== 'month-picker-circle' && this.state.onPicker !== 'date-picker-circle')
                ev.target.focus()
            } else {
              const inputValue = ev.target.value.trim()
              switch (this.props.pickerType) {
                case DatePickerType.YEAR:
                  let minYear = (this.props.min ?? startDate).getFullYear()
                  let maxYear = (this.props.min ?? endDate).getFullYear()
                  if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                    this.setState({ ...this.state, isOpen: false, onPicker: null, value: inputValue })
                    if (this.props.onChange) this.props.onChange(inputValue)
                  } else {
                    this.setState({ ...this.state, isOpen: false, onPicker: null, value: undefined })
                    if (this.props.onChange) this.props.onChange(undefined)
                  }
                  break
                case DatePickerType.MONTH:
                  if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                    let dateValue = stringToDate(`1/${inputValue}`, 'dd/MM/yyyy', '/')
                    if (inRangeTime(dateValue, this.props.min ?? startDate ?? startDate, this.props.min ?? endDate ?? endDate)) {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateToString(dateValue) })
                      if (this.props.onChange) this.props.onChange(dateValue)
                    } else {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: undefined })
                      if (this.props.onChange) this.props.onChange(undefined)
                    }
                  } else {
                    this.setState({ ...this.state, isOpen: false, onPicker: null, value: undefined })
                    if (this.props.onChange) this.props.onChange(undefined)
                  }
                  break
                default:
                  if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                    let dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/')
                    if (inRangeTime(dateValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateToString(dateValue) })
                      if (this.props.onChange) this.props.onChange(dateValue)
                    } else if (differentInDay(this.props.min ?? startDate, dateValue) > -1) {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateToString(this.props.min ?? startDate) })
                      if (this.props.onChange) this.props.onChange(this.props.min ?? startDate)
                    } else if (differentInDay(dateValue, this.props.min ?? endDate) > -1) {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: dateToString(this.props.min ?? endDate) })
                      if (this.props.onChange) this.props.onChange(this.props.min ?? endDate)
                    } else {
                      this.setState({ ...this.state, isOpen: false, onPicker: null, value: undefined })
                      if (this.props.onChange) this.props.onChange(undefined)
                    }
                  } else {
                    this.setState({ ...this.state, isOpen: false, onPicker: null, value: undefined })
                    if (this.props.onChange) this.props.onChange(undefined)
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
            style={this.state.style ?? { top: this.state.offset.y + this.state.offset.height + 2 + 'px', left: this.state.offset.x + 'px' }}
            onMouseOver={ev => { this.setState({ ...this.state, onPicker: (ev.target as HTMLElement).className }) }}
            onMouseOut={() => this.setState({ ...this.state, onPicker: null })}
          >
            <div className='header'>
              <button type='button'
                onClick={() => {
                  switch (this.state.pickerType) {
                    case DatePickerType.YEAR:
                      if (this.state.selectYear - 20 < startDate.getFullYear()) {
                        this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                      } else {
                        this.setState({ ...this.state, selectYear: this.state.selectYear - 20 })
                      }
                      break
                    case DatePickerType.MONTH:
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
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>
              <button type='button'
                onClick={() => {
                  switch (this.state.pickerType) {
                    case DatePickerType.YEAR:
                      if (this.state.selectYear - 10 < startDate.getFullYear()) {
                        this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                      } else {
                        this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                      }
                      break
                    case DatePickerType.MONTH:
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
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span onClick={() => {
                if (this.state.pickerType !== DatePickerType.YEAR)
                  this.setState({ ...this.state, pickerType: this.state.pickerType === DatePickerType.DATE ? DatePickerType.MONTH : DatePickerType.YEAR })
              }} >
                {this.getTitle()}
              </span>
              <button
                type='button'
                onClick={() => {
                  switch (this.state.pickerType) {
                    case DatePickerType.YEAR:
                      if (this.state.selectYear + 10 > endDate.getFullYear()) {
                        this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                      } else {
                        this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                      }
                      break
                    case DatePickerType.MONTH:
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
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
              <button
                type='button'
                onClick={() => {
                  switch (this.state.pickerType) {
                    case DatePickerType.YEAR:
                      if (this.state.selectYear + 20 > endDate.getFullYear()) {
                        this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                      } else {
                        this.setState({ ...this.state, selectYear: this.state.selectYear + 20 })
                      }
                      break
                    case DatePickerType.MONTH:
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
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </div>
            <div className='body'>
              {this.state.pickerType === DatePickerType.YEAR ? this.showYearInRange() : this.state.pickerType === DatePickerType.MONTH ? this.showMonthInYear() : this.showDateInMonth()}
            </div>
            <div className='footer'
              onClick={() => {
                this.setState({ ...this.state, onPicker: null, isOpen: false, value: dateToString(today) })
                if (this.props.onChange) this.props.onChange(dateToString(today))
              }}
            >
              Today
            </div>
          </div>,
          document.body
        )}
    </label>
  }
}
