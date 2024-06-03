import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Checkbox, ComponentStatus, Dialog, DialogAlignment, Text, showDialog } from "../../../../../component/export-component"
import { RadioButtonForm } from "../../../../../project-component/component-form"
import { useForm } from "react-hook-form"
import { ExamController } from "../controller"
import { QuestionController } from "../../question/controller"
import ConfigAPI from "../../../../../config/configApi"
import { QuestionType } from "../../lesson/da"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faClock, faUser } from "@fortawesome/free-solid-svg-icons"
import CoutDownText from "../../../../../project-component/count-down-text"
import { Ultis } from "../../../../../Utils"
import { differenceInSeconds } from "date-fns"
import { TestResultController } from "../../test-result/controller"
import { useSelector } from "react-redux"

export default function ViewTesting() {
    const { id } = useParams()
    const navigate = useNavigate()
    const methods = useForm({ shouldFocusError: false })
    const [questions, setQuestions] = useState([])
    const [data, setData] = useState()
    const [testData, setTestData] = useState()
    const userInfor = useSelector((state) => state.account.data)
    const scrollRef = useRef()
    const dialogRef = useRef()

    const submitAnswer = (ev) => {
        let userAnswers = ev
        async function getScore(endTime) {
            const ansRes = await QuestionController.getByIds(questions.map(e => e.id))
            const rightAnswers = ansRes.map(e => {
                return {
                    ...e,
                    answer: e.answer ? JSON.parse(e.answer) : []
                }
            })
            if (endTime) testData.dateEnd = endTime
            const saveTestAnswers = Object.keys(userAnswers).map(props => {
                const quest = rightAnswers.find(e => e.id === props)
                let _status = 0
                if (typeof userAnswers[props] === 'string') {
                    _status = quest.answer.includes(userAnswers[props]) ? 1 : 0
                } else {
                    _status = quest.answer.every(id => userAnswers[props].some(e => e === id)) && quest.answer.length === userAnswers[props].length ? 1 : 0
                }
                return {
                    answerId: props,
                    result: JSON.stringify(userAnswers[props]),
                    testId: id,
                    status: _status,
                }
            })
            TestResultController.addListTestAnswer(saveTestAnswers)
            TestResultController.edit({
                ...testData,
                score: saveTestAnswers.filter(e => e.status === 1).length
            }).then(res => {
                if (res)
                    navigate(`/education/exam/${data.id}`, { state: { testId: id }, replace: true })
            })
        }
        if (userAnswers) {
            showDialog({
                ref: dialogRef,
                alignment: DialogAlignment.center,
                status: ComponentStatus.WARNING,
                title: 'Bạn chắc chắn muốn kết thúc bài thi',
                content: `Bạn đã hoàn thành ${Object.keys(userAnswers).length}/${questions.length} câu hỏi.`,
                onSubmit: () => { getScore(new Date().getTime()) }
            })
        } else {
            userAnswers = methods.getValues()
            showDialog({
                ref: dialogRef,
                alignment: DialogAlignment.center,
                status: ComponentStatus.WARNING,
                title: 'Thờ gian thi đã kết thúc',
                content: `Bạn đã hoàn thành ${Object.keys(userAnswers).length}/${questions.length} câu hỏi. Bạn sẽ được chuyển tới màn hình chấm thi sau 3s`,
            })
            setTimeout(getScore, 300)
        }
    }

    const scrollToQuestion = (id) => {
        const questBlock = document.getElementById(id)
        scrollRef.current.scrollTo({
            top: questBlock.offsetTop - 112,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        TestResultController.getById(id).then(res => {
            if (res) {
                QuestionController.getRandomExam(res.exampleId).then(async (questRes) => {
                    if (questRes) {
                        const exam = await ExamController.getById(res.exampleId)
                        if (exam) {
                            if (!res.dateStart) {
                                let startTime = new Date()
                                res.dateStart = startTime.getTime()
                                startTime.setMinutes(startTime.getMinutes() + exam.time)
                                res.dateEnd = startTime.getTime()
                                TestResultController.edit(res)
                            }
                            setQuestions(questRes.map(e => {
                                try {
                                    var questionItem = JSON.parse(e.content)
                                } catch (error) {
                                    console.log("????", e?.id, error)
                                }
                                e.questionItem = questionItem
                                return e
                            }))
                            setData(exam)
                            setTestData(res)
                        }
                    }
                })
            }
        })
    }, [])

    return <div className="col" style={{ flex: 1, height: '100%', width: '100%' }}>
        <Dialog ref={dialogRef} />
        <div className='details-view-header row' style={{ width: '100%', padding: '2rem max(2.4rem, 4%)' }}>
            <Text className='heading-5' style={{ flex: 1 }}>{data?.name}</Text>
            <button type="button" onClick={methods.handleSubmit(submitAnswer)} className={`button-primary row`} style={{ width: '16rem' }}>
                <div className='button-text-3'>Nộp bài</div>
            </button>
        </div>
        <div className="row" style={{ flex: 1 }}>
            <div className="col" style={{ width: 'max(22rem, 24%)', borderRight: 'var(--border-grey1)', height: '100%', overflow: 'hidden auto' }}>
                <div className="col" style={{ alignItems: 'center', gap: '0.4rem', padding: '0.8rem 1.6rem 2rem', borderBottom: 'var(--border-grey1)' }}>
                    <div className="row" style={{ padding: '0.8rem', justifyContent: 'center', width: '16.4rem', borderRadius: '0.4rem', backgroundColor: 'var(--error-color)' }}>
                        {testData ? <CoutDownText className={'heading-6'} time={data.time * 60} remain={Math.abs(differenceInSeconds(new Date(testData.dateStart), new Date()))} style={{ color: '#fff', }} onEnd={submitAnswer} /> : undefined}
                    </div>
                    <Text className="body-3">Thời gian còn lại</Text>
                </div>
                <div className="row" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                    <FontAwesomeIcon icon={faUser} style={{ color: "#667994", fontSize: '1.6rem' }} />
                    <Text className="label-1">{userInfor.name}</Text>
                </div>
                <div className="row" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#667994", fontSize: '1.6rem' }} />
                    <Text className="label-1">{testData?.dateStart ? Ultis.datetoString(new Date(testData.dateStart), 'dd/mm/yyyy hh:mm:ss') : 0}</Text>
                </div>
                <div className="row" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                    <FontAwesomeIcon icon={faClock} style={{ color: "#667994", fontSize: '1.6rem' }} />
                    <Text className="label-1">{data?.time} phút</Text>
                </div>
                <div className="col" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)' }}>
                    <div className="row" style={{ gap: '1.4rem' }}>
                        <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
                        <Text className="label-1">Câu hỏi đã trả lời</Text>
                    </div>
                    <div className="row" style={{ gap: '1.4rem' }}>
                        <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'var(--disabled-font-color)' }} />
                        <Text className="label-1">Câu hỏi chưa trả lời</Text>
                    </div>
                </div>
                <div className="row" style={{ padding: '1.6rem', gap: '1.2rem', borderBottom: 'var(--border-grey1)', flexWrap: 'wrap' }}>
                    {questions.map((e, i) => {
                        return <button type="button" onClick={() => { scrollToQuestion(e.id) }} key={e.id} className="col col6 col8-sm col8-min" style={{ '--gutter': '1.2rem', height: '2.4rem', alignItems: 'center', justifyContent: 'center', borderRadius: '0.4rem', backgroundColor: methods.getValues(e.id)?.length ? 'var(--primary-color)' : 'var(--disabled-font-color)' }}>
                            <Text className="regular2" style={{ color: '#fff' }}>{i + 1}</Text>
                        </button>
                    })}
                </div>
            </div>
            <div ref={scrollRef} className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto', padding: '0.8rem max(2.8rem, 4.8%)' }}>
                <form className="col" style={{ gap: '1.2rem' }}>
                    {questions.map((e, i) => {
                        const item = e.questionItem
                        return <div key={e.id} id={e.id} className="quest-block-infor row">
                            <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="highlight-6">Câu hỏi {i + 1}</Text>
                                    <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn{item.type === 1 ? ' nhiều hơn' : ''} 1 câu trả lời)</Text>
                                </div>
                                <Text className="button-text-1" style={{ '--max-line': 100 }}>{item.question}</Text>
                                {item.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                                {(item.answers ?? []).map(ans => {
                                    return <div key={ans.id} className="row" style={{ gap: '0.8rem', alignItems: 'start' }}>
                                        {item.type === QuestionType.radio ? <div style={{ paddingTop: '0.2rem' }}>
                                            <RadioButtonForm register={methods.register} size={'1.6rem'} name={e.id} value={ans.id} />
                                        </div> : <div style={{ paddingTop: '0.2rem' }}>
                                            <Checkbox
                                                value={methods.watch(e.id)?.some(id => id === ans.id)}
                                                size={'2rem'}
                                                onChange={(ev) => {
                                                    let listValue = methods.getValues(e.id) ?? []
                                                    if (ev) {
                                                        listValue.push(ans.id)
                                                    } else {
                                                        listValue = listValue.filter(id => id !== ans.id)
                                                    }
                                                    methods.setValue(e.id, listValue)
                                                }}
                                            />
                                        </div>}
                                        <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </form>
            </div>
        </div>
    </div>
}