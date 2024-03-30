import { Checkbox, Popup, ProgressBar, RadioButton, Rating, Text, showPopup } from "../../../../component/export-component";
import demoAvatar from '../../../../assets/demo-avatar1.png'
// import mediaImg from '../../../../assets/media.png'
// import banner from '../../../../assets/banner1.png'
import demoImg from '../../../../assets/demo-image1.png'
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FilledSocialSharing, FilledStar, OutlineBooks, OutlineCalendarDate, OutlineGChart, OutlineHeart, OutlineLock, OutlineTimeAlarm, OutlineUserProfile, OutlineVerified, OutlineVideoPlaylist } from "../../../../assets/const/icon";
import { CourseController } from "./controller";
import { CustomerController } from "../../customer/controller";
import { Ultis } from "../../../../Utils";
import ConfigAPI from "../../../../config/configApi";
import { studentLevelList } from "../../../../assets/const/const-list";
import { ClassController } from "../class/controller";
import { MentorController } from "../mentor/controller";
import { AccountController } from "../../account/controller";
import PopupLogin from "../../account/popup-login";

export default function ViewCourseDetails() {
    const ref = useRef()
    const isLogin = AccountController.token() != null
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [activeFilterTab, setActiveFilterTab] = useState(0)
    const [expert, setExpert] = useState()
    const [classList, setClassList] = useState([])
    const [mentorList, setMentorList] = useState([])

    const renderTabView = () => {
        switch (activeFilterTab) {
            case 0:
                return <OverallTab data={data} />
            default:
                return <div></div>
        }
    }

    const buyCourse = () => {
        if (isLogin) {
            navigate()
        } else {
            showPopup({
                ref: ref,
                content: <PopupLogin ref={ref} />
            })
        }
    }

    const showAllClass = () => { }

    const optionsBuyClass = () => {
        let renderList = classList.slice(0, 2)
        if (renderList.every(e => !e.checked)) {
            renderList = [...classList.filter(e => e.checked), ...renderList].slice(0, 2)
        }
        if (!renderList.length) return <></>
        return <div className="col" style={{ gap: '1.2rem' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <Text className="body-3">Mua cùng lớp học online</Text>
                <Text onClick={() => { }} className="button-text-3" style={{ color: 'var(--primary-color)' }} >Xem tất cả</Text>
            </div>
            {renderList.map(item => {
                return <div key={item.id} className={`col option-buy-class-mentor ${item.checked ? 'selected' : ''}`}>
                    <div className="row" style={{ gap: '1.6rem', paddingBottom: '1.2rem', borderBottom: 'var(--border-grey1)', alignItems: 'start' }}>
                        <RadioButton size={'1.8rem'} name="class-option" value={item.id} onChange={(v) => {
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
            renderList.push(...mentorList.filter(e => !e.checked))
            renderList = renderList.slice(0, 2)
        }
        if (!renderList.length) return <></>
        return <div className="col" style={{ gap: '1.2rem' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <Text className="body-3">Mua cùng mentoring</Text>
                <Text onClick={() => { }} className="button-text-3" style={{ color: 'var(--primary-color)' }} >Xem tất cả</Text>
            </div>
            {renderList.map((item) => {
                return <div key={item.id} className={`col option-buy-class-mentor ${item.checked ? 'selected' : ''}`}>
                    <div className="row" style={{ gap: '1.6rem', paddingBottom: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                        <Checkbox size={'2rem'} style={{ borderRadius: '50%' }} value={item.checked} onChange={(v) => {
                        }} />
                        <Text className="heading-7" maxLine={1} style={{ flex: 1, width: '100%' }}>Tư duy thiết kế</Text>
                        <Text className="heading-6">350.000đ</Text>
                    </div>
                    <div className="row" style={{ gap: '0.8rem', flex: 1, alignItems: 'start' }}>
                        <OutlineCalendarDate width="2rem" height="2rem" />
                        <div className="col" style={{ flex: 1, width: '100%' }}>
                            <div className="label-5">Thời gian</div>
                            <Text className="heading-8" style={{ width: '100%' }} maxLine={4}>Thứ Ba, 19:00 - 21:00
                                Thứ Năm, 19:00 - 21:00
                                Chủ Nhật, 19:00 - 21:00</Text>
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    useEffect(() => {
        if (id) {
            CourseController.getById(id).then(async res => {
                if (res) {
                    CustomerController.getById(res.customerId).then(cusRes => {
                        if (cusRes) setExpert(cusRes)
                    })
                    setData(res)
                }
            })
            if (isLogin) {
                ClassController.getListSimpleAuth({ page: 1, take: 2, filter: [{ key: 'courseId', value: id }] }).then(res => {
                    if (res) setClassList(res.data)
                })
                MentorController.getListSimpleAuth({ page: 1, take: 2, filter: [{ key: 'courseId', value: id }] }).then(res => {
                    if (res) setMentorList(res.data)
                })
            } else {
                ClassController.getListSimple({ page: 1, take: 2, filter: [{ key: 'courseId', value: id }] }).then(res => {
                    if (res) setClassList(res.data)
                })
            }
        }
    }, [])

    return <div className="col preview-container" style={{ gap: '4rem' }}>
        {data ? <>
            <Popup ref={ref} />
            <div className="hero-header col" style={{ backgroundImage: `url(${ConfigAPI.imgUrl + data.pictureId})`, backgroundColor: 'var(--main-color)' }}>
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
            <div className="row" >
                <div className="details-block col">
                    <div className="col tab-container">
                        <div className="tab-header-2 row">
                            <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(0)}>Tổng quan</div>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(1)}>Nội dung khóa học</div>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(2)}>Đánh giá</div>
                        </div>
                        <div className="tab-body-2 col" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden auto', padding: '1.2rem 3.2rem' }}>
                            {renderTabView()}
                        </div>
                    </div>
                </div>
                <div className="more-infor-block col">
                    <div className="col" style={{ gap: '1.6rem' }}>
                        <Text className="heading-4" style={{ '--max-line': 1 }}>{`${Ultis.money(data.price)}đ`}</Text>
                        <button type="button" className="row button-primary" style={{ padding: '1.2rem 2rem', width: '100%' }} onClick={buyCourse}>
                            <div className="button-text-3">Mua khóa học</div>
                        </button>
                    </div>
                    {optionsBuyClass()}
                    {optionBuyMentor()}
                    <div className="col" style={{ gap: '1.6rem' }}>
                        <img src={demoAvatar} alt="" style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="heading-7">Phan Minh Anh</Text>
                            <div className="row" style={{ paddingBottom: '0.4rem', gap: '0.4rem' }}>
                                <div className="subtitle-4">200 bài viết</div>
                                <div className="subtitle-4">.</div>
                                <div className="subtitle-4">12 khóa học</div>
                                <div className="subtitle-4">.</div>
                                <div className="subtitle-4">334 người theo dõi </div>
                            </div>
                            <Text className="body-3" style={{ '--max-line': 4 }}>
                                Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.
                            </Text>
                        </div>
                        <button type="button" className="row button-primary" style={{ width: 'fit-content' }}>
                            <div className="button-text-3">Theo dõi</div>
                        </button>
                    </div>
                    <div className="col divider" style={{ width: '100%' }}></div>
                    <div className="col" style={{ gap: '3.2rem' }}>
                        {/* <div className="col" style={{ background: `no-repeat center/cover url(${banner})`, padding: '1.6rem min(25%, 15.6rem) 1.6rem 2rem', width: '100%', gap: '1.6rem', borderRadius: '0.8rem' }}>
                            <Text className="heading-7" style={{ color: '#ffffff', }} maxLine={2}>Trở thành chuyên gia để viết bài, giảng dạy và bán hàng</Text>
                            <button type="button" className="row button-text-3" style={{ padding: '0.6rem 1.2rem', borderRadius: '0.8rem', backgroundColor: '#ffffff', color: 'var(--primary-color)', width: 'fit-content' }}>Đăng ký ngay</button>
                        </div> */}
                        <div className="col" style={{ gap: '2rem' }}>
                            <div className="heading-7">Danh mục liên quan</div>
                            <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                                {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => <div key={'relate-tag-' + i} className="row button-text-3 tag-disabled">{e}</div>)}
                            </div>
                            <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem thêm các chủ đề</Text>
                        </div>
                    </div>
                </div>
            </div></> : null}
    </div>
}

const OverallTab = ({ data }) => {
    return <>
        <img src={demoImg} alt="" style={{ width: '100%', borderRadius: '0.8rem' }} />
        <div className="row" style={{ paddingTop: '1.6rem', gap: '1.6rem' }}>
            <button type="button" className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                <FilledSocialSharing />
                <div className="button-text-3">Chia sẻ</div>
            </button>
            <button type="button" className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                <OutlineHeart />
                <div className="button-text-3">Thêm vào mục yêu thích</div>
            </button>
        </div>
        <div className="col divider" style={{ width: '100%' }}></div>
        <div className="row" style={{ width: '100%', padding: '2.4rem 4.8rem', gap: '2.4rem 4.8rem', flexWrap: 'wrap', backgroundColor: 'var(--background)', border: 'var(--border-grey1)', borderRadius: '0.8rem' }}>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineVideoPlaylist width="2rem" height="2rem" />
                <div className="button-text-3">{data.courseLessons?.length} bài học</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineBooks width="2rem" height="2rem" />
                <div className="button-text-3">24 tài liệu đính kèm</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineGChart width="2rem" height="2rem" />
                <div className="button-text-3">{studentLevelList.find(e => e.id === data.level)?.name ?? '-'}</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineVerified width="2rem" height="2rem" color={data.isCertificate ? '#39AC6D' : undefined} />
                <div className="button-text-3">Chứng chỉ tốt nghiệp</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineTimeAlarm width="2rem" height="2rem" color={data.isCertificate ? '#39AC6D' : undefined} />
                <div className="button-text-3">12 tháng truy cập khóa học</div>
            </div>
        </div>
        <div className="col" style={{ gap: '4rem', padding: '3.2rem 0' }}>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Giới thiệu tổng quan</div>
                <div className="body-2">{data.description}</div>
            </div>
            <div className="col" style={{ padding: '2.4rem', gap: '1.6rem', border: 'var(--border-grey1)', borderRadius: '0.8rem' }}>
                <div className="heading-5">Mục tiêu cuối khoá</div>
                <ul>
                    {(data.targets ? JSON.parse(data.targets) : []).map(e => {
                        return <li key={e.id} className="body-1" style={{ marginLeft: '2.4rem' }}>{e.value}</li>
                    })}
                </ul>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Khóa học phù hợp với ai?</div>
                <div className="body-2">{data.suitable}</div>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Thời gian truy cập khóa học?</div>
                <div className="body-2">Bạn có thể truy cập khóa học trong vòng 12 tháng.</div>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Công cụ cần chuẩn bị?</div>
                <div className="body-2">{data.tools}</div>
            </div>
        </div>
        <div className="col divider"></div>
        <div className="col" style={{ gap: '3.2rem', paddingTop: '2rem' }}>
            <div className="heading-4">Nội dung khóa học</div>
            {(data?.courseLessons ?? []).filter(e => !e.parentId).map((item, i) => {
                let children = data.courseLessons.filter(e => e.parentId === item.id)
                return <div key={item.id} className="col" style={{ gap: '2rem' }}>
                    <Text className="heading-5" maxLine={1} style={{ width: '100%' }}>{`U${i + 1}: ${item.name}`}</Text>
                    <div className="col" style={{ gap: '1.6rem' }}>
                        {children.map(child => {
                            return <NavLink key={child.id} className="row button-grey" style={{ backgroundColor: 'transparent', padding: 0 }}>
                                <OutlineLock />
                                <Text className="label-4" maxLine={1} style={{ width: '100%', flex: 1 }}>{child.name}</Text>
                            </NavLink>
                        })}
                    </div>
                </div>
            })}
        </div>
        <div className="col divider"></div>
        <div className="col" style={{ gap: '3.2rem', paddingTop: '2rem' }}>
            <div className="heading-4">Đánh giá</div>
            <div className="row" style={{ gap: '4.4rem' }}>
                <div className="col" style={{ gap: '4rem' }}>
                    <div className="col">
                        <div className="row" style={{ gap: '1.2rem' }}>
                            <div className="heading-3">4.7</div>
                            <FilledStar width="3.2rem" height="3.2rem" color="#FC6B03" />
                        </div>
                        <div className="subtitle-2">Xếp hạng khoá học</div>
                    </div>
                    <div className="col">
                        <div className="heading-3">11k</div>
                        <div className="subtitle-2">Lượt xếp hạng</div>
                    </div>
                </div>
                <div className="col" style={{ flex: 1, gap: '1.4rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => {
                        return <ProgressBar key={'star-' + i} progressBarOnly style={{ width: '100%' }} />
                    })}
                </div>
                <div className="col" style={{ gap: '1.2rem', alignItems: 'stretch' }}>
                    {Array.from({ length: 5 }).map((_, i) => {
                        return <div key={'rate-' + i} className="row" style={{ gap: '0.8rem' }}>
                            <Rating value={i === 0 ? 1 : (((5 - i) % 5) / 5)} />
                            <div className="heading-7">(10.543)</div>
                        </div>
                    })}
                </div>
            </div>

        </div>
    </>
}