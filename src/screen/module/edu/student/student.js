import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './student.css'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Text } from '../../../../component/export-component'
import { NavLink } from 'react-router-dom'
import avatarDemo2 from '../../../../assets/demo-avatar2.png';
import ListStudent from './local-component/table-list-student'

export default function EduStudent() {
    return <div className='col edu-student view-container'>
        <div className="view-header row" style={{ marginRight: '11.2rem' }}>
            <div className="heading-4">Quản lý học viên</div>
        </div>
        <div className='col' style={{ gap: '3.2rem', flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className='col' style={{ gap: '1.6rem' }}>
                <div className='row' style={{ gap: '1.6rem' }}>
                    <div className='heading-7' style={{ flex: 1 }}>Lớp học hiện tại</div>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <button type='button' style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', backgroundColor: 'var(--background)', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                        </button>
                        <button type='button' style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', backgroundColor: 'var(--background)', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                        </button>
                    </div>
                </div>
                <div className='row' style={{ flexWrap: 'wrap', gap: '2.4rem', alignItems: 'stretch' }}>
                    {Array.from({ length: 3 }).map((item, i) => <div key={'current-class-' + i} className='current-class-infor col col8'>
                        <div className='row class-title'>
                            <div className='col' style={{ gap: '0.4rem', flex: 1, width: '100%' }}>
                                <Text className='heading-7'>Class: Phân tích dữ liệu dành cho beginner</Text>
                                <Text className='subtitle-4'>Khai giảng ngày 18.10.2023</Text>
                            </div>
                            <NavLink to={''} className={'row button-text-3'} style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Chi tiết</NavLink>
                        </div>
                        <div className='row' style={{ gap: '0.8rem' }}>
                            <div className='col' style={{ gap: '0.8rem', flex: 4 }}>
                                <div className='subtitle-4'>50 học viên</div>
                                <div className='list-avatar'>
                                    {Array.from({ length: 4 }).map((st, index) => <div key={`av-${index}`} className='avatar-circle' style={{ left: `${2.4 * index}rem`, backgroundImage: `url(${avatarDemo2})` }}></div>)}
                                    <div className='avatar-circle col label-5' style={{ left: `9.6rem` }}>+4</div>
                                    {/* {item.students.length > 4 ? <div className='avatar-circle col label-5' style={{ left: `9.6rem` }}>+{e.students.length - 4}</div> : null} */}
                                </div>
                            </div>
                            <div className='col' style={{ gap: '0.4rem', flex: 3, alignItems: 'end' }}>
                                <Text className='heading-6' style={{ '--max-line': 1, textOverflow: 'unset' }}>19:00 - 20:00</Text>
                                <Text className='subtitle-4' style={{ '--max-line': 1 }}>Thứ 3, thứ 6 hàng tuần</Text>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <ListStudent />
        </div>
    </div>
}