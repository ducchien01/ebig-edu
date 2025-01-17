import { useEffect, useState } from "react"
import { LessonController } from "../../lesson/controller"
import { LessonType, QuestionType } from "../../lesson/da"
import { Checkbox, RadioButton, Text } from "wini-web-components"
import ConfigAPI from "../../../../../config/configApi"
import ReactPlayer from "react-player"
import { useForm } from "react-hook-form"
import { RadioButtonForm } from "../../../../../project-component/component-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import ListLessonTile from "../../lesson/local-component/list-lesson-tile"

export default function CourseLessonsContent({ data, onEndLesson = () => { }, courseLessons, onSelected }) {
    const [lessonData, setLessonData] = useState()
    const [showLessonList, setShowLessonList] = useState(false)

    const renderUI = () => {
        switch (lessonData?.type) {
            case LessonType.video:
                return <div className="col" style={{ width: '100%' }}>
                    <ReactPlayer
                        playing
                        controls
                        // config={{ youtube: { playerVars: { showinfo: 0 } } }}\
                        url={[
                            'https://cdn.jsdelivr.net/gh/ducchien01/File@5b8e838/op_part_1_plants_14e6.mp4',
                            'https://cdn.jsdelivr.net/gh/ducchien01/File@abefc11/op_part_0_plants_14e6.mp4',
                        ]} />
                </div>;
            case LessonType.paragraph:
                setTimeout(onEndLesson, 60000)
                return <div className="lesson-paragraph-ck-editor" style={{ width: '100%' }}>
                    <div className="ck-content" dangerouslySetInnerHTML={{ __html: lessonData.content }}></div>
                </div>
            case LessonType.task:
                try {
                    var quizz = JSON.parse(lessonData.content)
                } catch (error) {
                    console.log(error)
                }
                if (!quizz) return <div></div>
                return <TestQuizzForm data={quizz} endTask={onEndLesson} />
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
        <div className="row" style={{ width: '100%', alignItems: 'start' }}>
            <Text className="heading-4" style={{ width: '100%', flex: 1 }}>{data?.name}</Text>
            <button className="icon-button40 row on-show-lesson-list" style={{ display: 'none' }} onClick={() => { setShowLessonList(!showLessonList) }}>
                <FontAwesomeIcon icon={showLessonList ? faCaretUp : faCaretDown} />
            </button>
        </div>
        {showLessonList ? <ListLessonTile
            style={{ flex: 'none', height: 'fit-content' }}
            courseLessons={courseLessons}
            selectedId={data?.id}
            onSelected={(item) => {
                onSelected(item)
                setShowLessonList(false)
            }}
        /> : renderUI()}
    </div>
}

const TestQuizzForm = ({ data = [], endTask }) => {
    const methods = useForm({ shouldFocusError: false })
    const [userAnswer, setUserAnswer] = useState()

    const submitAnswer = (ev) => {
        setUserAnswer(ev)
        if (endTask) endTask()
    }

    useEffect(() => {
        methods.reset()
        setUserAnswer(null)
    }, [data])

    return userAnswer ? <div className="col" style={{ gap: '1.2rem', alignItems: 'end' }}>
        {data.map((item, i) => {
            return <div key={item.id} className="quest-block-infor row">
                <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <Text className="highlight-6">Câu hỏi {i + 1}</Text>
                        <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn{item.type === 1 ? 'nhiều hơn' : ''} 1 câu trả lời)</Text>
                    </div>
                    <Text className="button-text-1" style={{ '--max-line': 100 }}>{item.question}</Text>
                    {item.fileId && <img src={ConfigAPI.imgUrl + item.fileId} alt="" style={{ width: '100%', borderRadius: '0.4rem' }} />}
                    {(item.answers ?? []).map(ans => {
                        switch (item.type) {
                            case QuestionType.checkbox:
                                var checked = (userAnswer[item.id] ?? []).some(id => ans.id === id)
                                break;
                            case QuestionType.radio:
                                var checked = userAnswer[item.id] === ans.id
                                break;
                            default:
                                break;
                        }
                        if (checked) var checkedValue = ans.isCorrect
                        return <div key={ans.id} className="row" style={{ gap: '0.8rem', alignItems: 'start', pointerEvents: 'none' }}>
                            {item.type === QuestionType.radio ? <div style={{ paddingTop: '0.2rem' }}>
                                <RadioButton size={'1.6rem'} defaultChecked={checked || ans.isCorrect} activeColor={checkedValue != null ? checkedValue ? 'var(--success-color)' : 'var(--error-color)' : null} />
                            </div> : <div style={{ paddingTop: '0.2rem' }}>
                                <Checkbox
                                    value={checked || ans.isCorrect}
                                    size={'2rem'}
                                    style={{ borderRadius: '50%', backgroundColor: checkedValue != null ? checkedValue ? 'var(--success-color)' : 'var(--error-color)' : null }}
                                />
                            </div>}
                            <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                        </div>
                    })}
                </div>
            </div>
        })}
        <button type="button" onClick={() => {
            methods.reset()
            setUserAnswer(null)
        }} className="row button-primary">
            <div className="button-text-3">Reset</div>
        </button>
    </div> : <form className="col" style={{ gap: '1.2rem', alignItems: 'end' }}>
        {data.map((item, i) => {
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
                            {item.type === QuestionType.radio ? <div style={{ paddingTop: '0.2rem' }}>
                                <RadioButtonForm register={methods.register} size={'1.6rem'} name={item.id} value={ans.id} />
                            </div> : <div style={{ paddingTop: '0.2rem' }}>
                                <Checkbox
                                    value={methods.watch(item.id)?.some(id => id === ans.id)}
                                    size={'2rem'}
                                    onChange={(ev) => {
                                        let listValue = methods.getValues(item.id) ?? []
                                        if (ev) {
                                            listValue.push(ans.id)
                                        } else {
                                            listValue = listValue.filter(id => id !== ans.id)
                                        }
                                        methods.setValue(item.id, listValue)
                                    }}
                                />
                            </div>}
                            <Text className="label-4" maxLine={20} style={{ flex: 1, width: '100%' }}>{ans.content}</Text>
                        </div>
                    })}
                </div>
            </div>
        })}
        <button type="submit" onClick={methods.handleSubmit(submitAnswer)} className="row button-primary">
            <div className="button-text-3">Hoàn thành</div>
        </button>
    </form>
}