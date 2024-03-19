import { useForm } from "react-hook-form"
import { Popup, Text, closePopup, showPopup } from "../../../../component/export-component"
import { faArrowRight, faPlus, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CheckboxForm, TextFieldForm } from "../../../../project-component/component-form"
import { FilledEdit, FilledTrashCan } from "../../../../assets/const/icon"
import { forwardRef, useEffect, useRef, useState } from "react"
import WeekCalendar from "../../../../project-component/week-calendar"
import { Ultis, uuidv4 } from "../../../../Utils"
import { MentorController } from "../../mentor/controller"
import InputTime from "../../../../project-component/input-time"

export default function ScheduleFee({ data, onChangeRequired }) {
    const ref = useRef()
    const { control, formState: { errors }, watch, setValue, } = useForm({
        shouldFocusError: false, defaultValues: {}
    })
    const [mentorList, setMentorList] = useState([])

    const showPopupMentorPack = (item) => {
        showPopup({
            ref: ref,
            style: { width: '78%', maxHeight: '84%' },
            heading: <div className="heading-7 popup-header">{item ? 'Chỉnh sửa' : 'Thêm'} gói mentor</div>,
            content: <PopupAddNewMentorPack ref={ref} mentorItem={item} />
        })
    }

    useEffect(() => {
        if (data) {
            MentorController.getListSimple({ take: 100, filter: [{ key: 'courseId', value: data.id }] }).then(res => {
                if (res) setMentorList(res)
            })
            if (data.price != null) {
                setValue('price', Ultis.money(data.price))
            }
        }
    }, [data])

    return <div className="col" style={{ width: '100%', height: '100%', flex: 1 }}>
        <Popup ref={ref} />
        <div className="row" style={{ gap: '1.6rem', padding: '2.4rem' }}>
            <Text className="heading-5">Lịch học và học phí</Text>
            <button type="button" className="row button-grey" onClick={showPopupMentorPack}>
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                <div className="button-text-3">Thêm gói mentor</div>
            </button>
        </div>
        <div className="col fee-schedule-view" >
            <TextFieldForm
                required
                control={control}
                errors={errors}
                name={'price'}
                value={watch('price')}
                label={'Học phí'}
                placeholder={'Nhập giá'}
                onBlur={(ev) => {
                    if (ev.target.value?.trim()?.length) {
                        onChangeRequired({
                            ...data,
                            price: parseFloat(ev.target.value)
                        })
                    }
                }}
                suffix={
                    <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--background)', position: 'absolute', right: 0, borderLeft: 'var(--border-grey1)' }} >
                        <Text className="button-text-3">VND</Text>
                    </div>
                }
            />
            {mentorList.map((e, i) => {
                return <div key={e.id} className="row" style={{ padding: '1.6rem', borderRadius: '0.8rem', backgroundColor: '#F9FAFB', alignItems: 'start' }}>
                    <div className="col" style={{ flex: 1, width: '100%', gap: '2.4rem' }}>
                        <Text className="heading-7">{e.name}</Text>
                        <div className="col">
                            <div className="label-5">Phí mentor</div>
                            <Text className="heading-6" maxLine={1}>{Ultis.money(e.price)}</Text>
                        </div>
                        <div className="col">
                            <div className="label-5">Lịch mentor</div>
                            <div className="heading-8" >{e.schedule}</div>
                        </div>
                    </div>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <button type="button" onClick={() => showPopupMentorPack(e)}><FilledEdit /></button>
                        <button type="button"><FilledTrashCan /></button>
                    </div>
                </div>
            })}
        </div>
    </div>
}

