import { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import WeekCalendar from "../../../../../project-component/week-calendar"
import { Checkbox, Text, ToastMessage, closePopup } from "../../../../../component/export-component"
import { DatePickerForm, TextFieldForm } from "../../../../../project-component/component-form"
import { Ultis } from "../../../../../Utils"
import InputTime from "../../../../../project-component/input-time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { differenceInMinutes } from "date-fns"
import { ClassController } from "../controller"
import { CustomerController } from "../../../customer/controller"

const PopupSettingsClass = forwardRef(function PopupSettingsClass(data, ref) {
    const _now = new Date()
    const methods = useForm({ shouldFocusError: false, defaultValues: { schedule: [], startDate: Ultis.datetoString(_now) } })

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
        const dayWeekValue = methods.watch('schedule').find(e => (new Date(e.time)).getDay() === i)
        if (dayWeekValue) {
            var startTime = new Date(dayWeekValue.time)
            var endTime = new Date(dayWeekValue.time)
            endTime.setMinutes(endTime.getMinutes() + dayWeekValue.duration)
        }
        return <div key={'dw-' + i} className="row" style={{ height: '5.6rem', gap: '0.8rem', padding: '1.2rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--light-background)' }}>
            <div className="row" style={{ gap: 4, width: '9.8rem' }}>
                <Checkbox value={dayWeekValue != null} size={'1.6rem'} onChange={(vl) => {
                    let schedule = methods.getValues('schedule')
                    if (vl) {
                        schedule.push({ time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + i - _now.getDay(), 7, 0)).getTime(), duration: 30 })
                    } else {
                        schedule = schedule.filter(e => (new Date(e.time)).getDay() !== i)
                    }
                    methods.setValue('schedule', schedule)
                }} />
                <Text className="label-3">{dayWeekTitle}</Text>
            </div>
            {dayWeekValue ? <div className="row" style={{ flex: 1, gap: '1.2rem' }}>
                <InputTime
                    style={{ flex: 1 }}
                    defaultValue={startTime ? `${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}` : '07:00'}
                    onChange={(hoursVl, minVl) => {
                        startTime.setHours(hoursVl)
                        startTime.setMinutes(minVl)
                        let schedule = methods.getValues('schedule')
                        methods.setValue('schedule', schedule.map(e => {
                            if ((new Date(e.time)).getDay() === i) e.time = startTime.getTime()
                            return e
                        }))
                    }}
                />
                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.6rem', color: '#00204D66' }} />
                <InputTime
                    style={{ flex: 1 }}
                    defaultValue={endTime ? `${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}` : '07:00'}
                    onChange={(hoursVl, minVl) => {
                        endTime.setHours(hoursVl)
                        endTime.setMinutes(minVl)
                        let schedule = methods.getValues('schedule')
                        methods.setValue('schedule', schedule.map(e => {
                            if ((new Date(e.time)).getDay() === i) e.duration = Math.abs(differenceInMinutes(startTime, endTime))
                            return e
                        }))
                    }}
                />
            </div> : null}
        </div >
    }

    const onSubmit = (ev) => {
        let classData = ev
        if (classData.startDate) classData.startDate = Ultis.stringToDate(classData.startDate).getTime()
        if (classData.price?.length) classData.price = parseFloat(classData.price.replaceAll(',', ''))
        if (classData.schedule) {
            classData.content = JSON.stringify(classData.schedule)
            delete classData.schedule
        }
        if (data.classItem) {
            ClassController.edit([classData]).then(res => {
                if (res) {
                    if (data.onChange) data.onChange()
                    ToastMessage.success('Cập nhật lớp học thành công')
                }
                closePopup(ref)
            })
        } else {
            classData.customerId = CustomerController.userInfor()?.id
            ClassController.add(classData).then(res => {
                if (res) {
                    if (data.onChange) data.onChange()
                    ToastMessage.success('Thêm mới lớp học thành công')
                }
                closePopup(ref)
            })
        }
    }

    useEffect(() => {
        if (data.classItem) {
            Object.keys(data.classItem).forEach(props => {
                if (data.classItem[props]) {
                    if (props === 'startDate') {
                        methods.setValue(props, Ultis.datetoString(new Date(data.classItem[props])))
                    } else if (props === 'content') {
                        try {
                            var scheduleJson = JSON.parse(data.classItem[props])
                        } catch (error) {
                            console.log(error)
                        }
                        methods.setValue('schedule', scheduleJson ?? [])
                    } else if (props === 'price') {
                        methods.setValue(props, Ultis.money(data.classItem[props]))
                    } else {
                        methods.setValue(props, data.classItem[props])
                    }
                }
            })
        }
    }, [data])

    return <form className="col" style={{ flex: 1 }}>
        <div className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto', padding: '1.6rem 2.4rem' }}>
            <div className="row" style={{ width: '100%', gap: 'max(4%, 4rem)', alignItems: 'start' }}>
                <div className="col" style={{ flex: 1, gap: '2rem', paddingTop: '1.2rem' }}>
                    <TextFieldForm
                        required
                        label={'Tên lớp'}
                        name={'name'}
                        register={methods.register}
                        errors={methods.formState.errors}
                    />
                    <TextFieldForm
                        required
                        label={'Học phí'}
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
                    <div className="row" style={{ gap: '1.2rem' }}>
                        <div style={{ flex: 1 }}>
                            <DatePickerForm
                                label={'Khai giảng'}
                                name={'startDate'}
                                control={methods.control}
                                errors={methods.formState.errors}
                            />
                        </div>
                        <TextFieldForm
                            width="14rem"
                            label={'Số buổi'}
                            name={'quantity'}
                            type={'number'}
                            register={methods.register}
                            errors={methods.formState.errors}
                        />
                    </div>
                    <div className="col" style={{ gap: '1.2rem' }}>
                        <Text className="label-3">Lịch học</Text>
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
            <button type="submit" onClick={methods.handleSubmit(onSubmit)} className={`row ${methods.watch('name') && methods.watch('price') ? 'button-primary' : 'button-disabled'}`}>
                <div className="button-text-3">{data.classItem ? 'Lưu' : 'Tạo mới'}</div>
            </button>
        </div>
    </form>
})

export default PopupSettingsClass