import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Checkbox, CustomSlider, ProgressBar, Text, TextField } from '../../../../component/export-component'
import './home.css'
import ListTopic from '../../social/discovery/local-component/list-topic'
import ListExpert from '../../social/discovery/local-component/list-expert'
import { PostCard } from '../../../../project-component/card'
import courseThumbnail from '../../../../assets/demo-image2.png'
import classThumbnail from '../../../../assets/demo-image3.png'
import mentorThumbnail from '../../../../assets/demo-image4.png'
import ListDiscountCourse from './local-component/list-discount-course'
import ListCommonCourse from './local-component/list-common-course'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccountController } from '../../account/controller'
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useState } from 'react'
import { TopicController } from '../../topic/controller'
import SidebarActions from '../../../layout/sidebar/sidebar-actions'
import ListAllCourse from './local-component/list-all-course'
import { OrderController } from '../../ecom/order/controller'
import { OrderType } from '../../ecom/order/da'
import { CustomerController } from '../../customer/controller'
import 'react-awesome-slider/dist/styles.css';
import { CourseController } from '../course/controller'
import ConfigAPI from '../../../../config/configApi'
import { CustomerType } from '../../customer/da'
import { eduExpertModules } from '../../../../assets/const/const-list'
import EduDashboard from '../dashboard/dashboard'
import EduSchedule from '../schedule/schedule'
import EduStudent from '../student/student'
import SchoolCourse from '../course/course'
import SchoolClass from '../class/class'
import SchoolMentor from '../mentor/mentor'
import ExamManagment from '../exam/exam'
import QuestionManagment from '../question/question'

export default function EduHome() {
    const isLogin = AccountController.token()
    const expertRole = CustomerController.userInfor()?.type === CustomerType.expert

    return isLogin ? expertRole ? <HomeExpert /> : <HomeAuth /> : <HomeGuest />
}

const HomeGuest = () => {
    return <div className='col'>
        <div className="row" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--main-color)' }}>
            <div className="col col24 col20-xxl col20-xl" style={{ padding: '6.4rem 3.2rem', gap: '3.2rem', '--gutter': '0px' }}>
                <div className='col' style={{ gap: '0.8rem' }}>
                    <Text className='heading-3' maxLine={2} style={{ color: '#ffffff', width: '56%' }}>eBig is a community of spreading the knowledge</Text>
                    <Text className='body-3' maxLine={2} style={{ color: '#ffffff', width: '56%' }}>Learn from expert professionals and join the largest online community for creatives.</Text>
                </div>
                <NavLink className="row button-grey">
                    <Text className='button-text-3'>Xem các khóa học</Text>
                </NavLink>
            </div>
        </div>
        <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
            <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem', gap: '3.2rem', '--gutter': '0px' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-4' maxLine={2} style={{ flex: 1 }}>Học theo chủ đề</Text>
                    <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListTopic />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 3.2rem', backgroundColor: 'var(--dark-background)' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-4' maxLine={2} style={{ flex: 1, color: '#ffffff' }}>Học cùng chuyên gia hàng đầu</Text>
                    <NavLink className='button-text-3' style={{ color: '#ffffff' }}>Xem tất cả</NavLink>
                </div>
                <ListExpert />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 3.2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <Text className='heading-4' maxLine={2}>Chủ động lựa chọn loại hình lớp học</Text>
                <div className='row' style={{ gap: '4rem', width: '100%' }}>
                    <PostCard
                        imgUrl={courseThumbnail}
                        to={''}
                        style={{ flex: 1, with: '100%' }}
                        imgStyle={{ height: '21.4rem' }}
                        title={'Khóa học bằng Video'}
                        content={'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia'}
                    />
                    <PostCard
                        imgUrl={classThumbnail}
                        to={''}
                        style={{ flex: 1, with: '100%' }}
                        imgStyle={{ height: '21.4rem' }}
                        title={'Lớp học Online'}
                        content={'Tham gia các lớp học được giảng dạy trực tuyến từ các chuyên gia'}
                    />
                    <PostCard
                        imgUrl={mentorThumbnail}
                        to={''}
                        style={{ flex: 1, with: '100%' }}
                        imgStyle={{ height: '21.4rem' }}
                        title={'Mentoring'}
                        content={'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia'}
                    />
                </div>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 3.2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-4' maxLine={2} style={{ flex: 1 }}>Khoá học đang được ưu đãi</Text>
                    <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListDiscountCourse />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 3.2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-4' maxLine={2} style={{ flex: 1 }}>Khoá học phổ biến nhất</Text>
                    <NavLink to={'courses'} className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListCommonCourse />
            </div>
        </div>
    </div>
}

