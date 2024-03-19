import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Popup, Text, closePopup, showPopup } from "../../../../component/export-component"
import demoImage from '../../../../assets/demo-image5.png'
import { FilledCoins, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledPeople, FilledTrashCan } from "../../../../assets/const/icon"
import { CourseController } from "../controller"
import { Ultis } from "../../../../Utils"
import { CourseStatus } from "../da"
import { useNavigate } from "react-router-dom"

export default function ListCourse({ status }) {
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
                return <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text>
            case CourseStatus.published:
                return <Text className="row button-text-3" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Đã xuất bản</Text>
            case CourseStatus.end:
                return <Text className="row button-text-3" style={{ backgroundColor: '#FFF3EB', color: '#FC6B03' }}>Đã kết thúc</Text>
            default:
                return <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text>
        }
    }

    useEffect(() => {
        CourseController.getListSimple({ take: 10, page: 1 }).then(res => {
            if (res) setList(res)
        })
    }, [status])

    return <div className="row list-card-course-infor">
        <Popup ref={ref} />
        {list.map((item, i) => <div key={`card-${i}`} className='card-course-infor col col12'>
            <div className="row top">
                <div className="demo-img" style={{ backgroundImage: `url(${demoImage})` }}></div>
                <div className="row">
                    <div className="col" style={{ rowGap: '2.4rem', flex: 1, width: '100%' }}>
                        <div className="col" style={{ rowGap: '0.4rem' }}>
                            <Text className="heading-7">{item.name}</Text>
                            <Text className="subtitle-4">{Ultis.datetoString(new Date(item.dateCreated), 'dd/mm/yyyy hh:mm')}</Text>
                        </div>
                        {statusTag(item.status)}
                    </div>
                    <button type="button" className="row" onClick={(ev) => { showPopupListAction(ev, item) }}><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99', pointerEvents: 'none' }} /></button>
                </div>
            </div>
            <div className="row bottom">
                <div className="row" style={{ gap: '2.4rem' }}>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <FilledPeople />
                        <Text className="button-text-3" style={{ color: '#00204D99' }} >32 học viên</Text>
                    </div>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <FilledCoins />
                        <Text className="button-text-3" style={{ color: '#00204D99' }} >Doanh thu 2.000.000</Text>
                    </div>
                </div>
                <button type="button" className="row" style={{ gap: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                    <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem trước</Text>
                </button>
            </div>
        </div>)}
    </div>
}