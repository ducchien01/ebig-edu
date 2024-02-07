import { FilledBell, FilledBook, FilledSocialSharing, FilledTimeAlarm } from "../../../assets/const/icon";
import './schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import avatarDemo2 from '../../../assets/demo-avatar2.png';
import demoImg2 from '../../../assets/demo-image2.png';
import demoImg3 from '../../../assets/demo-image3.png';
import demoImg4 from '../../../assets/demo-image4.png';
import { Popup, ProgressBar, Select1, showPopup } from "../../../component/export-component";

export default function EduSchedule() {
              const ref = useRef()
              const [openSchedule, setOpenSchedule] = useState(true)
              const [activeScheduleTab, setActiveScheduleTab] = useState(0)
              const [activeProcessTab, setActiveProcessTab] = useState(0)
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
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className="heading-5">Đặt lịch mentor</div>
                                                        <button type="button" className='button-text-3'>Xem tất cả</button>
                                          </div>
                                          <div className="row list-card-view">
                                                        {
                                                                      [
                                                                                    {
                                                                                                  title: 'Coach 1:1 Phân tích dữ liệu dành cho beginner',
                                                                                                  time: '5 buổi từ 18/09/2023',
                                                                                                  student: {
                                                                                                                avatar: avatarDemo2,
                                                                                                                name: 'Nguyễn Minh Nguyệt'
                                                                                                  },
                                                                                                  timeLimit: '19:00 - 20:00',
                                                                                                  schedule: 'Thứ 3, thứ 6 hàng tuần',
                                                                                    },
                                                                                    {
                                                                                                  title: 'Coach 1:1 Design mobile app by Figma',
                                                                                                  time: '4 buổi từ 02/06/2023',
                                                                                                  student: {
                                                                                                                avatar: avatarDemo2,
                                                                                                                name: 'Nguyễn Minh Nguyệt'
                                                                                                  },
                                                                                                  timeLimit: '14:00 - 15:30',
                                                                                                  schedule: 'Thứ 2, thứ 4 hàng tuần',
                                                                                    },
                                                                      ].map((e, i) => <div key={`card-view-${i}`} className='card-view-2 row col12' style={{ '--gutter': '2.4rem' }}>
                                                                                    <div className="col card-content-1 col16-xxl col24">
                                                                                                  <div className="col" style={{ rowGap: '1.2rem' }} >
                                                                                                                <div className="col" style={{ rowGap: 4, paddingBottom: '1.2rem' }}>
                                                                                                                              <div className="heading-7">{e.title}</div>
                                                                                                                              <div className="subtitle-4">{e.time}</div>
                                                                                                                </div>
                                                                                                                <div className="row" style={{ columnGap: 4 }}>
                                                                                                                              <div className="prefix-avatar-user" style={{ backgroundImage: `url(${e.student.avatar})` }}></div>
                                                                                                                              <div className="label-4">{e.student.name}</div>
                                                                                                                </div>
                                                                                                  </div>
                                                                                    </div>
                                                                                    <div className="col card-content-2 col8-xxl col24">
                                                                                                  <div className="col" style={{ rowGap: 4 }}>
                                                                                                                <div className="heading-6" style={{ textAlign: 'center' }}>{e.timeLimit}</div>
                                                                                                                <div className="subtitle-4" style={{ textAlign: 'center' }}>{e.schedule}</div>
                                                                                                  </div>
                                                                                                  <div className="row" style={{ gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                                                                                                                <div className="button-text-3">Chấp nhận</div>
                                                                                                                <div className="button-text-3">Từ chối</div>
                                                                                                  </div>
                                                                                    </div>
                                                                      </div>)
                                                        }
                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title heading-5'>Tiến trình giảng dạy</div>
                                          <div className="col tab-container">
                                                        <div className="tab-header-2 row">
                                                                      <div className={`tab-btn label-4 row ${activeProcessTab === 0 ? 'selected' : ''}`} onClick={() => setActiveProcessTab(0)}>Lớp học</div>
                                                                      <div className={`tab-btn label-4 row ${activeProcessTab === 1 ? 'selected' : ''}`} onClick={() => setActiveProcessTab(1)}>Mentor</div>
                                                        </div>
                                                        <div className="tab-body-2 row">
                                                                      {
                                                                                    [
                                                                                                  {
                                                                                                                name: 'Thiết kế UI/UX dành cho người mới bắt đầu',
                                                                                                                next: 'Review bài tập số 2',
                                                                                                                img: demoImg2,
                                                                                                                totalLesson: 80,
                                                                                                                endLesson: 24,
                                                                                                  },
                                                                                                  {
                                                                                                                name: 'Copy-writing for beginner',
                                                                                                                next: 'Review bài tập số 5',
                                                                                                                img: demoImg3,
                                                                                                                totalLesson: 70,
                                                                                                                endLesson: 10,
                                                                                                  },
                                                                                                  {
                                                                                                                name: 'HTML-CSS-JS cơ bản',
                                                                                                                next: 'Css selector',
                                                                                                                img: demoImg2,
                                                                                                                totalLesson: 50,
                                                                                                                endLesson: 30,
                                                                                                  },
                                                                                                  {
                                                                                                                name: 'Thiết kế UI/UX bằng Figma',
                                                                                                                next: 'Import thư viện',
                                                                                                                img: demoImg4,
                                                                                                                totalLesson: 60,
                                                                                                                endLesson: 17,
                                                                                                  },
                                                                                                  {
                                                                                                                name: 'React-js tutorial',
                                                                                                                next: 'Function Component',
                                                                                                                img: demoImg3,
                                                                                                                totalLesson: 80,
                                                                                                                endLesson: 66,
                                                                                                  },
                                                                                                  {
                                                                                                                name: 'Flutter tutorial',
                                                                                                                next: 'Setup environment',
                                                                                                                img: demoImg4,
                                                                                                                totalLesson: 30,
                                                                                                                endLesson: 5,
                                                                                                  },
                                                                                    ].map((e, i) => <div key={`card-img-${i}`} className='card-image-2 col col6 col12-md col12-sm' style={{ '--gutter': '4rem' }}>
                                                                                                  <div className='top-img' style={{ backgroundImage: `url(${e.img})` }}></div>
                                                                                                  <div className="col">
                                                                                                                <div className="heading-7">{e.name}</div>
                                                                                                                <div className="row">
                                                                                                                              <div className="row" style={{ width: 16, height: 16 }}><FilledBook /></div>
                                                                                                                              <div>{e.next}</div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                              <ProgressBar percent={Math.round(e.endLesson * 100 / e.totalLesson)} progressBarOnly={true} style={{ width: '100%' }} />
                                                                                                                              <div className="row">
                                                                                                                                            <div className="heading-8">{e.endLesson}/{e.totalLesson} buổi</div>
                                                                                                                                            <div className="row button-text3">{Math.round(e.endLesson * 100 / e.totalLesson)}%</div>
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                  </div>
                                                                                    </div>)
                                                                      }
                                                        </div>
                                          </div>
                            </div>
              </div>
}