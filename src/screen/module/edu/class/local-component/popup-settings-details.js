import { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import WeekCalendar from "../../../../../project-component/week-calendar"
import { Checkbox, Text, closePopup } from "../../../../../component/export-component"
import { DatePickerForm, TextFieldForm } from "../../../../../project-component/component-form"
import { Ultis } from "../../../../../Utils"
import InputTime from "../../../../../project-component/input-time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const PopupSettingsClass = forwardRef(function PopupSettingsClass(data, ref) {
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
        const dayWeekValue = methods.watch('schedule').find(e => (new Date(e.time).getDay() === i))
        if (dayWeekValue) {
            var startTime = new Date(dayWeekValue.time)
            var endTime = new Date(dayWeekValue.time)
            endTime.setMinutes(endTime.getMinutes() + dayWeekValue.duration)
        }
        return <div key={'dw-' + i} className="row" style={{ gap: '0.8rem', padding: '1.2rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--light-background)' }}>
            <div className="row" style={{ gap: 4, width: '9.8rem' }}>
                <Checkbox value={dayWeekValue != null} size={'1.6rem'} />
                <Text className="label-3">{dayWeekTitle}</Text>
            </div>
            {dayWeekValue ? <div className="row" style={{ flex: 1, gap: '1.2rem' }}>
                <InputTime
                    style={{ flex: 1 }}
                    defaultValue={startTime ? `${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}` : '07:00'}
                    onChange={(hoursVl, minVl) => {

                    }}
                />
                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.6rem', color: '#00204D66' }} />
                <InputTime
                    style={{ flex: 1 }}
                    defaultValue={endTime ? `${endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`}:${endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`}` : '07:00'}
                    onChange={(hoursVl, minVl) => {

                    }}
                />
            </div> : null}
        </div >
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
                    <WeekCalendar titleOnlyWeekDay />
                </div>
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <button className="button-text-3" style={{ color: '#00204D99' }} onClick={() => { closePopup(ref) }}>Hủy</button>
            <button className={`row ${methods.watch('name') && methods.watch('price') ? 'button-primary' : 'button-disabled'}`}>
                <div className="button-text-3">{data.classItem ? 'Lưu' : 'Tạo mới'}</div>
            </button>
        </div>
    </form>
})

export default PopupSettingsClass