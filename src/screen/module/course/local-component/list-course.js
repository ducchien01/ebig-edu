import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Popup, Text, showPopup } from "../../../../component/export-component"
import demoImage from '../../../../assets/demo-image5.png'
import { FilledCoins, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledPeople, FilledTrashCan } from "../../../../assets/const/icon"
import { CourseController } from "../controller"

export default function ListCourse({ data = [] }) {
    const [list, setList] = useState([])
    const ref = useRef()

    const showPopupListAction = (ev) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX + 4}px`, top: `${ev.pageY}px` },
            content: <div className="more-action-popup col">
                <button className="row" >
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
                <button className="row" >
                    <FilledTrashCan color="#E14337" />
                    <Text className="label-4" style={{ color: '#E14337' }}>Xóa</Text>
                </button>
            </div>
        })
    }

    useEffect(() => {
        CourseController.getAll().then(res => {
            if (res) setList(res)
        })
    }, [])

    return <div className="row list-card-course-infor">
        <Popup ref={ref} />
        {list.map((e, i) => <div key={`card-${i}`} className='card-course-infor col col12'>
            <div className="row top">
                <div className="demo-img" style={{ backgroundImage: `url(${demoImage})` }}></div>
                <div className="row">
                    <div className="col" style={{ rowGap: '2.4rem', flex: 1, width: '100%' }}>
                        <div className="col" style={{ rowGap: 4 }}>
                            <Text className="heading-7">{e.name}</Text>
                            <Text className="subtitle-4">23/10/2023 13:10</Text>
                        </div>
                        {/* <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text> */}
                        <Text className="row button-text-3" style={{ backgroundColor: '#FFF3EB', color: '#FC6B03' }}>Đã kết thúc</Text>
                        {/* <Text className="row button-text-3" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Đã xuất bản</Text> */}
                    </div>
                    <button type="button" className="row" onClick={showPopupListAction}><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99', pointerEvents: 'none' }} /></button>
                </div>
            </div>
            <div className="row bottom">
                <div className="row" style={{ columnGap: '2.4rem' }}>
                    <div className="row" style={{ columnGap: '0.8rem' }}>
                        <FilledPeople />
                        <Text className="button-text-3" style={{ color: '#00204D99' }} >32 học viên</Text>
                    </div>
                    <div className="row" style={{ columnGap: '0.8rem' }}>
                        <FilledCoins />
                        <Text className="button-text-3" style={{ color: '#00204D99' }} >Doanh thu 2.000.000</Text>
                    </div>
                </div>
                <div className="row" style={{ columnGap: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                    <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem trước</Text>
                </div>
            </div>
        </div>)}
    </div>
}