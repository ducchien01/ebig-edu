/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import './date-picker.css'
import { CalendarType, Calendar } from '../export-component'
import { endDate, inRangeTime, startDate, today } from '../calendar/calendar'
import { differenceInCalendarDays } from 'date-fns'

const CalendarIcon = ({ color = '#00204D99', width = '1.6rem', height = '1.6rem' }: { color?: string, width?: string | number, height?: string | number }) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 17 16' fill='none' style={{ width: width, height: height }}>
        <path d='M12.3876 2.99967V1.88856C12.3876 1.74122 12.3291 1.59991 12.2249 1.49573C12.1207 1.39154 11.9794 1.33301 11.832 1.33301C11.6847 1.33301 11.5434 1.39154 11.4392 1.49573C11.335 1.59991 11.2765 1.74122 11.2765 1.88856V2.99967H12.3876Z' fill={color} />
        <path d='M5.72092 2.99967V1.88856C5.72092 1.74122 5.66239 1.59991 5.5582 1.49573C5.45401 1.39154 5.31271 1.33301 5.16536 1.33301C5.01802 1.33301 4.87671 1.39154 4.77253 1.49573C4.66834 1.59991 4.60981 1.74122 4.60981 1.88856V2.99967H5.72092Z' fill={color} />
        <path d='M13.4987 14.1108H3.4987C3.05667 14.1108 2.63275 13.9352 2.32019 13.6226C2.00763 13.3101 1.83203 12.8861 1.83203 12.4441V5.2219C1.83203 4.77987 2.00763 4.35595 2.32019 4.04339C2.63275 3.73082 3.05667 3.55523 3.4987 3.55523H13.4987C13.9407 3.55523 14.3646 3.73082 14.6772 4.04339C14.9898 4.35595 15.1654 4.77987 15.1654 5.2219V12.4441C15.1654 12.8861 14.9898 13.3101 14.6772 13.6226C14.3646 13.9352 13.9407 14.1108 13.4987 14.1108ZM14.0543 6.33301H2.94314V12.4441C2.94314 12.5915 3.00167 12.7328 3.10586 12.837C3.21005 12.9411 3.35136 12.9997 3.4987 12.9997H13.4987C13.646 12.9997 13.7873 12.9411 13.8915 12.837C13.9957 12.7328 14.0543 12.5915 14.0543 12.4441V6.33301Z' fill={color} />
        <path d='M6.27648 7.44412H4.05425V9.11079H6.27648V7.44412Z' fill={color} />
        <path d='M9.60981 7.44412H7.38759V9.11079H9.60981V7.44412Z' fill={color} />
        <path d='M6.27648 10.2219H4.05425V11.8886H6.27648V10.2219Z' fill={color} />
        <path d='M9.60981 10.2219H7.38759V11.8886H9.60981V10.2219Z' fill={color} />
        <path d='M12.9431 7.44412H10.7209V9.11079H12.9431V7.44412Z' fill={color} />
    </svg>
)

