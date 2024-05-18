import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { ExamController } from "./controller"
import { CellAlignItems, Checkbox, Dialog, Popup, RadioButton, Table, TbBody, TbCell, TbHeader, TbRow, Text, closePopup, showDialog, showPopup } from "../../../../component/export-component"
import { FilledLogoFacebook, OutLineGoToExam, OutlineCircleQuestion, OutlineFileCopy, OutlineForm, OutlinePeople, OutlineScoreAPlus, OutlineSharing, OutlineTimeAlarm, OutlineVerified } from "../../../../assets/const/icon"
import { ExamStatus } from "./da"
import { TestResultController } from "../test-result/controller"
import { CustomerController } from "../../customer/controller"
import { Ultis } from "../../../../Utils"
import { differenceInSeconds } from "date-fns"
import { QuestionController } from "../question/controller"
import { QuestionType } from "../lesson/da"
import ConfigAPI from "../../../../config/configApi"

export default function ViewExamDetails() {
    const { id } = useParams()
    const [data, setData] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const ref = useRef()
    const dialogRef = useRef()
    const user = CustomerController.userInfor()
    const [activeTab, setActiveTab] = useState(0)
    const [testList, setTestList] = useState([])

    const renderUI = () => {
        switch (activeTab) {
            case 0:
                return <OverviewTab exam={data} />
            case 1:
                return <ResultTab exam={data} selectedTestId={location.state?.testId} testList={testList} />
            case 2:
                return <RatingTab />
            default:
                break;
        }
    }

    const toTesting = () => {
        const _now = new Date()
        const inTesting = testList.filter(e => differenceInSeconds(_now, new Date(e.dateEnd)) < 0)
        function createNewTest() {
            TestResultController.add({
                customerId: user.id,
                exampleId: id,
                name: '',
                score: 0
            }).then(testId => {
                if (testId) navigate('/education/testing/' + testId)
            })
        }
        if (inTesting.length) {
            showDialog({
                ref: dialogRef,
                title: 'Bạn chưa hoàn thành bài thi cũ',
                content: 'Bạn chắc chắn muốn tạo bài thi mới',
                onSubmit: createNewTest
            })
        } else { createNewTest() }
    }

    const showShareOptions = (ev, newId) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col more-action-popup">
                <button type="button" className="row" onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    closePopup(ref)
                }}>
                    <OutlineFileCopy />
                    <Text className="label-4">Sao chép đường liên kết</Text>
                </button>
                <button type="button" className="row">
                    <FilledLogoFacebook />
                    <Text className="label-4">Chia sẻ lên Facebook</Text>
                </button>
            </div>
        })
    }

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) setData(res)
        })
        TestResultController.getListSimple({ page: 1, take: 50, sort: ['dateStart'], filter: [{ field: 'customerId', operator: '=', value: user.id }, { field: 'exampleId', operator: '=', value: id }] }).then(res => {
            if (res) setTestList(res.data)
        })
    }, [])

    useEffect(() => {
        if (location.state?.testId) {
            setActiveTab(1)
            navigate(-1)
        }
    }, [location.state])

    return <div className="col" style={{ width: '100%', height: '100%', flex: 1, gap: '1.2rem', padding: '1.2rem max(10%, 4.8rem)', overflow: 'hidden auto' }}>
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="row" style={{ width: '100%', gap: '0.8rem' }}>
            <Text style={{ width: '100%', flex: 1 }} className="heading-6">{data?.name}</Text>
            <button type="button" onClick={toTesting} className={'row button-primary'}>
                <OutLineGoToExam color="#fff" />
                <Text className="button-text-3">Vào thi</Text>
            </button>
            <button type="button" onClick={showShareOptions} className={'row button-grey'} style={{ padding: '0.8rem 1.6rem' }}>
                <OutlineSharing width="1.8rem" height="1.8rem" />
                <Text className="button-text-3">Chia sẻ</Text>
            </button>
        </div>
        <div className="col tab-container" style={{ gap: '2.4rem' }}>
            <div className="tab-header-2 row">
                <div className={`tab-btn label-4 row ${activeTab === 0 ? 'selected' : ''}`} onClick={() => { setActiveTab(0) }}>Thông tin chung</div>
                <div className={`tab-btn label-4 row ${activeTab === 1 ? 'selected' : ''}`} onClick={() => { setActiveTab(1) }}>Kết quả</div>
                <div className={`tab-btn label-4 row ${activeTab === 2 ? 'selected' : ''}`} onClick={() => { setActiveTab(2) }}>Đánh giá</div>
            </div>
            {renderUI()}
        </div>
    </div>
}

