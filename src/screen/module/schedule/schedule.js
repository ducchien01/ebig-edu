import { FilledBell, FilledSocialSharing, FilledTimeAlarm } from "../../../assets/const/icon";
import './schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Popup, Select1, showPopup } from "../../../component/export-component";
import TeachingProcessList from './local-component/teaching-process-list'
import MeentorList from "./local-component/mentor-list";
import NoteList from "./local-component/note-list";

export default function EduSchedule() {
              const ref = useRef()
              const [openSchedule, setOpenSchedule] = useState(true)
              const [activeScheduleTab, setActiveScheduleTab] = useState(0)
              

              const addNotePopup = () => {
                            showPopup({
                                          ref: ref,
                                          heading: <div className="row popup-header heading-7">Tạo nhắc nhở</div>,
                                          content: <div className="col popup-body">
                                                        <div className="input-container col">
                                                                      <div className="label-3">Lời nhắc nhở</div>
                                                                      <div className="input-field"><input placeholder="Nhập lời nhắc" /></div>
                                                        </div>
                                                        <div className="input-container col">
                                                                      <div className='input-label row'>
                                                                                    <span className='label-3'>Khóa học</span>
                                                                                    <span className='required-icon regular2'>*</span>
                                                                      </div>
                                                                      <div className="input-field">
                                                                                    <Select1
                                                                                                  placeholder="Chọn khóa học"
                                                                                    />
                                                                      </div>
                                                        </div>
                                          </div>,
                                          footer: <div className="row"></div>,
                            })
              }

              return <div className="edu-schedule col view-container">
                            <Popup ref={ref} />
                            <div className="view-header row">
                                          <div className="heading-4">Giảng dạy</div>
                                          <button type="button" className="suffix-btn row" onClick={addNotePopup}>
                                                        <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledTimeAlarm /></div>
                                                        <div className="button-text-3">Tạo nhắc nhở</div>
                                          </button>
                            </div>
                            <NoteList/>
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
                            <MeentorList/>
                            <TeachingProcessList />

              </div>
}