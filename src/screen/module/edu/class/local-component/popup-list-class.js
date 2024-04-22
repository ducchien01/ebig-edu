import { forwardRef, useEffect, useState } from "react";
import { CellAlignItems, Checkbox, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField, closePopup } from "../../../../../component/export-component";
import { FilledSetupPreferences } from "../../../../../assets/const/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ClassController } from "../controller";
import { Ultis } from "../../../../../Utils";

const PopupListClass = forwardRef(function PopupListClass(data, ref) {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [classData, setClassData] = useState()
    const [selectedList, setSelectedList] = useState([])

    const getData = (page, size) => {
        ClassController.getListSimpleAuth({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ field: 'courseId', operator: '=', value: data.courseId }, 'or', { field: 'courseId', operator: '=', value: null }] }).then(res => {
            if (res) setClassData({
                ...res, data: res.data.map(e => {
                    if (e.content) {
                        try {
                            var schedule = JSON.parse(e.content)
                        } catch (error) {
                            console.log(error)
                        }
                        e.schedule = schedule
                    }
                    return e
                })
            })
        })
    }

    const onSubmit = () => {
        let listUpdate = [...data.selectedList.map(e => {
            delete e.schedule
            if (selectedList.some(item => item.id === e.id)) e.courseId = data.courseId
            else e.courseId = null
            return e
        })]
        listUpdate.push(...selectedList.filter(e => listUpdate.every(el => el.id !== e.id)).map(e => {
            delete e.schedule
            e.courseId = data.courseId
            return e
        }))
        debugger
        ClassController.edit(listUpdate).then(res => {
            if (res) data.onSubmit()
            closePopup(ref)
        })
    }

    useEffect(() => {
        getData()
        setSelectedList(data.selectedList ?? [])
    }, [data.selectedList])

    return <div className="col" style={{ flex: 1 }}>
        <div className="col" style={{ flex: 1, height: '100%', width: '100%' }}>
            <div className="row filter-header-container">
                <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm" prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />} />
                <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
                <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                    <FilledSetupPreferences />
                    <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
                </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
                <Table>
                    <TbHeader>
                        <TbCell fixed={true} style={{ minWidth: 60 }}>
                            <Checkbox size={'2rem'} value={selectedList.length && classData?.data?.every(el => selectedList.some(e => el.id === e.id))} onChange={(vl) => {
                                if (classData.data) {
                                    if (vl) {
                                        setSelectedList([...selectedList, ...classData.data.filter(e => selectedList.every(el => el.id !== e.id))])
                                    } else {
                                        setSelectedList(selectedList.filter(e => classData.data.every(el => e.id !== el.id)))
                                    }
                                }
                            }} />
                        </TbCell>
                        <TbCell style={{ minWidth: 240, }} >Tên lớp</TbCell>
                        <TbCell style={{ minWidth: 80, }} align={CellAlignItems.center}>Số buổi</TbCell>
                        <TbCell style={{ minWidth: 180, }} >Ngày khai giảng</TbCell>
                        <TbCell style={{ minWidth: 240, }} >Lịch học</TbCell>
                        <TbCell style={{ minWidth: 180, }} >Học phí</TbCell>
                    </TbHeader>
                    <TbBody>
                        {
                            (classData?.data ?? []).map((item, index) => <TbRow key={item.id}>
                                <TbCell fixed={true} style={{ minWidth: 60, verticalAlign: 'top', paddingTop: '0.8rem' }} >
                                    <Checkbox size={'2rem'} value={selectedList.some(e => e.id === item.id)} onChange={(vl) => {
                                        if (vl) {
                                            setSelectedList([...selectedList, item])
                                        } else {
                                            setSelectedList(selectedList.filter(e => e.id !== item.id))
                                        }
                                    }} />
                                </TbCell>
                                <TbCell style={{ minWidth: 240, verticalAlign: 'top', paddingTop: '0.8rem' }} >
                                    <Text style={{ width: '100%' }} maxLine={2}>{item.name}</Text>
                                </TbCell>
                                <TbCell style={{ minWidth: 80, verticalAlign: 'top', paddingTop: '0.8rem' }} align={CellAlignItems.center}>{item.quantity}</TbCell>
                                <TbCell style={{ minWidth: 180, verticalAlign: 'top', paddingTop: '0.8rem' }} >{Ultis.datetoString(new Date(item.startDate))}</TbCell>
                                <TbCell style={{ minWidth: 180, verticalAlign: 'top' }} >
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
                                            return <li key={e.time} >
                                                {`${dayWeekTitle} ${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}-${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}`}
                                            </li>
                                        })}
                                    </ul>
                                </TbCell>
                                <TbCell style={{ minWidth: 160, verticalAlign: 'top', paddingTop: '0.8rem' }} >{Ultis.money(item.price)}đ</TbCell>
                            </TbRow>
                            )
                        }
                    </TbBody>
                </Table>
            </div>
            <div className="row" style={{ padding: '0 1.6rem' }}>
                <Pagination
                    /// Size
                    currentPage={pageDetails.page}
                    /// pageSize
                    itemPerPage={pageDetails.size}
                    // data.total
                    totalItem={classData?.totalCount}
                    /// action
                    onChangePage={(page, size) => {
                        if (pageDetails.page !== page || pageDetails.size !== size) {
                            setPageDetails({ page: page, size: size });
                        }
                    }}
                />
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <button className="button-text-3" style={{ color: '#00204D99' }} onClick={() => { closePopup(ref) }}>Hủy</button>
            <button type="submit" onClick={onSubmit} className={`row button-primary`}>
                <div className="button-text-3">Xác nhận</div>
            </button>
        </div>
    </div>
})

export default PopupListClass