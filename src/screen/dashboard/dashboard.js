import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dashboard.css'
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import demoImg2 from '../../assets/demo-image2.png';
import demoImg3 from '../../assets/demo-image3.png';
import demoImg4 from '../../assets/demo-image4.png';
import demoImg5 from '../../assets/demo-image5.png';
import demoImg6 from '../../assets/demo-image6.png';
import avatarDemo1 from '../../assets/demo-avatar1.png';
import avatarDemo2 from '../../assets/demo-avatar2.png';
import { FilledBell, FilledBook, FilledSocialSharing } from '../../assets/const/icon';

// demo người dùng mới bằng type 1 là cũ, 0 là mới
export default function EduDashboard({ type = 1 }) {
              return <div className="edu-dashboard col">
                            <div className="banner-container col">
                                          <div className="col" style={{ rowGap: 8 }}>
                                                        <div className="heading-3">eBig is a community of <br /> spreading the knowledge</div>
                                                        <div className="body-3">Learn from expert professionals and join <br /> the largest online community for creatives.</div>
                                          </div>
                                          {type ? <div className='row' style={{ columnGap: 8 }}>
                                                        <button className="banner-btn button-text-3">Lịch dạy</button>
                                                        <button className="banner-btn-2 button-text-3">Quản lý khóa học</button>
                                          </div> :
                                                        <button className="banner-btn button-text-3">Xác thực hồ sơ giáo viên</button>
                                          }
                            </div>
                            <div className='dashboard-content col' >
                                          {type ? <OldUserDashboard /> : <NewbieDashboard />}
                            </div>
              </div>
}

function NewbieDashboard() {
              return <>
                            <div className='block-view col'>
                                          <div className='block-title heading-6'>Thiết lập thông tin cơ bản</div>
                                          <div className='row list-card'>
                                                        {
                                                                      [
                                                                                    {
                                                                                                  title: 'Cài đặt thông tin lớp học',
                                                                                                  content: 'Learn from expert professionals and join the largest online community for creatives.',
                                                                                                  link: ''
                                                                                    },
                                                                                    {
                                                                                                  title: 'Cài đặt thông tin thanh toán',
                                                                                                  content: 'Learn from expert professionals and join the largest online community for creatives.',
                                                                                                  link: ''
                                                                                    }
                                                                      ].map((e, i) => <div key={`card-${i}`} className='card-view-1 row col12 col24-md col24-sm col24-min' style={{ '--gutter': '24px', columnGap: 40 }}>
                                                                                    <div className='col text-content'>
                                                                                                  <div className='heading-5'>{e.title}</div>
                                                                                                  <div className='subtitle-3'>{e.content}</div>
                                                                                    </div>
                                                                                    <NavLink className='card-button row'>
                                                                                                  <div className='button-text-3'>Truy cập</div>
                                                                                                  <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 16 }} />
                                                                                    </NavLink>
                                                                      </div>)
                                                        }

                                          </div>
                            </div>
                            <div className='card-image-1 row'>
                                          <div className='prefix-img col18 col24-sm col24-min'></div>
                                          <div className='row card-content col16 col24-sm col24-min'>
                                                        <div className='col text-content col24 col16-sm col16-min' style={{ 'gutter': '16px' }}>
                                                                      <div className='heading-5'>Xây dựng khóa học đầu tiên</div>
                                                                      <div className='subtitle-3'>Learn from expert professionals and join <br /> the largest online community for creatives.</div>
                                                        </div>
                                                        <div className='col col8-sm col8-min' style={{ 'gutter': '16px' }}>
                                                                      <NavLink to={'/edu-management/school/course/add'} className='card-button row'>
                                                                                    <div className='button-text-3'>Tạo khóa học</div>
                                                                                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 16 }} />
                                                                      </NavLink>
                                                        </div>
                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className='heading-6'>Hướng dẫn dành cho bạn</div>
                                                        <NavLink to={'/edu-management/school/course/instructions'} className='button-text-3'>Xem tất cả</NavLink>
                                          </div>
                                          <div className='row list-card-scroll'>
                                                        {[
                                                                      {
                                                                                    name: 'Cách tạo khóa học Online',
                                                                                    descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
                                                                                    img: demoImg2
                                                                      },
                                                                      {
                                                                                    name: 'Lớp học Online A-Z',
                                                                                    descript: 'Tham gia các lớp học được giảng dạy trực tuyến từ các chuyên gia',
                                                                                    img: demoImg3
                                                                      },
                                                                      {
                                                                                    name: 'Mentor ra sao cho hiệu quả',
                                                                                    descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
                                                                                    img: demoImg4
                                                                      },
                                                                      {
                                                                                    name: 'Cách tạo khóa học Online',
                                                                                    descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
                                                                                    img: demoImg2
                                                                      },
                                                        ].map((e, i) => <div key={`card-img-${i}`} className='card-image-2 col'>
                                                                      <div className='top-img' style={{ backgroundImage: `url(${e.img})` }}></div>
                                                                      <div className='col text-content'>
                                                                                    <div className='heading-5'>{e.name}</div>
                                                                                    <div className='subtitle-3'>{e.descript}</div>
                                                                      </div>
                                                        </div>)
                                                        }
                                          </div>
                            </div>
              </>
}

