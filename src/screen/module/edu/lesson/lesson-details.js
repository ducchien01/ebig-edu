import { useEffect, useRef, useState } from "react"
import { json, useParams } from "react-router-dom"
import { FilledChat, FilledCircleQuestion, FilledEdit, FilledFileText, FilledHtmlCssCode, FilledHyperlink, FilledLogoYoutube, FilledText, FilledTrashCan } from "../../../../assets/const/icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronDown, faChevronRight, faEllipsisVertical, faEye, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Popup, Text, closePopup, showPopup } from "../../../../component/export-component"
import { LessonType } from "./da"
import { LessonController } from "./controller"
import EditVideo from "./local-component/edit-video"
import EditParagraph from "./local-component/edit-paragraph"
import EditTask from "./local-component/list-task"
import PopupAddEditQuizz from "./local-component/poup-edit-task"

export default function FormEditLesson({ courseData }) {
    const { lessonid } = useParams()
    const ref = useRef()
    const [data, setData] = useState()
    const [showListLesson, setShowListLesson] = useState(false)

    const popupMoreAction = (ev) => {
        const offset = ev.target.getBoundingClientRect()
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${offset.x + offset.width + 4}px`, top: `${offset.y}px` },
            content: <div className="more-action-popup col">
                <button type="button" className="row" >
                    <FilledEdit />
                    <Text className="label-4">Sửa tên</Text>
                </button>
                <button type="button" className="row" >
                    <FilledChat />
                    <Text className="label-4">Tắt bình luận của học viên</Text>
                </button>
                <button type="button" className="row" onClick={() => { closePopup(ref) }}>
                    <FilledTrashCan color="#E14337" />
                    <Text className="label-4" style={{ color: '#E14337' }}>Xóa bài học</Text>
                </button>
            </div>
        })
    }

    const showPopupEditAddQizz = (item) => {
        showPopup({
            ref: ref,
            heading: <div className="heading-7 popup-header">Quizz</div>,
            content: <PopupAddEditQuizz ref={ref} questionItem={item} onChange={(quest) => {
                if (data.content) {
                    try {
                        let questList = JSON.parse(data.content)
                        if (item) {
                            data.content = JSON.stringify(questList.map(e => {
                                if (e.id === quest.id) {
                                    return quest
                                }
                                return e
                            }))
                        } else {
                            data.content = JSON.stringify([...questList, quest])
                        }
                    } catch (error) {
                        data.content = JSON.stringify([quest])
                    }
                } else {
                    data.content = JSON.stringify([quest])
                }
                LessonController.edit(data).then(res => {
                    if (res) setData(data)
                })
            }} />
        })
    }

    const deleteQuest = (item) => {
        try {
            let questList = JSON.parse(data.content)
            data.content = JSON.stringify(questList.filter(e => e.id !== item.id))
            LessonController.edit(data).then(res => {
                if (res) setData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (lessonid) {
            LessonController.getById(lessonid).then(res => {
                if (res) setData(res)
            })
        }
    }, [])

    const renderUI = () => {
        switch (data?.type) {
            case LessonType.video:
                return <EditVideo data={data} />
            case LessonType.paragraph:
                return <EditParagraph data={data} onChange={(newData) => {
                    LessonController.edit(newData).then(res => {
                        if (res) setData(newData)
                    })
                }} />
            case LessonType.task:
                return <EditTask data={data} editQuest={showPopupEditAddQizz} deleteQuest={deleteQuest} />
            default:
                return <div></div>;
        }
    }

    const getPrefixIcon = (type) => {
        switch (type) {
            case LessonType.video:
                return <FilledLogoYoutube />
            case LessonType.paragraph:
                return <FilledFileText />
            case LessonType.task:
                return <FilledCircleQuestion />
            default:
                return <div></div>;
        }
    }

    const getTitleText = (type) => {
        switch (type) {
            case LessonType.video:
                return 'Video bài giảng'
            case LessonType.paragraph:
                return 'Bài viết'
            case LessonType.task:
                return 'Bài kiểm tra'
            default:
                return ''
        }
    }

    return <div className="form-edit-lesson-content row" >
        <Popup ref={ref} />
        <div className="col details-content-block col16 col20-md col20-sm" style={{ gap: '3.2rem' }}>
            <div className='col' style={{ gap: '0.8rem', width: '100%' }} >
                <div className='row header-breadcum' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách bài học</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1rem' }} />
                    <div className='button-text-6'>{data?.name}</div>
                </div>
                <div className="row" style={{ width: '100%', gap: '0.8rem', alignItems: 'start' }}>
                    <div className="col" style={{ gap: '0.8rem', flex: 1 }}>
                        <Text className='heading-5' maxLine={2} style={{ width: '98%' }}>{data?.name}</Text>
                        <button type="button" className="row" style={{ gap: '0.8rem' }}>
                            {getPrefixIcon(data?.type)}
                            <div className="button-text-3">{getTitleText(data?.type)}</div>
                            <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '1.2rem', color: '#00204D99' }} />
                        </button>
                    </div>
                    <button type="button" className="row button-grey">
                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '1.4rem' }} />
                        <Text className="button-text-3" >Xem trước</Text>
                    </button>
                    <button type="button" style={{ padding: '0.6rem 1.2rem' }} className={`row ${showListLesson ? 'button-infor' : 'button-grey'}`} onClick={() => setShowListLesson(!showListLesson)}>
                        <FontAwesomeIcon icon={showListLesson ? faXmark : faBars} style={{ fontSize: '1.4rem' }} />
                        <Text className="button-text-3" >Danh sách bài học</Text>
                    </button>
                    <button type="button" className="row button-grey" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', justifyContent: 'center' }} onClick={popupMoreAction}>
                        <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '1.4rem' }} />
                    </button>
                </div>
            </div>
            <div className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto' }}>
                {renderUI()}
            </div>
        </div>
        <div className="col content-edit-action-block col8 col4-md col4-sm" style={{ borderLeft: 'var(--border-grey1)', gap: '2.4rem', paddingRight: 0 }}>
            <div className="row group-action-edit" style={{ paddingRight: '0.8rem' }}>
                {data?.type === LessonType.video ? <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledText width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Text editor</div>
                </button> : null}
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" onClick={() => showPopupEditAddQizz()} >
                    <FilledCircleQuestion width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Quizz</div>
                </button>
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledHyperlink width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Resource</div>
                </button>
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledHtmlCssCode width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Embed</div>
                </button>
            </div>
            {showListLesson ? <div className="col " style={{ padding: '2.4rem 0', borderTop: 'var(--border-grey1)', gap: '3.2rem', flex: 1, height: '100%', width: '100%' }}>
                <Text className="heading-6">Danh sách bài học</Text>
                <div className="col" style={{ overflow: 'hidden auto', flex: 1, height: '100%' }}>
                    {(courseData.courseLessons ?? []).filter(e => !e.parentId).map((item, i) => {
                        let children = courseData.courseLessons.filter(e => e.parentId === item.id)
                        return <div key={item.id} className="col" style={{ gap: '1.2rem' }}>
                            <div className="row" style={{ gap: '1.4rem' }}>
                                <div className="row label-2" style={{ width: '3.6rem', height: '3.6rem', borderRadius: '50%', backgroundColor: 'var(--background)', justifyContent: 'center' }}>{`U${i + 1}`}</div>
                                <Text maxLine={1} className="heading-7" style={{ width: '100%', flex: 1 }}>{item.name}</Text>
                                <Text maxLine={1} className="body-3">{`${i + 1}/${courseData.courseLessons.filter(e => !e.parentId).length}`}</Text>
                            </div>
                            <div className="col" style={{ paddingLeft: '4rem' }}>
                                {children.map(childItem => {
                                    return <div key={childItem.id} className="row" style={{ padding: '0.8rem 1rem', gap: '0.8rem', borderRadius: '0.8rem', backgroundColor: childItem.lessonId === lessonid ? 'var(--background)' : null }}>
                                        {getPrefixIcon(childItem.type)}
                                        <Text className="label-4" maxLine={1} style={{ flex: 1, width: '100%' }}>{childItem.name}</Text>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div> : null}
        </div>
    </div>
}
