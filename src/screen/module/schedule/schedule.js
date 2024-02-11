import { FilledBell, FilledSocialSharing, FilledTimeAlarm } from "../../../assets/const/icon";
import './schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Popup, Select1, showPopup } from "../../../component/export-component";
import TeachingProcessList from './local-component/teaching-process-list'
import MeentorList from "./local-component/mentor-list";

export default function EduSchedule() {
              const ref = useRef()
              const [openSchedule, setOpenSchedule] = useState(true)
              const [activeScheduleTab, setActiveScheduleTab] = useState(0)
              const eventList = [
                            {
                                          title: 'Toán cao cấp đại học',
                                          content: 'Buổi 15: Lý thuyết đại cương phần tổng quan',
                                          link: '',
                                          note: '',
                                          time: new Date().getTime(),
                            },
                            {
                                          title: 'Coach 1:1 Nguyễn Minh Nguyệt',
                                          content: 'Buổi 1: Giới thiệu',
                                          link: '',
                                          note: 'Chấm bài bạn Nguyệt',
                                          time: 1706689800000
                            },
                            {
                                          title: 'Toán cao cấp đại học',
                                          content: 'Buổi 16: Kiểm tra học phần',
                                          link: '',
                                          note: 'Chuẩn bị dụng cụ dạy học',
                                          time: 1706702400000
                            },
              ]

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
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className="heading-7">Sắp diễn ra</div>
                                                        <button type="button" className='button-text-3'>Xem tất cả nhắc nhở</button>
                                          </div>
                                          <div className='row list-card'>
                                                        {
                                                                      eventList.sort((a, b) => {
                                                                                    const now = new Date().getTime()
                                                                                    return Math.abs(a.time - now) - Math.abs(b.time - now)
                                                                      }).map((e, i) => {
                                                                                    const eTime = new Date(e.time)
                                                                                    return <div key={`card-${i}`} className={`card-view-1 row ${i === 0 ? 'col12' : 'col6'} col24-lg col24-md col24-sm col24-min`} style={{ '--gutter': '2.4rem', columnGap: '4rem', padding: '2.8rem 2.4rem' }}>
                                                                                                  <div className='row text-content' style={{ columnGap: 40 }}>
                                                                                                                {i === 0 ? <div className='col' style={{ rowGap: 4 }}>
                                                                                                                              <div className='heading-4'>{`${eTime.getHours() > 9 ? eTime.getHours() : `0${eTime.getHours()}`}:${eTime.getMinutes() > 9 ? eTime.getMinutes() : `0${eTime.getMinutes()}`}`}</div>
                                                                                                                              <div className='subtitle-3'>{`${eTime.getDate()} tháng ${eTime.getMonth() + 1}`}</div>
                                                                                                                </div> : null}
                                                                                                                <div className='col text-content'>
                                                                                                                              <div className='heading-7'>{e.title}</div>
                                                                                                                              <div className='subtitle-4'>{e.content}</div>
                                                                                                                              {i === 0 ? null : <div className='body-3' style={{ marginTop: 4 }}>{e.note}</div>}
                                                                                                                </div>
                                                                                                  </div>
                                                                                                  {i === 0 ? <button type="button" className='card-button-2 row'>
                                                                                                                <div className='row' style={{ width: '1.6rem', height: '1.6rem' }}><FilledSocialSharing color='white' /></div>
                                                                                                                <div className='button-text-3'>Vào dạy</div>
                                                                                                  </button> : <div className='noti row'>
                                                                                                                <FilledBell width={15} height={15} color='#366AE2' />
                                                                                                  </div>}
                                                                                    </div>;
                                                                      })
                                                        }

                                          </div>
                            </div>
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