function OldUserDashboard() {
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

              return <>
                            <div className='block-view col'>
                                          <div className='block-title heading-6'>Sắp diễn ra</div>
                                          <div className='row list-card'>
                                                        {
                                                                      eventList.sort((a, b) => {
                                                                                    const now = new Date().getTime()
                                                                                    return Math.abs(a.time - now) - Math.abs(b.time - now)
                                                                      }).map((e, i) => {
                                                                                    const eTime = new Date(e.time)
                                                                                    return <div key={`card-${i}`} className={`card-view-1 row ${i === 0 ? 'col12' : 'col6'} col24-lg col24-md col24-sm col24-min`} style={{ '--gutter': '24px', columnGap: 40, padding: '28px 24px' }}>
                                                                                                  <div className='row text-content' style={{ columnGap: 40 }}>
                                                                                                                {i === 0 ? <div className='col' style={{ rowGap: 4 }}>
                                                                                                                              <div className='heading-4'>{`${eTime.getHours()}:${eTime.getMinutes()}`}</div>
                                                                                                                              <div className='subtitle-3'>{`${eTime.getDate()} tháng ${eTime.getMonth() + 1}`}</div>
                                                                                                                </div> : null}
                                                                                                                <div className='col text-content'>
                                                                                                                              <div className='heading-7'>{e.title}</div>
                                                                                                                              <div className='subtitle-4'>{e.content}</div>
                                                                                                                              {i === 0 ? null : <div className='body-3' style={{ marginTop: 4 }}>{e.note}</div>}
                                                                                                                </div>
                                                                                                  </div>
                                                                                                  {i === 0 ? <NavLink className='card-button-2 row'>
                                                                                                                <FilledSocialSharing color='white' width={16} height={16} />
                                                                                                                <div className='button-text-3'>Vào dạy</div>
                                                                                                  </NavLink> : <div className='noti row'>
                                                                                                                <FilledBell width={15} height={15} color='#366AE2' />
                                                                                                  </div>}
                                                                                    </div>;
                                                                      })
                                                        }

                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className='heading-6'>Lớp học gần đây</div>
                                                        <div className='row group-prev-next'>
                                                                      <div className='prev-btn row'><FontAwesomeIcon icon={faChevronLeft} /></div>
                                                                      <div className='next-btn row'><FontAwesomeIcon icon={faChevronRight} /></div>
                                                        </div>
                                          </div>
                                          <div className='row list-card-view'>
                                                        {
                                                                      [
                                                                                    {
                                                                                                  title: 'Thiết kế UI/UX dành cho người mới bắt đầu',
                                                                                                  next: 'Review bài tập số 2',
                                                                                                  img: demoImg5,
                                                                                                  time: '19:00 - 20:00',
                                                                                                  schedule: 'Thứ 3, thứ 6 hàng tuần',
                                                                                                  students: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
                                                                                    },
                                                                                    {
                                                                                                  title: 'Thiết kế UI/UX bằng Figma',
                                                                                                  next: 'Review bài tập số 3',
                                                                                                  img: demoImg6,
                                                                                                  time: '19:30 - 21:00',
                                                                                                  schedule: 'Thứ 2, thứ 5 hàng tuần',
                                                                                                  students: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
                                                                                    },
                                                                      ].map((e, i) => <div key={`card-img-${i}`} className='card-image-3 row col12' style={{ '--gutter': '24px' }}>
                                                                                    <div className='prefix-img col8 col24-lg col24-md col24-sm col24-min' style={{ backgroundImage: `url(${e.img})` }}></div>
                                                                                    <div className='col card-content col16 col24-lg col24-md col24-sm col24-min'>
                                                                                                  <div className='col content-1'>
                                                                                                                <div className='heading-7'>Xây dựng khóa học đầu tiên</div>
                                                                                                                <div className='row' style={{ columnGap: 8 }}>
                                                                                                                              <FilledBook width={16} height={16} />
                                                                                                                              <div className='button-text-3'>Sắp tới:</div>
                                                                                                                              <div className='button-text-3' style={{ color: 'var(--primary-color)' }}>{e.next}</div>
                                                                                                                </div>
                                                                                                  </div>
                                                                                                  <div className='row content-2'>
                                                                                                                <div className='col'>
                                                                                                                              <div className='subtitle-4'>{e.students.length} học viên</div>
                                                                                                                              <div className='list-avatar'>
                                                                                                                                            {e.students.slice(0, 4).map((st, index) => <div key={`av-${index}`} className='avatar-circle' style={{ left: `${24 * index}px`, backgroundImage: `url(${st.avatar ?? avatarDemo2})` }}></div>)}
                                                                                                                                            {e.students.length > 4 ? <div className='avatar-circle col label-5' style={{ left: `96px` }}>+{e.students.length - 4}</div> : null}
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                                <div className='col schedule-time'>
                                                                                                                              <div className='heading-6'>{e.time}</div>
                                                                                                                              <div className='subtitle-4'>{e.schedule}</div>
                                                                                                                </div>
                                                                                                  </div>
                                                                                    </div>
                                                                      </div>)
                                                        }
                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title heading-6'>Học viên mới</div>
                                          <div className='row list-card-view'>
                                                        {
                                                                      [
                                                                                    {
                                                                                                  name: 'Phan Minh Anh',
                                                                                                  avatar: avatarDemo1,
                                                                                                  followers: 19,
                                                                                                  following: 20,
                                                                                                  descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
                                                                                    },
                                                                                    {
                                                                                                  name: 'Phan Minh Anh',
                                                                                                  avatar: avatarDemo1,
                                                                                                  followers: 19,
                                                                                                  following: 20,
                                                                                                  descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
                                                                                    },
                                                                                    {
                                                                                                  name: 'Phan Minh Anh',
                                                                                                  avatar: avatarDemo1,
                                                                                                  followers: 19,
                                                                                                  following: 20,
                                                                                                  descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
                                                                                    },
                                                                                    {
                                                                                                  name: 'Phan Minh Anh',
                                                                                                  avatar: avatarDemo1,
                                                                                                  followers: 19,
                                                                                                  following: 20,
                                                                                                  descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
                                                                                    },
                                                                      ].map((e, i) => <div key={`new-st-card-${i}`} className='card-image-4' >
                                                                                    <div className='prefix-img' style={{ backgroundImage: `url(${e.avatar})` }}></div>
                                                                                    <div className='col card-content'>
                                                                                                  <div className='heading-7'>{e.name}</div>
                                                                                                  <div className='subtitle-4'>{e.followers} Người theo dõi · {e.following} Đang theo dõi</div>
                                                                                    </div>
                                                                      </div>)
                                                        }
                                          </div>
                            </div>
              </>
}