const PopupAddNewMentorPack = forwardRef(function PopupAddNewMentorPack(data, ref) {
    const methods = useForm({ shouldFocusError: false })
    const [mentorSchedule, setMentorSchedule] = useState([])

    const onSubmit = async (ev) => {
        let mentorCourseItem = data.mentorItem ? { ...data.mentorItem, ...ev } : ev
        mentorCourseItem.schedule = JSON.stringify(mentorSchedule)
        if (data.mentorItem) {
            await MentorController.edit(mentorCourseItem)
        } else {
            await MentorController.add(mentorCourseItem)
        }
        closePopup(ref)
    }

    useEffect(() => {
        if (data.mentorItem) {
            Object.keys(data.mentorItem).forEach(props => {
                if (data.mentorItem[props]) {
                    if (props === 'schedule') {
                        setMentorSchedule(JSON.parse(data.mentorItem[props]))
                    } else {
                        methods.setValue(props, data.mentorItem[props])
                    }
                }
            })
        }
    }, [])

    return <form className="col" style={{ flex: 1, width: '100%', height: '100%' }}>
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
                    name={'price'}
                    value={methods.watch('price')}
                    label={'Phí mentor'}
                    placeholder={'Nhập mức phí'}
                    suffix={
                        <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--background)', position: 'absolute', right: 0, borderLeft: '1px solid #00358033' }} >
                            <Text className="button-text-3">VND</Text>
                        </div>
                    }
                />
                <Text className="label-3">Thời gian bạn có thể mentor cho course này</Text>
                <div className="col" style={{ gap: '0.8rem' }}>
                    {Array.from({ length: 7 }).map((_, i) => {
                        switch (i) {
                            case 0:
                                var weekDay = 'Chủ nhật'
                                break;
                            case 1:
                                weekDay = 'Thứ 2'
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
                                break;
                            default:
                                break;
                        }
                        const daySchedule = mentorSchedule.filter(e => (new Date(e.time)).getDay() === i)
                        return <div key={i} className="row" style={{ padding: '1.2rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)', gap: '0.8rem', alignItems: 'start' }}>
                            <CheckboxForm
                                size={'1.6rem'}
                                label={weekDay}
                                value={daySchedule.length > 0}
                                control={methods.control}
                                name={`weekday${i}`}
                                onChange={(ev) => {
                                    let updateSchedule = mentorSchedule
                                    if (ev) {
                                        if (data.mentorItem?.schedule) {
                                            var initData = JSON.parse(data.mentorItem.schedule).filter(e => (new Date(e.time)).getDay() === i)
                                        } else {
                                            var newTime = new Date()
                                            newTime.setDate(newTime.getDate() + i - newTime.getDay())
                                        }
                                        updateSchedule.push(...(initData ?? [{ time: newTime.getTime() }]))
                                    } else {
                                        updateSchedule = updateSchedule.filter(e => (new Date(e.time)).getDay() !== i)
                                    }
                                    setMentorSchedule([...updateSchedule])
                                }}
                            />
                            {daySchedule.length ? <div className="col list-lesson-time-range" >
                                {daySchedule.map((lesson, j) => {
                                    let startTime = new Date(lesson.time)
                                    if (lesson.duration) {
                                        var endTime = new Date(lesson.time)
                                        endTime.setMinutes(endTime.getMinutes() + lesson.duration)
                                    } else if (lesson.duration === 0) {
                                        var helperText = 'Thời gian kết thúc phải sau thời gian bắt đầu'
                                    }
                                    return <div key={uuidv4()} className="row lesson-time-range-container">
                                        <InputTime
                                            style={{ flex: 1 }}
                                            defaultValue={startTime ? `${startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:${startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}` : ''}
                                            onChange={(hValue, mValue) => {
                                                startTime.setHours(hValue)
                                                startTime.setMinutes(mValue)
                                                lesson.time = startTime.getTime()
                                                if (lesson.time >= endTime.getTime()) {
                                                    lesson.duration = 0
                                                } else {
                                                    lesson.duration = Ultis.differenceInMinutes(startTime, endTime)
                                                }
                                                setMentorSchedule([...mentorSchedule])
                                            }}
                                        />
                                        <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.2rem', color: '#00204D99' }} />
                                        <InputTime
                                            style={{ flex: 1 }}
                                            helperText={helperText}
                                            defaultValue={endTime ? `${endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()}:${endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()}` : ''}
                                            onChange={(hValue, mValue) => {
                                                endTime ??= new Date(lesson.time)
                                                endTime.setHours(hValue)
                                                endTime.setMinutes(mValue)
                                                if (lesson.time >= endTime.getTime()) {
                                                    lesson.duration = 0
                                                } else {
                                                    lesson.duration = Ultis.differenceInMinutes(startTime, endTime)
                                                }
                                                setMentorSchedule([...mentorSchedule])
                                            }}
                                        />
                                        {j > 0 ? <button type="button" onClick={() => {
                                            setMentorSchedule(mentorSchedule.filter(e => e.time !== lesson.time))
                                        }} className="delete-tim-range row"><FontAwesomeIcon icon={faXmark} style={{ color: "#00204D99", fontSize: '1.4rem' }} /></button> : null}
                                    </div>
                                })}
                                <button type="button" onClick={() => {
                                    let newTime = new Date()
                                    newTime.setDate(newTime.getDate() + i - newTime.getDay())
                                    setMentorSchedule([...mentorSchedule, { time: newTime.getTime() }])
                                }} className="row button-grey" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ffffff' }}>
                                    <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                                    <Text className="button-text-3">Thêm khung giờ</Text>
                                </button>
                            </div> : null}
                        </div>
                    })}
                </div>
            </div>
            <div className="col" style={{ flex: 2, width: '100%' }}>
                <WeekCalendar titleOnlyWeekDay={true} listData={mentorSchedule} renderUIInTime={(element) => {
                    if (!element.duration) return <div></div>
                    let convertTime = typeof element.time === 'number' ? (new Date(element.time)) : element.time
                    let endTime = new Date(convertTime.getTime())
                    endTime.setMinutes(endTime.getMinutes() + element.duration)
                    return <div className="col display-mentor-time-container" >
                        <Text className="heading-9" >
                            {`${convertTime.getHours() < 10 ? `0${convertTime.getHours()}` : convertTime.getHours()}:${convertTime.getMinutes() < 10 ? `0${convertTime.getMinutes()}` : convertTime.getMinutes()}-${endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()}:${endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()}`}
                        </Text>
                    </div>
                }} />
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length && methods.watch('fee')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>{data?.item ? 'Lưu' : 'Tạo mới'}</button>
        </div>
    </form>
})