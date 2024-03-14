import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './course.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import ListCourse from './local-component/list-course'
import { Popup, Text, showPopup } from '../../../component/export-component'
import PopupAddNewCourse from './local-component/popup-add-new-course'

export default function SchoolCourse() {
    const ref = useRef()
    const [activeFilterTab, setActiveFilterTab] = useState(0)

    const popupAddNewCourse = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới course</div>,
            content: <PopupAddNewCourse ref={ref} />,
        })
    }

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
                    <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(0)}>Tất cả (06)</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(1)}>Đã xuất bản (02)</div>
                    <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(2)}>Bản nháp (04)</div>
                </div>
                <div className="tab-body-2 row">
                    <ListCourse status={activeFilterTab}/>
                </div>
            </div>
        </div>
    </div>
}