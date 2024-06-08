import { useEffect, useRef, useState } from "react";
import ListClass from "../../class/local-component/list-class";
import { ClassController } from "../../class/controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ComponentStatus, Dialog, DialogAlignment, Popup, Text, TextField, ToastMessage, showDialog, showPopup } from "../../../../../component/export-component";
import PopupListClass from "../../class/local-component/popup-list-class";
import { FilledSetupPreferences } from "../../../../../assets/const/icon";
import PopupSettingsClass from "../../class/local-component/popup-settings-details";
import { CustomerController } from "../../../customer/controller";

export default function AdditionalClass({ courseData }) {
    const ref = useRef()
    const dialogRef = useRef()
    const [data, setData] = useState([])

    const popupAddEditNewClass = (classItem) => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo lớp</div>,
            style: { width: '152rem' },
            content: <PopupSettingsClass ref={ref} centerId={courseData.centerId} courseId={courseData.id} classItem={classItem} onChange={getData} />
        })
    }

    const getData = () => {
        if (courseData) {
            ClassController.getListSimpleAuth({ page: 1, take: 100, filter: [{ field: 'courseId', operator: '=', value: courseData.id }] }).then(res => {
                if (res) {
                    // setData(res.data)
                    setData(res.data.map(e => {
                        return {
                            ...e, customerId: e.customerId ?? courseData.customerId
                        }
                    }))
                }
            })
        }
    }

    useEffect(() => {
        getData()
    }, [courseData])

    return <div className="col" style={{ width: '100%', flex: 1, height: '100%', overflow: 'hidden auto' }} >
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="col" style={{ padding: '2.4rem', paddingRight: 0, gap: '1.6rem' }}>
            <div className="row" style={{ gap: '1.6rem' }}>
                <Text maxLine={1} style={{ flex: 1, width: '100%' }} className="heading-5">Danh sách lớp</Text>
                <button type="button" className="button-primary row" onClick={() => { popupAddEditNewClass() }} style={{ backgroundColor: 'var(--primary-color)' }}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem' }} />
                    <Text className="button-text-3" >Thêm lớp</Text>
                </button>
            </div>
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
        </div>
        <div style={{ padding: '0 2.4rem' }}>
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
            /></div>
    </div>
}