import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { ExamController } from "./controller"
import { Text } from "../../../../component/export-component"
import { OutlineCircleQuestion, OutlineForm, OutlinePeople, OutlineScoreAPlus, OutlineTimeAlarm, OutlineVerified } from "../../../../assets/const/icon"
import { ExamStatus } from "./da"

export default function ViewExamDetails() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])

    return <div className="col" style={{ width: '100%', height: '100%', flex: 1, gap: '1.2rem', padding: '1.2rem max(10%, 4.8rem)', overflow: 'hidden auto' }}>
        <div className="row" style={{ width: '100%' }}>
            <Text style={{ width: '100%', flex: 1 }} className="heading-6">{data?.name}</Text>
            <NavLink to={'/education/testing/' + id} className={'row button-primary'}><Text className="button-text-3">Vào thi</Text></NavLink>
        </div>
        <div className="col tab-container" style={{ gap: '2.4rem' }}>
            <div className="tab-header-2 row">
                <div className={`tab-btn label-4 row ${activeTab === 0 ? 'selected' : ''}`} onClick={() => { setActiveTab(0) }}>Thông tin chung</div>
                <div className={`tab-btn label-4 row ${activeTab === 1 ? 'selected' : ''}`} onClick={() => { setActiveTab(1) }}>Đánh giá</div>
            </div>
            <div className="tab-body-2 row" style={{ flex: 1, height: '100%', alignItems: 'start', flexWrap: 'wrap', gap: '1.6rem 2.4rem' }}>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlineForm width="3.2rem" height="3.2rem" />
                    <Text className="title-3">{data?.status ? data.status === ExamStatus.real ? "Thi cấp chứng chỉ/bằng" : "Thi thử" : 'Bản nháp'}</Text>
                </div>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlineCircleQuestion width="3.2rem" height="3.2rem" />
                    <Text className="title-3">30</Text>
                </div>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlineTimeAlarm width="3.2rem" height="3.2rem" />
                    <Text className="title-3">{data?.time} phút</Text>
                </div>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlineScoreAPlus width="3.2rem" height="3.2rem" />
                    <Text className="title-3">{(data?.quantity ?? 0)}/30</Text>
                </div>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlinePeople width="3.2rem" height="3.2rem" />
                    <Text className="title-3">280</Text>
                </div>
                <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
                    <OutlineVerified width="3.2rem" height="3.2rem" />
                    <Text className="title-3">{data?.status === ExamStatus.real ? 'Chứng chỉ .................' : 'Không có chứng chỉ'}</Text>
                </div>
            </div>
        </div>
    </div>
}