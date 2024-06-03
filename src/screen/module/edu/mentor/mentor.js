import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './mentor.css'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CellAlignItems, ComponentStatus, Dialog, DialogAlignment, Pagination, Popup, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField, ToastMessage, showDialog, showPopup } from '../../../../component/export-component'
import { FilledEdit, FilledSetupPreferences, FilledTrashCan } from '../../../../assets/const/icon'
import { useEffect, useRef, useState } from 'react'
import { MentorController } from './controller'
import { Ultis } from '../../../../Utils'
import PopupSettingsMentor from './local-component/popup-settings-details'
import { useSelector } from 'react-redux'

export default function SchoolMentor() {
    const userInfor = useSelector((state) => state.account.data)
    const ref = useRef()
    const dialogRef = useRef()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 })
    const [data, setData] = useState()

    const getData = (page, size) => {
        MentorController.getListSimpleAuth({
            page: page ?? pageDetails.page,
            take: size ?? pageDetails.size,
            filter: [{ field: 'customerId', operator: '=', value: userInfor.id }]
        }).then(res => {
            if (res) setData(res)
        })
    }

    const showPopupAddEditMentor = (item) => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>{item ? 'Chỉnh sửa' : 'Tạo mới'} lịch mentor</div>,
            style: { width: '152rem' },
            content: <PopupSettingsMentor ref={ref} mentorItem={item} onChange={getData} />
        })
    }

    const confirmDelete = (item) => {
        showDialog({
            ref: dialogRef,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn xóa buổi mentor này',
            onSubmit: () => {
                MentorController.deleteAuth([item.id]).then(res => {
                    if (res) {
                        getData()
                        ToastMessage.success('Xóa buổi mentor thành công')
                    }
                })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col view-container' style={{ width: '100%', height: '100%', flex: 1, gap: '0.8rem', padding: '0.4rem 3.2rem 0 3.2rem' }}>
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="row view-header" style={{ justifyContent: 'space-between' }}>
            <div className="heading-4">Danh sách bài thi</div>
            <button type="button" className="button-primary row" onClick={() => { showPopupAddEditMentor() }} style={{ backgroundColor: 'var(--primary-color)' }}>
                <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
            </button>
        </div>
        <div className="row filter-header-container">
            <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />} />
            <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
            <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                <FilledSetupPreferences />
                <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
            </button>
        </div>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'auto' }}>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: 200 }}>Tiêu đề buổi mentor</TbCell>
                    <TbCell style={{ minWidth: 200, }} >Lịch hẹn</TbCell>
                    <TbCell style={{ minWidth: 80, }} >Giá tiền</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 80 }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        (data?.data ?? []).map(function (item, index) {
                            let startTime = new Date(item.startDate)
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
                            let endTime = new Date(item.endDate)
                            return <TbRow key={item.id}>
                                <TbCell fixed={true} style={{ minWidth: 200, }}>{item.name}</TbCell>
                                <TbCell style={{ minWidth: 200, }}>
                                    <Text style={{ width: '100%' }} maxLine={2} >
                                        {`${dayWeekTitle} ${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}-${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}`}
                                    </Text>
                                </TbCell>
                                <TbCell style={{ minWidth: 80, }}>{item.price ? Ultis.money(item.price) : '-'}</TbCell>
                                <TbCell fixed={true} style={{ minWidth: 80, }} align={CellAlignItems.center}>
                                    <div className="row" style={{ gap: '0.8rem', justifyContent: 'center' }}>
                                        <button type="button" className="row" onClick={() => { showPopupAddEditMentor(item) }} style={{ padding: '0.6rem' }}>
                                            <FilledEdit width='2rem' height='2rem' />
                                        </button>
                                        <button type="button" className="row" onClick={() => { confirmDelete(item) }} style={{ padding: '0.6rem' }}>
                                            <FilledTrashCan width='2rem' height='2rem' />
                                        </button>
                                    </div>
                                </TbCell>
                            </TbRow>
                        }
                        )
                    }
                </TbBody>
            </Table>
        </div>
        <div className="row">
            <Pagination
                /// Size
                currentPage={pageDetails.page}
                /// pageSize
                itemPerPage={pageDetails.size}
                // data.total
                totalItem={data?.totalCount}
                /// action
                onChangePage={(page, size) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ page: page, size: size })
                        getData(page, size)
                    }
                }}
            />
        </div>
    </div>
}