const OverviewTab = ({ exam }) => {
    const [data, setData] = useState()

    useEffect(() => { setData(exam) }, [exam])


    return <div className="tab-body-2 row" style={{ alignItems: 'start', flexWrap: 'wrap', gap: '1.6rem 2.4rem' }}>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineForm width="3.2rem" height="3.2rem" />
            <Text className="title-3">Hình thức: {data?.status ? data.status === ExamStatus.real ? "Thi cấp chứng chỉ/bằng" : "Thi thử" : 'Bản nháp'}</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineCircleQuestion width="3.2rem" height="3.2rem" />
            <Text className="title-3">Số câu hỏi: {data?.quantityQuestion}</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineTimeAlarm width="3.2rem" height="3.2rem" />
            <Text className="title-3">Thời gian thi: {data?.time} phút</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineScoreAPlus width="3.2rem" height="3.2rem" />
            <Text className="title-3">Điểm đạt: {(data?.quantity ?? 0)}/{data?.quantityQuestion ?? 0}</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlinePeople width="3.2rem" height="3.2rem" />
            <Text className="title-3">Số người đã thi: 280</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineVerified width="3.2rem" height="3.2rem" />
            <Text className="title-3">{data?.status === ExamStatus.real ? 'Chứng chỉ .................' : 'Không có chứng chỉ'}</Text>
        </div>
    </div>
}

