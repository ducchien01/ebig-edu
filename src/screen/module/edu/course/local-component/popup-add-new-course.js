import { forwardRef } from "react"
import { Text, closePopup } from "../../../../../component/export-component"
import { useForm } from "react-hook-form"
import { TextFieldForm } from "../../../../../project-component/component-form"
import { useNavigate } from "react-router-dom"
import { CourseController } from "../controller"
import { CourseStatus } from "../da"
import { uuidv4 } from "../../../../../Utils"

const PopupAddNewCourse = forwardRef(function PopupAddNewCourse(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })
    const navigate = useNavigate()

    const onSubmit = (ev) => {
        console.log(ev)
        CourseController.add({ id: uuidv4(), name: ev.name.trim(), status: CourseStatus.draft, centerId: data.centerId, customerId: data.customerId }).then(id => {
            navigate('/center/course/overview/' + id)
        })
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem' }}>
            <TextFieldForm
                name={'name'}
                register={methods.register}
                value={methods.watch('name')}
                placeholder="Nhập tên cho khóa học của bạn"
            />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name').trim().length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})

export default PopupAddNewCourse