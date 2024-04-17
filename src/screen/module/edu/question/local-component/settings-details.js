import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { QuestionController } from "../controller"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FilledEdit, FilledSettings, FilledTrashCan } from "../../../../../assets/const/icon"
import { ImportFileForm, RadioButtonForm, Select1Form, SelectMultipleForm, TextAreaForm, TextFieldForm } from "../../../../../project-component/component-form"
import { useForm } from "react-hook-form"
import { QuestionType } from "../../lesson/da"
import ConfigAPI from "../../../../../config/configApi"
import { uuidv4 } from "../../../../../Utils"
import { uploadFiles } from "../../../../baseDA"
import { TextField } from "../../../../../component/export-component"

export default function SettingsQuestion() {
    const { id } = useParams()
    const methods = useForm({ shouldFocusError: false, defaultValues: { question: '', type: QuestionType.radio.toString(), answers: [{ id: uuidv4() }, { id: uuidv4() }, { id: uuidv4() }] } })
    const [data, setData] = useState()
    const [editName, setEditName] = useState()


    const onChangeData = () => {
        let newData = methods.getValues()
        newData.type = parseInt(newData.type)
        newData.answers = newData.answers.filter(e => e.content?.trim()?.length)
        if (newData.correctAnswer?.length) {
            var ans = newData.correctAnswer
            switch (newData.type) {
                case QuestionType.radio:
                    if (typeof ans !== 'string') {
                        ans = ans[0]?.id
                        methods.setValue('correctAnswer', ans)
                    }
                    break;
                default:
                    if (typeof ans === 'string') {
                        methods.setValue('correctAnswer', newData.answers.filter(e => e.id === ans).map(e => {
                            return {
                                id: e.id,
                                name: e.content
                            }
                        }))
                        ans = [ans]
                    } else
                        ans = ans.map(e => e.id)
                    break;
            }
        }
        delete newData.correctAnswer
        let newQuestionItem = { ...data, content: JSON.stringify(newData), answer: typeof ans !== 'string' ? JSON.stringify(ans) : ans }
        QuestionController.edit(newQuestionItem).then(res => {
            if (res) setData(newQuestionItem)
        })
    }

    const renderCorrectAnswer = () => {
        const options = methods.watch('answers').filter((_, i) => methods.watch(`answers[${i}].content`)?.length).map(e => {
            return {
                id: e.id,
                name: e.content
            }
        })
        switch (methods.watch('type')) {
            case QuestionType.radio.toString():
                return <Select1Form
                    label={'Đáp án'}
                    name={'correctAnswer'}
                    control={methods.control}
                    value={methods.watch('correctAnswer')}
                    options={options}
                    onChange={onChangeData}
                />
            default:
                var value = methods.watch('correctAnswer')?.length && typeof methods.watch('correctAnswer') === 'string' ? options.filter(e => e.id === methods.watch('correctAnswer')) : methods.watch('correctAnswer')
                return <SelectMultipleForm
                    label={'Đáp án'}
                    name={'correctAnswer'}
                    control={methods.control}
                    value={value}
                    options={options}
                    onChange={onChangeData}
                />
        }
    }

    useEffect(() => {
        QuestionController.getById(id).then(res => {
            if (res) {
                setData(res)
                if (res.content?.length) {
                    try {
                        var question = JSON.parse(res.content)
                    } catch (error) {
                        console.log(error)
                    }
                }
                if (question) Object.keys(question).forEach(props => {
                    if (question[props]) {
                        if (props === 'type') {
                            methods.setValue(props, question[props].toString())
                        } else if (props === 'fileId') {
                            methods.setValue(props, question[props])
                            methods.setValue('file', { url: ConfigAPI.imgUrl + question[props], type: 'image' })
                        } else {
                            methods.setValue(props, question[props])
                            if (props === 'answers' && res.answer?.length) {
                                switch (question.type) {
                                    case QuestionType.radio:
                                        methods.setValue('correctAnswer', res.answer)
                                        break;
                                    default:
                                        const listCorrectAns = JSON.parse(res.answer)
                                        methods.setValue('correctAnswer', question.answers.filter(e => listCorrectAns.some(id => id === e.id)).map(e => {
                                            return {
                                                id: e.id,
                                                name: e.content
                                            }
                                        }))
                                        break;
                                }
                            }
                        }
                    }
                })
            }
        })
    }, [])

    return <div className="col" style={{ width: '100%', maxWidth: '106.8rem', height: 'fit-content', gap: '3.2rem', padding: '3.2rem' }}>
        <div className='details-view-header row' >
            <div className='col header-breadcum' style={{ gap: '0.4rem' }}>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách câu hỏi</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                    <div className='button-text-6 selected'>Chỉnh sửa câu hỏi</div>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    {editName != null ? <TextField
                        autoFocus
                        defaultValue={data?.name}
                        className="heading-6"
                        onChange={(ev) => { setEditName(ev.target.value.trim() ?? '') }}
                    /> : <div className='heading-6 row' style={{ padding: '1rem 0' }}>{data?.name}</div>}
                    <button type="button" className="row icon-button24" onClick={async () => {
                        if (editName != null) {
                            if (editName.length) {
                                const res = await QuestionController.edit({ ...data, name: editName })
                                if (res) setData({ ...data, name: editName })
                            }
                            setEditName(null)
                        } else {
                            setEditName(data?.name)
                        }
                    }}>{editName != null ? <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.8rem', color: 'var(--success-color)' }} /> : <FilledEdit width="2rem" height="2rem" />}</button>
                </div>
            </div>
        </div>
        <form className='col' style={{ width: '100%', gap: '1.6rem', height: 'fit-content', }}>
            <TextAreaForm
                required
                label={'Câu hỏi'}
                name={'question'}
                register={methods.register}
                errors={methods.error}
                placeholder={'Nhập nội dung câu hỏi'}
                onBlur={(ev) => {
                    if (ev.target.value) onChangeData()
                    else {
                        if (data.content?.length) {
                            try {
                                var jsonData = JSON.parse(data.content)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        if (jsonData) methods.setValue('question', jsonData.question ?? '')
                    }
                }}
            />
            <div className="row" style={{ gap: '2rem' }}>
                <RadioButtonForm
                    register={methods.register}
                    value={QuestionType.checkbox.toString()}
                    name={'type'}
                    size={'2rem'}
                    label={'Chọn nhiều đáp án'}
                    onChange={onChangeData}
                />
                <RadioButtonForm
                    register={methods.register}
                    value={QuestionType.radio.toString()}
                    name={'type'}
                    size={'2rem'}
                    label={'Chọn 1 đáp án'}
                    onChange={onChangeData}
                />
            </div>
            <ImportFileForm
                control={methods.control}
                name={'file'}
                value={methods.watch('file')}
                allowType={['image/jpg', 'image/png', 'image/jpeg']}
                subTitle={'1840x380 pixels (PNG, JPG)'}
                width={'100%'}
                title={'Thêm hình ảnh'}
                onChange={(newFile) => {
                    uploadFiles([newFile]).then(res => {
                        if (res) {
                            methods.setValue('fileId', res[0].id)
                            methods.setValue('file', { url: ConfigAPI.imgUrl + res[0].id, type: 'image' })
                            onChangeData()
                        }
                    })
                }}
            />
            <div className="col" style={{ gap: '1.2rem' }}>
                {methods.watch('answers').map((ans, i) => {
                    return <div key={ans.id} className="row" style={{ gap: '1.2rem' }}>
                        <div style={{ flex: 1, width: '100%' }}>
                            <TextFieldForm
                                required
                                className={'row'}
                                label={`Đáp án ${i + 1 > 9 ? (i + 1) : `0${i + 1}`}`}
                                register={methods.register}
                                name={`answers[${i}].content`}
                                placeholder={`Câu trả lời ${i + 1}`}
                                onBlur={onChangeData}
                            />
                        </div>
                        <button type="button"
                            style={{ visibility: methods.watch('answers').length > 1 ? 'visible' : 'hidden' }}
                            onClick={() => {
                                let listAnswer = methods.getValues('answers')
                                methods.setValue('answers', [...listAnswer.slice(0, i), ...listAnswer.slice(i + 1)])
                                if (methods.getValues(`answers[${i}].content`)?.length) onChangeData()
                            }}
                        >
                            <FilledTrashCan width="2rem" height="2rem" />
                        </button>
                    </div>
                })}
            </div>
            <button type="button" className="row"
                style={{ width: '100%', borderRadius: '0.8rem', border: '1px dashed #00358033', padding: '0.9rem 1.2rem', gap: '0.8rem', justifyContent: 'center' }}
                onClick={() => {
                    methods.setValue('answers', [...methods.getValues('answers'), { id: uuidv4() }])
                }}>
                <FilledSettings />
                <div className="button-text-3">Thêm câu trả lời</div>
            </button>
            <div className="col" style={{ paddingTop: '0.8rem' }}>
                {renderCorrectAnswer()}
            </div>
        </form>
    </div>
}