const dateToString = (x: Date, y: string = "dd/mm/yyyy") => {
    let splitDateTime: Array<string> = y.split(" ");
    let dateFormat = splitDateTime[0]
    let timeFormat = splitDateTime[1]
    if (dateFormat.includes('hh')) {
        dateFormat = splitDateTime[1]
        timeFormat = splitDateTime[0]
    }
    let dateConvert: string = dateFormat.split(y.includes("/") ? "/" : "-").map(type => {
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
    if (timeFormat) {
        let timeConvert = timeFormat.split(":").map(type => {
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
        hours = _date.trim().split(" ")[1] ?? '00:00:00';
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

interface DatePickerProps {
    value?: string,
    min: Date,
    max: Date,
    onChange?: (e?: string) => void,
    disabled?: boolean,
    helperText?: string,
    helperTextColor?: string,
    placeholder?: string,
    className?: string,
    hideButtonToday?: boolean,
    style?: CSSProperties,
    /* default: DATE */
    pickerType?: CalendarType,
    /* y: dd/mm/yyy || dd/mm/yyyy hh:mm:ss || hh:mm:ss dd/mm/yyyy, default: dd/mm/yyyy */
    formatDate?: string
}

interface DatePickerState {
    value?: string,
    offset: DOMRect,
    isOpen: boolean,
    style?: Object
}


export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    constructor(props: DatePickerProps) {
        super(props)
        this.state = {
            value: props.value,
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
        }
    }

    getNewValue = (value?: string) => {
        const params: string = value ?? this.state?.value ?? ''
        if (params.trim()?.length) {
            switch (this.props.pickerType) {
                case CalendarType.YEAR:
                    return new Date(parseInt(params), 1, 1)
                case CalendarType.MONTH:
                    let splitParams: Array<string> = params.includes('/') ? params.split('/') : params.split('-')
                    return new Date(parseInt(splitParams[1] ?? `${today.getFullYear()}`), parseInt(splitParams[0] ?? `${today.getMonth()}`), 1)
                case CalendarType.DATETIME:
                    return stringToDate(params, this.props.formatDate ?? 'dd/mm/yyyy hh:mm')
                default:
                    return stringToDate(params)
            }
        }
        return undefined
    }

    componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ...this.state,
                value: this.props.value,
            })
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            const thisPopupRect = document.body.querySelector('.date-picker-popup-container')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.left + 'px'
                    }
                }
                if ((thisPopupRect.bottom - 20) > document.body.offsetHeight) {
                    style = style ? {
                        ...style,
                        top: undefined,
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    } : {
                        left: this.state.offset.x + 'px',
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    }
                }
                if (style) this.setState({ ...this.state, style: style })
            }
        }
    }

    render() {
        let maxLength = 10
        switch (this.props.pickerType) {
            case CalendarType.YEAR:
                maxLength = 4
                break;
            case CalendarType.MONTH:
                maxLength = 7
                break;
            case CalendarType.DATETIME:
                maxLength = 19
                break;
            default:
                break;
        }
        return <label className={`date-picker-container row ${this.props.className ?? 'placeholder-2'} ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
        >
            <div className='input-field-value row' style={{ height: '4rem' }}>
                <input
                    autoComplete='off'
                    value={this.state.value ?? ''}
                    onChange={(ev) => this.setState({ ...this.state, value: ev.target.value })}
                    placeholder={this.props.placeholder}
                    maxLength={maxLength}
                    onBlur={ev => {
                        const inputValue = ev.target.value.trim()
                        switch (this.props.pickerType) {
                            case CalendarType.YEAR:
                                let minYear = (this.props.min ?? startDate).getFullYear()
                                let maxYear = (this.props.min ?? endDate).getFullYear()
                                if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                                    this.setState({ ...this.state, isOpen: false, value: inputValue })
                                    if (this.props.onChange) this.props.onChange(inputValue)
                                } else {
                                    this.setState({ ...this.state, isOpen: false, value: undefined })
                                    if (this.props.onChange) this.props.onChange(undefined)
                                }
                                break
                            case CalendarType.MONTH:
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    let dateValue = stringToDate(`1/${inputValue}`, 'dd/MM/yyyy', '/')
                                    if (inRangeTime(dateValue, this.props.min ?? startDate ?? startDate, this.props.min ?? endDate ?? endDate)) {
                                        this.setState({ ...this.state, isOpen: false, value: dateToString(dateValue) })
                                        if (this.props.onChange) this.props.onChange(dateToString(dateValue))
                                    } else {
                                        this.setState({ ...this.state, isOpen: false, value: undefined })
                                        if (this.props.onChange) this.props.onChange(undefined)
                                    }
                                } else {
                                    this.setState({ ...this.state, isOpen: false, value: undefined })
                                    if (this.props.onChange) this.props.onChange(undefined)
                                }
                                break
                            case CalendarType.DATETIME:
                                let dateTimeValue = undefined
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateTimeValue = stringToDate(inputValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm', '/')
                                    if (inRangeTime(dateTimeValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                                    } else if (differenceInCalendarDays(this.props.min ?? startDate, dateTimeValue) > -1) {
                                        dateTimeValue = this.props.min ?? startDate
                                    } else if (differenceInCalendarDays(dateTimeValue, this.props.min ?? endDate) > -1) {
                                        dateTimeValue = this.props.min ?? startDate
                                    } else {
                                        dateTimeValue = undefined
                                    }
                                }
                                const stateDateTimeValue = dateTimeValue ? dateToString(dateTimeValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm') : dateTimeValue
                                this.setState({ ...this.state, isOpen: false, value: stateDateTimeValue })
                                if (this.props.onChange) this.props.onChange(stateDateTimeValue)
                                break;
                            default:
                                let dateValue = undefined
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/')
                                    if (inRangeTime(dateValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                                    } else if (differenceInCalendarDays(this.props.min ?? startDate, dateValue) > -1) {
                                        dateValue = this.props.min ?? startDate
                                    } else if (differenceInCalendarDays(dateValue, this.props.min ?? endDate) > -1) {
                                        dateValue = this.props.max ?? endDate
                                    } else {
                                        dateValue = undefined
                                    }
                                }
                                const stateDateValue = dateValue ? dateToString(dateValue) : dateValue
                                this.setState({ ...this.state, isOpen: false, value: stateDateValue })
                                if (this.props.onChange) this.props.onChange(stateDateValue)
                                break;
                        }
                    }}
                />
            </div>
            <button type='button' onClick={(ev) => {
                if (!this.state.isOpen) {
                    this.setState({
                        ...this.state,
                        isOpen: true,
                        style: undefined,
                        offset: ((ev.target as HTMLElement).closest('.date-picker-container') ?? (ev.target as HTMLElement)).getBoundingClientRect()
                    })
                }
            }} className='row' style={{ padding: '0.4rem' }}><CalendarIcon /></button>
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div className={`popup-overlay hidden-overlay`} onClick={(ev) => {
                        if ((ev.target as HTMLElement).classList.contains('popup-overlay'))
                            this.setState({ ...this.state, isOpen: false })
                    }}>
                        <Calendar
                            value={this.getNewValue()}
                            type={this.props.pickerType ?? CalendarType.DATE}
                            className='date-picker-popup-container'
                            style={this.state.style ?? { top: this.state.offset.y + this.state.offset.height + 2 + 'px', left: this.state.offset.x + 'px', border: 'none', boxShadow: '-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)' }}
                            onSelect={(dateValue: Date) => {
                                var newValue = ''
                                switch (this.props.pickerType) {
                                    case CalendarType.YEAR:
                                        this.setState({ ...this.state, value: dateValue.getFullYear().toString(), isOpen: false })
                                        if (this.props.onChange) this.props.onChange(dateValue.getFullYear().toString())
                                        break;
                                    case CalendarType.MONTH:
                                        newValue = dateToString(dateValue)
                                        this.setState({ ...this.state, value: newValue.split('/').slice(1).join('/'), isOpen: false })
                                        if (this.props.onChange) this.props.onChange(newValue.split('/').slice(1).join('/'))
                                        break;
                                    case CalendarType.DATETIME:
                                        newValue = dateToString(dateValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm')
                                        this.setState({ ...this.state, value: newValue })
                                        break;
                                    default:
                                        newValue = dateToString(dateValue)
                                        this.setState({ ...this.state, value: newValue, isOpen: false })
                                        if (this.props.onChange) this.props.onChange(newValue)
                                        break;
                                }
                            }}
                            footer={(this.props.pickerType === CalendarType.DATETIME || !this.props.hideButtonToday) && <div className='row picker-popup-footer' >
                                {this.props.pickerType === undefined || this.props.pickerType === CalendarType.DATE || this.props.pickerType === CalendarType.DATETIME ?
                                    <button
                                        type='button'
                                        className='row button-text-3'
                                        style={{ color: 'var(--primary-color)', width: 'fit-content' }}
                                        onClick={() => {
                                            let format = this.props.formatDate ?? (this.props.pickerType === CalendarType.DATETIME ? 'dd/mm/yyyy hh:mm' : 'dd/mm/yyyy')
                                            this.setState({ ...this.state, isOpen: false, value: dateToString(today, format) })
                                            if (this.props.onChange) this.props.onChange(dateToString(today, format))
                                        }}
                                    >
                                        Today
                                    </button> : null}
                                {this.props.pickerType === CalendarType.DATETIME ? <>
                                    <div style={{ flex: 1 }}></div>
                                    <button type='button' className='row button-primary' style={{ padding: '0.6rem 0.8rem' }} onClick={() => {
                                        this.setState({ ...this.state, isOpen: false })
                                        if (this.props.onChange) this.props.onChange(this.state.value)
                                    }} >
                                        <div className='button-text-3'>Submit</div>
                                    </button>
                                </> : null}
                            </div>}
                        />
                    </div>,
                    document.body
                )}
        </label>
    }
}
