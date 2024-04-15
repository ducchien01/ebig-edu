import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ExamController } from "../controller"

export default function SettingsExam() {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        ExamController.getById(id).then(res => {
            debugger
            if (res) setData(res)
        })
    }, [])

    return <div className="row efsgusgdfisdf">
    </div>
}