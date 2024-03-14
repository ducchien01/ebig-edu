import { useForm } from "react-hook-form";
import { ImportFileForm, Select1Form, SelectMultipleForm, SwitchForm, TextAreaForm, TextFieldForm } from "../../../../project-component/component-form";
import { Text } from "../../../../component/export-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from "../../../../Utils";
import { useEffect, useRef, useState } from "react";
import { TopicController } from "../../topic/controller";
import { TagController } from "../../tag/controller";
import { studentLevelList } from "../../../../assets/const/const-list";
import { CourseController } from "../controller";

export default function Overview({ data }) {
    const { control, formState: { errors }, watch, setValue, getValues } = useForm({ shouldFocusError: false, defaultValues: { targets: [{ id: uuidv4() }, { id: uuidv4() }] } })
    const [listTopic, setListTopic] = useState([])
    const [listTag, setListTag] = useState([])

    const onChangeData = () => {
        let courseData = { ...data, ...getValues() }
        courseData.targets = JSON.stringify(courseData.targets.filter(e => e.value?.trim()?.length))
        CourseController.edit(courseData).then(res => {
            if (res) {
                
            }
        })
    }

    useEffect(() => {
        if (data) {
            TopicController.getAll().then(res => {
                if (res) setListTopic(res)
            })
            TagController.getAll().then(res => {
                if (res) setListTag(res)
            })
            Object.keys(data).forEach(props => {
                if (data[props] != null) {
                    if (props === 'targets') {
                        setValue(props, JSON.parse(data[props]))
                    } else if (props === 'pictureId') {
                        setValue('pictureFile', {})
                    } else if (props === 'thumbnailId') {
                        setValue('thumbnailFile', {})
                    } else {
                        setValue(props, data[props])
                    }
                }
            })
        }
    }, [data])

    return <form className="col" style={{ width: '100%', flex: 1, height: '100%' }} >
        <div className="heading-5 row" style={{ padding: '2.4rem' }}>Tổng quan</div>
        <div className="row course-overview-form" >
            <div className="col col8-xxl col12 col24-md col24-sm" style={{ '--gutter': '4rem', gap: '2rem' }}>
                <ImportFileForm
                    control={control}
                    name={'pictureFile'}
                    value={watch('pictureFile')}
                    label={'Ảnh bìa'}
                    allowType={['image/jpg', 'image/png', 'image/jpeg']}
                    subTitle={'1840x380 pixels (PNG, JPG)'}
                    width={'100%'}
                />
                <ImportFileForm
                    required
                    control={control}
                    name={'thumbnailFile'}
                    label={'Thumbnail'}
                    value={watch('thumbnailFile')}
                    allowType={['image/jpg', 'image/png', 'image/jpeg']}
                    subTitle={'3840 x 2160 hoặc 1920 x 1080 pixels (PNG, JPG)'}
                    width={'100%'}
                    direction="col"
                />
                <TextFieldForm
                    required
                    control={control}
                    errors={errors}
                    label={'Tên khóa học'}
                    name={'name'}
                    value={watch('name')}
                    onBlur={onChangeData}
                />
                <TextAreaForm
                    control={control}
                    errors={errors}
                    label={'Giới thiệu tổng quan'}
                    placeholder={'Giới thiệu ngắn gọn về khóa học'}
                    name={'shortIntro'}
                    value={watch('shortIntro')}
                    onBlur={onChangeData}
                />
                <Select1Form
                    required
                    control={control}
                    errors={errors}
                    label={'Phân loại chủ đề'}
                    name={'topicId'}
                    value={watch('topicId')}
                    options={listTopic}
                    onChange={onChangeData}
                />
                <SelectMultipleForm
                    control={control}
                    errors={errors}
                    label={'Tag chủ đề (Tối đa 5)'}
                    placeholder={'Chọn chủ đề'}
                    name={'courseTags'}
                    value={watch('courseTags')}
                    options={listTag}
                    onChange={onChangeData}
                />
            </div>
            <div className="col col8-xxl col12 col24-md col24-sm" style={{ '--gutter': '4rem', gap: '2rem' }}>
                <Select1Form
                    required
                    control={control}
                    errors={errors}
                    label={'Trình độ học viên'}
                    name={'level'}
                    value={watch('level')}
                    options={studentLevelList}
                    onChange={onChangeData}
                />
                <TextAreaForm
                    control={control}
                    errors={errors}
                    label={'Khóa học phù hợp với ai?'}
                    placeholder={'Mô tả chi tiết hơn về đối tượng khóa học nhắm đến'}
                    name={'description'}
                    value={watch('description')}
                    onBlur={onChangeData}
                />
                <div className="col" style={{ padding: '1.2rem 0', gap: '2rem' }}>
                    <SwitchForm control={control} label={'Cấp chứng chỉ cho học viên hoàn thành'} value={watch('isCertificate')} name={'isCertificate'} onChange={onChangeData} />
                    <SwitchForm control={control} label={'Cho phép học viên bình luận trong khóa học'} value={watch('isComment')} name={'isComment'} onChange={onChangeData} />
                    <SwitchForm control={control} label={'Xem trước nội dung khóa học trước khi mua'} value={watch('isContent')} name={'isContent'} onChange={onChangeData} />
                </div>
                <TextFieldForm
                    control={control}
                    errors={errors}
                    label={'Công cụ cần chuẩn bị'}
                    placeholder={'Học viên cần chuẩn bị gì trước khi bắt đầu khóa học?'}
                    name={'tools'}
                    value={watch('tools')}
                    onBlur={onChangeData}
                />
                <div className="col" style={{ gap: 4 }}>
                    <div className="row" style={{ gap: 4 }}>
                        <Text className="label-3">Mục tiêu khóa học</Text>
                        <Text className="label-4" style={{ color: '#E14337' }}>*</Text>
                    </div>
                    <Text className="subtitle-4">Nhập kết quả then chốt học viên sẽ đạt được sau khóa học này</Text>
                </div>
                <div className="col" style={{ gap: '1.2rem' }}>
                    {watch('targets').map((e, i) => <div key={e.id} className="row" style={{ width: '100%', gap: '1.2rem' }}>
                        <div style={{ flex: 1, width: '100%' }}>
                            <TextFieldForm placeholder={'Mục tiêu ' + (i + 1)} value={watch(`targets[${i}].value`) ?? ''} control={control} errors={errors} name={`targets[${i}].value`} onBlur={onChangeData} />
                        </div>
                        <button type="button" style={{ visibility: watch('targets').length > 1 ? 'visible' : 'hidden' }} onClick={() => {
                            let listTarget = getValues('targets')
                            setValue('targets', [...listTarget.slice(0, i), ...listTarget.slice(i + 1)])
                            if (e.value?.trim().length) onChangeData()
                        }}><FontAwesomeIcon icon={faMinusCircle} color="#E14337" /></button>
                    </div>)}
                    <button type="button" className="row button-grey"
                        onClick={() => {
                            let listTarget = getValues('targets')
                            setValue('targets', [...listTarget, { id: uuidv4() }])
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem' }} />
                        <div className="button-text-3" >Thêm mục tiêu</div>
                    </button>
                </div>
            </div>
        </div>
    </form>
}