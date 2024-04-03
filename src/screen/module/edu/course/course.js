import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './course.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import ListCourse from './local-component/list-course'
import PopupAddNewCourse from './local-component/popup-add-new-course'
import { CourseController } from './controller'
import { Popup, Text, showPopup } from '../../../../component/export-component'

export default function SchoolCourse() {
    const ref = useRef()
    const [activeFilterTab, setActiveFilterTab] = useState(0)
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
        status ??= activeFilterTab
        if (status > 0) {
            var filter = [{ key: 'status', value: status }]
        }
        const res = await CourseController.getListSimple({ page: Math.floor((data.length / 20)) + 1, take: 20, filter: filter })
        if (res) {
            if (total !== res.totalCount) setTotal(res.totalCount)
            setData([...data, ...res.data])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col school-course view-container'>
        <Popup ref={ref} />
        <div className='col'>
            <div className="view-header row" style={{ border: 'none' }}>
                <div className="heading-4">Danh sách Course</div>
                <button type="button" className="suffix-btn row" onClick={popupAddNewCourse} style={{ backgroundColor: 'var(--primary-color)' }}>
                    <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                    <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
                </button>
            </div>
            <div className="col tab-container">
                <div className="tab-header-2 row">
                    <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => {
                        setActiveFilterTab(0)
                        getData(0)
                    }}>Tất cả ({total < 10 ? `0${total}` : total})</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => {
                        setActiveFilterTab(1)
                        getData(1)
                    }}>Đã xuất bản</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => {
                        setActiveFilterTab(2)
                        getData(2)
                    }}>Bản nháp</div>
                </div>
                <div className="tab-body-2 row">
                    <ListCourse data={data} getData={total !== data.length ? getData : undefined} />
                </div>
            </div>
        </div>
    </div>
}