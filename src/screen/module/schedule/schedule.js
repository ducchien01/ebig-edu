import { FilledTimeAlarm } from "../../../assets/const/icon";
import './schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Popup, showPopup } from "../../../component/export-component";
import TeachingProcessList from './local-component/teaching-process-list'
import MeentorList from "./local-component/mentor-list";
import NoteList from "./local-component/note-list";
import PopupAddEditNote from "./local-component/add-edit-note";

export default function EduSchedule() {
    const ref = useRef()
    const [openSchedule, setOpenSchedule] = useState(true)
    const [activeScheduleTab, setActiveScheduleTab] = useState(0)


    const addNotePopup = () => {
        showPopup({
            ref: ref,
            heading: <div className="row popup-header heading-7">Tạo nhắc nhở</div>,
            content: <PopupAddEditNote ref={ref} />,
        })
    }

    return <div className="edu-schedule col view-container">
        <Popup ref={ref} />
        <div className="view-header row">
            <div className="heading-4">Giảng dạy</div>
            <button type="button" className="suffix-btn row" onClick={addNotePopup}>
                <FilledTimeAlarm />
                <div className="button-text-3">Tạo nhắc nhở</div>
            </button>
        </div>
        <NoteList />
        <div className='block-view col'>
            <div className='block-title row'>
                <button type="button" className="row title-btn" style={{ columnGap: '1.2rem', cursor: 'pointer' }} onClick={() => { setOpenSchedule(!openSchedule) }}>
                    <div className="heading-5">Tất cả lịch dạy</div>
                    <FontAwesomeIcon icon={openSchedule ? faChevronDown : faChevronUp} size="1x" color="#00204DCC" />
                </button>
                <div className="tab-header row">
                    <div className={`tab-btn label-4 row ${activeScheduleTab === 0 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(0)}>Ngày</div>
                    <div className={`tab-btn label-4 row ${activeScheduleTab === 1 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(1)}>Tuần</div>
                    <div className={`tab-btn label-4 row ${activeScheduleTab === 2 ? 'selected' : ''}`} onClick={() => setActiveScheduleTab(2)}>Tháng</div>
                </div>
            </div>
            {openSchedule ? <div className="tab-view" style={{ width: '100%', height: 360, backgroundColor: 'var(--background)' }}></div> : null}
        </div>
        <MeentorList />
        <TeachingProcessList />

    </div>
}