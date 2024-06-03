import { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import WeekCalendar from "../../../../../project-component/week-calendar"
import { Checkbox, RadioButton, Text, ToastMessage, closePopup } from "../../../../../component/export-component"
import { TextFieldForm } from "../../../../../project-component/component-form"
import { Ultis, uuidv4 } from "../../../../../Utils"
import InputTime from "../../../../../project-component/input-time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { differenceInMinutes } from "date-fns"
import { MentorController } from "../controller"
import { useSelector } from "react-redux"

const PopupSettingsMentor = forwardRef(function PopupSettingsMentor(data, ref) {
    const userInfor = useSelector((state) => state.account.data)
    const _now = new Date()
    const methods = useForm({ shouldFocusError: false, defaultValues: { schedule: [] } })

    const renderWeekDaySchedule = (i) => {
        switch (i) {
            case 0:
                var dayWeekTitle = 'Chủ nhật'
                break;
            case 1:
                dayWeekTitle = 'Thứ 2'
                break;
            case 2:
                dayWeekTitle = 'Thứ 3'
                break;
            case 3:
                dayWeekTitle = 'Thứ 4'
                break;
            case 4:
                dayWeekTitle = 'Thứ 5'
                break;
            case 5:
                dayWeekTitle = 'Thứ 6'
                break;
            case 6:
                dayWeekTitle = 'Thứ 7'
                break;
            default:
                break;
        }
        const dayWeekValues = methods.watch('schedule').filter(e => (new Date(e.time)).getDay() === i)
        return <div key={'dw-' + i} className="row" style={{ gap: '0.8rem', padding: '1.6rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)', alignItems: 'start' }}>
            <div className="row" style={{ gap: '0.4rem', width: '8.8rem' }}>
                {data.mentorItem ? <RadioButton
                    size={'1.8rem'}
                    defaultChecked={dayWeekValues.length > 0 || (new Date(data.mentorItem.startDate).getDay() === i)}
                    value={i}
                    name="weekday"
                    onChange={(vl) => {
                        if (vl) {
                            methods.setValue('schedule', [{ time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + i - _now.getDay(), 7, 0)).getTime(), duration: 30 }])
                        }
                    }}
                /> : <Checkbox value={dayWeekValues.length > 0} size={'1.6rem'} onChange={(vl) => {
                    let schedule = methods.getValues('schedule')
                    if (vl) {
                        schedule.push({ id: uuidv4(), time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + i - _now.getDay(), 7, 0)).getTime(), duration: 30 })
                    } else {
                        schedule = schedule.filter(e => (new Date(e.time)).getDay() !== i)
                    }
                    methods.setValue('schedule', schedule)
                }} />}
                <Text className="label-3">{dayWeekTitle}</Text>
            </div>
            {dayWeekValues.length > 0 ? <div className="col" style={{ overflow: 'visible', flex: 1, gap: '1.2rem' }}>
                {dayWeekValues.map((timeItem, j) => {
                    let startTime = new Date(timeItem.time)
                    let endTime = new Date(timeItem.time)
                    endTime.setMinutes(endTime.getMinutes() + timeItem.duration)
                    return <div key={timeItem.id ?? timeItem.time} className="row input-time-range-container" >
                        <InputTime
                            style={{ flex: 1 }}
                            defaultValue={startTime ? `${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}` : '07:00'}
                            onChange={(hoursVl, minVl) => {
                                startTime.setHours(hoursVl)
                                startTime.setMinutes(minVl)
                                let schedule = methods.getValues('schedule')
                                methods.setValue('schedule', schedule.map(e => {
                                    if (e.id === timeItem.id) {
                                        e.time = startTime.getTime()
                                        startTime.setMinutes(startTime.getMinutes() + e.duration)
                                        if (startTime.getDay() !== i) {
                                            e.duration = differenceInMinutes(endTime, new Date(e.time))
                                        }
                                    }
                                    return e
                                }))
                            }}
                        />
                        <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.4rem', color: '#00204D66' }} />
                        <InputTime
                            style={{ flex: 1 }}
                            className={'input-end-time'}
                            defaultValue={endTime ? `${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}` : '07:00'}
                            helperText={timeItem.duration < 0 ? 'Giờ kết thúc phải lớn hơn giờ bắt đầu' : null}
                            onChange={(hoursVl, minVl) => {
                                endTime.setHours(hoursVl)
                                endTime.setMinutes(minVl)
                                let schedule = methods.getValues('schedule')
                                methods.setValue('schedule', schedule.map(e => {
                                    if (e.id === timeItem.id) e.duration = differenceInMinutes(endTime, startTime)
                                    return e
                                }))
                            }}
                        />
                        {j > 0 ? <button onClick={() => {
                            let schedule = methods.getValues('schedule')
                            schedule = schedule.filter(e => e.id !== timeItem.id)
                            methods.setValue('schedule', schedule)
                        }} className="icon-button24 row">
                            <FontAwesomeIcon icon={faXmark} />
                        </button> : null}
                    </div>
                })}
                {data.mentorItem ? null : <button type="button" onClick={() => {
                    let schedule = methods.getValues('schedule')
                    const lastEndInDay = Math.max(...dayWeekValues.map(function (e) {
                        let _t = new Date(e.time)
                        _t.setMinutes(_t.getMinutes() + e.duration)
                        return _t.getTime()
                    }))
                    let newTime = new Date(lastEndInDay)
                    newTime.setMinutes(newTime.getMinutes() + 90)
                    if (newTime.getDay() === i) {
                        newTime.setMinutes(newTime.getMinutes() - 30)
                        schedule.push({ id: uuidv4(), time: newTime.getTime(), duration: 30 })
                    } else {
                        schedule.push({ id: uuidv4(), time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + i - _now.getDay(), 7, 0)).getTime(), duration: 30 })
                    }
                    methods.setValue('schedule', schedule)
                }} className="row button-grey" style={{ marginTop: '0.4rem', backgroundColor: '#ffffff' }}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <div className="button-text-3">Thêm khung giờ</div>
                </button>}
            </div> : null}
        </div >
    }

    const onSubmit = (ev) => {
        let mentorData = ev
        mentorData.price = parseFloat(mentorData.price.replaceAll(",", ''))
        if (data.mentorItem) {
            mentorData = { ...data.mentorItem, ...mentorData }
            let newTime = new Date(mentorData.schedule[0].time)
            mentorData.startDate = newTime.getTime()
            newTime.setMinutes(newTime.getMinutes() + mentorData.schedule[0].duration)
            mentorData.endDate = newTime.getTime()
            delete mentorData.schedule
            MentorController.editAuth(mentorData).then(res => {
                if (res) {
                    data.onChange()
                    ToastMessage.success('Chỉnh sửa lịch mentor thành công')
                    closePopup(ref)
                }
            })
        } else {
            MentorController.addAuth(mentorData.schedule.map(e => {
                let newTime = new Date(e.time)
                newTime.setMinutes(newTime.getMinutes() + e.duration)
                return {
                    name: mentorData.name,
                    price: mentorData.price,
                    customerId: userInfor.id,
                    startDate: e.time,
                    endDate: newTime.getTime()
                }
            })).then(res => {
                if (res) {
                    data.onChange()
                    ToastMessage.success('Thêm mới lịch mentor thành công')
                    closePopup(ref)
                }
            })
        }
    }

    useEffect(() => {
        if (data.mentorItem) {
            Object.keys(data.mentorItem).forEach(props => {
                if (data.mentorItem[props]) {
                    if (props === 'price') {
                        methods.setValue(props, Ultis.money(data.mentorItem[props]))
                    } else {
                        methods.setValue(props, data.mentorItem[props])
                    }
                }
            })
            if (data.mentorItem.startDate && data.mentorItem.endDate) {
                methods.setValue('schedule', [{ time: data.mentorItem.startDate, duration: differenceInMinutes(new Date(data.mentorItem.endDate), new Date(data.mentorItem.startDate)) }])
            }
        }
    }, [data])

    return <form className="col" style={{ flex: 1 }}>
        <div className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto', padding: '1.6rem 2.4rem' }}>
            <div className="row" style={{ width: '100%', gap: 'max(2%, 2rem)', alignItems: 'start' }}>
                <div className="col" style={{ flex: 1, gap: '2rem', paddingTop: '1.2rem' }}>
                    <TextFieldForm
                        required
                        label={'Tiêu đề buổi mentor'}
                        name={'name'}
                        register={methods.register}
                        errors={methods.formState.errors}
                    />
                    <TextFieldForm
                        required
                        label={'Giá tiền'}
                        name={'price'}
                        register={methods.register}
                        errors={methods.formState.errors}
                        onFocus={(ev) => {
                            methods.setValue('price', ev.target.value.replaceAll(",", ''))
                        }}
                        onBlur={(ev) => {
                            let newPrice = ev.target.value.trim().replaceAll(',', '')
                            if (!isNaN(parseFloat(newPrice))) {
                                methods.setValue('price', Ultis.money(newPrice))
                            } else {
                                methods.setValue('price', data.classItem?.price != null ? Ultis.money(data.classItem?.price) : '')
                            }
                        }}
                    />
                    <div className="col" style={{ gap: '1.2rem' }}>
                        <Text className="label-3">Lịch tuần</Text>
                        {Array.from({ length: 7 }).map((_, i) => renderWeekDaySchedule(i))}
                    </div>
                </div>
                <div className="col" style={{ flex: 2 }}>
                    <WeekCalendar titleOnlyWeekDay listData={methods.watch('schedule')} renderUIInTime={(vl) => {
                        let startTime = new Date(vl.time)
                        let endTime = new Date(vl.time)
                        endTime.setMinutes(endTime.getMinutes() + vl.duration)
                        return <div className="row" style={{ width: '100%', height: '100%', padding: '0.8rem', backgroundColor: 'var(--primary-background)', borderLeft: '2px solid  var(--primary-color)', borderRadius: '0.8rem 0 0 0.8rem' }}>
                            <Text maxLine={2} className="heading-9" style={{ color: 'var(--primary-color)', width: '100%' }}>
                                {`${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}-${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}`}
                            </Text>
                        </div>
                    }} />
                </div>
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <button className="button-text-3" style={{ color: '#00204D99' }} onClick={() => { closePopup(ref) }}>Hủy</button>
            <button type="submit" onClick={methods.handleSubmit(onSubmit)} className={`row ${methods.watch('name') && methods.watch('price') && methods.watch('schedule').length && methods.watch('schedule').every(e => e.duration > 0) ? 'button-primary' : 'button-disabled'}`}>
                <div className="button-text-3">{data.mentorItem ? 'Lưu' : 'Tạo mới'}</div>
            </button>
        </div>
    </form>
})

export default PopupSettingsMentor