const HomeAuth = () => {
    const [topicList, setTopicList] = useState([])
    const [openAll, setOpenAll] = useState(false)
    const [myCourses, setMyCourses] = useState([])

    useEffect(() => {
        TopicController.getAll().then(res => {
            if (res) setTopicList(res)
        })
        OrderController.getListSimple({
            filter: [
                { field: 'type', operator: '=', value: OrderType.course },
                { field: 'statusPayment', operator: '=', value: 2 }
            ]
        }).then(async (res) => {
            if (res) {
                const courseIds = res.data.map(e => e.orderDetails).reduce((a, b) => a.concat(b)).filter(e => e.type === OrderType.course).map(e => e.productId)
                const myCoursesRes = await CourseController.getLearningProgressByIds(courseIds)
                if (myCoursesRes) {
                    setMyCourses(myCoursesRes)
                }
            }
        })
    }, [])

    return <div className='row' style={{ flex: 1, height: '100%', width: '100%', }}>
        <div className='col body-sidebar' >
            <TextField
                className='search-default placeholder-2'
                placeholder='Tìm kiếm khóa học'
                prefix={<FontAwesomeIcon icon={faSearch} />}
            />
            <div className='col' style={{ flex: 1, gap: '2.4rem' }}>
                <div className='row' style={{ padding: '0 1.6rem' }}>
                    <Text className='heading-6'>Khoá học theo chủ đề</Text>
                </div>
                <div className='col' style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
                    {topicList.slice(0, openAll ? topicList.length : 6).map((item, i) => {
                        return <div key={'filter-topic-' + i} className='row' style={{ gap: '0.8rem', padding: '1rem 1.6rem' }}>
                            <Checkbox size='2rem' />
                            <Text style={{ flex: 1, width: '100%' }} className='label-4' maxLine={1}>{item.name}</Text>
                        </div>
                    })}
                    <button type='button' className='row button-infor' style={{ backgroundColor: 'transparent', padding: '1rem 1.6rem' }} onClick={() => setOpenAll(!openAll)}>
                        <Text className='button-text-3'>Xem thêm</Text>
                        <FontAwesomeIcon icon={openAll ? faChevronUp : faChevronDown} style={{ fontSize: '1.4rem' }} />
                    </button>
                </div>
                <SidebarActions />
            </div>
        </div>
        <div className='row' style={{ flex: 1, padding: '3.2rem 0', width: '100%', height: '100%', overflow: 'hidden auto', justifyContent: 'center', alignItems: 'start' }}>
            <div className='col col24-md col24-sm' style={{ gap: '4.8rem', width: '90%', padding: '0 1.6rem', minHeight: myCourses.length ? 'calc(100% - 40rem)' : null }}>
                {myCourses.length ? <CustomSlider style={{ height: '30.8rem', borderRadius: '0.8rem', overflow: 'hidden' }}>
                    {myCourses.map(e => {
                        const myProgress = e.countLessonUsed ? Math.round((e.countLessonUsed / e.countLesson) * 100) : 0
                        return <div key={e.id} style={{ backgroundImage: `url(${ConfigAPI.imgUrl + e.pictureId})`, backgroundSize: 'cover' }}>
                            <div className='col' style={{ width: '100%', height: '100%', justifyContent: 'center', padding: '1.6rem 8rem', gap: '2.4rem' }}>
                                <div className='heading-6' style={{ color: '#ffffff' }}>Khóa học của tôi</div>
                                <div className='col' style={{ gap: '1.6rem' }}>
                                    {/* <div className='col' style={{ gap: '0.4rem' }}> */}
                                    {/* <div className='row' style={{ gap: '0.8rem' }}>
                                            <img src='' alt='' style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                                            <div className='label-4' style={{ color: '#ffffff' }}>Phan Minh Anh</div>
                                        </div> */}
                                    <Text className='heading-4' maxLine={2} style={{ color: '#ffffff' }}>{e.name}</Text>
                                    {/* </div> */}
                                    <div className='col'>
                                        <ProgressBar percentColor='#ffffff' fullColor='#00000000' progressBarOnly percent={myProgress} progressBarStyle={{ border: '1px solid #ffffff' }} />
                                        <div className='label-5' style={{ color: "#ffffff" }}>{myProgress ? `Bạn đã hoàn thành ${myProgress}% khóa học này` : 'Bạn chưa bắt đầu học khóa học này'}</div>
                                    </div>
                                </div>
                                <div className='row' style={{ gap: '1.2rem' }}>
                                    <NavLink to={'course/' + e.id} className='button-primary row' style={{ backgroundColor: '#00000000', border: '1px solid #ffffff' }}>
                                        <div className='button-text-3'>{myProgress ? 'Học tiếp' : 'Bắt đầu học'}</div>
                                    </NavLink>
                                    {/* <NavLink className='button-primary row' style={{ backgroundColor: "#00000000", padding: 0 }}>
                                        <div className='button-text-3'>Xem tất cả khóa học</div>
                                        <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.4rem' }} />
                                    </NavLink> */}
                                </div>
                            </div>
                        </div>
                    })}
                </CustomSlider> : null}
                <ListAllCourse />
            </div>
        </div>
    </div>
}

