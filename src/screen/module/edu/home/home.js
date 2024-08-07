import { NavLink, useLocation } from 'react-router-dom'
import { Checkbox, CustomSlider, ProgressBar, Text, TextField } from 'wini-web-components'
import './home.css'
import ListTopic from '../../social/discovery/local-component/list-topic'
import { PostCard } from '../../../../project-component/card'
import courseThumbnail from '../../../../assets/demo-image2.png'
import classThumbnail from '../../../../assets/demo-image3.png'
import mentorThumbnail from '../../../../assets/demo-image4.png'
import ListCommonExam from './local-component/list-common-exam'
import ListCommonCourse from './local-component/list-common-course'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccountController } from '../../account/controller'
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { TopicController } from '../../topic/controller'
import SidebarActions from '../../../layout/sidebar/sidebar-actions'
import ListAllCourse from './local-component/list-all-course'
import { OrderController } from '../../ecom/order/controller'
import { OrderType } from '../../ecom/order/da'
import { CourseController } from '../course/controller'
import ConfigAPI from '../../../../config/configApi'

export default function EduHome() {
    const location = useLocation()

    return location.pathname.includes('courses') ? <HomeAuth /> : <HomeGuest />
}

const HomeGuest = () => {
    return <div className='col' style={{ backgroundColor: '#fff' }}>
        <div className="row" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--main-color)' }}>
            <div className="col col24 col20-xxl col20-xl" style={{ padding: '6.4rem 3.2rem', gap: '3.2rem', '--gutter': '0px' }}>
                <div className='col' style={{ gap: '0.8rem' }}>
                    <Text className='heading-3' maxLine={2} style={{ color: '#ffffff', width: 'max(56%, 60rem)' }}>eBig is a community of spreading the knowledge</Text>
                    <Text className='body-3' maxLine={2} style={{ color: '#ffffff', width: 'max(56%, 40rem)' }}>Learn from expert professionals and join the largest online community for creatives.</Text>
                </div>
                <NavLink to={'courses'} className="row button-primary">
                    <Text className='button-text-3'>Xem các khóa học</Text>
                </NavLink>
            </div>
        </div>
        <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
            <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem', gap: '2.4rem', '--gutter': '0px' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-5' maxLine={2} style={{ flex: 1 }}>Học theo chủ đề</Text>
                    <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListTopic />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '3.2rem' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '2.4rem', padding: '0 2rem' }}>
                <Text className='heading-5' maxLine={2}>Chủ động lựa chọn loại hình lớp học</Text>
                <div className='row' style={{ gap: '4rem', width: '100%', alignItems: 'stretch' }}>
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
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '3.2rem' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '2.42rem', padding: '0 2rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <Text className='heading-5' maxLine={2} style={{ flex: 1 }}>Khoá học phổ biến nhất</Text>
                    <NavLink to={'courses'} className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListCommonCourse />
            </div>
        </div>
        {
            AccountController.token() ? <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '3.2rem' }}>
                <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '2.4rem', padding: '0 2rem' }}>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <Text className='heading-5' maxLine={2} style={{ flex: 1 }}>Đề thi thử phổ biến</Text>
                        <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                    </div>
                    <ListCommonExam />
                </div>
            </div> : undefined
        }
    </div>
}

const HomeAuth = () => {
    const [topicList, setTopicList] = useState([])
    const [openAll, setOpenAll] = useState(false)
    const [myCourses, setMyCourses] = useState([])
    const searchParams = new URLSearchParams(window.location.search);
    const [selectedTopics, setSelectedTopics] = useState([])

    useEffect(() => {
        let listFilter = []
        for (const [key, value] of searchParams) {
            if (key === 'topicId')
                listFilter.push(value)
        }
        setSelectedTopics(listFilter)
        TopicController.getAll().then(res => {
            if (res) setTopicList(res)
        })
        OrderController.getListSimple({
            filter: [
                { field: 'type', operator: '=', value: OrderType.course },
                { field: 'statusPayment', operator: '=', value: 2 }
            ]
        }).then(async (res) => {
            if (res?.data?.length) {
                const courseIds = res.data.map(e => e.orderDetails).reduce((a, b) => a.concat(b)).filter(e => e.type === OrderType.course).map(e => e.productId)
                const myCoursesRes = await CourseController.getLearningProgressByIds(courseIds)
                if (myCoursesRes) {
                    setMyCourses(myCoursesRes)
                }
            }
        })
    }, [window.location.search])

    return <div style={{height: '100%'}}>
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
                            <Checkbox size='2rem' value={selectedTopics.some(id => id === item.id)} />
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
        <div style={{ float: 'right', height: '100%' }}>
            <div className='row' style={{ padding: '2.4rem 0', width: '100%', justifyContent: 'center', alignItems: 'start', backgroundColor: '#fff', height: '100%' }}>
                <div className='col col24-md col24-sm col24-min' style={{ gap: '4.8rem', width: '90%', padding: '0 1.6rem', minHeight: myCourses.length ? 'calc(100% - 40rem)' : null }}>
                    {myCourses.length ? <CustomSlider style={{ height: '30.8rem', borderRadius: '0.8rem', overflow: 'hidden' }}>
                        {myCourses.map(e => {
                            const myProgress = e.countLessonUsed ? Math.round((e.countLessonUsed / e.countLesson) * 100) : 0
                            return <div key={e.id} style={{ backgroundImage: `url(${ConfigAPI.imgUrl + e.pictureId})`, backgroundSize: 'cover' }}>
                                <div className='col' style={{ width: '100%', height: '100%', justifyContent: 'center', padding: '1.6rem 8rem', gap: '2.4rem' }}>
                                    <div className='heading-6' style={{ color: '#ffffff' }}>Khóa học của tôi</div>
                                    <div className='col' style={{ gap: '1.6rem' }}>
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
                                    </div>
                                </div>
                            </div>
                        })}
                    </CustomSlider> : null}
                    <ListAllCourse />
                </div>
            </div>
        </div>
    </div>
}

