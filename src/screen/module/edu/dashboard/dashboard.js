import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './dashboard.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import InstructionList from './local-component/instruction-list';
import ComingList from './local-component/coming-list';
import NewStudentList from './local-component/new-student-list';
import MothBusiness from './local-component/moth-business';
import CurrentCourseList from './local-component/current-course-list';
import { Text } from '../../../../component/export-component';
import { CustomerController } from '../../customer/controller';

// demo người dùng mới bằng type 1 là cũ, 0 là mới
export default function EduDashboard() {
    const user = CustomerController.userInfor()

    return <div className="col" style={{ height: '100%', flex: 1, width: '100%', alignItems: 'center', overflow: 'hidden auto', gap: '2.4rem' }} >
        <div className="banner-container col">
            <div className="col" style={{ rowGap: 8 }}>
                <div className="heading-3">eBig is a community of <br /> spreading the knowledge</div>
                <div className="body-3">Learn from expert professionals and join <br /> the largest online community for creatives.</div>
            </div>
            {user.isActive ? <div className='row' style={{ columnGap: 8 }}>
                <NavLink to={'/edu/schedule'} className="button-primary row"><div className='button-text-3'>Lịch dạy</div></NavLink>
                <NavLink to={'/edu/course'} className="button-infor row border"><div className='button-text-3'>Quản lý khóa học</div></NavLink>
            </div> :
                <button className="button-primary row"><div className='button-text-3'>Xác thực hồ sơ giáo viên</div></button>
            }
        </div>
        <div className='dashboard-content col' >
            {user.isActive ? <OldUserDashboard /> : <NewbieDashboard />}
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
                    <NavLink to={'/edu/course/add'} className='card-button row'>
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