import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './course.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import ListCourse from '../../center/local-component/education'
import PopupAddNewCourse from './local-component/popup-add-new-course'
import { CourseController } from './controller'
import { Popup, Text, showPopup } from '../../../../component/export-component'
import { useSelector } from 'react-redux'

export default function SchoolCourse() {
    const userInfor = useSelector((state) => state.account.data)
    const ref = useRef()
    const [activeFilterTab, setActiveFilterTab] = useState(null)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)

    const popupAddNewCourse = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới course</div>,
            content: <PopupAddNewCourse ref={ref} />,
        })
    }

    const getData = async (status) => {
        let filter = []
        if (status != null) {
            filter = [{ field: 'status', operator: '=', value: status }]
        }
        filter.push({ field: 'customerId', operator: '=', value: userInfor.id })
        const page = Math.floor((data.length / 20)) + 1
        const res = await CourseController.getListSimple({ page: page, take: 20, filter: filter })
        if (res) {
            if (total !== res.totalCount) setTotal(res.totalCount)
            if (status !== activeFilterTab) {
                setActiveFilterTab(status)
                setData(res.data)
            } else {
                setData([...data, ...res.data])
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <Popup ref={ref} />
        <div className='col' style={{ padding: '1.6rem 2.4rem' }}>
            <div className="row" style={{ paddingBottom: '1.6rem' }}>
                <div className="heading-5" style={{ flex: 1 }}>Danh sách Course</div>
                <button type="button" className="button-primary row" onClick={popupAddNewCourse}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem' }} />
                    <Text className="button-text-3">Tạo mới</Text>
                </button>
            </div>
            <div className="col tab-container">
                <div className="tab-header-2 row">
                    <div className={`tab-btn label-4 row ${activeFilterTab == null ? 'selected' : ''}`} onClick={() => { getData(null) }}>Tất cả</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => { getData(1) }}>Đã xuất bản</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => { getData(0) }}>Bản nháp</div>
                </div>
                <div className="tab-body-2 row">
                    <ListCourse data={data} getData={total !== data.length ? (onLoadMore) => {
                        if (onLoadMore) getData()
                    } : undefined} />
                </div>
            </div>
        </div>
    </>
}