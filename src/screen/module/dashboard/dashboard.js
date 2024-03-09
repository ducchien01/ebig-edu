import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dashboard.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import InstructionList from './local-component/instruction-list';
import ComingList from './local-component/coming-list';
import NewStudentList from './local-component/new-student-list';
import MothBusiness from './local-component/moth-business';
import CurrentCourseList from './local-component/current-course-list';
import { Popup, Text, showPopup } from '../../../component/export-component';
import { useEffect, useRef, useState } from 'react';
import { AccountController } from '../account/controller';
import PopupLogin from '../account/local-component/popup-login';

// demo người dùng mới bằng type 1 là cũ, 0 là mới
export default function EduDashboard({ type = 1 }) {
    const ref = useRef()
    const checkType = AccountController.token() ? type : 0

    useEffect(() => {
        if (!AccountController.token()) {
            showPopup({
                ref: ref,
                content: <PopupLogin ref={ref} />
            })
        }
    }, [])

    return <div className="edu-dashboard col">
        <Popup ref={ref} />
        <div className="banner-container col">
            <div className="col" style={{ rowGap: 8 }}>
                <div className="heading-3">eBig is a community of <br /> spreading the knowledge</div>
                <div className="body-3">Learn from expert professionals and join <br /> the largest online community for creatives.</div>
            </div>
            {checkType ? <div className='row' style={{ columnGap: 8 }}>
                <button className="banner-btn button-text-3">Lịch dạy</button>
                <button className="banner-btn-2 button-text-3">Quản lý khóa học</button>
            </div> :
                <button className="banner-btn button-text-3">Xác thực hồ sơ giáo viên</button>
            }
        </div>
        <div className='dashboard-content col' >
            {checkType ? <OldUserDashboard /> : <NewbieDashboard />}
        </div>
    </div>
}

function NewbieDashboard() {
    const [v, setV] = useState(false)
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
                    ].map((e, i) => <div key={`card-${i}`} className='card-view-1 row col12 col24-md col24-sm col24-min' style={{ '--gutter': '2.4rem', columnGap: '4rem' }}>
                        <div className='col text-content'>
                            <Text className='heading-5' maxLine={3}>{e.title}</Text>
                            <Text className='subtitle-3' maxLine={4}>{e.content}</Text>
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
            <div className='prefix-img col8 col24-sm col24-min'></div>
            <div className='row card-content col16 col24-sm col24-min'>
                <div className='col text-content col24 col16-sm col16-min' style={{ 'gutter': '1.6rem' }}>
                    <div className='heading-5'>Xây dựng khóa học đầu tiên</div>
                    <div className='subtitle-3'>Learn from expert professionals and join <br /> the largest online community for creatives.</div>
                </div>
                <div className='col' >
                    <NavLink to={'/edu-management/school/course/add'} className='card-button row'>
                        <div className='button-text-3'>Tạo khóa học</div>
                        <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 16 }} />
                    </NavLink>
                </div>
            </div>
        </div>
        <InstructionList />
    </>
}

function OldUserDashboard() {
    return <>
        <ComingList />
        <CurrentCourseList />
        <NewStudentList />
        <MothBusiness />
        <InstructionList />
    </>
}