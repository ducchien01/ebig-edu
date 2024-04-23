import { FilledTimeAlarm } from "../../../../assets/const/icon";
import './schedule.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { Popup, showPopup } from "../../../../component/export-component";
import TeachingProcessList from './local-component/teaching-process-list'
import MentorList from "./local-component/mentor-list";
import NoteList from "./local-component/note-list";
import PopupAddEditNote from "./local-component/add-edit-note";
import Teachingcalendar from "./local-component/filter-teaching-calendar";
import { ClassController } from "../class/controller";
import { MentorController } from "../mentor/controller";
import { CustomerController } from "../../customer/controller";
import { differenceInMinutes } from "date-fns";

export default function EduSchedule() {
    const _now = new Date()
    const ref = useRef()
    const [classList, setClassList] = useState([])
    const [mentorList, setMentorList] = useState([])

    const addNotePopup = () => {
        showPopup({
            ref: ref,
            heading: <div className="row popup-header heading-7">Tạo nhắc nhở</div>,
            content: <PopupAddEditNote ref={ref} />,
        })
    }


    const convertSchedule = useMemo(() => {
        let value = []
        if (classList.length) value.push(...classList.map(e => e.schedule).reduce((a, b) => a.concat(b)))
        if (mentorList.length) value.push(...mentorList.map(e => {
            return {
                name: e.name,
                time: e.startDate,
                duration: differenceInMinutes(new Date(e.endDate), new Date(e.startDate))
            }
        }))
        return value
    }, [classList, mentorList])

    useEffect(() => {
        ClassController.getListSimpleAuth({ page: 1, take: 50, filter: [{ field: 'endDate', operator: '>', value: _now.getTime() }, { field: 'courseId', operator: '<>', value: null }] }).then(res => {
            if (res) setClassList(res.data.map(item => {
                try {
                    var scheduleJson = JSON.parse(item.content)
                } catch (error) {
                    console.log(error)
                }
                item.schedule = (scheduleJson ?? []).map(e => {
                    const _time = new Date(e.time)
                    return {
                        name: item.name,
                        time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + _time.getDay() - _now.getDay(), _time.getHours(), _time.getMinutes())).getTime(),
                        duration: e.duration
                    }
                })
                return item
            }))
        })
        MentorController.getListSimpleAuth({ page: 1, take: 100, filter: [{ field: 'endDate', operator: '>', value: _now.getTime() }, { field: 'customerId', operator: '=', value: CustomerController.userInfor().id }] }).then(res => {
            if (res) setMentorList(res.data)
        })
    }, [])

    return <div className="col view-container" style={{ gap: '2.4rem', padding: '1.6rem 3.2rem', flex: 1, width: '100%', height: '100%', overflow: 'hidden auto' }}>
        <Popup ref={ref} />
        <div className="view-header row">
            <div className="heading-4">Giảng dạy</div>
            <button type="button" className="suffix-btn row" onClick={addNotePopup}>
                <FilledTimeAlarm />
                <div className="button-text-3">Tạo nhắc nhở</div>
            </button>
        </div>
        <NoteList />
        <Teachingcalendar listData={convertSchedule} />
        <MentorList />
        <TeachingProcessList />
    </div>
}