const ResultTab = ({ exam, selectedTestId, testList = [] }) => {
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState()
    const ref = useRef()
    const scrollRef = useRef()

    const scrollToQuestion = (id) => {
        const questBlock = document.getElementById(id)
        scrollRef.current.scrollTo({
            top: questBlock.offsetTop - 112,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        if (selectedTestId) setSelected(selectedTestId)
    }, [selectedTestId])

    useEffect(() => { setResults(testList) }, [testList])

    const showResultDetails = async (testId) => {
        const res = await TestResultController.getListSimpleTestAnswer({ page: 1, take: 100, filter: [{ field: 'testId', operator: '=', value: testId }] })
        const examQuestions = await QuestionController.getRandomExam(exam.id)
        const ansRes = await QuestionController.getByIds(examQuestions.map(e => e.id))
        let questions = ansRes.map(e => {
            try {
                var questionItem = JSON.parse(e.content)
                e.answer = e.answer ? JSON.parse(e.answer) : []
            } catch (error) {
                console.log("????", e?.id, error)
            }
            e.questionItem = {
                ...questionItem,
                answers: questionItem.answers.map(ans => {
                    return {
                        ...ans,
                        isCorrect: ans.isCorrect = e.answer.includes(ans.id)
                    }
                })
            }
            return e
        })
        if (res) {
            showPopup({
                ref: ref,
                heading: <div className='popup-header heading-7'>Kiểm tra câu trả lời</div>,
                content: <div className="row" style={{ height: '60rem', flex: 1, alignItems: 'start' }}>
                    <div className="col" style={{ borderRight: 'var(--border-grey1)', height: '100%', overflow: 'hidden auto', justifyContent: 'start', width: '20rem' }}>
                        <div className="col" style={{ padding: '1.6rem 2.4rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                            <div className="row" style={{ gap: '1.4rem' }}>
                                <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
                                <Text className="label-1">Đáp án đúng</Text>
                            </div>
                            <div className="row" style={{ gap: '1.4rem' }}>
                                <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'var(--error-color)' }} />
                                <Text className="label-1">Câu trả lời sai</Text>
                            </div>z
                            <div className="row" style={{ gap: '1.4rem' }}>
                                <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'var(--success-color)' }} />
                                <Text className="label-1">Câu trả lời đúng</Text>
                            </div>
                        </div>
                        <div className="row" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)', flexWrap: 'wrap' }}>
                            {questions.map((e, i) => {
                                const userAnswer = res.data.find(el => el.answerId === e.id)
                                if (userAnswer) {
                                    var _anwer = JSON.parse(userAnswer.result)
                                }
                                return <button type="button" onClick={() => { scrollToQuestion(e.id) }} key={e.id} className="col col6 col8-sm col8-min" style={{
                                    '--gutter': '1.2rem', height: '2.4rem', alignItems: 'center', justifyContent: 'center', borderRadius: '0.4rem', backgroundColor: e.questionItem.answers.every(ans => {
                                        switch (e.questionItem.type) {
                                            case QuestionType.checkbox:
                                                return _anwer?.some(id => ans.id === id)
                                            case QuestionType.radio:
                                                return _anwer === ans.id
                                            default:
                                                return false
                                        }
                                    }) ? 'var(--success-color)' : 'var(--error-color)'
                                }}>
                                    <Text className="regular2" style={{ color: '#fff' }}>{i + 1}</Text>
                                </button>
                            })}
                        </div>
                    </div>
                    <div className="col" style={{ height: '100%', overflow: 'hidden auto', flex: 1, width: '100%' }}>
                        <div className="popup-body col" ref={scrollRef} style={{ padding: '1.6rem 2.4rem', gap: '2rem', width: '100%' }}>
                            {questions.map((item, i) => {
                                const userAnswer = res.data.find(e => e.answerId === item.id)
                                if (userAnswer) {
                                    var _anwer = JSON.parse(userAnswer.result)
                                }
                                return <div key={item.id} id={item.id} className="quest-block-infor row">
                                    <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                                        <div className="row" style={{ gap: '0.8rem' }}>
                                            <Text className="highlight-6">Câu hỏi {i + 1}</Text>
                                            <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn{item.questionItem.type === 1 ? 'nhiều hơn' : ''} 1 câu trả lời)</Text>
                                        </div>
                                        <Text className="button-text-1" style={{ '--max-line': 100 }}>{item.questionItem.question}</Text>
                                        {item.questionItem.fileId && <img src={ConfigAPI.imgUrl + item.questionItem.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                                        {(item.questionItem.answers ?? []).map(ans => {
                                            switch (item.questionItem.type) {
                                                case QuestionType.checkbox:
                                                    var checked = _anwer?.some(id => ans.id === id)
                                                    break;
                                                case QuestionType.radio:
                                                    var checked = _anwer === ans.id
                                                    break;
                                                default:
                                                    break;
                                            }
                                            if (checked) var checkedValue = ans.isCorrect
                                            return <div key={ans.id} className="row" style={{ gap: '0.8rem', alignItems: 'start', pointerEvents: 'none' }}>
                                                {item.type === QuestionType.radio ? <div style={{ paddingTop: '0.2rem' }}>
                                                    <RadioButton size={'1.6rem'} defaultChecked={checked || ans.isCorrect} activeColor={checkedValue != null ? checkedValue ? 'var(--success-color)' : 'var(--error-color)' : null} />
                                                </div> : <div style={{ paddingTop: '0.2rem' }}>
                                                    <Checkbox
                                                        value={checked || ans.isCorrect}
                                                        size={'2rem'}
                                                        style={{ borderRadius: '50%', backgroundColor: checkedValue != null ? checkedValue ? 'var(--success-color)' : 'var(--error-color)' : null }}
                                                    />
                                                </div>}
                                                <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>,
            })
        }
    }

    return <div className="tab-body-2 col" style={{ gap: '2rem', overflow: 'auto' }}>
        <Popup ref={ref} />
        <Table>
            <TbHeader>
                <TbCell fixed={true} style={{ minWidth: '6rem' }}>STT</TbCell>
                <TbCell style={{ minWidth: '20rem', }} >Giờ bắt đầu thi</TbCell>
                <TbCell style={{ minWidth: '20rem', }}>Giờ kết thúc thi</TbCell>
                <TbCell style={{ minWidth: '8rem', }}>Điểm thi</TbCell>
                <TbCell style={{ minWidth: '14rem', }} align={CellAlignItems.center}>Xếp loại</TbCell>
                <TbCell style={{ minWidth: '14rem', }}>Trạng thái</TbCell>
                <TbCell fixed={true} style={{ minWidth: '18rem', }} align={CellAlignItems.center}>Action</TbCell>
            </TbHeader>
            <TbBody>
                {
                    results.map((item, i) => {
                        const _now = new Date()
                        const isInTest = differenceInSeconds(_now, new Date(item.dateEnd)) < 0
                        return <TbRow key={item.id} className={`${selected === item.id ? 'selected' : ''}`} onClick={() => { setSelected(item.id) }} style={{ borderTop: i > 0 ? 'var(--border-grey1)' : 'none', '--selected-tbrow-bg': 'var( --primary-background)' }}>
                            <TbCell fixed={true} style={{ minWidth: '6rem' }}>{i + 1}</TbCell>
                            <TbCell style={{ minWidth: '20rem', }}>{item.dateStart ? Ultis.datetoString(new Date(item.dateStart), 'dd/mm/yyyy hh:mm') : '-'}</TbCell>
                            <TbCell style={{ minWidth: '20rem', }}>{item.dateEnd ? Ultis.datetoString(new Date(item.dateEnd), 'dd/mm/yyyy hh:mm') : '-'}</TbCell>
                            <TbCell style={{ minWidth: '8rem', }}>{item?.score != undefined && exam?.quantityQuestion ? `${item?.score}/${exam?.quantityQuestion}` : '-'}</TbCell>
                            <TbCell style={{ minWidth: '14rem', }} align={CellAlignItems.center}>{exam?.quantity && item?.score && exam.quantity <= item.score ? 'Đạt' : 'Không đạt'}</TbCell>
                            <TbCell style={{ minWidth: '14rem', }}>{isInTest ? 'Đang thi' : 'Đã kết thúc'}</TbCell>
                            <TbCell fixed={true} style={{ minWidth: '18rem' }} align={CellAlignItems.center}>
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    {isInTest ? <NavLink to={'/education/testing/' + item.id} className={'row button-primary'} style={{ padding: '0.8rem 1.2rem', borderRadius: '0.4rem' }}><Text className="button-text-3">Thi tiếp</Text></NavLink> :
                                        <button type="button" onClick={() => { showResultDetails(item.id) }} className={'row button-primary'} style={{ padding: '0.8rem 1.2rem', borderRadius: '0.4rem' }}><Text className="button-text-3">Xem kết quả</Text></button>}
                                </div>
                            </TbCell>
                        </TbRow>
                    }
                    )
                }
            </TbBody>
        </Table>
    </div>
}

const RatingTab = () => {
    return <div></div>
}