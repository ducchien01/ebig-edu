import { useEffect, useState } from "react"
import { LessonController } from "../../lesson/controller"
import { LessonType, QuestionType } from "../../lesson/da"
import { Checkbox, RadioButton, Text } from "../../../../../component/export-component"
import ConfigAPI from "../../../../../config/configApi"

export default function CourseLessonsContent({ data, }) {
    const [lessonData, setLessonData] = useState()

    const renderUI = () => {
        switch (lessonData?.type) {
            case LessonType.video:
                return <div></div>;
            case LessonType.paragraph:
                return <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: lessonData.content }}></div>
            case LessonType.task:
                try {
                    var quizz = JSON.parse(lessonData.content)
                } catch (error) {
                    console.log(error)
                }
                if (!quizz) return <div></div>
                return <div className="col" style={{gap: '1.2rem', alignItems: 'end'}}>
                    {quizz.map((item,i) => {
                        return <div key={item.id} className="quest-block-infor row">
                            <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="highlight-6">Câu hỏi {i + 1}</Text>
                                    <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn{item.type === 1 ? 'nhiều hơn' : ''} 1 câu trả lời)</Text>
                                </div>
                                <Text className="button-text-1" style={{ '--max-line': 100 }}>{item.question}</Text>
                                {item.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                                {(item.answers ?? []).map(ans => {
                                    return <div key={ans.id} className="row" style={{ gap: '0.8rem', alignItems: 'start' }}>
                                        {item.type === QuestionType.radio ? <div style={{paddingTop: '0.2rem'}}><RadioButton size={'1.6rem'} name={item.id} value={ans.id} /></div> : <div style={{paddingTop: '0.2rem'}}><Checkbox size={'2rem'} style={{ borderRadius: '50%' }} /></div>}
                                        <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                    <button type="button" className="row button-primary"><div className="button-text-3">Hoàn thành</div></button>
                </div>
            default:
                return <div></div>;
        }
    }

    useEffect(() => {
        if (data) {
            LessonController.getById(data.lessonId).then(res => {
                if (res) setLessonData(res)
            })
        }
    }, [data])

    return <div className="col lesson-content-view" style={{ gap: '2rem', padding: '1.6rem 0' }}>
        <Text className="heading-4" maxLine={2} style={{ width: '100%' }}>{data?.name}</Text>
        {renderUI()}
    </div>
}