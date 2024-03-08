import { useEffect, useRef, useState } from "react";
import { FilledBook, FilledCircleQuestion, FilledCloudUpload, FilledCompanyAdd, FilledEdit, FilledFileCopy, FilledFileText, FilledIndicator, FilledLogoYoutube, FilledOpenLink, FilledTrashCan } from "../../../../assets/const/icon";
import { ImportFile, Popup, Text, TextField, closePopup, showPopup } from "../../../../component/export-component";
import { uuidv4 } from "../../../../Utils";
import { SwitchForm } from "../../../../project-component/component-form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faCircleXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { LessonType } from "../../../../assets/const/const-list";

export default function CourseCurriculum({ data }) {
    const ref = useRef()
    const { control } = useForm({ shouldFocusError: false })
    const [lessons, setLessons] = useState(data?.lessons ?? [])

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
                <Text className={item.parentId ? 'button-text-3' : "highlight-6"}>{item.name}</Text>,
                {item.parentId ? <NavLink to={`/edu-management/school/course/details/textbook/lesson-content/${item.id}`}>
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
                    const offset = ev.target.getBoundingClientRect()
                    showPopup({
                        ref: ref,
                        clickOverlayClosePopup: true,
                        style: { left: `${offset.x + offset.width + 4}px`, top: `${offset.y}px` },
                        content: <div className="more-action-popup col">
                            <button type="button" className="row" >
                                <FilledFileCopy />
                                <Text className="label-4">Nhân bản</Text>
                            </button>
                            <button type="button" className="row" onClick={() => {
                                setLessons(lessons.filter(e => e.id !== item.id))
                                closePopup(ref)
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

    useEffect(() => { }, [])

    return lessons.length ? <div className="col" style={{ gap: '3.2rem' }}>
        <Popup ref={ref} />
        <div className="col" style={{ gap: '1.6rem' }}>
            <div className="heading-5">Danh sách bài học</div>
            <SwitchForm
                control={control}
                label={'Lưu vào danh sách template giáo trình'}
                value={true}
                name={'isTemplate'}
            />
        </div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 0, width: '100%' }}>
            <div className="col col20 col16-lg col24-md col-sm" style={{ gap: '2.4rem', '--gutter': '0px' }} >
                {lessons.filter(e => !e.parentId).map((item, i) => <div key={item.id} className="col lesson-title-tile">
                    {titleActionTile(item, i)}
                    {lessons.filter(e => e.parentId === item.id).map((child, j) => titleActionTile(child, j))}
                    <div className="row footer-group-action" >
                        <button type="button" className="row" onClick={() => { setLessons([...lessons, { id: uuidv4(), parentId: item.id, isEditing: true, type: LessonType.video }]) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Video bài giảng</div>
                        </button>
                        <button type="button" className="row" onClick={() => { setLessons([...lessons, { id: uuidv4(), parentId: item.id, isEditing: true, type: LessonType.text }]) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Bài viết</div>
                        </button>
                        <button type="button" className="row" onClick={() => { setLessons([...lessons, { id: uuidv4(), parentId: item.id, isEditing: true, type: LessonType.task }]) }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Bài kiểm tra</div>
                        </button>
                    </div>
                </div>)}
                <button type="button" onClick={() => { setLessons([...lessons, { id: uuidv4() }]) }} className="row" style={{ padding: '1.6rem 4rem', gap: '0.8rem', borderRadius: '0.8rem', border: '1px dashed #00358033' }}>
                    <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '2rem', color: 'var(--primary-color)' }} />
                    <div className="heading-7">Tạo phần mới</div>
                </button>
            </div>
        </div>
    </div> :
        <EmptyLessons
            addManual={() => { setLessons([{ id: uuidv4(), isEditing: true }]) }}
        />
}

const EmptyLessons = ({ addManual, addByTemplate, upload }) => {
    const ref = useRef()
    return <div className="col " style={{ gap: '2rem' }}>
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