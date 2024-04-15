import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ExamController } from "../controller"

export default function SettingsExam() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [listAnswer, setListAnswer] = useState([])

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])

    return <div className="row">
        
    </div>
}