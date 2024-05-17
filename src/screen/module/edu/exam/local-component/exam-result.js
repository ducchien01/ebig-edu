import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { QuestionController } from "../../question/controller"
import { Text } from "../../../../../component/export-component"
import { ExamController } from "../controller"

export default function ExamResultView() {
    const { id } = useParams()
    const location = useLocation()
    const [data, setData] = useState()
    const [result, setResult] = useState()

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) setData(res)
        })
        if (location.state.questionIds) {
            QuestionController.getByIds(location.state.questionIds).then(res => {
                if (res) {
                    const rightAnswers = res.map(e => {
                        return {
                            ...e,
                            answer: e.answer ? JSON.parse(e.answer) : []
                        }
                    })
                    setResult({
                        startTime: location.state.startTime,
                        endTime: location.state.endTime,
                        score: Object.keys(location.state.answers).filter(props => {
                            const quest = rightAnswers.find(e => e.id === props)
                            if (typeof location.state.answers[props] === 'string') {
                                return quest.answer.includes(location.state.answers[props])
                            } else {
                                return quest.answer.every(id => location.state.answers[props].some(e => e === id)) && quest.answer.length === location.state.answers[props].length
                            }
                        }).length,
                        questions: location.state.questionIds.length,
                        candidate: location.state.candidate
                    })
                }
            })
        }
    }, [location.state])

    return <div className="col">
        <Text className="heading-5">Kết quả tổng kết</Text>
        <div className="col">
            <Text className="label-1">Bài thi: {data?.name}</Text>
            <Text className="label-1">Họ tên thí sinh: {result?.candidate?.name}</Text>
            <Text className="label-1">Kết quả: {result?.score}/{result?.questions}</Text>
            <Text className="label-1">Xếp loại: {data?.quantity && result?.score && data.quantity <= result.score ? 'Đạt' : 'Không đạt'}</Text>
        </div>
    </div>
}