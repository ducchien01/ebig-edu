import { useEffect, useRef, useState } from "react"
import { Checkbox, ComponentStatus, Dialog, DialogAlignment, RadioButton, Text, showDialog } from "../../../../../component/export-component"
import { FilledEdit, FilledIndicator, FilledTrashCan } from "../../../../../assets/const/icon"
import { QuestionType } from "../da"
import ConfigAPI from "../../../../../config/configApi"

export default function EditTask({ data, editQuest, deleteQuest }) {
    const ref = useRef()
    const [listQuestion, setListQuestion] = useState([])

    useEffect(() => {
        if (data?.content) {
            try {
                setListQuestion(JSON.parse(data.content))
            } catch (error) {
                console.log(error)
            }
        }
    }, [data])

    return <div className="col" style={{ gap: '3.2rem', paddingTop: '1.2rem', borderTop: 'var(--border-grey1)' }}>
        <Dialog ref={ref} />
        {/* <div className="row" style={{ gap: '0.8rem', paddingTop: '1.2rem', borderTop: 'var(--border-grey1)' }}>
            <button type="button" className="button-grey row">
                <FontAwesomeIcon icon={faGear} style={{ fontSize: '1.4rem' }} />
                <Text className="button-text-3">Cài đặt tính điểm</Text>
            </button>
            <button type="button" className="button-grey row">
                <FilledResizeV />
                <Text className="button-text-3">Thu gọn</Text>
            </button>
        </div> */}
        {listQuestion.map((item, i) => <div key={item.id} className="quest-block-infor row">
            <div className="row btn-sort" style={{ padding: '0.4rem', position: 'absolute' }}><FilledIndicator /></div>
            <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className="highlight-6">Câu hỏi {i + 1}</Text>
                    <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn{item.type === 1 ? 'nhiều hơn' : ''} 1 câu trả lời)</Text>
                </div>
                <Text className="button-text-1" style={{ '--max-line': 100 }}>{item.question}</Text>
                {item.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                {(item.answers ?? []).map(ans => {
                    return <div key={ans.id} className="row" style={{ gap: '0.8rem', alignItems: 'start' }}>
                        <div style={{ paddingTop: '0.2rem' }}>
                            {item.type === QuestionType.radio ? <RadioButton size={'1.6rem'} name={item.id} value={ans.id} defaultChecked={ans.isCorrect} disabled /> : <Checkbox disabled value={ans.isCorrect} size={'1.6rem'} />}
                        </div>
                        <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                    </div>
                })}
            </div>
            <button type="button" onClick={() => { editQuest(item) }} >
                <FilledEdit />
            </button>
            <button type="button" onClick={() => {
                showDialog({
                    ref: ref,
                    status: ComponentStatus.WARNING,
                    alignment: DialogAlignment.center,
                    title: 'Bạn chắc chắn muốn xóa câu hỏi này',
                    content: 'Câu hỏi sẽ bị xóa khỏi bài kiểm tra',
                    onSubmit: () => { deleteQuest(item) }
                })
            }}>
                <FilledTrashCan />
            </button>
        </div>)}
    </div>
}