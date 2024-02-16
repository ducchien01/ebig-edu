import { forwardRef } from "react"
import { Text, TextField, closePopup } from "../../../../component/export-component"
import { useForm } from "react-hook-form"

const PopupAddNewCourse = forwardRef(function PopupAddNewCourse(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })

    const onSubmit = (ev) => {
        console.log(ev)
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem' }}>
            <TextField
                value={methods.watch('name')}
                style={{ width: '100%' }}
                onChange={(ev) => {
                    methods.setValue('name', ev.target.value.trim())
                }}
                placeholder="Nhập tên cho khóa học của bạn"
            />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})

export default PopupAddNewCourse