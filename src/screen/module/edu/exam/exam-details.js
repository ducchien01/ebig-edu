import { useEffect, useState } from "react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { ExamController } from "./controller"
import { CellAlignItems, Table, TbBody, TbCell, TbHeader, TbRow, Text } from "../../../../component/export-component"
import { OutlineCircleQuestion, OutlineForm, OutlinePeople, OutlineScoreAPlus, OutlineTimeAlarm, OutlineVerified } from "../../../../assets/const/icon"
import { ExamStatus } from "./da"
import { TestResultController } from "../test-result/controller"
import { CustomerController } from "../../customer/controller"
import { Ultis } from "../../../../Utils"

export default function ViewExamDetails() {
    const { id } = useParams()
    const [data, setData] = useState()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(0)

    const renderUI = () => {
        switch (activeTab) {
            case 0:
                return <OverviewTab exam={data} />
            case 1:
                return <ResultTab exam={data} selectedTestId={location.state?.testId} />
            case 2:
                return <RatingTab />
            default:
                break;
        }
    }

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])

    useEffect(() => {
        if (location.state?.testId) {
            debugger
            setActiveTab(1)
        }
    }, [location.state])

    return <div className="col" style={{ width: '100%', height: '100%', flex: 1, gap: '1.2rem', padding: '1.2rem max(10%, 4.8rem)', overflow: 'hidden auto' }}>
        <div className="row" style={{ width: '100%' }}>
            <Text style={{ width: '100%', flex: 1 }} className="heading-6">{data?.name}</Text>
            <NavLink to={'/education/testing/' + id} className={'row button-primary'}><Text className="button-text-3">Vào thi</Text></NavLink>
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


    return <div className="tab-body-2 row" style={{ flex: 1, height: '100%', alignItems: 'start', flexWrap: 'wrap', gap: '1.6rem 2.4rem' }}>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineForm width="3.2rem" height="3.2rem" />
            <Text className="title-3">Hình thức: {data?.status ? data.status === ExamStatus.real ? "Thi cấp chứng chỉ/bằng" : "Thi thử" : 'Bản nháp'}</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineCircleQuestion width="3.2rem" height="3.2rem" />
            <Text className="title-3">Số câu hỏi: 30</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineTimeAlarm width="3.2rem" height="3.2rem" />
            <Text className="title-3">Thời gian thi: {data?.time} phút</Text>
        </div>
        <div className="row col12" style={{ padding: '0.8rem 1.6rem', gap: '0.8rem', '--gutter': '2.4rem' }}>
            <OutlineScoreAPlus width="3.2rem" height="3.2rem" />
            <Text className="title-3">Điểm đạt: {(data?.quantity ?? 0)}/30</Text>
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

const ResultTab = ({ exam, selectedTestId }) => {
    const [results, setResults] = useState()

    useEffect(() => {
        if (exam) {
            TestResultController.getListSimple({ page: 1, take: 50, filter: [{ field: 'customerId', operator: '=', value: CustomerController.userInfor().id }, { field: 'exampleId', operator: '=', value: exam.id }] }).then(res => {
                if (res) setResults(res.data)
            })
        }
    }, [exam])


    return <div className="tab-body-2 col" style={{ flex: 1, height: '100%', overflow: 'auto', minHeight: 380 }}>
        <Table>
            <TbHeader>
                <TbCell fixed={true} style={{ minWidth: '6rem' }}>STT</TbCell>
                <TbCell style={{ minWidth: '20rem', }} >Giờ bắt đầu thi</TbCell>
                <TbCell style={{ minWidth: '20rem', }}>Giờ kết thúc thi</TbCell>
                <TbCell style={{ minWidth: '8rem', }}>Điểm thi</TbCell>
                <TbCell style={{ minWidth: '14rem', }}>Xếp loại</TbCell>
                <TbCell fixed={true} style={{ minWidth: '10rem', }} align={CellAlignItems.center}>Action</TbCell>
            </TbHeader>
            <TbBody>
                {
                    (results ?? []).map((item, i) => <TbRow key={item.id} style={{ borderTop: i > 0 ? 'var(--border-grey1)' : 'none', backgroundColor: selectedTestId === item.id ? 'var( --primary-background)' : undefined }} >
                        <TbCell fixed={true} style={{ minWidth: '6rem' }}>{i + 1}</TbCell>
                        <TbCell style={{ minWidth: '20rem', }} >{item.dateStart ? Ultis.datetoString(new Date(item.dateStart)) : '-'}</TbCell>
                        <TbCell style={{ minWidth: '20rem', }}>{item.dateEnd ? Ultis.datetoString(new Date(item.dateEnd)) : '-'}</TbCell>
                        <TbCell style={{ minWidth: '8rem', }}>{item?.score && exam?.quantityQuestion ? `${item?.score}/${exam?.quantityQuestion}` : '-'}</TbCell>
                        <TbCell style={{ minWidth: '14rem', }}>{exam?.quantity && item?.score && exam.quantity <= item.score ? 'Đạt' : 'Không đạt'}</TbCell>
                        <TbCell fixed={true} style={{ minWidth: '10rem', verticalAlign: 'top', padding: '1.2rem 2.4rem' }}>

                        </TbCell>
                    </TbRow>
                    )
                }
            </TbBody>
        </Table>
    </div>
}

const RatingTab = () => {
    return <div></div>
}