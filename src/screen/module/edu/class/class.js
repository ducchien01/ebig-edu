import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './class.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import ListClass from './local-component/list-class'
import { Popup, Text, ToastMessage, showPopup } from '../../../../component/export-component'
import { ClassController } from './controller'
import PopupSettingsClass from './local-component/popup-settings-details'

export default function SchoolClass() {
    const ref = useRef()
    const [data, setData] = useState([])

    const popupAddEditNewClass = (classItem) => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới class</div>,
            style: { width: '148rem' },
            content: <PopupSettingsClass ref={ref} classItem={classItem} onChange={getData} />
        })
    }

    const getData = () => {
        ClassController.getListSimpleAuth({ page: 1, take: 100, }).then(res => {
            if (res) setData(res.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col view-container' style={{ flex: 1, height: '100%', width: '100%', padding: '2.4rem 3.2rem', overflow: 'hidden auto' }}>
        <Popup ref={ref} />
        <div className='col'>
            <div className="view-header row" style={{ border: 'none' }}>
                <div className="heading-4">Danh sách Class</div>
                <button type="button" className="button-primary row" onClick={() => { popupAddEditNewClass() }} style={{ backgroundColor: 'var(--primary-color)' }}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem' }} />
                    <Text className="button-text-3" >Tạo mới</Text>
                </button>
            </div>
            <ListClass
                data={data}
                onEdit={popupAddEditNewClass}
                onDelete={(item) => {
                    ClassController.delete([item.id]).then(res => {
                        if (res) {
                            setData(data.filter(e => e.id !== item.id))
                            ToastMessage.success('Xóa lớp học thành công')
                        }
                    })
                }}
            />
        </div>
    </div>
}