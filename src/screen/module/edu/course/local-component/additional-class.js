import { useEffect, useRef, useState } from "react";
import ListClass from "../../class/local-component/list-class";
import { ClassController } from "../../class/controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Popup, Text, showPopup } from "../../../../../component/export-component";
import PopupListClass from "../../class/local-component/popup-list-class";

export default function AdditionalClass({ courseData }) {
    const ref = useRef()
    const [data, setData] = useState([])

    const showPopupClassList = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Danh sách lớp học của bạn</div>,
            content: <PopupListClass />
        })
    }

    useEffect(() => {
        if (courseData) {
            ClassController.getListSimpleAuth({ page: 1, take: 50, filter: [{ field: 'courseId', operator: '=', value: courseData.id }] }).then(res => {
                if (res) setData(res.data)
            })
        }
    }, [courseData])

    return <div className="col" style={{ width: '100%', flex: 1, height: '100%' }} >
        <Popup ref={ref} />
        <div className="row" style={{ padding: '2.4rem' }}>
            <Text maxLine={1} style={{ flex: 1, width: '100%' }} className="heading-5">Danh sách lớp học bán kèm</Text>
            <button type="button" className="button-primary row" onClick={showPopupClassList} style={{ backgroundColor: 'var(--primary-color)' }}>
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem' }} />
                <Text className="button-text-3" >Thêm lớp</Text>
            </button>
        </div>
        <ListClass data={data} />
    </div>
}