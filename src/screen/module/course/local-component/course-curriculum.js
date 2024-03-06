import { useRef, useState } from "react";
import { FilledBook, FilledCloudUpload, FilledCompanyAdd, FilledIndicator } from "../../../../assets/const/icon";
import { ImportFile, Popup, Text, TextField, closePopup, showPopup } from "../../../../component/export-component";
import { uuidv4 } from "../../../../Utils";
import { SwitchForm } from "../../../../project-component/component-form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle, faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function CourseCurriculum({ data }) {
    const { control } = useForm({ shouldFocusError: false })
    const [lessons, setLessons] = useState(data?.lessons ?? [])

    return lessons.length ? <div className="col" style={{ gap: '3.2rem' }}>
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
                {lessons.map((e, i) => <div className="col" style={{ borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                    <div className="row" style={{ gap: '1rem', padding: '1.2rem 2.4rem 1.2rem 0.4rem' }}>
                        <div className="row" style={{ paddingRight: '1rem' }}><FilledIndicator /></div>
                        <TextField
                            style={{ width: '100%', flex: 1, backgroundColor: '#F9FAFB', padding: '0.6rem 1.2rem', height: 'fit-content', borderRadius: '10rem' }}
                            placeholder={`Tiêu đề phần ${i + 1}`}
                        />
                        <button type="button"><FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.6rem', color: '#39AC6D' }} /></button>
                        <button type="button"><FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '1.6rem', color: '#E14337' }} /></button>
                    </div>
                    <div className="row" style={{ padding: '1.2rem 4rem', gap: '0.8rem' }}>
                        <button type="button" className="row" style={{ padding: '0.4rem 0.8rem', gap: '0.8rem', borderRadius: '2.4rem', backgroundColor: '#F9FAFB' }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Video bài giảng</div>
                        </button>
                        <button type="button" className="row" style={{ padding: '0.4rem 0.8rem', gap: '0.8rem', borderRadius: '2.4rem', backgroundColor: '#F9FAFB' }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.25rem', color: '#00204D99' }} />
                            <div className="button-text-3">Bài viết</div>
                        </button>
                        <button type="button" className="row" style={{ padding: '0.4rem 0.8rem', gap: '0.8rem', borderRadius: '2.4rem', backgroundColor: '#F9FAFB' }}>
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
            addManual={() => { setLessons([{ id: uuidv4() }]) }}
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