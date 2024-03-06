import { useForm } from "react-hook-form";
import { ImportFileForm, Select1Form, SelectMultipleForm, SwitchForm, TextAreaForm, TextFieldForm } from "../../../../project-component/component-form";
import { Text } from "../../../../component/export-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from "../../../../Utils";

export default function Overview({ data }) {
    const { control, formState: { errors }, watch, setValue, getValues, handleSubmit, } = useForm({ shouldFocusError: false, defaultValues: { listTarget: [{ id: uuidv4() }, { id: uuidv4() }, { id: uuidv4 }, { id: uuidv4() }] } })
    return <div className="col" style={{ width: '100%', gap: '3.2rem' }}>
        <div className="heading-5">Tổng quan</div>
        <div className="row course-overview-form" >
            <div className="col col8-xxl col12 col24-md col24-sm" style={{ '--gutter': '4rem', gap: '2rem' }}>
                <ImportFileForm
                    control={control}
                    name={'coverImg'}
                    label={'Ảnh bìa'}
                    allowType={['image/jpg', 'image/png', 'image/jpeg']}
                    subTitle={'1840x380 pixels (PNG, JPG)'}
                    width={'100%'}
                />
                <ImportFileForm
                    required
                    control={control}
                    name={'thumbnail'}
                    label={'Thumbnail'}
                    value={watch('thumbnail')}
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
                />
                <TextAreaForm
                    control={control}
                    errors={errors}
                    label={'Giới thiệu tổng quan'}
                    placeholder={'Giới thiệu ngắn gọn về khóa học'}
                    name={'intro'}
                    value={watch('intro')}
                />
                <Select1Form
                    required
                    control={control}
                    errors={errors}
                    label={'Phân loại chủ đề'}
                    name={'category'}
                    value={watch('category')}
                    options={[]}
                />
                <SelectMultipleForm
                    control={control}
                    errors={errors}
                    label={'Tag chủ đề (Tối đa 5)'}
                    placeholder={'Chọn chủ đề'}
                    name={'subject'}
                    value={watch('subject')}
                    options={[]}
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
                    options={[]}
                />
                <TextAreaForm
                    control={control}
                    errors={errors}
                    label={'Khóa học phù hợp với ai?'}
                    placeholder={'Mô tả chi tiết hơn về đối tượng khóa học nhắm đến'}
                    name={'descriptFor'}
                    value={watch('descriptFor')}
                />
                <div className="col" style={{ padding: '1.2rem 0', gap: '2rem' }}>
                    <SwitchForm control={control} label={'Cấp chứng chỉ cho học viên hoàn thành'} value={true} name={'toggle1'} />
                    <SwitchForm control={control} label={'Cho phép học viên bình luận trong khóa học'} value={true} name={'toggle2'} />
                    <SwitchForm control={control} label={'Xem trước nội dung khóa học trước khi mua'} value={true} name={'toggle3'} />
                </div>
                <TextFieldForm
                    control={control}
                    errors={errors}
                    label={'Công cụ cần chuẩn bị'}
                    placeholder={'Học viên cần chuẩn bị gì trước khi bắt đầu khóa học?'}
                    name={'equipment'}
                    value={watch('equipment')}
                />
                <div className="col" style={{ gap: 4 }}>
                    <div className="row" style={{ gap: 4 }}>
                        <Text className="label-3">Mục tiêu khóa học</Text>
                        <Text className="label-4" style={{ color: '#E14337' }}>*</Text>
                    </div>
                    <Text className="subtitle-4">Nhập kết quả then chốt học viên sẽ đạt được sau khóa học này</Text>
                </div>
                <div className="col" style={{ gap: '1.2rem' }}>
                    {watch('listTarget').map((e, i) => <div key={e.id} className="row" style={{ width: '100%', gap: '1.2rem' }}>
                        <div style={{ flex: 1, width: '100%' }}>
                            <TextFieldForm placeholder={'Mục tiêu ' + (i + 1)} value={watch(`listTarget[${i}].value`) ?? ''} control={control} errors={errors} name={`listTarget[${i}].value`} />
                        </div>
                        <button type="button" style={{ visibility: watch('listTarget').length > 1 ? 'visible' : 'hidden' }} onClick={() => {
                            let thisListTarget = getValues('listTarget')
                            setValue('listTarget', [...thisListTarget.slice(0, i), ...thisListTarget.slice(i + 1)])
                        }}><FontAwesomeIcon icon={faMinusCircle} color="#E14337" /></button>
                    </div>)}
                    <button type="button" className="row"
                        style={{ backgroundColor: 'var(--background)', borderRadius: '2.4rem', padding: '0.8rem 1.6rem', gap: '0.8rem', width: 'fit-content' }}
                        onClick={() => {
                            let thisListTarget = getValues('listTarget')
                            setValue('listTarget', [...thisListTarget, { id: uuidv4() }])
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.6rem', color: '#00204D99' }} />
                        <div className="button-text-3" style={{ color: '#00204D99' }} >Thêm mục tiêu</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
}