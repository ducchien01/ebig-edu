import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { CellAlignItems, ComponentStatus, Dialog, DialogAlignment, Pagination, Popup, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField, showDialog, showPopup } from "../../../../component/export-component";
import { FilledEdit, FilledSetupPreferences, FilledTrashCan } from "../../../../assets/const/icon";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import PopupAddNewExam from "./local-component/popup-add-new-exam";
import { ExamController } from "./controller";
import { TopicController } from "../../topic/controller";
import { ExamStatus } from "./da";
import './exam.css'
import { CenterPermisson } from "../../center/da";

export default function ExamManagment({ centerId, permisson }) {
    const ref = useRef()
    const dialogRef = useRef()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [data, setData] = useState()
    const [listTopic, setListTopic] = useState([])

    const popupAddNewExam = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới bài thi</div>,
            content: <PopupAddNewExam ref={ref} />,
        })
    }

    const getData = async (page, size) => {
        const res = await ExamController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ field: 'centerId', operator: '=', value: centerId }] })
        if (res) {
            const topicIds = (res.data ?? []).map(e => e.topicId).filter(id => id != null && listTopic.every(e => e.id !== id))
            if (topicIds.length) {
                TopicController.getByIds(topicIds).then(topicRes => {
                    if (topicRes) setListTopic(topicRes)
                })
            }
            setData(res)
        }
    }

    const confirmDelete = (item) => {
        showDialog({
            ref: dialogRef,
            status: ComponentStatus.WARNING,
            alignment: DialogAlignment.center,
            title: 'Bạn chắc chắn muốn xóa bài thi này',
            content: 'Bài thi này sẽ bị xóa khỏi thư viện bài thi của bạn vĩnh viễn',
            onSubmit: () => {
                ExamController.delete([item.id]).then(res => {
                    if (res) getData()
                })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col' style={{ width: '100%', height: '100%', flex: 1, gap: '1.6rem', padding: '1.2rem 2.4rem' }}>
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="row filter-header-container">
            <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />} />
            <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
            <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                <FilledSetupPreferences />
                <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
            </button>
            <div style={{ flex: 1 }} />
            {permisson === CenterPermisson.owner || permisson === CenterPermisson.admin ? <button type="button" className="button-primary row" onClick={popupAddNewExam} style={{ backgroundColor: 'var(--primary-color)' }}>
                <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
            </button> : undefined}
        </div>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'auto' }}>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: '20rem' }}>Tên</TbCell>
                    <TbCell style={{ minWidth: '15rem', }} >Mã đề</TbCell>
                    <TbCell style={{ minWidth: '16rem', }} >Chủ đề</TbCell>
                    <TbCell style={{ minWidth: '12rem', }} align={CellAlignItems.center}>Thời gian thi (Phút)</TbCell>
                    <TbCell style={{ minWidth: '10rem', }} align={CellAlignItems.center}>Trạng thái</TbCell>
                    <TbCell fixed={true} style={{ minWidth: '8rem', }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        (data?.data ?? []).map((item) => <TbRow key={item.id} >
                            <TbCell fixed={true} style={{ minWidth: '20rem' }} >
                                <NavLink to={`/education/exam/` + item.id} style={{ color: 'var(--primary-color)' }}>{item.name}</NavLink>
                            </TbCell>
                            <TbCell style={{ minWidth: '15rem', }} ><Text style={{ width: '100%' }}>{item.code?.toUpperCase()?.replaceAll('-', '')}</Text></TbCell>
                            <TbCell style={{ minWidth: '16rem', }}>{listTopic.find(e => e.id === item.topicId)?.name}</TbCell>
                            <TbCell style={{ minWidth: '12rem', }} align={CellAlignItems.center}>{item.time}</TbCell>
                            <TbCell style={{ minWidth: '10rem', }} align={CellAlignItems.center} >{item.status ? item.status === ExamStatus.real ? "Thi cấp chứng chỉ/bằng" : "Thi thử" : 'Bản nháp'}</TbCell>
                            <TbCell fixed={true} style={{ minWidth: '8rem', }} >
                                <div className="row" style={{ gap: '0.8rem', justifyContent: 'center' }}>
                                    <NavLink to={'/center/exam/' + item.id} className="row" style={{ padding: '0.6rem' }}>
                                        <FilledEdit width='2rem' height='2rem' />
                                    </NavLink>
                                    <button type="button" className="row" onClick={() => { confirmDelete(item) }} style={{ padding: '0.6rem', width: 'fit-content' }}>
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
                        setPageDetails({ page: page, size: size });
                        getData(page, size)
                    }
                }}
            />
        </div>
    </div>
}

