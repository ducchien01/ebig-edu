import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dashboard.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import demoImg2 from '../../assets/demo-image2.png';
import demoImg3 from '../../assets/demo-image3.png';
import demoImg4 from '../../assets/demo-image4.png';

// demo người dùng mới bằng type 1 là cũ, 0 là mới
export default function EduDashboard({ type = 0 }) {
              return <div className="edu-dashboard col">
                            <div className="banner-container col">
                                          <div className="col" style={{ rowGap: 8 }}>
                                                        <div className="heading-3">eBig is a community of <br /> spreading the knowledge</div>
                                                        <div className="body-3">Learn from expert professionals and join <br /> the largest online community for creatives.</div>
                                          </div>
                                          {type ? <button className="banner-btn button-text-3">Xác thực hồ sơ giáo viên</button> :
                                                        <div className='row' style={{ columnGap: 8 }}>
                                                                      <button className="banner-btn button-text-3">Lịch dạy</button>
                                                                      <button className="banner-btn-2 button-text-3">Quản lý khóa học</button>
                                                        </div>
                                          }
                            </div>
                            <div className='dashboard-content col' >
                                          {type ? <div></div> : <NewbieDashboard />}
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
                                          <div className='card-image-1 row'>
                                                        <div className='prefix-img col10 col24-sm col24-min'></div>
                                                        <div className='row card-content col12 col24-sm col24-min'>
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
                            </div>
              </>
}