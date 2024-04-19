import { useEffect, useRef, useState } from "react"
import { ComponentStatus, Dialog, DialogAlignment, Text, ToastMessage, showDialog } from "../../../../../component/export-component"
import { FilledEdit, FilledTrashCan } from "../../../../../assets/const/icon"
import { Ultis } from "../../../../../Utils"
import { ClassController } from "../controller"

export default function ListClass({ data = [], onEdit, onDelete }) {
    const [list, setList] = useState([])
    const ref = useRef()

    const submitDelete = (item) => {
        showDialog({
            ref: ref,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn xóa lớp học này',
            onSubmit: () => [
                ClassController.delete([item.id]).then(res => {
                    if (res) onDelete(item)
                    ToastMessage.success('Xóa lớp học thành công')
                })
            ]
        })
    }

    useEffect(() => {
        setList(data.map(e => {
            if (e.content) {
                try {
                    var schedule = JSON.parse(e.content)
                } catch (error) {
                    console.log(error)
                }
                e.schedule = schedule
            }
            return e
        }))
    }, [data])

    return <div className="row" style={{ gap: '2.4rem', flexWrap: 'wrap' }}>
        <Dialog ref={ref} />
        {list.map((item) => {
            return <div key={item.id} className="col class-infor-container col8 col12-lg col12-md col12-sm" >
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className="heading-7" style={{ flex: 1, width: '100%' }} maxLine={2}>{item.name}</Text>
                    <button className="row icon-button16" onClick={() => { onEdit(item) }}><FilledEdit /></button>
                    <button className="row icon-button16" onClick={() => { submitDelete(item) }} ><FilledTrashCan /></button>
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
                            <ul>
                                {(item.schedule ?? []).map(e => {
                                    let startTime = new Date(e.time)
                                    switch (startTime.getDay()) {
                                        case 0:
                                            var dayWeekTitle = 'Chủ nhật'
                                            break;
                                        case 1:
                                            dayWeekTitle = 'Thứ 2'
                                            break;
                                        case 2:
                                            dayWeekTitle = 'Thứ 3'
                                            break;
                                        case 3:
                                            dayWeekTitle = 'Thứ 4'
                                            break;
                                        case 4:
                                            dayWeekTitle = 'Thứ 5'
                                            break;
                                        case 5:
                                            dayWeekTitle = 'Thứ 6'
                                            break;
                                        case 6:
                                            dayWeekTitle = 'Thứ 7'
                                            break;
                                        default:
                                            break;
                                    }
                                    let endTime = new Date(e.time)
                                    endTime.setMinutes(endTime.getMinutes() + e.duration)
                                    return <li key={e.time} className="heading-8" >
                                        {`${dayWeekTitle} ${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}-${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}`}
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div >
}