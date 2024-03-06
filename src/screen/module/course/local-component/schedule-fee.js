import { useForm } from "react-hook-form"
import { Popup, Text, closePopup, showPopup } from "../../../../component/export-component"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CheckboxForm, TextFieldForm } from "../../../../project-component/component-form"
import { FilledEdit, FilledTrashCan } from "../../../../assets/const/icon"
import { uuidv4 } from "../../../../Utils"
import { forwardRef, useRef } from "react"

export default function ScheduleFee({ data }) {
    const ref = useRef()
    const { control, formState: { errors }, watch, setValue, getValues, handleSubmit, } = useForm({
        shouldFocusError: false, defaultValues: {
            mentorList: [
                { id: uuidv4(), name: 'Gói học kèm mentor', fee: '500.000đ', schedule: 'Thứ Ba, 19:00 - 21:00\nThứ Năm, 19:00 - 21:00\nChủ Nhật, 19:00 - 21:00' }
            ]
        }
    })

    const showPopupMentorPack = (item) => {
        showPopup({
            ref: ref,
            style: { width: '78%', maxHeight: '84%' },
            heading: <div className="heading-7 popup-header">{item ? 'Chỉnh sửa' : 'Thêm'} gói mentor</div>,
            content: <PopupAddNewMentorPack ref={ref} item={item} />
        })
    }

    return <div className="col" style={{ gap: '2.4rem', width: '44.4rem' }}>
        <Popup ref={ref} />
        <div className="row" style={{ gap: '1.6rem' }}>
            <Text className="heading-5">Lịch học và học phí</Text>
            <button type="button" className="row"
                style={{ backgroundColor: 'var(--background)', borderRadius: '2.4rem', padding: '0.6rem 1.2rem', gap: '0.8rem', width: 'fit-content' }}
                onClick={() => { showPopupMentorPack() }}
            >
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem', color: '#00204D99' }} />
                <div className="button-text-3" style={{ color: '#00204D99' }} >Thêm mục tiêu</div>
            </button>
        </div>
        <TextFieldForm
            required
            control={control}
            errors={errors}
            name={'fee'}
            value={watch('fee')}
            label={'Học phí'}
            placeholder={'Nhập giá'}
            suffix={<div className="row"
                style={{ padding: '0 1.6rem', height: '100%', background: 'var(--background)', position: 'absolute', right: 0, borderLeft: '1px solid #00358033' }}
            ><Text className="button-text-3">VND</Text></div>}
        />
        {watch('mentorList').map((e, i) => {
            return <div key={e.id} className="row" style={{ padding: '1.6rem', borderRadius: '0.8rem', backgroundColor: '#F9FAFB', alignItems: 'start' }}>
                <div className="col" style={{ flex: 1, width: '100%', gap: '2.4rem' }}>
                    <Text className="heading-7">{e.name}</Text>
                    <div className="col">
                        <div className="label-5">Phí mentor</div>
                        <Text className="heading-6" style={{ '--max-line': 1 }}>{e.fee}</Text>
                    </div>
                    <div className="col">
                        <div className="label-5">Lịch mentor</div>
                        <div className="heading-8" >{e.schedule}</div>
                    </div>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <button type="button"><FilledEdit /></button>
                    <button type="button"><FilledTrashCan /></button>
                </div>
            </div>
        })}
    </div>
}

const PopupAddNewMentorPack = forwardRef(function PopupAddNewMentorPack(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: data?.item?.name ?? '', fee: data?.item?.fee } })

    const onSubmit = (ev) => {
        console.log(ev)
    }

    return <form className="col" style={{flex: 1, width: '100%', height: '100%'}}>
        <div className="popup-body row" style={{ padding: '1.6rem 2.4rem', gap: '5.6rem', height: '100%', alignItems: 'start' }} >
            <div className="col" style={{ flex: 1, gap: '2rem', overflow: 'hidden auto', height: '100%' }}>
                <TextFieldForm
                    required
                    name={'name'}
                    label={'Tên gói mentor'}
                    control={methods.control}
                    errors={methods.errors}
                    value={methods.watch('name')}
                    placeholder="Nhập tên gói mentor"
                />
                <TextFieldForm
                    required
                    control={methods.control}
                    errors={methods.errors}
                    name={'fee'}
                    value={methods.watch('fee')}
                    label={'Phí mentor'}
                    placeholder={'Nhập mức phí'}
                    suffix={<div className="row"
                        style={{ padding: '0 1.6rem', height: '100%', background: 'var(--background)', position: 'absolute', right: 0, borderLeft: '1px solid #00358033' }}
                    ><Text className="button-text-3">VND</Text></div>}
                />
                <Text className="label-3">Thời gian bạn có thể mentor cho course này</Text>
                <div className="col" style={{ gap: '0.8rem' }}>
                    {Array.from({ length: 7 }).map((e, i) => {
                        switch (i) {
                            case 0:
                                var weekDay = 'Thứ 2'
                                break;
                            case 1:
                                weekDay = 'Thứ 3'
                                break;
                            case 2:
                                weekDay = 'Thứ 3'
                                break;
                            case 3:
                                weekDay = 'Thứ 4'
                                break;
                            case 4:
                                weekDay = 'Thứ 5'
                                break;
                            case 5:
                                weekDay = 'Thứ 6'
                                break;
                            case 6:
                                weekDay = 'Thứ 7'
                            case 7:
                                weekDay = 'Chủ nhật'
                                break;
                            default:
                                break;
                        }
                        return <div key={i} className="row" style={{ padding: '1.2rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                            <CheckboxForm
                                size={'1.6rem'}
                                label={weekDay}
                                value={true}
                                control={methods.control}
                                name={`weekday${i}`}
                            />
                        </div>
                    })}
                </div>
            </div>
            <div className="col" style={{ flex: 2, height: '100rem', overflow: 'hidden auto' }}></div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length && methods.watch('fee')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>{data?.item ? 'Lưu' : 'Tạo mới'}</button>
        </div>
    </form>
})