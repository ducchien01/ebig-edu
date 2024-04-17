import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ExamController } from "../controller"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FilledSendMessage } from "../../../../../assets/const/icon"
import { ExamStatus } from "../da"
import ExamAnswerList from "../../answer/ExamAnswer"
import { Select1Form, SelectMultipleForm, TextFieldForm } from "../../../../../project-component/component-form"
import { useForm } from "react-hook-form"
import { TopicController } from "../../../topic/controller"
import { TagController } from "../../../tag/controller"
import { Ultis } from "../../../../../Utils"

export default function SettingsExam() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [activeTab, setActiveTab] = useState(0)

    const renderUI = () => {
        switch (activeTab) {
            case 1:
                return <ExamAnswerList examId={id} />
            default:
                return <CommonTab data={data} />
        }
    }

    useEffect(() => {
        ExamController.getById(id).then(res => {
            if (res) {
                setData(res)
            }
        })
    }, [])

    return <div className="col" style={{ width: '100%', height: '100%', flex: 1, gap: '1.6rem', padding: '1.2rem 4.8rem' }}>
        <div className='details-view-header row' style={{ width: '100%', justifyContent: 'space-between', paddingTop: '2rem' }}>
            <div className='col header-breadcum' style={{ gap: '0.4rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách đề thi</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                    <div className='button-text-6 selected'>Chỉnh sửa đề thi</div>
                </div>
                <div><div className='heading-6'>{data?.name}</div></div>
            </div>
            {data?.status === ExamStatus.draft && <button type="button" className={`button-primary row`} style={{ padding: '0.6rem 1.2rem' }}>
                <FilledSendMessage color={'white'} />
                <div className='button-text-3'>Xuất bản đề thi</div>
            </button>}
        </div>
        <div className="col tab-container" style={{ gap: '2.4rem', flex: 1 }}>
            <div className="tab-header-2 row">
                <div className={`tab-btn label-4 row ${activeTab === 0 ? 'selected' : ''}`} onClick={() => { setActiveTab(0) }}>Thông tin chung</div>
                <div className={`tab-btn label-4 row ${activeTab === 1 ? 'selected' : ''}`} onClick={() => { setActiveTab(1) }}>Nội dung đề</div>
            </div>
            <div className="tab-body-2 row" style={{ flex: 1, height: '100%' }}>
                {renderUI()}
            </div>
        </div>
    </div>
}

const CommonTab = ({ data }) => {
    const methods = useForm({ shouldFocusError: false })
    const [listTopic, setListTopic] = useState([])
    const [listTag, setListTag] = useState([])

    useEffect(() => {
        TopicController.getAll().then(res => {
            if (res) setListTopic(res)
        })
        TagController.getAll().then(res => {
            if (res) setListTag(res)
        })
    }, [])

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach(props => {
                if (data[props]) {
                    methods.setValue(props, data[props])
                }
            })
        }
    }, [data])

    return <div className="col" style={{ flex: 1, width: '100%', maxWidth: '106.8rem' }}>
        <div className="row exam-infor-tile" >
            <TextFieldForm
                className={'row edit-infor-container'}
                label={'Tên đề'}
                name={'name'}
                register={methods.register}
            />
        </div>
        <div className="row exam-infor-tile" >
            <div className='row edit-infor-container'>
                <div className="label-3">Ngày tạo</div>
                <div className="body-3">{data?.dateCreated ? Ultis.datetoString(new Date(data?.dateCreated), 'dd/mm/yyyy hh:mm') : '-'}</div>
            </div>
        </div>
        <div className="row exam-infor-tile" >
            <TextFieldForm
                className={'row edit-infor-container'}
                label={'Thời gian thi (Phút)'}
                name={'time'}
                register={methods.register}
                type={'number'}
            />
        </div>
        <div className="row exam-infor-tile" >
            <Select1Form
                className={'row edit-infor-container'}
                control={methods.control}
                label={'Phân loại chủ đề'}
                name={'topicId'}
                value={methods.watch('topicId')}
                options={listTopic}
            />
        </div>
        <div className="row exam-infor-tile" >
            <SelectMultipleForm
                className={'row edit-infor-container'}
                control={methods.control}
                label={'Tag chủ đề (Tối đa 5)'}
                placeholder={'Chọn chủ đề'}
                name={'tags'}
                value={methods.watch('tags')}
                options={listTag}
            />
        </div>
    </div>
}