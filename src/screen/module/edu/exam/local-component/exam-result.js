import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Text } from "../../../../../component/export-component"
import { ExamController } from "../controller"
import { TestResultController } from "../../test-result/controller"
import { CustomerController } from "../../../customer/controller"

export default function ExamResultView() {
    const { id } = useParams()
    const [examData, setExamData] = useState()
    const [cutomer, setCustomer] = useState()
    const [result, setResult] = useState()

    useEffect(() => {
        TestResultController.getById(id).then(res => {
            if (res) {
                ExamController.getById(res.exampleId).then(exam => {
                    if (exam) setExamData(exam)
                })
                CustomerController.getById(res.customerId).then(cusRes => {
                    if (cusRes) setCustomer(cusRes)
                })
                setResult(res)
            }
        })
    }, [])

    return <div className="col">
        <Text className="heading-5">Kết quả tổng kết</Text>
        <div className="col">
            <Text className="label-1">Bài thi: {examData?.name}</Text>
            <Text className="label-1">Họ tên thí sinh: {cutomer?.name}</Text>
            <Text className="label-1">Kết quả: {result?.score && examData?.QuantityQuestion ? (result?.score / examData?.QuantityQuestion) : '-'}</Text>
            <Text className="label-1">Xếp loại: {examData?.quantity && result?.score && examData.quantity <= result.score ? 'Đạt' : 'Không đạt'}</Text>
        </div>
    </div>
}