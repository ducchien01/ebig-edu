import { useForm } from "react-hook-form";
import { CustomCKEditor, Text, TextArea } from "../../../../../component/export-component";
import { ImportFileForm, Select1Form, SelectMultipleForm } from "../../../../../project-component/component-form";
import { uploadFiles } from "../../../../baseDA";
import ConfigAPI from "../../../../../config/configApi";
import { useEffect, useState } from "react";
import { TopicController } from "../../../topic/controller";
import { TagController } from "../../../tag/controller";
import { CategoryController } from "../../../category/controller";
import { useParams } from "react-router-dom";
import { NewController } from "../controller";
import { editorConfiguration } from "../../../../../assets/const/const-list";
import { CustomerController } from "../../../customer/controller";

export default function SettingsNews() {
    const { id } = useParams()
    const methods = useForm({ shouldFocusError: false })
    const [onEditTitle, setEditTitle] = useState(false)
    const [listTopic, setListTopic] = useState([])
    const [listTag, setListTag] = useState([])
    const [listCate, setListCate] = useState([])

    useEffect(() => {
        if (id) {
            NewController.getById(id).then(res => {
                if (res) {
                    Object.keys(res).forEach(props => {
                        if (res[props] != null) methods.setValue(props, res[props])
                    })
                }
            })
        }
        TopicController.getAll().then(res => {
            if (res) setListTopic(res)
        })
        TagController.getAll().then(res => {
            if (res) setListTag(res)
        })
        CategoryController.getListSimpleAuth({ page: 1, take: 50, filter: [{ field: 'customerId', operator: '=', value: CustomerController.userInfor().id }] }).then(res => {
            if (res) setListCate(res.data)
        })
    }, [])

    return <form className="col" style={{ width: '100%', height: '100%', flex: 1 }}>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }} >
                <div className="col col24 col16-xxl col16-xl col18-lg cool20-md" style={{ padding: '2rem 3.2rem 1.6rem 3.2rem', '--gutter': '0px', gap: '3.2rem' }}>
                    {onEditTitle ? <TextArea
                        autoFocus
                        style={{ width: '100%', height: 'fit-content', padding: 0, border: 'none', minHeight: '3.8rem' }}
                        placeholder={'Nhập tiêu đề bài viết ...'}
                        name={'title'}
                        className="heading-4"
                        register={methods.register('title', {
                            onBlur: (ev) => { },
                        })}
                        onChange={(ev) => {
                            ev.target.style.height = `0px`
                            ev.target.style.height = `${ev.target.scrollHeight}px`
                        }}
                        onFocus={(ev) => {
                            setTimeout(() => {
                                ev.target.style.height = `0px`
                                ev.target.style.height = `${ev.target.scrollHeight}px`
                            }, 100)
                        }}
                    /> : <Text onClick={() => { setEditTitle(true) }} style={{ width: '100%', wordBreak: 'break-word', opacity: methods.watch('title') ? 1 : 0.6 }} className="heading-4" maxLine={10}>{methods.watch('title') ?? 'Nhập tiêu đề bài viết ...'}</Text>}
                    {methods.watch('pictureId') ? <img
                        src={ConfigAPI.imgUrl + methods.getValues('pictureId')}
                        alt=""

                    /> : <ImportFileForm
                        control={methods.control}
                        name={'picture'}
                        value={methods.watch('picture')}
                        allowType={['image/jpg', 'image/png', 'image/jpeg']}
                        width={'100%'}
                        title={'Thêm hình ảnh'}
                        onChange={(newFile) => {
                            uploadFiles([newFile]).then(res => {
                                if (res) methods.setValue('pictureId', res[0].id)
                            })
                        }}
                    />}
                    {/* <Select1Form
                        control={methods.control}
                        errors={methods.errors}
                        label={'Phân loại danh mục'}
                        name={'cateId'}
                        value={methods.watch('cateId')}
                        options={listCate}
                    />
                    <Select1Form
                        required
                        control={methods.control}
                        errors={methods.errors}
                        placeholder={'Chọn phân loại chủ đề'}
                        name={'topicId'}
                        value={methods.watch('topicId')}
                        options={listTopic}
                    />
                    <SelectMultipleForm
                        control={methods.control}
                        errors={methods.errors}
                        placeholder={'Chọn tag chủ đề'}
                        name={'newsTags'}
                        value={methods.watch('newsTags')}
                        options={listTag}
                    /> */}
                    <CustomCKEditor
                        config={editorConfiguration}
                        style={{ flex: 1, minHeight: '38rem', height: '100%' }}
                        value={methods.watch('description')}
                        onBlur={(_, editor) => {
                            methods.setValue('description', editor.getData())
                        }}
                    />
                </div>
            </div>
        </div>
        <div className="row" style={{ width: '100%', justifyContent: 'center', borderTop: '1px solid #00358014' }}>
            <div className="row col24 col16-xxl col16-xl col18-lg cool20-md" style={{ '--gutter': '0px', gap: '0.8rem', padding: '1.6rem 3.2rem' }}>
                <div style={{ flex: 1 }}></div>
                <button type="button" className="row button-grey">
                    <div className="button-text-3">Lưu nháp</div>
                </button>
                <button type="button" className="row button-primary" style={{ padding: '0.6rem 1.2rem' }}>
                    <div className="button-text-3">Đăng bài viết</div>
                </button>
            </div>
        </div>
    </form>
}