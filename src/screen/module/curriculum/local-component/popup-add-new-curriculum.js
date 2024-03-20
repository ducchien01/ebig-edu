import { forwardRef } from "react"
import { Text, closePopup } from "../../../../component/export-component"
import { useForm } from "react-hook-form"
import { Select1Form, TextFieldForm } from "../../../../project-component/component-form"

const PopupAddNewCurriculumn = forwardRef(function PopupAddNewCurriculumn(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })

    const onSubmit = (ev) => {
        console.log(ev)
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem', gap: '2rem' }}>
            <TextFieldForm label={'Tên giáo trình'} register={methods.register} placeholder={'Đặt tên cho giáo trình của bạn'} name={'name'} />
            <Select1Form label={'Phân loại chủ đề'} control={methods.control} placeholder={'Chọn chủ đề'} name={'category'} />
            <Select1Form label={'Tag chủ đề (Tối đa 5)'} control={methods.control} placeholder={'Chọn chủ đề được gán thẻ'} name={'top'} />
            <Select1Form label={'Trình độ'} control={methods.control} name={'level'} />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})

export default PopupAddNewCurriculumn