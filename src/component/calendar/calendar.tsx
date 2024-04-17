import React, { CSSProperties, ReactNode } from "react"
import './calendar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

export const today = new Date()
export const startDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
)
export const endDate = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
)

export const differentInDay = (date1: Date, date2: Date) => (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)

export const inRangeTime = (date: Date, startDate: Date, endDate: Date) => (differentInDay(date, startDate) > -1 && differentInDay(endDate, date) > -1)

export const enum CalendarType {
    DATE,
    MONTH,
    YEAR,
    DATETIME,
}

interface CalendarProps {
    value?: Date,
    min?: Date,
    max?: Date,
    onSelect?: (props: Date) => void,
    disabled?: boolean,
    helperText?: string,
    helperTextColor?: string,
    placeholder?: string,
    className?: string,
    style?: CSSProperties,
    type: CalendarType,
    showSidebar?: boolean,
    footer?: ReactNode
}

interface CalendarState {
    value: Date,
    selectDate?: Date,
    selectMonth: number,
    selectYear: number,
    selectHours: number,
    selectMinutes: number,
    selectSeconds: number,
    type: CalendarType,
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    state: Readonly<CalendarState> = {
        value: this.props.value ?? today,
        selectDate: this.props.value ?? today,
        selectMonth: (this.props.value ?? today).getMonth(),
        selectYear: (this.props.value ?? today).getFullYear(),
        type: CalendarType.DATE,
        selectHours: this.props.value?.getHours() ?? 0,
        selectMinutes: this.props.value?.getMinutes() ?? 0,
        selectSeconds: this.props.value?.getSeconds() ?? 0,
    }

    showDateInMonth() {
        let firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1)
        return <>
            {Array.from({ length: 7 }).map((_, i) => {
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
                return <div key={'dtwk-' + i} className='date-picker-circle label-4' style={{ color: '#00204D99' }}>
                    {weekdayTitle}
                </div>
            })}
            {Array.from({ length: 42 }).map((_, i) => {
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay()
                const timeValue = new Date(this.state.selectYear, this.state.selectMonth, dateNumber + 1, this.state.selectHours, this.state.selectMinutes, this.state.selectSeconds)
                let style = {}
                let additionProps = {}
                let selected = false
                if (dateNumber + 1 === today.getDate() && this.state.selectMonth === today.getMonth() && this.state.selectYear === today.getFullYear()) {
                    style = { borderColor: 'var(--primary-color)' }
                }
                if (!inRangeTime(timeValue, startDate, endDate)) {
                    additionProps = { 'in-range': 'false' }
                } else if (!inRangeTime(timeValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                    style = {
                        ...style,
                        color: 'var(--disabled-font-color)',
                        pointerEvents: 'none'
                    }
                } else if (this.state.value.valueOf() === timeValue.valueOf()) {
                    additionProps = { ...additionProps }
                    selected = true
                } else if (timeValue.getMonth() !== this.state.selectMonth) {
                    style = { ...style, color: '#9fb0c7' }
                }
                return <button type="button" key={timeValue.toString()} className={`date-picker-circle body-3 ${selected ? 'selected' : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        this.setState({ ...this.state, value: timeValue })
                        if (this.props.onSelect) this.props.onSelect(timeValue)
                    }} >
                    {timeValue.getDate()}
                </button>
            })}
        </>
    }

    showMonthInYear() {
        return <>
            {Array.from({ length: 12 }).map((_, i) => {
                let monthTitle: string = ''
                switch (i) {
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
                const timeValue = new Date(this.state.selectYear, i, today.getDate())
                let additionProps = {}
                let style = {}
                let selected = false
                if (this.state.selectYear === today.getFullYear() && today.getMonth() === i) {
                    style = { borderColor: 'var(--primary-color)' }
                } if (!inRangeTime(timeValue, startDate, endDate)) {
                    additionProps = { 'in-range': 'false' }
                } else if (!inRangeTime(new Date(this.state.selectYear, this.state.selectMonth), this.props.min ?? startDate, this.props.min ?? endDate)) {
                    if (this.state.selectYear === this.state.selectDate?.getFullYear() && this.state.selectDate.getMonth() === i) {
                        style = {
                            color: 'var(--disabled-font-color)',
                            pointerEvents: 'none'
                        }
                    }
                }
                if (this.state.selectYear === this.state.value.getFullYear() && i === this.state.value.getMonth()) {
                    selected = true
                }
                return <button type="button" key={timeValue.toString()} className={`month-picker-circle body-3 row ${selected ? 'selected' : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        if (this.props.type === CalendarType.MONTH) {
                            this.setState({ ...this.state, value: timeValue })
                            if (this.props.onSelect) this.props.onSelect(timeValue)
                        } else {
                            this.setState({ ...this.state, selectMonth: i, type: CalendarType.DATE })
                        }
                    }}
                >
                    {monthTitle}
                </button>
            })}
        </>
    }

