import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { InfiniteScroll, Popup, Text, closePopup, showPopup } from "../../../../../component/export-component"
import demoImage from '../../../../../assets/demo-image5.png'
import { FilledCoins, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledPeople, FilledTrashCan } from "../../../../../assets/const/icon"
import { CourseController } from "../controller"
import { CourseStatus } from "../da"
import { NavLink, useNavigate } from "react-router-dom"
import { Ultis } from "../../../../../Utils"
import { CourseCard } from "../../../../../project-component/card"

export default function ListCourse({ data, getData }) {
    const ref = useRef()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    const showPopupListAction = (ev, item) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX + 4}px`, top: `${ev.pageY}px` },
            content: <div className="more-action-popup col">
                <button type="button" className="row" onClick={() => {
                    navigate('details/overview/' + item.id)
                }}>
                    <FilledEdit />
                    <Text className="label-4">Chỉnh sửa</Text>
                </button>
                <button className="row" >
                    <FilledFileCopy />
                    <Text className="label-4">Nhân bản</Text>
                </button>
                <button className="row" >
                    <FilledNetworkCommunication />
                    <Text className="label-4">Chia sẻ</Text>
                </button>
                <button type="button" className="row" onClick={() => {
                    CourseController.delete([item.id]).then((res) => {
                        if (res) {
                            setList(list.filter(e => e.id !== res))
                        }
                    })
                    closePopup(ref)
                }}>
                    <FilledTrashCan color="#E14337" />
                    <Text className="label-4" style={{ color: '#E14337' }}>Xóa</Text>
                </button>
            </div>
        })
    }

    const statusTag = (courseStatus) => {
        switch (courseStatus) {
            case CourseStatus.draft:
                return <div className="row tag-disabled"><Text className="button-text-3">Bản nháp</Text></div>
            case CourseStatus.published:
                return <div className="row tag-infor"><Text className="button-text-3">Đã xuất bản</Text></div>
            case CourseStatus.end:
                return <div className="row tag-warning"><Text className="button-text-3">Đã kết thúc</Text></div>
            default:
                return <div className="row tag-disabled"><Text className="button-text-3">Bản nháp</Text></div>
        }
    }

    useEffect(() => {
        if (data) setList(data)
    }, [data])

    return <InfiniteScroll handleScroll={getData} className="row list-card-course-infor" >
        <Popup ref={ref} />
        {list.map((item, i) => {
            return <CourseCard
                key={`card-${i}`}
                to={'details/overview/' + item.id}
                style={{ '--gutter': '2.4rem' }}
                className='col col12'
                imgUrl={item.thumbnailUrl}
                imgStyle={{ width: '20rem' }}
                title={item.name}
                subtitle={Ultis.datetoString(new Date(item.dateCreated), 'dd/mm/yyyy hh:mm')}
                content={<div className="row" style={{ paddingTop: '2.4rem' }}>{statusTag(item.status)}</div>}
                actions={<button type="button" className="row" onClick={(ev) => { showPopupListAction(ev, item) }}>
                    <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99', pointerEvents: 'none' }} />
                </button>}
                bottom={<div className="row" style={{ borderTop: 'var(--border-grey1)', padding: '1.6rem' }}>
                    <div className="row" style={{ gap: '2.4rem', flex: 1 }}>
                        <div className="tag-disabled row" style={{ padding: 0, backgroundColor: 'transparent' }}>
                            <FilledPeople />
                            <Text className="button-text-3">{item.quantity ?? '-'} học viên</Text>
                        </div>
                        <div className="tag-disabled row" style={{ padding: 0, backgroundColor: 'transparent' }}>
                            <FilledCoins />
                            <Text className="button-text-3">Doanh thu -</Text>
                        </div>
                    </div>
                    <NavLink to={`/edu/school/course/preview/${item.id}`} className="row" style={{ gap: '0.8rem' }}>
                        <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                        <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem trước</Text>
                    </NavLink>
                </div>}
            />
        })}
    </InfiniteScroll>
}