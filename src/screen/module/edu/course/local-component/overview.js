import { useForm } from "react-hook-form";
import { ImportFileForm, Select1Form, SelectMultipleForm, SwitchForm, TextAreaForm, TextFieldForm } from "../../../../../project-component/component-form";
import { Text } from "../../../../../component/export-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Ultis, uuidv4 } from "../../../../../Utils";
import { useEffect, useState } from "react";
import { TopicController } from "../../../topic/controller";
import { TagController } from "../../../tag/controller";
import { studentLevelList } from "../../../../../assets/const/const-list";
import { CourseController } from "../controller";
import { getFilesByIds } from "../../../../base-controller";
import ConfigAPI from "../../../../../config/configApi";
import { uploadFiles } from "../../../../baseDA";

export default function Overview({ data, onChangeRequired }) {
    const { control, formState: { errors }, watch, setValue, getValues, register } = useForm({ shouldFocusError: false, defaultValues: { targets: [{ id: uuidv4() }, { id: uuidv4() }], test: 'hjdsgfyds' } })
    const [listTopic, setListTopic] = useState([])
    const [listTag, setListTag] = useState([])

    const onChangeData = () => {
        let courseData = { ...data, ...getValues() }
        let newTargetList = courseData.targets.filter(e => e.value?.trim()?.length)
        if (newTargetList.length) {
            courseData.targets = JSON.stringify(newTargetList)
        } else {
            delete courseData.targets
        }
        if (courseData.price && typeof courseData.price === 'string') {
            courseData.price = parseFloat(courseData.price.replaceAll(",", ''))
        }
        delete courseData.pictureFile
        delete courseData.thumbnailFile
        CourseController.edit(courseData).then(res => {
            if (res && onChangeRequired) onChangeRequired(courseData)
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
                        let targetList = JSON.parse(data[props])
                        if (targetList.length)
                            setValue(props, targetList)
                    } else if (['pictureId', 'thumbnailId'].includes(props)) {
                        setValue(props, data[props])
                        setValue(props.replace('Id', 'File'), { url: ConfigAPI.imgUrl + data[props], type: 'image' })
                    } else if (props === 'price') {
                        setValue(props, Ultis.money(data[props]))
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
                    onChange={(newFile) => {
                        uploadFiles([newFile]).then(res => {
                            if (res) {
                                setValue('pictureId', res[0].id)
                                setValue('pictureFile', { url: ConfigAPI.imgUrl + res[0].id, type: 'image' })
                                onChangeData()
                            }
                        })
                    }}
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
                    onChange={(newFile) => {
                        uploadFiles([newFile]).then(res => {
                            if (res) {
                                setValue('thumbnailId', res[0].id)
                                setValue('thumbnailFile', { url: ConfigAPI.imgUrl + res[0].id, type: 'image' })
                                onChangeData()
                            }
                        })
                    }}
                />
                <TextFieldForm
                    required
                    register={register}
                    errors={errors}
                    label={'Tên khóa học'}
                    name={'name'}
                    onBlur={onChangeData}
                />
                <TextFieldForm
                    required
                    register={register}
                    errors={errors}
                    label={'Học phí'}
                    placeholder={'Nhập giá'}
                    name={'price'}
                    suffix={
                        <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--background)', position: 'absolute', right: 0, borderLeft: 'var(--border-grey1)' }} >
                            <Text className="button-text-3">VND</Text>
                        </div>
                    }
                    onFocus={(ev) => {
                        setValue('price', ev.target.value.replaceAll(",", ''))
                    }}
                    onBlur={(ev) => {
                        let newPrice = ev.target.value.trim().replaceAll(',', '')
                        if (!isNaN(parseFloat(newPrice))) {
                            setValue('price', Ultis.money(newPrice))
                            onChangeData()
                        } else {
                            setValue('price', data.price != null ? Ultis.money(data.price) : '')
                        }
                    }}

                />
                <TextAreaForm
                    register={register}
                    name={'description'}
                    errors={errors}
                    label={'Giới thiệu tổng quan'}
                    placeholder={'Giới thiệu ngắn gọn về khóa học'}
                    onBlur={onChangeData}
                    style={{height: '14rem'}}
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
                    register={register}
                    name={'suitable'}
                    errors={errors}
                    label={'Khóa học phù hợp với ai?'}
                    placeholder={'Mô tả chi tiết hơn về đối tượng khóa học nhắm đến'}
                    onBlur={onChangeData}
                    style={{height: '14rem'}}
                />
                <div className="col" style={{ padding: '1.2rem 0', gap: '2rem' }}>
                    <SwitchForm control={control} label={'Cấp chứng chỉ cho học viên hoàn thành'} value={watch('isCertificate')} name={'isCertificate'} onChange={onChangeData} />
                    <SwitchForm control={control} label={'Cho phép học viên bình luận trong khóa học'} value={watch('isComment')} name={'isComment'} onChange={onChangeData} />
                    <SwitchForm control={control} label={'Xem trước nội dung khóa học trước khi mua'} value={watch('isContent')} name={'isContent'} onChange={onChangeData} />
                </div>
                <TextFieldForm
                    register={register}
                    errors={errors}
                    label={'Công cụ cần chuẩn bị'}
                    placeholder={'Học viên cần chuẩn bị gì trước khi bắt đầu khóa học?'}
                    name={'tools'}
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
                            <TextFieldForm placeholder={'Mục tiêu ' + (i + 1)} register={register} errors={errors} name={`targets[${i}].value`} onBlur={onChangeData} />
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