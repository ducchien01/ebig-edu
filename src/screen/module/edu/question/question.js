import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { CellAlignItems, Checkbox, ComponentStatus, Dialog, DialogAlignment, Pagination, Popup, RadioButton, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField, showDialog, showPopup, } from "../../../../component/export-component";
import { FilledEdit, FilledSetupPreferences, FilledTrashCan } from "../../../../assets/const/icon";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { QuestionController } from "./controller";
import { LessonType, QuestionType } from "../lesson/da";
import { useNavigate } from "react-router-dom";
import ConfigAPI from "../../../../config/configApi";
import PopupAddNewQuestion from "./local-component/popup-add-new-question";
import { Ultis } from "../../../../Utils";
import { CustomerController } from "../../customer/controller";

export default function QuestionManagment() {
    const ref = useRef()
    const dialogRef = useRef()
    const navigate = useNavigate()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [data, setData] = useState()

    const popupAddNewQuestion = () => {
        showPopup({
            ref: ref,
            heading: <div className='popup-header heading-7'>Tạo mới câu hỏi</div>,
            content: <PopupAddNewQuestion ref={ref} />,
        })
    }

    const getData = async (page, size) => {
        const res = await QuestionController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ field: 'type', operator: '=', value: LessonType.examTask },{ field: 'customerId', operator: '=', value: CustomerController.userInfor().id }] })
        if (res) {
            setData({
                ...res, data: res.data.map(e => {
                    try {
                        var questionItem = JSON.parse(e.content)
                    } catch (error) {
                        console.log("????", e?.id, error)
                    }
                    e.questionItem = questionItem
                    return e
                })
            })
        }
    }

    const confirmDelete = (item) => {
        showDialog({
            ref: dialogRef,
            status: ComponentStatus.WARNING,
            alignment: DialogAlignment.center,
            title: 'Bạn chắc chắn muốn xóa câu hỏi này',
            content: 'Câu hỏi này sẽ bị xóa khỏi thư viện câu hỏi của bạn vĩnh viễn',
            onSubmit: () => {
                QuestionController.delete([item.id]).then(res => {
                    if (res) getData()
                })
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col' style={{ width: '100%', height: '100%', flex: 1, gap: '0.8rem', padding: '2.4rem 3.2rem 0 3.2rem' }}>
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="heading-4">Danh sách câu hỏi</div>
            <button type="button" className="button-primary row" onClick={popupAddNewQuestion} style={{ backgroundColor: 'var(--primary-color)' }}>
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
                    <TbCell fixed={true} style={{ minWidth: 60 }}>STT</TbCell>
                    <TbCell style={{ minWidth: 200, }} >Tiêu đề</TbCell>
                    <TbCell style={{ minWidth: 400, }}>Nội dung câu hỏi</TbCell>
                    <TbCell style={{ minWidth: 120, }}>Thông tin</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 180, }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        (data?.data ?? []).map((item, i) => <TbRow key={item.id} style={{ borderTop: i > 0 ? 'var(--border-grey1)' : 'none' }} >
                            <TbCell fixed={true} style={{ minWidth: 60, verticalAlign: 'top', padding: '1.2rem 2.4rem' }} >{i + 1}</TbCell>
                            <TbCell style={{ minWidth: 200, verticalAlign: 'top', padding: '1.2rem 2.4rem' }} ><Text style={{ width: '100%' }} maxLine={3}>{item.name}</Text></TbCell>
                            <TbCell style={{ minWidth: 400, padding: '1.2rem 2.4rem' }} align={CellAlignItems.center}>
                                <div className="col" style={{ width: '100%', gap: '1.2rem' }}>
                                    <Text className="button-text-1" maxLine={4} style={{ width: '100%' }}>{item.questionItem?.question}</Text>
                                    {item.questionItem?.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                                    {(item?.questionItem?.answers ?? []).map(ans => {
                                        return <div key={ans.id} className="row" style={{ gap: '0.8rem', width: '100%', alignItems: 'start' }}>
                                            <div style={{ padding: '0.2rem' }}>{item?.questionItem?.type === QuestionType.radio ? <RadioButton size={'1.6rem'} name={item.id} value={ans.id} disabled /> : <Checkbox disabled size={'1.6rem'} />}</div>
                                            <Text className="label-4" maxLine={3} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                        </div>
                                    })}
                                </div>
                            </TbCell>
                            <TbCell style={{ minWidth: 160, verticalAlign: 'top', padding: '1.2rem 2.4rem' }}>
                                <div className="col" style={{ width: '100%', gap: '1.2rem' }}>
                                    <Text className="body-3">Loại: {item?.questionItem?.type === QuestionType.radio ? 'Chọn 1 đáp án' : 'Chọn nhiều đáp án'}</Text>
                                    <Text className="body-3">Ngày tạo: {Ultis.datetoString(new Date(item.dateCreated), 'dd/mm/yyyy hh:mm')}</Text>
                                </div>
                            </TbCell>
                            <TbCell fixed={true} style={{ minWidth: 180, verticalAlign: 'top', padding: '1.2rem 2.4rem' }}>
                                <div className="row" style={{ gap: '0.8rem', justifyContent: 'center' }}>
                                    <button type="button" className="row" onClick={() => { navigate('details/' + item.id) }} style={{ padding: '0.6rem' }}>
                                        <FilledEdit width='2rem' height='2rem' />
                                    </button>
                                    <button type="button" className="row" onClick={() => { confirmDelete(item) }} style={{ padding: '0.6rem' }}>
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

