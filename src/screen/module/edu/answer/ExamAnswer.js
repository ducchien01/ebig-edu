import { useEffect, useRef, useState } from "react"
import { ExamAnswerController } from "./controller"
import { Checkbox, ComponentStatus, Dialog, DialogAlignment, InfiniteScroll, RadioButton, Text, showDialog } from "../../../../component/export-component"
import { QuestionController } from "../question/controller"
import { LessonType, QuestionType } from "../lesson/da"
import ConfigAPI from "../../../../config/configApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { CustomerController } from "../../customer/controller"
import { FilledTrashCan } from "../../../../assets/const/icon"

export default function ExamAnswerList({ examId }) {
    const dialogRef = useRef()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [questionList, setQuestionList] = useState([])
    const [totalQuest, setTotalQuest] = useState(0)

    const getExamAnswerData = () => {
        ExamAnswerController.getListSimple({ page: Math.floor((data.length / 50)) + 1, take: 50, filter: [{ field: 'examId', operator: '=', value: examId }] }).then(res => {
            if (res) {
                if (res.totalCount !== total) setTotal(res.totalCount)
                const newData = [...data, ...res.data.filter(e => data.every(el => el.id !== e.id))]
                setData(newData)
            }
        })
    }

    const getQuestionData = () => {
        QuestionController.getListSimple({ page: Math.floor((data.length / 50)) + 1, take: 50, filter: [{ field: 'type', operator: '=', value: LessonType.examTask }] }).then(res => {
            if (res) {
                if (res.totalCount !== totalQuest) setTotalQuest(res.totalCount)
                setQuestionList([...questionList, ...res.data.filter(e => questionList.every(el => el.id !== e.id)).map(e => {
                    try {
                        var questionItem = JSON.parse(e.content)
                    } catch (error) {
                        console.log("????", e?.id, error)
                    }
                    e.questionItem = questionItem
                    return e
                })])
            }
        })
    }

    const addQuestionToExam = (questItem) => {
        let newExamAnswer = {
            name: questItem.name,
            examId: examId,
            dateCreated: (new Date()).getTime(),
            customerId: CustomerController.userInfor().id,
            lessonId: questItem.id,
            status: 1,
        }
        ExamAnswerController.add(newExamAnswer).then(res => {
            if (res) {
                newExamAnswer.id = res
                setData([...data, newExamAnswer])
            }
        })
    }

    const removeQuestionFromExam = (questItem) => {
        showDialog({
            ref: dialogRef,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn xóa câu hỏi này khỏi đề thi',
            onSubmit: () => {
                ExamAnswerController.delete([questItem.id]).then(res => {
                    if (res) {
                        setData(data.filter(e => e.id !== questItem.id))
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (data.length && questionList.length) {
            let questIds = data.map(e => e.lessonId).filter(id => questionList.every(e => e.id !== id))
            if (questIds.length) {
                QuestionController.getByIds(questIds).then(questRes => {
                    if (questRes) {
                        setQuestionList([...questionList, ...questRes.filter(e => questionList.every(el => el.id !== e.id)).map(e => {
                            try {
                                var questionItem = JSON.parse(e.content)
                            } catch (error) {
                                console.log("????", e?.id, error)
                            }
                            e.questionItem = questionItem
                            return e
                        })])
                    }
                })
            }
        }
    }, [data, questionList])

    useEffect(() => {
        getQuestionData()
        getExamAnswerData()
    }, [examId])

    return <div className="row" style={{ flex: 1, width: '100%', alignItems: 'stretch', height: '100%' }}>
        <Dialog ref={dialogRef} />
        <div className="col" style={{ flex: 1, height: '100%', gap: '1.6rem' }}>
            <div className="heading-7">Nội dung câu hỏi</div>
            <InfiniteScroll style={{ flex: 1, gap: '0.8rem', overflow: 'hidden auto' }} handleScroll={totalQuest !== questionList.length ? getQuestionData : null}>
                {questionList.filter(e => data.every(el => e.id !== el.lessonId)).map((item, i) => {
                    return <div key={item.id} className="row" style={{ alignItems: 'start', padding: '1.6rem 2rem', gap: '2.4rem', borderRadius: '0.8rem', border: 'var(--border-grey1)' }}>
                        <div className="body-3">{i + 1}</div>
                        <div className="col" style={{ width: '100%', gap: '1.2rem', flex: 1 }}>
                            <Text className="button-text-1" maxLine={4} style={{ width: '100%' }}>{item.questionItem?.question}</Text>
                            {item.questionItem?.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                            {(item?.questionItem?.answers ?? []).map(ans => {
                                return <div key={ans.id} className="row" style={{ gap: '0.8rem', width: '100%', alignItems: 'start' }}>
                                    <div style={{ padding: '0.2rem' }}>{item?.questionItem?.type === QuestionType.radio ? <RadioButton size={'1.6rem'} name={item.id} defaultChecked={ans.id === item.answer} value={ans.id} disabled /> : <Checkbox disabled size={'1.6rem'} value={item.answer?.includes(ans.id)} />}</div>
                                    <Text className="label-4" maxLine={3} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                </div>
                            })}
                        </div>
                        <button onClick={() => { addQuestionToExam(item) }} className="icon-button40 row" style={{ borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.6rem' }} />
                        </button>
                    </div>
                })}
            </InfiniteScroll>
        </div>
        <div className="row divider" style={{ height: '100%' }}></div>
        <div className="col" style={{ flex: 1, height: '100%', gap: '1.6rem' }}>
            <div className="heading-7">Nội dung đề</div>
            <InfiniteScroll style={{ flex: 1, gap: '0.8rem', overflow: 'hidden auto' }} handleScroll={total !== data.length ? getExamAnswerData : null}>
                {data.map((examAns, i) => {
                    let quest = questionList.find(e => e.id === examAns.lessonId)
                    return <div key={examAns.id} className="row" style={{ alignItems: 'start', padding: '1.6rem 2rem', gap: '2.4rem', borderRadius: '0.8rem', border: 'var(--border-grey1)' }}>
                        <div className="col" style={{ width: '100%', gap: '1.2rem', flex: 1 }}>
                            <div className="highlight-6">Câu hỏi {i + 1}: ({quest?.questionItem?.type === QuestionType.radio ? "Chọn 1 đáp án" : 'Chọn nhiều đáp án'})</div>
                            <Text className="button-text-1" maxLine={4} style={{ width: '100%' }}>{quest?.questionItem?.question}</Text>
                            {quest?.questionItem?.fileId && <img src={ConfigAPI.imgUrl + quest?.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                            {(quest?.questionItem?.answers ?? []).map(ans => {
                                return <div key={ans.id} className="row" style={{ gap: '0.8rem', width: '100%', alignItems: 'start' }}>
                                    <div style={{ padding: '0.2rem' }}>{quest.questionItem?.type === QuestionType.radio ? <RadioButton size={'1.6rem'} name={quest.id} defaultChecked={quest.answer?.includes(ans.id)} value={ans.id} disabled /> : <Checkbox disabled size={'1.6rem'} value={quest.answer?.includes(ans.id)} />}</div>
                                    <Text className="label-4" maxLine={3} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                </div>
                            })}
                        </div>
                        <button onClick={() => removeQuestionFromExam(examAns)} className="icon-button40 row" style={{ borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                            <FilledTrashCan width="2rem" height="2rem" />
                        </button>
                    </div>
                })}
            </InfiniteScroll>
        </div>
    </div>
}