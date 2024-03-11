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
import TeachinhCalendar from "./local-component/filter-teaching-calendar";

export default function EduSchedule() {
    const ref = useRef()

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
        <TeachinhCalendar/>
        <MeentorList />
        <TeachingProcessList />

    </div>
}