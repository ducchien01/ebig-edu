import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Popup, Text, showPopup } from "../../../../../component/export-component"
import demoImage from '../../../../../assets/demo-image5.png'
import { FilledCoins, FilledEdit, FilledFileCopy, FilledNetworkCommunication, FilledPeople, FilledTrashCan } from "../../../../../assets/const/icon"
import { Ultis } from "../../../../../Utils"

export default function ListClass({ data = [], onEdit }) {
    const [list, setList] = useState([])
    const ref = useRef()

    useEffect(() => {
        setList(data)
    }, [data])

    return <div className="row" style={{ gap: '2.4rem', flexWrap: 'wrap' }}>
        <Popup ref={ref} />
        {list.map((item) => {
            return <div key={item.id} className="col class-infor-container col8 col12-lg col12-md col12-sm" >
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className="heading-7" style={{ flex: 1, width: '100%' }} maxLine={2}>{item.name}</Text>
                    <button className="row icon-button16" onClick={() => { onEdit(item) }}><FilledEdit /></button>
                    <button className="row icon-button16"><FilledTrashCan /></button>
                </div>
                <div className="row" style={{ alignItems: 'start', gap: '2.4rem' }}>
                    <div className="col" style={{ flex: 1, gap: '1.6rem' }}>
                        <div className="col">
                            <Text className="label-5">Khai giảng</Text>
                            <Text className="heading-8" maxLine={1} style={{ width: '100%' }}>{item.startDate ? Ultis.datetoString(new Date(item.startDate)) : "-"}</Text>
                        </div>
                        <div className="col">
                            <Text className="label-5">Số lượng</Text>
                            <Text className="heading-8" maxLine={1} style={{ width: '100%' }}>{item.quantity}</Text>
                        </div>
                    </div>
                    <div className="col" style={{ flex: 2, gap: '1.6rem' }}>
                        <div className="col">
                            <Text className="label-5">Học phí</Text>
                            <Text className="heading-8" maxLine={1} style={{ width: '100%' }}>{item.price ? Ultis.money(item.price) : "-"}đ</Text>
                        </div>
                        <div className="col">
                            <Text className="label-5">Lịch học</Text>
                            <Text className="heading-8" maxLine={1} style={{ width: '100%' }}>{item.content}</Text>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div >
}