import { forwardRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import WeekCalendar from "../../../../../project-component/week-calendar"
import { Checkbox, Text, ToastMessage, closePopup } from "../../../../../component/export-component"
import { DatePickerForm, Select1Form, TextFieldForm } from "../../../../../project-component/component-form"
import { Ultis } from "../../../../../Utils"
import InputTime from "../../../../../project-component/input-time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { differenceInMinutes } from "date-fns"
import { ClassController } from "../controller"
import { CustomerController } from "../../../customer/controller"
import { useSelector } from "react-redux"
import { CenterController } from "../../../center/controller"

const PopupSettingsClass = forwardRef(function PopupSettingsClass(data, ref) {
    const userInfor = useSelector((state) => state.account.data)
    const _now = new Date()
    const [teachers, setTeachers] = useState({ totalCount: undefined, data: [] })
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
        return <div key={'dw-' + i} className="row" style={{ gap: '0.8rem', padding: '1.6rem 1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
            <div className="row" style={{ gap: '0.4rem', width: '8.8rem' }}>
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
            {dayWeekValue ? <div className="row input-time-range-container" style={{ flex: 1 }}>
                <InputTime
                    style={{ flex: 1 }}
                    defaultValue={startTime ? `${startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`}:${startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`}` : '07:00'}
                    onChange={(hoursVl, minVl) => {
                        startTime.setHours(hoursVl)
                        startTime.setMinutes(minVl)
                        let schedule = methods.getValues('schedule')
                        methods.setValue('schedule', schedule.map(e => {
                            if ((new Date(e.time)).getDay() === i) {
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
                    helperText={dayWeekValue.duration < 0 ? 'Giờ kết thúc phải lớn hơn giờ bắt đầu' : null}
                    onChange={(hoursVl, minVl) => {
                        endTime.setHours(hoursVl)
                        endTime.setMinutes(minVl)
                        let schedule = methods.getValues('schedule')
                        methods.setValue('schedule', schedule.map(e => {
                            if ((new Date(e.time)).getDay() === i) e.duration = differenceInMinutes(endTime, startTime)
                            return e
                        }))
                    }}
                />
            </div> : null}
        </div >
    }

    const onSubmit = (ev) => {
        let classData = ev
        classData.centerId = data.centerId
        classData.courseId = data.courseId
        if (classData.startDate) {
            var _startDate = Ultis.stringToDate(classData.startDate)
            classData.startDate = _startDate.getTime()
        }
        if (classData.price?.length) classData.price = parseFloat(classData.price.replaceAll(',', ''))
        if (_startDate && classData.quantity) {
            const _week = Math.floor(classData.quantity / classData.schedule.length)
            const _remainDay = classData.quantity % classData.schedule.length
            const _classDayList = classData.schedule.map(e => (new Date(e.time)).getDay()).sort((a, b) => a - b)
            let _startDay = Math.min(..._classDayList.map(e => e >= _startDate.getDay()), 10)
            if (_startDay === 10) {
                _startDay = _classDayList[0]
                _startDate.setDate(_startDate.getDate() + (_startDay + 7 - _startDate.getDay()))
            } else {
                _startDate.setDate(_startDate.getDate() + (_startDay - _startDate.getDay()))
            }
            const _index = _classDayList.indexOf(_startDay)
            if (_index + _remainDay >= _classDayList.length) {
                const _endDay = _classDayList[_index + _remainDay - _classDayList.length]
                _startDate.setDate(_startDate.getDate() + (7 * _week) + (7 - _startDay + _endDay))
            } else {
                const _endDay = _classDayList[_index + _remainDay]
                _startDate.setDate(_startDate.getDate() + (7 * _week) + (_endDay - _startDay))
            }
            classData.endDate = _startDate.getTime()
        }
        classData.content = JSON.stringify(classData.schedule)
        delete classData.schedule
        if (data.classItem) {
            ClassController.edit([classData]).then(res => {
                if (res) {
                    if (data.onChange) data.onChange()
                    ToastMessage.success('Cập nhật lớp học thành công')
                }
                closePopup(ref)
            })
        } else {
            ClassController.add(classData).then(res => {
                if (res) {
                    if (data.onChange) data.onChange()
                    ToastMessage.success('Thêm mới lớp học thành công')
                }
                closePopup(ref)
            })
        }
    }

    const getTeachers = async (page, nameSearch) => {
        let _filter = [{ field: 'centerId', operator: '=', value: data.centerId }]
        if (nameSearch?.length) _filter.push({ field: 'name', operator: 'contains', value: nameSearch })
        if (page) {
            const res = await CenterController.getListSimpleMember({ page: page, take: 10, filter: _filter })
            if (res) {
                const newCustomerIds = res.data.map(e => e.customerId).filter(id => teachers.data.every(el => el.id !== id))
                if (newCustomerIds.length) {
                    const _customers = await CustomerController.getByIds(newCustomerIds)
                    if (_customers) {
                        const newList = [...teachers.data, ..._customers]
                        setTeachers({
                            totalCount: res.totalCount,
                            data: newList
                        })
                        return newList
                    }
                }
            }
            return []
        } else {
            const res = await CenterController.getListSimpleMember({ page: 1, take: 10, filter: _filter })
            let newList = []
            if (res) {
                const customerIds = res.data.map(e => e.customerId).filter(id => id !== userInfor.id)
                if (customerIds.length) {
                    const _customers = await CustomerController.getByIds(customerIds)
                    if (_customers) {
                        newList = [userInfor, ..._customers]
                        setTeachers({
                            totalCount: res.totalCount,
                            data: newList
                        })
                    }
                } else {
                    setTeachers({
                        totalCount: 1,
                        data: [userInfor]
                    })
                    newList = [userInfor]
                }
            }
            return newList
        }
    }

    useEffect(() => {
        getTeachers()
        if (data.classItem) {
            data.classItem.customerId ??= userInfor.id
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
                        methods.setValue('schedule', (scheduleJson ?? []).map(e => {
                            const _time = new Date(e.time)
                            return {
                                time: (new Date(_now.getFullYear(), _now.getMonth(), _now.getDate() + _time.getDay() - _now.getDay(), _time.getHours(), _time.getMinutes())).getTime(),
                                duration: e.duration
                            }
                        }))
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
                    <Select1Form
                        required
                        label={'Giáo viên'}
                        name={'customerId'}
                        control={methods.control}
                        errors={methods.formState.errors}
                        options={teachers.data}
                        handleLoadmore={async (ev, searchLength) => {
                            const _tmpPage = searchLength ?? teachers.data.length
                            if (_tmpPage !== teachers.totalCount) {
                                const res = await getTeachers(Math.floor(_tmpPage / 20 + 1), ev)
                                return res
                            }
                        }}
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
            <button type="submit" onClick={methods.handleSubmit(onSubmit)} className={`row ${methods.watch('name') && methods.watch('price') && methods.watch('schedule').length && methods.watch('schedule').every(e => e.duration > 0) ? 'button-primary' : 'button-disabled'}`}>
                <div className="button-text-3">{data.classItem ? 'Lưu' : 'Tạo mới'}</div>
            </button>
        </div>
    </form>
})

export default PopupSettingsClass