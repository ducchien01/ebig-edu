import { forwardRef, useEffect, useRef, useState } from "react";
import { FilledBook, FilledCircleQuestion, FilledCloudUpload, FilledCompanyAdd, FilledEdit, FilledFileCopy, FilledFileText, FilledIndicator, FilledLogoYoutube, FilledOpenLink, FilledTrashCan } from "../../../../assets/const/icon";
import { ComponentStatus, Dialog, DialogAlignment, ImportFile, Popup, Text, TextField, closePopup, showDialog, showPopup } from "../../../../component/export-component";
import { uuidv4 } from "../../../../Utils";
import { SwitchForm, TextFieldForm } from "../../../../project-component/component-form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faCircleXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { LessonController } from "../../lesson/controller";
import { LessonType } from "../../lesson/da";
import { CustomerController } from "../../customer/controller";

export default function CourseCurriculum({ data, onChangeRequired }) {
    const ref = useRef()
    const dialogRef = useRef()
    const { control } = useForm({ shouldFocusError: false })
    const [lessons, setLessons] = useState([])

    const titleActionTile = (item, i) => {
        if (item.parentId) {
            var keyValue = `${item.parentId}-${i}`
        }
        switch (item.type) {
            case LessonType.video:
                var prefixIcon = <FilledLogoYoutube key={'prefix-icon'} />
                var placeholder = `Tiêu đề video bài học ${lessons.filter(e => e.parentId === item.parentId && e.type === item.type).findIndex(e => item.id === e.id) + 1}`
                break;
            case LessonType.text:
                prefixIcon = <FilledFileText key={'prefix-icon'} />
                placeholder = `Tiêu đề bài viết ${lessons.filter(e => e.parentId === item.parentId && e.type === item.type).findIndex(e => item.id === e.id) + 1}`
                break;
            case LessonType.task:
                prefixIcon = <FilledCircleQuestion key={'prefix-icon'} />
                placeholder = `Tiêu đề bài kiểm tra ${lessons.filter(e => e.parentId === item.parentId && e.type === item.type).findIndex(e => item.id === e.id) + 1}`
                break;
            default:
                placeholder = `Tiêu đề phần ${i + 1}`
                break;
        }
        return <div key={keyValue} className="row edit-title-action-tile" >
            <div className="row btn-sort"><FilledIndicator /></div>
            {item.isEditing ? <>
                <TextField
                    autoFocus
                    defaultValue={item.name}
                    placeholder={placeholder}
                    onChange={(ev) => { item.name = ev.target.value.trim() }}
                />
                <button type="button" onClick={() => {
                    setLessons([...lessons.map(e => {
                        if (e.id === item.id) e.isEditing = false
                        return e
                    })])
                }}
                >
                    <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.6rem', color: '#39AC6D' }} />
                </button>
                <button type="button" onClick={() => {
                    setLessons(lessons.filter(e => e.id !== item.id))
                }}>
                    <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '1.6rem', color: '#E14337' }} />
                </button>
            </> : <>
                {prefixIcon ?? null}
                <Text className={item.parentId ? 'button-text-3' : "highlight-6"}>{item.name}</Text>
                {item.parentId ? <NavLink to={`/edu-management/school/course/details/textbook/lesson-content/${data.id}/${item.lessonId}`}>
                    <FilledOpenLink />
                </NavLink> : null}
                <button type="button" onClick={() => {
                    setLessons([...lessons.map(e => {
                        if (e === item) e.isEditing = true
                        return e
                    })])
                }}>
                    <FilledEdit />
                </button>
                <button type="button" onClick={(ev) => {
                    showPopup({
                        ref: ref,
                        clickOverlayClosePopup: true,
                        style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
                        content: <div className="more-action-popup col">
                            <button type="button" className="row" >
                                <FilledFileCopy />
                                <Text className="label-4">Nhân bản</Text>
                            </button>
                            <button type="button" className="row" onClick={() => {
                                closePopup(ref)
                                dialogSubmitDelete(item)
                            }}>
                                <FilledTrashCan color="#E14337" />
                                <Text className="label-4" style={{ color: '#E14337' }}>Xóa</Text>
                            </button>
                        </div>
                    })
                }}>
                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '1.6rem', color: '#667994', width: '1.6rem' }} />
                </button>
            </>}
        </div>
    }

    const addCourseLesson = async () => {
        let newCourseLesson = { id: uuidv4(), sort: lessons.filter(e => !e.type).length, courseId: data.id, name: 'Tiêu đề mới', dateCreated: (new Date()).getTime() }
        const res = await LessonController.addToCourse(newCourseLesson)
        if (res) {
            newCourseLesson.id = res
            let updateLessonList = [...lessons, newCourseLesson]
            setLessons(updateLessonList)
            data.courseLessons = updateLessonList
            if (updateLessonList.length === 1) onChangeRequired(data)
        }
    }

    const dialogSubmitDelete = (lesonItem) => {
        showDialog({
            ref: dialogRef,
            status: ComponentStatus.WARNING,
            alignment: DialogAlignment.center,
            title: 'Bạn chắc chắn muốn xóa bài học ' + (lesonItem.name ?? 'này'),
            content: 'Nội dung của bài học sẽ bị xóa khỏi khóa học ' + data.name,
            onSubmit: async () => {
                const res = await LessonController.deleteCourseLesson(lessons.filter(e => e.id === lesonItem.id || e.parentId === lesonItem.id).map(e => e.id))
                if (res) {
                    let updateLessonList = lessons.filter(e => !res.includes(e.id))
                    setLessons(updateLessonList)
                    data.courseLessons = updateLessonList
                    if (!updateLessonList.length) onChangeRequired(data)
                }
            }
        })
    }

    const showPopupAddNewLesson = ({ type, parentId }) => {
        showPopup({
            ref: ref,
            hideButtonClose: true,
            heading: <div className='popup-header heading-7'>Tạo mới bài học</div>,
            content: <PopupAddNewLesson ref={ref} id={uuidv4()} courseId={data.id} dateCreated={(new Date()).getTime()} parentId={parentId} type={type} />
        })
    }

    useEffect(() => {
        if (data?.courseLessons) {
            setLessons(data.courseLessons)
        }
    }, [data])

    return lessons.length ? <div className="col" style={{ gap: '3.2rem', padding: '2.4rem 0 1.2rem 2.4rem', height: '100%', flex: 1 }}>
        <Popup ref={ref} />
        <Dialog ref={dialogRef} />
        <div className="col" style={{ gap: '1.6rem' }}>
            <div className="heading-5">Danh sách bài học</div>
            <SwitchForm
                control={control}
                label={'Lưu vào danh sách template giáo trình'}
                value={true}
                name={'isTemplate'}
            />
        </div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 0, width: '100%', overflow: 'hidden auto', height: '100%', flex: 1, alignContent: 'start' }}>
            <div className="col col20 col16-lg col24-md col-sm" style={{ gap: '2.4rem', '--gutter': '0px' }} >
                {lessons.filter(e => !e.parentId).map((item, i) => <div key={item.id} className="col lesson-title-tile">
                    {titleActionTile(item, i)}
                    {lessons.filter(e => e.parentId === item.id).map((child, j) => titleActionTile(child, j))}
                    <div className="row footer-group-action" >
                        <button type="button" className="row" onClick={() => { showPopupAddNewLesson({ parentId: item.id, type: LessonType.video }) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Video bài giảng</div>
                        </button>
                        <button type="button" className="row" onClick={() => { showPopupAddNewLesson({ parentId: item.id, type: LessonType.text }) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Bài viết</div>
                        </button>
                        <button type="button" className="row" onClick={() => { showPopupAddNewLesson({ parentId: item.id, type: LessonType.task }) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Bài kiểm tra</div>
                        </button>
                    </div>
                </div>)}
                <button type="button" onClick={addCourseLesson} className="row" style={{ padding: '1.6rem 4rem', gap: '0.8rem', borderRadius: '0.8rem', border: '1px dashed #00358033' }}>
                    <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '2rem', color: 'var(--primary-color)' }} />
                    <div className="heading-7">Tạo phần mới</div>
                </button>
            </div>
        </div>
    </div> :
        <EmptyLessons
            addManual={addCourseLesson}
        />
}

const EmptyLessons = ({ addManual, addByTemplate, upload }) => {
    const ref = useRef()
    return <div className="col " style={{ gap: '2rem', padding: '2.4rem 0 1.2rem 2.4rem' }}>
        <Popup ref={ref} />
        <div className="col" style={{ gap: '0.8rem' }}>
            <div className="heading-5">Tạo giáo trình cho khóa học</div>
            <Text className="subtitle-3">Chọn 1 trong các cách bên dưới để tạo giáo trình</Text>
        </div>
        <div className="row course-curriculum-empty">
            <button type="button" onClick={addManual} className="col col6 col8-lg col8-md col16-sm" >
                <div className="row" style={{ padding: '0.8rem', borderRadius: '50%', backgroundColor: '#ffffff' }}><FilledCompanyAdd width="2.4rem" height="2.4rem" /></div>
                <div className="col">
                    <Text className="heading-7">Tạo thủ công</Text>
                    <Text className="subtitle-4" >Khởi tạo giáo trình theo cấu trúc của bạn</Text>
                </div>
            </button>
            <button type="button" onClick={addByTemplate} className="col col6 col8-lg col8-md col16-sm">
                <div className="row" style={{ padding: '0.8rem', borderRadius: '50%', backgroundColor: '#ffffff' }}><FilledBook width="2.4rem" height="2.4rem" /></div>
                <div className="col">
                    <Text className="heading-7">Sử dụng mẫu có sẵn</Text>
                    <Text className="subtitle-4" >Chọn từ thư viện giáo trình của ebig</Text>
                </div>
            </button>
            <button type="button" className="col col6 col8-lg col8-md col16-sm" onClick={() => {
                showPopup({
                    ref: ref,
                    style: { width: '36%' },
                    heading: <div className="heading-7 popup-header">Upload giáo trình</div>,
                    content: <div className="col">
                        <div className="popup-body col" style={{ padding: '2.4rem' }}>
                            <ImportFile maxSize={50000} subTitle="Kích thước tệp nhỏ hơn 5MB." style={{ width: '100%', maxWidth: '100%', borderStyle: 'dashed' }} />
                        </div>
                        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
                            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
                            <button type="button" className={`submit-popup-btn button-text-3`} onClick={upload}>Lưu</button>
                        </div>
                    </div>
                })
            }}>
                <div className="row" style={{ padding: '0.8rem', borderRadius: '50%', backgroundColor: '#ffffff' }}><FilledCloudUpload width="2.4rem" height="2.4rem" /></div>
                <div className="col">
                    <Text className="heading-7">Upload giáo trình</Text>
                    <Text className="subtitle-4" >Tải lên template giáo trình bạn đã lưu</Text>
                </div>
            </button>
        </div>
    </div>
}

const PopupAddNewLesson = forwardRef(function PopupAddNewLesson(data, ref) {
    const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })
    const navigate = useNavigate()

    const onSubmit = (ev) => {
        console.log(ev)
        LessonController.add({ id: uuidv4(), name: ev.name.trim(), type: data.type, customerId: CustomerController.userInfor().id, dateCreated: (new Date()).getTime() }).then(async (id) => {
            const res = await LessonController.addToCourse({ ...data, name: ev.name.trim(), lessonId: id })
            if (res)
                navigate(`/edu-management/school/course/details/textbook/lesson-content/${data.courseId}/${id}`)
        })
    }

    return <form className="col" style={{ width: '52rem', flex: 1 }}>
        <div className="popup-body col" style={{ padding: '1.6rem 2.4rem' }}>
            <TextFieldForm
                name={'name'}
                control={methods.control}
                value={methods.watch('name')}
                placeholder="Nhập tên cho khóa học của bạn"
            />
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
            <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name').trim().length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
        </div>
    </form>
})