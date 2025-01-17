import { Checkbox, Popup, ProgressCircle, RadioButton, Text, showPopup } from "wini-web-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineCalendarDate, OutlineTimeAlarm, OutlineUserProfile, OutlineVideoPlaylist } from "../../../../assets/const/icon";
import { CourseController } from "./controller";
import { CustomerController } from "../../customer/controller";
import { Ultis } from "../../../../Utils";
import ConfigAPI from "../../../../config/configApi";
import { ClassController } from "../class/controller";
import { MentorController } from "../mentor/controller";
import { AccountController } from "../../account/controller";
import { InforCard } from "../../../../project-component/card";
import { OrderType } from "../../ecom/order/da";
import { RatingController } from "../rating/controller";
import { OrderController } from "../../ecom/order/controller";
import ListLessonTile from "../lesson/local-component/list-lesson-tile";
import OverallTab from "./local-component/overall-tab";
import CourseLessonsContent from "./local-component/course-lessons-tab";
import CourseRatingTab from "./local-component/rating-tab";
import { CustomerLessonController } from "../customer-lesson/controller";
import PopupListClass from "../class/local-component/popup-list-class";
import { useSelector } from "react-redux";
import { showLoginPopup } from "../../../layout/main-layout";

export default function ViewCourseDetails() {
    const ref = useRef()
    const userInfor = useSelector((state) => state.account.data)
    const isLogin = AccountController.token() != null
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [activeFilterTab, setActiveFilterTab] = useState(0)
    const [expert, setExpert] = useState()
    const [classList, setClassList] = useState([])
    const [mentorList, setMentorList] = useState([])
    const [rateDetails, setRateDetails] = useState()
    const [isPaid, setIsPaid] = useState(false)
    const [selectedCLesson, setSelectedCLesson] = useState()
    const [learningProgress, setLearningProgress] = useState([])

    const onEndLesson = () => {
        if (selectedCLesson.lessonId && learningProgress.every(id => id !== selectedCLesson.lessonId)) {
            let newProgress = {
                name: selectedCLesson.name,
                lessonId: selectedCLesson.lessonId,
                courseId: id,
                customerId: userInfor.id
            }
            CustomerLessonController.add(newProgress).then(res => {
                if (res) {
                    newProgress.id = res
                    setLearningProgress([...learningProgress, selectedCLesson.lessonId].filterAndMap())
                }
            })
        }
    }

    const renderTabView = () => {
        switch (activeFilterTab) {
            case 0:
                return <OverallTab
                    data={data}
                    rateDetails={rateDetails}
                    isPaid={isPaid}
                    buyOptions={<>
                        <div className="col" style={{ gap: '1.6rem' }}>
                            <Text className="heading-4" style={{ '--max-line': 1 }}>{`${Ultis.money(data.price)}đ`}</Text>
                            <button type="button" className="row button-primary" style={{ padding: '1.2rem 2rem', width: '100%' }} onClick={buyCourse}>
                                <div className="button-text-3">Mua khóa học</div>
                            </button>
                        </div>
                        {optionsBuyClass()}
                        {optionBuyMentor()}
                    </>}
                />
            case 1:
                return <CourseLessonsContent
                    data={selectedCLesson}
                    onEndLesson={onEndLesson}
                    courseLessons={data?.courseLessons}
                    onSelected={setSelectedCLesson}
                />
            case 2:
                return <CourseRatingTab rateDetails={rateDetails} />
            default:
                return <div></div>
        }
    }

    const buyCourse = () => {
        if (isLogin) {
            navigate('/ecomerce/cart', {
                state: {
                    from: expert,
                    products: [
                        {
                            id: data.id,
                            name: data.name,
                            unit: 'Khóa học',
                            price: data.price,
                            thumbnailId: data.thumbnailId,
                            checked: true,
                            type: OrderType.course
                        },
                        ...mentorList.filter(e => e.checked).map(e => {
                            return {
                                id: e.id,
                                name: e.name,
                                unit: 'Buổi',
                                price: e.price,
                                checked: true,
                                type: OrderType.mentor,
                            }
                        }),
                        ...classList.filter(e => e.checked).map(e => {
                            return {
                                id: e.id,
                                name: e.name,
                                unit: 'Học kỳ',
                                price: e.price,
                                checked: true,
                                type: OrderType.class,
                            }
                        }),
                    ]
                }
            })
        } else {
            showLoginPopup()
        }
    }

    const showAllClass = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Danh sách lớp học của bạn</div>,
            style: { minHeight: '44rem' },
            content: <PopupListClass ref={ref} selectedList={classList.filter(e => e.checked)} onSelect={(newSelectedList) => {
                let updateList = classList.map(e => {
                    e.checked = newSelectedList.some(el => el.id === e.id)
                    return e
                })
                updateList.push(...newSelectedList.filter(e => classList.every(el => el.id !== e.id)).map(e => {
                    e.checked = true
                    return e
                }))
                setClassList(updateList)
            }} courseId={id} />
        })
    }

    const optionsBuyClass = () => {
        let renderList = classList.slice(0, 2)
        if (renderList.every(e => !e.checked)) {
            renderList = [...classList.filter(e => e.checked), ...renderList].slice(0, 2)
        }
        if (!renderList.length) return <></>
        return <div className="col" style={{ gap: '1.2rem' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <Text className="body-3">Mua cùng lớp học online</Text>
                <Text onClick={showAllClass} className="button-text-3" style={{ color: 'var(--primary-color)' }} >Xem tất cả</Text>
            </div>
            {renderList.map(item => {
                return <div key={item.id} className={`col option-buy-class-mentor ${item.checked ? 'selected' : ''}`}>
                    <div className="row" style={{ gap: '1.6rem', paddingBottom: '1.2rem', borderBottom: 'var(--border-grey1)', alignItems: 'start' }}>
                        <RadioButton size={'1.8rem'} name="class-option" defaultChecked={item.checked} value={item.id} onChange={(v) => {
                            setClassList(classList.map(e => {
                                e.checked = v.target.value === e.id
                                return e
                            }))
                        }} />
                        <Text className="heading-8" maxLine={2} style={{ flex: 1, width: '100%' }}>{item.name}</Text>
                        <Text className="heading-7">{Ultis.money(item.price)}đ</Text>
                    </div>
                    <div className="row" style={{ gap: '1.6rem' }}>
                        <div className="row" style={{ gap: '0.8rem', flex: 1, alignItems: 'start' }}>
                            <OutlineTimeAlarm width="2rem" height="2rem" />
                            <div className="col" style={{ flex: 1, width: '100%' }}>
                                <div className="label-5">Khai giảng</div>
                                <Text className="heading-8" style={{ width: '100%' }} maxLine={2}>15/12/2023</Text>
                            </div>
                        </div>
                        <div className="row" style={{ gap: '0.8rem', flex: 1, alignItems: 'start' }}>
                            <OutlineVideoPlaylist width="2rem" height="2rem" />
                            <div className="col" style={{ flex: 1, width: '100%' }}>
                                <div className="label-5">Số lượng</div>
                                <Text className="heading-8" style={{ width: '100%' }} maxLine={2}>08 buổi học</Text>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    const optionBuyMentor = () => {
        let renderList = mentorList.filter(e => e.checked)
        if (renderList.length < 2) {
            if (mentorList.slice(0, 2).some(e => e.checked)) {
                renderList = mentorList.slice(0, 2)
            } else {
                renderList.push(...mentorList.filter(e => !e.checked))
                renderList = renderList.slice(0, 2)
            }
        }
        if (!renderList.length) return <></>
        return <div className="col" style={{ gap: '1.2rem' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <Text className="body-3">Mua cùng mentoring</Text>
                <Text onClick={() => { }} className="button-text-3" style={{ color: 'var(--primary-color)' }} >Xem tất cả</Text>
            </div>
            {renderList.map((item) => {
                return <div key={item.id} className={`col option-buy-class-mentor ${item.checked ? 'selected' : ''}`}>
                    <div className="row" style={{ gap: '1.6rem', paddingBottom: '1.2rem', borderBottom: 'var(--border-grey1)', alignItems: 'start' }}>
                        <Checkbox size={'2rem'} value={item.checked} onChange={(v) => {
                            setMentorList(mentorList.map(e => {
                                if (e.id === item.id) e.checked = v
                                return e
                            }))
                        }} />
                        <Text className="heading-7" maxLine={2} style={{ flex: 1, width: '100%' }}>{item.name}</Text>
                        <Text className="heading-6">{Ultis.money(item.price)}đ</Text>
                    </div>
                    <div className="row" style={{ gap: '0.8rem', flex: 1, alignItems: 'start' }}>
                        <OutlineCalendarDate width="2rem" height="2rem" />
                        <div className="col" style={{ flex: 1, width: '100%' }}>
                            <div className="label-5">Thời gian</div>
                            <Text className="heading-8" style={{ width: '100%' }} maxLine={4}>{Ultis.datetoString(new Date(item.startDate), 'hh:mm') + ' - ' + Ultis.datetoString(new Date(item.endDate), 'hh:mm dd/mm/yyyy')}</Text>
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    const renderLearningPregressUI = () => {
        const lessons = (data?.courseLessons ?? []).filter(e => e.parentId)
        const myProgress = lessons.length ? Math.round((learningProgress.length / lessons.length) * 100) : 0
        return <div className="row" style={{ gap: '1.2rem', padding: '2.4rem', border: 'var(--border-grey1)', borderRadius: '0.8rem', backgroundColor: 'var(--primary-background)' }}>
            <div className="col" style={{ gap: '0.8rem', flex: 1 }}>
                <Text className="heading-6" maxLine={1} style={{ width: '100%' }}>Quá trình học tập</Text>
                <Text className="label-4" maxLine={1} style={{ width: '100%' }}>{myProgress ? `Bạn đã hoàn thành ${myProgress}%` : 'Bạn chưa bắt đầu khoá học'}</Text>
            </div>
            <ProgressCircle style={{ width: '6.4rem', height: '6.4rem' }} percent={myProgress} textStyle={{ fontSize: 'min(1.6rem, 16px)' }} />
        </div>
    }

    useEffect(() => {
        if (id) {
            CourseController.getById(id).then(res => {
                if (res) {
                    CustomerController.getById(res.customerId).then(cusRes => {
                        if (cusRes) setExpert(cusRes)
                    })
                    if (res.courseLessons) {
                        const unit1 = res.courseLessons.find(e => !e.parentId)
                        if (unit1) setSelectedCLesson(res.courseLessons.find(e => e.parentId === unit1.id))
                    }
                    setData(res)
                }
            })
            if (isLogin) {
                RatingController.getRateOfProduct([id]).then(rateRes => {
                    if (rateRes?.length) setRateDetails(rateRes[0])
                })
                OrderController.getListSimpleDetails({ filter: [{ field: 'productId', operator: '=', value: id }] }).then(res => {
                    if (res?.data?.length && res.data[0].isPay) {
                        CustomerLessonController.getListSimple({ page: 1, take: 200, filter: [{ field: 'courseId', operator: '=', value: id }] }).then(progressRes => {
                            if (progressRes) {
                                setLearningProgress((progressRes.data ?? []).filterAndMap(e => e.lessonId))
                            }
                        })
                        setIsPaid(true)
                    }
                })
                ClassController.getListSimple({ page: 1, take: 2, filter: [{ field: 'courseId', operator: '=', value: id }] }).then(res => {
                    if (res) setClassList(res.data)
                })
                MentorController.getListSimpleAuth({ page: 1, take: 2, filter: [{ field: 'courseId', operator: '=', value: id }] }).then(res => {
                    if (res) setMentorList(res.data)
                })
            } else {
                ClassController.getListSimple({ page: 1, take: 2, filter: [{ field: 'courseId', operator: '=', value: id }] }).then(res => {
                    if (res) setClassList(res.data)
                })
            }
        }
    }, [])

    return data ? <>
        <Popup ref={ref} />
        <div className="img-header col" style={{ backgroundImage: `url(${ConfigAPI.imgUrl + data.pictureId})`, backgroundColor: 'var(--main-color)' }}>
            <div style={{ flex: 1 }}></div>
            <div className="header-text col" style={{ gap: '1.2rem', width: '100%' }}>
                <Text className="heading-3">{data.name}</Text>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <img src={expert?.avatarUrl} alt="" style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                    <Text className="label-2">{expert?.name ?? expert?.userName}</Text>
                    <div className="label-4">.</div>
                    <div className="row tag-infor">Khóa học Online</div>
                    <div className="label-4">.</div>
                    <OutlineUserProfile color="#ffffff" />
                    <Text className="label-2">{data.quantity ?? 0} học sinh</Text>
                </div>
            </div>
        </div>
        <div className="row" style={{ backgroundColor: '#fff', padding: '2.4rem 0' }}>
            <div className="details-block col">
                <div className="col tab-container">
                    <div className="tab-header-2 row">
                        <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(0)}>Tổng quan</div>
                        {isPaid ? <>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(1)}>Nội dung khóa học</div>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(2)}>Đánh giá</div>
                        </> : null}
                    </div>
                    <div className="tab-body-2 col" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden auto', padding: '1.2rem 3.2rem' }}>
                        {renderTabView()}
                    </div>
                </div>
            </div>
            <div className="more-infor-block col">
                {isPaid ?
                    <>
                        {renderLearningPregressUI()}
                        <ListLessonTile
                            style={{ flex: 'none', height: 'fit-content' }}
                            courseLessons={data?.courseLessons}
                            selectedId={selectedCLesson?.id}
                            onSelected={(item) => {
                                if (activeFilterTab !== 1) setActiveFilterTab(1)
                                setSelectedCLesson(item)
                            }}
                        />
                    </> : <>
                        <div className="col" style={{ gap: '1.6rem' }}>
                            <Text className="heading-4" style={{ '--max-line': 1 }}>{`${Ultis.money(data.price)}đ`}</Text>
                            <button type="button" className="row button-primary" style={{ padding: '1.2rem 2rem', width: '100%' }} onClick={buyCourse}>
                                <div className="button-text-3">Mua khóa học</div>
                            </button>
                        </div>
                        {optionsBuyClass()}
                        {optionBuyMentor()}
                        <InforCard
                            style={{ border: 'none', alignItems: 'start', textAlign: 'start' }}
                            avatar={expert?.avatarUrl}
                            avatarSize="8rem"
                            title={expert?.name}
                            subTitle={`${200} bài viết . ${12} khóa học . ${334} người theo dõi`}
                            content={'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.'}
                            actions={<button type="button" className="row button-primary" style={{ width: 'fit-content' }}>
                                <div className="button-text-3">Theo dõi</div>
                            </button>}
                        />
                        <div className="col divider" style={{ width: '100%' }}></div>
                        <div className="col" style={{ gap: '3.2rem' }}>
                            <div className="col" style={{ gap: '2rem' }}>
                                <div className="heading-7">Danh mục liên quan</div>
                                <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                                    {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => <div key={'relate-tag-' + i} className="row button-text-3 tag-disabled">{e}</div>)}
                                </div>
                                <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem thêm các chủ đề</Text>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    </> : null
}

