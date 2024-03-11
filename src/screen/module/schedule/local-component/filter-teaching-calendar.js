import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Calendar, CalendarType, DatePicker } from "../../../../component/export-component"

export default function TeachinhCalendar() {
    const [openSchedule, setOpenSchedule] = useState(true)
    const [activeScheduleTab, setActiveScheduleTab] = useState(0)

    return <div className='block-view col'>
        <div className='block-title row'>
            <button type="button" className="row title-btn" style={{ columnGap: '1.2rem', cursor: 'pointer' }} onClick={() => { setOpenSchedule(!openSchedule) }}>
                <div className="heading-5">Tất cả lịch dạy</div>
                <FontAwesomeIcon icon={openSchedule ? faChevronDown : faChevronUp} style={{ fontSize: '1.4rem', color: '#00204DCC' }} />
            </button>
            <div className="tab-header row">
                <div className={`tab-btn label-4 row ${activeScheduleTab === 0 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(0)}>Ngày</div>
                <div className={`tab-btn label-4 row ${activeScheduleTab === 1 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(1)}>Tuần</div>
                <div className={`tab-btn label-4 row ${activeScheduleTab === 2 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(2)}>Tháng</div>
            </div>
        </div>
        {openSchedule ? <div className="tab-view" style={{ width: '100%', height: 360, backgroundColor: 'var(--background)' }}>
            <Calendar type={CalendarType.DATETIME} showSidebar />
        </div> : null}
        <DatePicker/>
    </div>
}

const CalendarShowDate = () => {

}