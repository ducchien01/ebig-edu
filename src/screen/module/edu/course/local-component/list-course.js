import { faEllipsisV, faEye, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Popup, Text, TextField, closePopup, showPopup } from "../../../../../component/export-component"
import { FilledCoins, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledPeople, FilledSetupPreferences, FilledTrashCan, OutlineStar } from "../../../../../assets/const/icon"
import { CourseController } from "../controller"
import { CourseStatus } from "../da"
import { NavLink, useNavigate } from "react-router-dom"
import { Ultis } from "../../../../../Utils"
import { CourseCard } from "../../../../../project-component/card"
import ConfigAPI from "../../../../../config/configApi"
import { useSelector } from "react-redux"
import { CenterPermisson } from "../../../center/da"
import PopupAddNewCourse from "./popup-add-new-course"

export default function ListCourse({ centerItem, permisson }) {
    const userInfor = useSelector((state) => state.account.data)
    const ref = useRef()
    const navigate = useNavigate()
    const [myCourses, setMyCourses] = useState([])
    const [courses, setCourses] = useState({ totalCount: undefined, data: [] })

    const getCourses = async (page) => {
        // let _filter = [{ field: 'centerId', operator: '=', value: centerItem.id }, { field: 'customerId', operator: '<>', value: userInfor.id }]
        let _filter = [{ field: 'customerId', operator: '<>', value: userInfor.id }]
        if (permisson === CenterPermisson.member) {
            _filter.push({
                field: 'status',
                operator: '<>',
                value: CourseStatus.draft
            })
        }
        const res = await CourseController.getListSimple({ page: page ?? Math.floor((courses.data.length / 10)) + 1, take: 10, filter: _filter })
        if (res) {
            setCourses({
                totalCount: res.totalCount,
                data: [...courses.data, ...res.data.filter(e => courses.data.every(el => el.id !== e.id))]
            })
        }
    }

    const getMyCourses = async () => {
        const res = await CourseController.getListSimple({ page: 1, take: 10, filter: [{ field: 'customerId', operator: '=', value: userInfor.id }] })
        // const res = await CourseController.getListSimple({ page: 1, take: 10, filter: [{ field: 'centerId', operator: '=', value: centerItem.id }, { field: 'customerId', operator: '=', value: userInfor.id }] })
        if (res) {
            setMyCourses(res.data)
        }
    }

    const showPopupListAction = (ev, item) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX + 4}px`, top: `${ev.pageY}px` },
            content: <div className="more-action-popup col">
                {permisson === CenterPermisson.owner || item.customerId === userInfor.id ? <button type="button" className="row"
                    onClick={() => {
                        navigate('/center/course/overview/' + item.id)
                    }}
                >
                    <FilledEdit />
                    <Text className="label-4">Chỉnh sửa</Text>
                </button> : undefined}
                <button className="row" >
                    <FilledFileCopy />
                    <Text className="label-4">Nhân bản</Text>
                </button>
                <button className="row" >
                    <FilledNetworkCommunication />
                    <Text className="label-4">Chia sẻ</Text>
                </button>
                {permisson === CenterPermisson.owner || item.customerId === userInfor.id ? <button type="button" className="row" onClick={() => {
                    CourseController.delete([item.id]).then((res) => {
                        if (res) {
                            if (item.customerId === userInfor.id) {
                                setMyCourses(myCourses.filter(e => e.id !== item.id))
                            } else {
                                setCourses({
                                    totalCount: courses.totalCount - 1,
                                    data: courses.data.filter(e => e.id !== item.id)
                                })
                            }
                        }
                    })
                    closePopup(ref)
                }}>
                    <FilledTrashCan color="#E14337" />
                    <Text className="label-4" style={{ color: '#E14337' }}>Xóa</Text>
                </button> : undefined}
            </div>
        })
    }

    const statusTag = (courseStatus) => {
        switch (courseStatus) {
            case CourseStatus.draft:
                return <div className="tag-disabled subtitle-3" style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 500 }}>Bản nháp</div>
            case CourseStatus.published:
                return <div className="tag-infor subtitle-3" style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 500 }}>Đã xuất bản</div>
            case CourseStatus.end:
                return <div className="tag-warning subtitle-3" style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 500 }}>Đã kết thúc</div>
            default:
                return <div className="tag-disabled subtitle-3" style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 500 }}>Bản nháp</div>
        }
    }

    const courseInfor = (item) => {
        return <CourseCard
            key={item.id}
            to={permisson === CenterPermisson.owner || item.customerId === userInfor.id ? `/center/course/overview/${item.id}` : `/education/course/${item.id}`}
            style={{ '--gutter': '2.4rem' }}
            className='col col12 col24-sm col24-min'
            imgUrl={ConfigAPI.imgUrl + item.thumbnailId}
            imgStyle={{ width: '14rem' }}
            title={item.name}
            subtitle={<div className="row" style={{ gap: '0.8rem', flexWrap: 'wrap' }}>
                {statusTag(item.status)}
                <Text className="subtitle-3">{Ultis.datetoString(new Date(item.dateCreated), 'dd/mm/yyyy hh:mm')}</Text>
            </div>}
            actions={<button type="button" className="row" onClick={(ev) => { showPopupListAction(ev, item) }} style={{ padding: '0.4rem 0.6rem' }}>
                <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99', pointerEvents: 'none' }} />
            </button>}
            bottom={<div className="row" style={{ borderTop: 'var(--border-grey1)', paddingTop: '1.6rem' }}>
                <div className="row" style={{ gap: '1.6rem', flex: 1 }}>
                    <div className="tag-disabled row" style={{ padding: 0, backgroundColor: 'transparent' }}>
                        <OutlineStar />
                        <Text className="button-text-3">{'0(0)'}</Text>
                    </div>
                    <div className="tag-disabled row" style={{ padding: 0, backgroundColor: 'transparent' }}>
                        <FilledPeople />
                        <Text className="button-text-3">{item.quantity ?? '-'} học viên</Text>
                    </div>
                </div>
                <NavLink to={`/education/course/${item.id}`} className="row" style={{ gap: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                    <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem trước</Text>
                </NavLink>
            </div>}
        />
    }

    const popupAddNewCourse = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới course</div>,
            content: <PopupAddNewCourse ref={ref} centerId={centerItem.id} customerId={userInfor.id} />,
        })
    }

    useEffect(() => {
        if (centerItem) {
            getCourses(1)
            if (permisson !== CenterPermisson.member) getMyCourses()
        }
    }, [centerItem])

    return <div className="col" style={{ alignItems: 'center' }}>
        <Popup ref={ref} />
        <div className='col' style={{ padding: '2.4rem', margin: '2.4rem 0', backgroundColor: '#fff', borderRadius: '0.8rem', width: 'calc(100% - 11.2rem)', minWidth: '56rem', gap: '0.8rem' }}>
            <div className="row" style={{ gap: '1.6rem' }}>
                <TextField
                    style={{ backgroundColor: 'var(--background)', height: '4rem', flex: 1, maxWidth: '40rem' }}
                    prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#667994', marginTop: '0.1rem' }} />}
                    placeholder="Tìm khóa học"
                />
                <button type="button" className="row" style={{ gap: '0.8rem' }}>
                    <FilledSetupPreferences width="2.4rem" height="2.4rem" />
                    <Text className="button-text-2" style={{ color: '#00204D99' }}>Bộ lọc</Text>
                </button>
            </div>
            {
                permisson !== CenterPermisson.member ? <div className="col" style={{ padding: '1.6rem 0', borderBottom: 'var(--border-grey1)' }}>
                    <div className="row" style={{ gap: '1.6rem' }}>
                        <Text className="heading-6" style={{ flex: 1 }}>Khóa học của bạn</Text>
                        <button type="button" className="row button-primary" style={{ gap: '0.8rem' }} onClick={popupAddNewCourse}>
                            <FontAwesomeIcon icon={faPlus} />
                            <Text className="button-text-3">Tạo mới</Text>
                        </button>
                    </div>
                    <div className="row" style={{ padding: '1.2rem 0', gap: '2.4rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
                        {myCourses.map((item, i) => courseInfor(item))}
                    </div>
                </div> : undefined
            }
            <div className="col" style={{ paddingTop: '1.6rem' }}>
                {permisson !== CenterPermisson.member ? <Text className="heading-6">Các khóa học khác</Text> : undefined}
                <div className="row" style={{ padding: '1.2rem 0', gap: '2.4rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
                    {courses.data.map((item, i) => courseInfor(item))}
                </div>
            </div>
        </div>
    </div>
}