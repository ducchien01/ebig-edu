import { forwardRef } from "react"
import { Text, closePopup } from "../../../../component/export-component"
import { useForm } from "react-hook-form"
import { TextFieldForm } from "../../../../project-component/component-form"

const PopupAddNewClass = forwardRef(function PopupAddNewClass(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })

    const onSubmit = (ev) => {
        console.log(ev)
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem' }}>
            <TextFieldForm
                required={true}
                name={'name'}
                register={methods.register}
                errors={methods.formState.errors}
                helperText={'Vui lòng nhập tên lớp học mới'}
                placeholder="Nhập tên cho lớp học của bạn"
            />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})

export default PopupAddNewClass