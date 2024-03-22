import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './curriculum.css'
import { faCloudArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import ListCurriculum from './local-component/list-curriculum'
import { Popup, Text, showPopup } from '../../../../component/export-component'
import { useRef } from 'react'
import PopupAddNewCurriculumn from './local-component/popup-add-new-curriculum'

export default function SchoolCurriculum() {
    const ref = useRef()

    const PopupAddNewCurriculum = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới giáo trình</div>,
            content: <PopupAddNewCurriculumn ref={ref} />
        })
    }

    return <div className='col school-curriculum view-container'>
        <Popup ref={ref} />
        <div className='col'>
            <div className="view-header row" style={{ border: 'none' }}>
                <div className="heading-4">Tải lên</div>
                <div className='row' style={{ gap: 8 }}>
                    <button type="button" className="suffix-btn row" onClick={() => { }} style={{ backgroundColor: 'var(--background)' }}>
                        <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: '#00204D99', fontSize: '1.6rem' }} />
                        <Text className="button-text-3" style={{ color: '#00204D99' }}>Tải lên</Text>
                    </button>
                    <button type="button" className="suffix-btn row" onClick={PopupAddNewCurriculum} style={{ backgroundColor: 'var(--primary-color)' }}>
                        <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                        <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
                    </button>
                </div>
            </div>
            <ListCurriculum data={Array.from({ length: 6 })} />
        </div>
    </div>
}