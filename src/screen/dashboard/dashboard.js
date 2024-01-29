import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dashboard.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

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
                                          <div className='row' style={{ columnGap: 24 }}>
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
                                                                      ].map(e => <div className='card-view-1 row col12' style={{ '--gutter': '24px', columnGap: 40 }}>
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
                                          <div></div>
                            </div>
              </>
}