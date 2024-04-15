import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { QuestionController } from "../controller"

export default function SettingsQuestion() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [listAnswer, setListAnswer] = useState([])

    useEffect(() => {
        QuestionController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])

    return <div className="row">
        
    </div>
}