    showYearInRange() {
        return <>
            {Array.from({ length: 12 }).map((_, i) => {
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
                let yearNumber = i + firstYearInTable
                let additionProps = {}
                let style = {}
                let selected = false
                if (yearNumber === today.getFullYear()) {
                    style = { borderColor: 'var(--primary-color)' }
                } else if (yearNumber < ((this.props.min ?? startDate).getFullYear()) || yearNumber > ((this.props.min ?? endDate).getFullYear())) {
                    additionProps = { 'in-range': 'false' }
                }
                if (yearNumber === this.state.value.getFullYear()) {
                    selected = true
                }
                return <button type="button" key={yearNumber.toString()} className={`year-picker-circle body-3 row ${selected ? 'selected' : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        if (this.props.type === CalendarType.YEAR) {
                            this.setState({ ...this.state, value: new Date(yearNumber) })
                            if (this.props.onSelect) this.props.onSelect(new Date(yearNumber))
                        } else {
                            this.setState({ ...this.state, type: CalendarType.MONTH, selectYear: yearNumber })
                        }
                    }}
                >
                    {yearNumber}
                </button>
            })}
        </>
    }

    getTitle() {
        switch (this.state.type) {
            case CalendarType.YEAR:
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
                return `${firstYearInTable}-${firstYearInTable + 11}`
            case CalendarType.MONTH:
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

    render(): React.ReactNode {
        return <div className={`row calendar-container ${this.props.className}`} style={this.props.style}>
            {this.props.showSidebar ? <div className="calendar-sidebar-options col">
                <button type="button" onClick={() => { }} className="label-4 calendar-sidebar-option-buttton">Yesterday</button>
                <button type="button" className="label-4 calendar-sidebar-option-buttton">Last week</button>
                <button type="button" className="label-4 calendar-sidebar-option-buttton">Last month</button>
                <button type="button" className="label-4 calendar-sidebar-option-buttton">Last year</button>
            </div> : null}
            <div className="calendar-body col">
                <div className="row" style={{ alignItems: 'start' }} >
                    <div className="picker-date-container col">
                        <div className='picker-date-header row'>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear - 20 < startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 20 })
                                            }
                                            break
                                        case CalendarType.MONTH:
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
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear - 10 < startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                                            }
                                            break
                                        case CalendarType.MONTH:
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
                            <span className="heading-7" onClick={() => {
                                if (this.state.type !== CalendarType.YEAR)
                                    this.setState({ ...this.state, type: this.state.type === CalendarType.DATE ? CalendarType.MONTH : CalendarType.YEAR })
                            }} >
                                {this.getTitle()}
                            </span>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear + 10 > endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                                            }
                                            break
                                        case CalendarType.MONTH:
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
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear + 20 > endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 20 })
                                            }
                                            break
                                        case CalendarType.MONTH:
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
                        <div className='picker-date-body row' >
                            {this.state.type === CalendarType.YEAR ? this.showYearInRange() : this.state.type === CalendarType.MONTH ? this.showMonthInYear() : this.showDateInMonth()}
                        </div>
                    </div>
                    {this.props.type === CalendarType.DATETIME ? <div className="picker-time-container col">
                        <div className="heading-7">{this.state.selectHours < 10 ? `0${this.state.selectHours}` : this.state.selectHours}:{this.state.selectMinutes < 10 ? `0${this.state.selectMinutes}` : this.state.selectMinutes}:{this.state.selectSeconds < 10 ? `0${this.state.selectSeconds}` : this.state.selectSeconds}</div>
                        <div className="row" style={{ alignItems: 'start', flex: 1, height: '100%' }}>
                            <div className="scroll-picker-hours col">{Array.from({ length: 24 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setHours(i)
                                this.setState({ ...this.state, selectHours: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectHours === (i) ? 'selected' : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                            <div className="scroll-picker-minutes col">{Array.from({ length: 60 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setMinutes(i)
                                this.setState({ ...this.state, selectMinutes: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectMinutes === (i) ? 'selected' : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                            <div className="scroll-picker-seconds col">{Array.from({ length: 60 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setSeconds(i)
                                this.setState({ ...this.state, selectSeconds: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectSeconds === (i) ? 'selected' : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                        </div>
                    </div> : null}
                </div>
                {this.props.footer}
            </div>
        </div>
    }
}