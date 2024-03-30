import { useRef, useState } from "react"
import { FilledBell, FilledEdit, FilledSocialSharing, FilledTrashCan } from "../../../../../assets/const/icon"
import { Pagination, Popup, Table, TbBody, TbCell, TbHeader, TbRow, Text, showPopup } from "../../../../../component/export-component"
import { useNavigate } from "react-router-dom"

export default function NoteList() {
    const ref = useRef()
    const list = [
        {
            title: 'Toán cao cấp đại học',
            content: 'Buổi 15: Lý thuyết đại cương phần tổng quan',
            link: '',
            note: '',
            time: new Date().getTime(),
        },
        {
            title: 'Coach 1:1 Nguyễn Minh Nguyệt',
            content: 'Buổi 1: Giới thiệu',
            link: '',
            note: 'Chấm bài bạn Nguyệt',
            time: 1706689800000
        },
        {
            title: 'Toán cao cấp đại học',
            content: 'Buổi 16: Kiểm tra học phần',
            link: '',
            note: 'Chuẩn bị dụng cụ dạy học',
            time: 1706702400000
        },
    ]

    const showAllNote = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Danh sách lời nhắc nhở</div>,
            content: <PopupFullNoteList />
        })
    }

    return <div className='block-view col'>
        <Popup ref={ref} />
        <div className='block-title row'>
            <div className="heading-7">Sắp diễn ra</div>
            <button type="button" className='button-text-3' onClick={showAllNote}>Xem tất cả nhắc nhở</button>
        </div>
        <div className='row list-card'>
            {
                list.sort((a, b) => {
                    const now = new Date().getTime()
                    return Math.abs(a.time - now) - Math.abs(b.time - now)
                }).map((e, i) => {
                    const eTime = new Date(e.time)
                    return <div key={`card-${i}`} className={`card-note row ${i === 0 ? 'col12' : 'col6'} col24-lg col24-md col24-sm col24-min`} >
                        <div className='row note-content' style={{ columnGap: 40 }}>
                            {i === 0 ? <div className='col' style={{ rowGap: 4 }}>
                                <div className='heading-4'>{`${eTime.getHours() > 9 ? eTime.getHours() : `0${eTime.getHours()}`}:${eTime.getMinutes() > 9 ? eTime.getMinutes() : `0${eTime.getMinutes()}`}`}</div>
                                <div className='subtitle-3'>{`${eTime.getDate()} tháng ${eTime.getMonth() + 1}`}</div>
                            </div> : null}
                            <div className='col note-content'>
                                <div className='heading-7'>{e.title}</div>
                                <div className='subtitle-4'>{e.content}</div>
                                {i === 0 ? null : <div className='body-3' style={{ marginTop: 4 }}>{e.note}</div>}
                            </div>
                        </div>
                        {i === 0 ? <button type="button" className='button-primary row'>
                            <FilledSocialSharing color='white' />
                            <div className='button-text-3'>Vào dạy</div>
                        </button> : <div className='noti row'>
                            <FilledBell color='#366AE2' />
                        </div>}
                    </div>;
                })
            }

        </div>
    </div>
}

function PopupFullNoteList() {
    const navigate = useNavigate()
    const confirmDelete = (item) => { }
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });

    return <div className="col" style={{ maxHeight: "100%", flex: 1 }}>
        <div className="popup-body" style={{ width: '100%', height: '100%', flex: 1, overflow: 'auto' }}>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: 360 }}>Lời nhắc</TbCell>
                    <TbCell style={{ minWidth: 150, }} >Khóa học</TbCell>
                    <TbCell style={{ minWidth: 240, }} >Bài học</TbCell>
                    <TbCell style={{ minWidth: 240, }} >Thời gian nhắc nhở</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 110, }} >Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        Array.from({ length: 10 }).map((_, index) => <TbRow key={index}>
                            <TbCell fixed={true} style={{ minWidth: 360, }} ><Text style={{ width: '100%' }}>The Complete 2023 Web Development Bootcamp</Text></TbCell>
                            <TbCell style={{ minWidth: 150, }} ><Text style={{ width: '100%' }}>The Complete 2023 Web Development Bootcamp</Text></TbCell>
                            <TbCell style={{ minWidth: 240, }} ><Text style={{ width: '100%' }}>The Complete 2023 Web Development Bootcamp</Text></TbCell>
                            <TbCell style={{ minWidth: 240, }} >15 tháng 10 2023 , 15:00</TbCell>
                            <TbCell fixed={true} style={{ minWidth: 110, }}>
                                <div className="row" style={{ gap: 8 }}>
                                    <button type="button" className="row" onClick={() => { navigate('') }} style={{ padding: '0.6rem' }}>
                                        <FilledEdit width='2rem' height='2rem' />
                                    </button>
                                    <button type="button" className="row" onClick={() => { confirmDelete() }} style={{ padding: '0.6rem' }}>
                                        <FilledTrashCan width='2rem' height='2rem' />
                                    </button>
                                </div>
                            </TbCell>
                        </TbRow>
                        )
                    }
                </TbBody>
            </Table>
        </div>
        <div className="popup-footer row">
            <Pagination
                /// Size
                currentPage={pageDetails.page}
                /// pageSize
                itemPerPage={pageDetails.size}
                // data.total
                totalItem={10}
                /// action
                onChangePage={(page, size) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ page: page, size: size });
                    }
                }}
            />
        </div>
    </div>
}