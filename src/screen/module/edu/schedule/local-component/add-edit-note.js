import { forwardRef } from "react"
import { DatePicker, Select1, Text, TextField, closePopup } from "../../../../../component/export-component"
import { useForm } from "react-hook-form"
import { RadioButtonForm, Select1Form, TextFieldForm } from "../../../../../project-component/component-form"

const PopupAddEditNote = forwardRef(function PopupAddEditNote(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { 'autoTimeUnit': 'phút', 'timeNote': 'auto' } })

    const onSubmit = (ev) => {
        console.log(ev)
    }

    return <form className="col" style={{ width: '52rem', flex: 1, maxHeight: '69rem' }}>
        <div className="popup-body col" style={{ overflow: 'hidden auto', padding: '1.6rem 2.4rem', rowGap: '2rem' }}>
            <TextFieldForm label={'Tiêu đề lời nhắc'} required={true} register={methods.register} errors={methods.formState.errors} name={'name'} />
            <Select1Form label={'Khóa học'} required={true} control={methods.control} errors={methods.formState.errors} name={'courseId'} />
            <Select1Form label={'Bài học'} control={methods.control} name={'lesson'} />
            <div className="col" style={{ gap: 8 }}>
                <Text className="label-3">Thời gian nhắc nhở</Text>
                <RadioButtonForm label={'Tự động'} register={methods.register} name="timeNote" value={'auto'} />
                {methods.watch('timeNote') === 'auto' ? <div className="row" style={{ gap: '0.8rem' }}>
                    <Select1
                        className="body-3"
                        placeholder="Chọn thời điểm"
                        options={[]}
                        style={{ flex: 2, width: '100%' }}
                    />
                    <TextField className="body-3" placeholder={`Số ${methods.watch('autoTimeUnit')}`} type="number" style={{ flex: 1, width: '100%' }} />
                    <Select1
                        className="body-3"
                        value={methods.watch('autoTimeUnit')}
                        style={{ flex: 1, width: '100%' }}
                        options={[{ id: 'phút', name: 'phút' }, { id: 'giờ', name: 'giờ' }, { id: 'ngày', name: 'ngày' }]}
                        onChange={(vl) => {
                            methods.setValue('autoTimeUnit', vl.id)
                        }}
                    />
                </div> : null}
                <RadioButtonForm label={'Tự nhập thời gian'} register={methods.register} name="timeNote" value={'custom'} />
                {methods.watch('timeNote') === 'custom' ? <div className="row" style={{ gap: '0.8rem' }}>
                    <TextField placeholder="hh:mm" className="body-3" />
                    <DatePicker placeholder="Chọn ngày" />
                </div> : null}
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className="submit-popup-btn button-text-3" onClick={methods.handleSubmit(onSubmit)}>Tạo nhắc nhở</button>
        </div>
    </form>
})

export default PopupAddEditNote