const HomeExpert = () => {
    const location = useLocation()
    const [modules, setModules] = useState(eduExpertModules)
    const [selectedId, setSelectedId] = useState()
    const moduleTile = (item) => {
        console.log(location.pathname)
        if (!item.link) {
            var children = modules.filter(e => e.parentId === item.id)
            item.isOpen ??= false
        }
        return <div key={'m-' + item.id} className='col'>
            <NavLink to={item.link ? ('/' + item.link) : null} onClick={children ? () => {
                setModules(modules.map(e => {
                    if (e.id === item.id) e.isOpen = !item.isOpen
                    return e
                }))
            } : null} className={`row expert-module-tile ${selectedId === item.id ? 'selected' : ''}`} style={{ paddingLeft: item.parentId ? '4rem' : '1.6rem' }}>
                <Text maxLine={1} className='label-3' style={{ flex: 1, width: '100%' }}>{item.name}</Text>
                {children ? <FontAwesomeIcon icon={item.isOpen ? faChevronUp : faChevronDown} style={{ fontSize: '1.6rem', color: '#00204D99' }} /> : null}
            </NavLink>
            {children && item.isOpen ? <div className='col'>{children.map(e => moduleTile(e))}</div> : null}
        </div>
    }

    const renderUI = () => {
        switch (location.pathname) {
            case '/education/dashboard':
                return <EduDashboard />
            case '/education/schedule':
                return <EduSchedule />
            case '/education/students':
                return <EduStudent />
            case '/education/courses':
                return <SchoolCourse />
            case '/education/classes':
                return <SchoolClass />
            case '/education/mentors':
                return <SchoolMentor />
            case '/education/curriculum':
                return <div className='sdufgsduifg8isdgfisud'></div>
            case '/education/exams':
                return <ExamManagment />
            case '/education/questions':
                return <QuestionManagment />
            default:
                return <EduDashboard />
        }
    }

    useEffect(() => {
        const selectedModule = eduExpertModules.find(e => e.link && location.pathname.includes(e.link))
        setSelectedId(selectedModule?.id ?? 1)
        if (selectedModule?.parentId) {
            setModules(modules.map(e => {
                if (e.id === selectedModule.parentId) e.isOpen = true
                return e
            }))
        }
    }, [location.pathname])

    return <div className='row' style={{ flex: 1, width: '100%', height: '100%' }}>
        <div className='col body-sidebar'>
            <Text className='heading-6'>Education Management</Text>
            <div className='col' style={{ gap: '1.2rem', flex: 1, height: '100%', overflow: 'hidden auto' }}>
                {modules.filter(e => !e.parentId).map(item => moduleTile(item))}
            </div>
            <SidebarActions />
        </div>
        {renderUI()}
    </div>
}