import { faCloudArrowDown, faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Popup, Text, TextField, showPopup } from "../../../../component/export-component"
import demoImage from '../../../../assets/demo-image5.png'
import { FilledBook, FilledClock, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledSetupPreferences, FilledTrashCan } from "../../../../assets/const/icon"

export default function ListCurriculum({ data = [] }) {
    const [list, setList] = useState([])
    const ref = useRef()

    const showPopupListAction = (ev) => {
        const offset = ev.target.getBoundingClientRect()
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${offset.x + offset.width + 4}px`, top: `${offset.y}px` },
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
        setList(data)
    }, [data])

    return <div className="col" style={{ rowGap: '2.4rem' }}>
        <Popup ref={ref} />
        <div className="row filter-header-container">
            <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.6rem', color: '#00204D99' }} />} />
            <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
            <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                <FilledSetupPreferences />
                <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
            </button>
        </div>
        <div className="row list-card-curriculum-infor">
            {list.map((e, i) => <div key={`card-${i}`} className='card-curriculum-infor col col12'>
                <div className="row top">
                    <div className="demo-img" style={{ backgroundImage: `url(${demoImage})` }}></div>
                    <div className="row">
                        <div className="col" style={{ rowGap: '2.4rem', flex: 1, width: '100%' }}>
                            <div className="col" style={{ rowGap: 4 }}>
                                <Text className="heading-7">Giáo trình của khóa UI/UX cho người mới bắt đầu</Text>
                                <Text className="subtitle-4">Art & Design, Science fiction</Text>
                            </div>
                            {/* <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text> */}
                            {/* <Text className="row button-text-3" style={{ backgroundColor: '#FFF3EB', color: '#FC6B03' }}>Đã kết thúc</Text> */}
                            <Text className="row button-text-3" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Beginner</Text>
                        </div>
                        <button type="button" className="row" onClick={showPopupListAction}><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99', pointerEvents: 'none' }} /></button>
                    </div>
                </div>
                <div className="row bottom">
                    <div className="row" style={{ columnGap: '2.4rem' }}>
                        <div className="row" style={{ columnGap: '0.8rem' }}>
                            <FilledBook />
                            <Text className="button-text-3" style={{ color: '#00204D99' }} >32 bài học</Text>
                        </div>
                        <div className="row" style={{ columnGap: '0.8rem' }}>
                            <FilledClock />
                            <Text className="button-text-3" style={{ color: '#00204D99' }} >180h 20m 15s</Text>
                        </div>
                    </div>
                    <div className="row" style={{ columnGap: '0.8rem' }}>
                        <FontAwesomeIcon icon={faCloudArrowDown} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                        <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Download</Text>
                    </div>
                </div>
            </div>)}
        </div>
    </div >
}