import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { QuestionType } from "../da";
import { CheckboxForm, ImportFileForm, RadioButtonForm, TextAreaForm, TextFieldForm } from "../../../../../project-component/component-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from "../../../../../Utils";
import { Text, closePopup } from "wini-web-components";
import { uploadFiles } from "../../../../baseDA";
import ConfigAPI from "../../../../../config/configApi";

const PopupAddEditQuizz = forwardRef(function PopupAddEditQuizz(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { question: '', type: QuestionType.radio.toString(), answers: [{ id: uuidv4() }] } })

    const onSubmit = (ev) => {
        ev.id ??= uuidv4()
        delete ev.file
        delete ev.isCorrect
        ev.type = parseInt(ev.type)
        if (data.onChange) data.onChange(ev)
        closePopup(ref)
    }

    useEffect(() => {
        if (data.questionItem) {
            Object.keys(data.questionItem).forEach(props => {
                if (data.questionItem[props]) {
                    if (props === 'type') {
                        methods.setValue(props, data.questionItem[props].toString())
                        if (data.questionItem[props] === QuestionType.radio) {
                            methods.setValue('isCorrect', data.questionItem.answers.find(e => e.isCorrect)?.id)
                        }
                    } else if (props === 'fileId') {
                        methods.setValue(props, data.questionItem[props])
                        methods.setValue('file', { url: ConfigAPI.imgUrl + data.questionItem[props], type: 'image' })
                    } else {
                        methods.setValue(props, data.questionItem[props])
                    }
                }
            })
        }
    }, [])

    return <form className="col" style={{ width: '70rem', flex: 1 }}>
        <div className="col" style={{ gap: '2rem', flex: 1, height: '100%', overflow: 'hidden auto', padding: '1.6rem 2.4rem' }}>
            <div className="row" style={{ gap: '2rem' }}>
                <RadioButtonForm
                    register={methods.register}
                    value={QuestionType.checkbox.toString()}
                    name={'type'}
                    size={'2rem'}
                    label={'Chọn nhiều đáp án'}
                />
                <RadioButtonForm
                    register={methods.register}
                    value={QuestionType.radio.toString()}
                    name={'type'}
                    size={'2rem'}
                    label={'Chọn 1 đáp án'}
                />
            </div>
            <TextAreaForm
                required
                register={methods.register}
                name={'question'}
                placeholder={'Nhập nội dung câu hỏi'}
                style={{ height: '10rem' }}
            />
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
                        }
                    })
                }}
            />
            <div className="label-3">Câu trả lời</div>
            <div className="col" style={{ gap: '1.2rem' }}>
                {methods.watch('answers').map((ans, i) => {
                    return <div key={ans.id} className="row" style={{ gap: '1.2rem' }}>
                        {methods.watch('type') === QuestionType.checkbox.toString() ?
                            <CheckboxForm
                                control={methods.control}
                                radius="50%"
                                name={`answers[${i}].isCorrect`}
                                value={methods.watch(`answers[${i}].isCorrect`)}
                            /> :
                            <RadioButtonForm
                                register={methods.register}
                                name={`isCorrect`}
                                value={ans.id}
                                size={'2.4rem'}
                                onChange={(ev) => {
                                    if (ev.target.checked) {
                                        methods.setValue(`answers`, methods.getValues('answers').map(e => {
                                            if (e.id === ans.id) e.isCorrect = true
                                            else e.isCorrect = false
                                            return e
                                        }))
                                    }
                                }}
                            />
                        }
                        <div style={{ flex: 1, width: '100%' }}>
                            <TextFieldForm
                                register={methods.register}
                                name={`answers[${i}].content`}
                                placeholder={`Câu trả lời ${i + 1}`}
                            />
                        </div>
                        <button type="button"
                            style={{ visibility: methods.watch('answers').length > 1 ? 'visible' : 'hidden' }}
                            onClick={() => {
                                let listAnswer = methods.getValues('answers')
                                methods.setValue('answers', [...listAnswer.slice(0, i), ...listAnswer.slice(i + 1)])
                            }}
                        >
                            <FontAwesomeIcon icon={faMinusCircle} style={{ fontSize: '1.6rem', color: "#E14337" }} /></button>
                    </div>
                })}
                <button type="button" className="row button-grey" onClick={() => {
                    methods.setValue('answers', [...methods.getValues('answers'), { id: uuidv4() }])
                }}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem' }} />
                    <div className="button-text-3">Thêm câu trả lời</div>
                </button>
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button
                type="button"
                className={`submit-popup-btn button-text-3 ${methods.watch('question').trim().length && methods.watch('answers').some(e => e.isCorrect) ? 'active' : ''}`}
                onClick={methods.handleSubmit(onSubmit)}>{data.questionItem ? 'Xác nhận' : 'Tạo mới'}</button>
        </div>
    </form>
})

export default PopupAddEditQuizz