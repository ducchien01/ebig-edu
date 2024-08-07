import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ExamController, QuestionController } from "../controller"
import { TextFieldForm } from "../../../../../project-component/component-form"
import { Text, ToastMessage, closePopup } from "wini-web-components"
import { uuidv4 } from "../../../../../Utils"
import { LessonType } from "../../lesson/da"

const PopupAddNewQuestion = forwardRef(function PopupAddNewQuestion(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })
    const navigate = useNavigate()

    const onSubmit = (ev) => {
        console.log(ev)
        QuestionController.add({ id: uuidv4(), name: ev.name.trim(), type: LessonType.examTask, centerId: data.centerId }).then(id => {
            if(id) {
                ToastMessage.success('Tạo mới câu hỏi thành công')
                navigate('details/' + id)
            }
        })
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem' }}>
            <TextFieldForm
                name={'name'}
                register={methods.register}
                value={methods.watch('name')}
                placeholder="Nhập tiêu đề câu hỏi"
            />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name').trim().length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})

export default PopupAddNewQuestion