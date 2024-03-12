import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { Calendar, Popup, Text, showPopup } from "../../../../component/export-component"
import demoBanner5 from '../../../../assets/demo-image5.png'
import WeekCalendar from "../../../../project-component/week-calendar"


const demoList = [
    {
        time: new Date('Mar 12 2024 14:00'),
        duration: 195,
        name: 'Toán cao cấp đại học'
    },
    {
        time: new Date('Mar 14 2024 9:00'),
        duration: 60,
        name: 'Mentee Trần Đăng Quân'
    },
    {
        time: new Date('Mar 15 2024 14:00'),
        duration: 195,
        name: 'Toán cao cấp đại học'
    },
    {
        time: new Date('Mar 14 2024 20:00'),
        duration: 60,
        name: 'Mentee Trần Đăng Quân'
    },
]

export default function Teachingcalendar() {
    const [openSchedule, setOpenSchedule] = useState(true)
    const [activeScheduleTab, setActiveScheduleTab] = useState(0)

    const renderUICalendar = () => {
        switch (activeScheduleTab) {
            case 0:
                return <CalendarShowDate />
            case 1:
                return <CalendarShowWeek />
            case 2:
                return <CalendarShowMonth />
            default:
                return <div></div>
        }
    }

    return <div className='block-view col' style={{ gap: '1.2rem' }}>
        <div className='block-title row'>
            <button type="button" className="row title-btn" style={{ gap: '1.2rem' }} onClick={() => { setOpenSchedule(!openSchedule) }}>
                <div className="heading-5">Tất cả lịch dạy</div>
                <FontAwesomeIcon icon={openSchedule ? faChevronDown : faChevronUp} style={{ fontSize: '1.4rem', color: '#00204DCC' }} />
            </button>
            <div className="tab-header row">
                <div className={`tab-btn label-4 row ${activeScheduleTab === 0 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(0)}>Ngày</div>
                <div className={`tab-btn label-4 row ${activeScheduleTab === 1 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(1)}>Tuần</div>
                <div className={`tab-btn label-4 row ${activeScheduleTab === 2 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(2)}>Tháng</div>
            </div>
        </div>
        {openSchedule ? <div className="tab-view" style={{ width: '100%' }}>
            {renderUICalendar()}
        </div> : null}
    </div>
}

const CalendarShowDate = () => {
    const now = new Date()
    const [selectDate, setSelectDate] = useState(now)

    return <div className="row" style={{ alignItems: 'start' }}>
        <div className="col" style={{ width: '100%', flex: 1 }}>
            <div className="heading-7">{`Tháng ${selectDate.getMonth() + 1} ${selectDate.getFullYear()}`}</div>
            <WeekCalendar onlyDate initDate={selectDate} listData={demoList} minTime={7} maxTime={24} />
        </div>
        <div className="col" style={{ padding: '0 2.4rem', gap: '2.4rem', alignItems: 'center', width: '36.6rem' }}>
            <Calendar value={now} onSelect={(ev) => { setSelectDate(ev) }} />
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="col" style={{ gap: '0.8rem' }}>
                    <div className="heading-8" style={{ opacity: 0.6 }}>Lịch dạy đang chọn</div>
                    <img src={demoBanner5} style={{ width: '100%', borderRadius: '0.4rem' }} />
                </div>
                <div className="heading-4">19:00 - 20:00</div>
                <div className="col" style={{ gap: '0.8rem' }}>
                    <Text className="heading-7" style={{ width: '100%' }}>Toán cao cấp đại học</Text>
                    <Text className="body-3" style={{ opacity: 0.8, width: '100%' }}>Buổi 15: Lý thuyết đại cương phần tổng quan</Text>
                </div>
                <button type="button" className="button-grey row"><div className="button-text-3">Truy cập</div></button>
            </div>
        </div>
    </div>
}

const CalendarShowWeek = () => {
    const now = new Date()
    return <div className="col" style={{ width: '100%' }}>
        <div className="row heading-7" style={{ padding: '0.8rem 0' }}>{`Tháng ${now.getMonth() + 1} ${now.getFullYear()}`}</div>
        <WeekCalendar listData={demoList} minTime={7} maxTime={24} />
    </div>
}

const CalendarShowMonth = () => {
    const ref = useRef()
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayOfLastWeek = (35 % 7) + (Math.floor(35 / 7) * 7) - firstDayOfMonth.getDay()
    if (new Date(now.getFullYear(), now.getMonth(), firstDayOfLastWeek + 1).getMonth() !== now.getMonth()) {
        var dateLength = 35
    }

    const classInforAction = (ev) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            hideButtonClose: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col" style={{ gap: '2.4rem', padding: '2.4rem', width: '33.6rem', backgroundColor: '#ffffff', borderRadius: '0.8rem' }}>
                <div className="col" style={{ gap: '0.4rem' }}>
                    <Text className="heading-7">Mentee Trần Đăng Quân</Text>
                    <Text className="subtitle-4">Buổi 15: Lý thuyết đại cương phần tổng quan</Text>
                </div>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: "end" }}>
                    <div className="col" style={{ gap: '0.4rem' }}>
                        <Text className="heading-4">19:00</Text>
                        <Text className="subtitle-3">13 Tháng 8</Text>
                    </div>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <button type="button" className="row button-grey"><div className="button-text-3">Truy cập</div></button>
                        <button type="button" className="row button-primary"><div className="button-text-3">Truy cập</div></button>
                    </div>
                </div>
            </div>
        })
    }

    return <div className="col" style={{ width: '100%' }}>
        <Popup ref={ref} />
        <div className="row heading-7" style={{ padding: '0.8rem 0' }}>{`Tháng ${now.getMonth() + 1} ${now.getFullYear()}`}</div>
        <div className="row">
            {Array.from({ length: 7 }).map((_, i) => {
                switch (i) {
                    case 0:
                        var weekdayTitle = 'CN'
                        break
                    case 1:
                        weekdayTitle = 'T2'
                        break
                    case 2:
                        weekdayTitle = 'T3'
                        break
                    case 3:
                        weekdayTitle = 'T4'
                        break
                    case 4:
                        weekdayTitle = 'T5'
                        break
                    case 5:
                        weekdayTitle = 'T6'
                        break
                    case 6:
                        weekdayTitle = 'T7'
                        break
                    default:
                        weekdayTitle = ''
                        break
                }
                return <div key={'dtwk-' + i} className='col teaching-class-in-date label-3' style={{ height: 'fit-content' }}>
                    {weekdayTitle}
                </div>
            })}
        </div>
        <div className="row teaching-class-in-date-container" >
            {Array.from({ length: dateLength ?? 42 }).map((_, i) => {
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay()
                const timeValue = new Date(now.getFullYear(), now.getMonth(), dateNumber + 1)
                return <div key={timeValue.toString()} className={`col teaching-class-in-date ${timeValue.getMonth() === now.getMonth() && timeValue.getDate() === now.getDate() ? 'today' : ''}`}
                    onClick={() => {
                    }} style={(dateLength ?? 42) - i > 7 ? null : { borderBottom: 'none' }}>
                    <div className="label-3 row" style={{ opacity: timeValue.getMonth() !== now.getMonth() ? '0.25' : '0.8' }}>{timeValue.getDate()}</div>
                    <Text className="button-text-6 class-title-tile" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Toán cao cấp đại học</Text>
                    <Text onClick={classInforAction} className="button-text-6 class-title-tile" style={{ backgroundColor: '#F6EEFC', color: '#AC67E4' }}>Mentee Trần Đăng Quân</Text>
                    <Text className="button-text-6 class-title-tile" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Toán đại cương A1</Text>
                    <div className="button-text-6" style={{ color: '#00204D99', width: '100%' }}>+3 more</div>
                </div>
            })}
        </div>
    </div>
}