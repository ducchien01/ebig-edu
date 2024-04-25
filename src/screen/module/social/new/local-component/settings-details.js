import { useForm } from "react-hook-form";
import { CustomCKEditor, Popup, Text, TextArea, showPopup } from "../../../../../component/export-component";
import { ImportFileForm, Select1Form, SelectMultipleForm } from "../../../../../project-component/component-form";
import { uploadFiles } from "../../../../baseDA";
import ConfigAPI from "../../../../../config/configApi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { NewController } from "../controller";
import { editorConfiguration } from "../../../../../assets/const/const-list";
import PopupPublishNews from "./popup-publish";

export default function SettingsNews() {
    const { id } = useParams()
    const ref = useRef()
    const methods = useForm({ shouldFocusError: false })
    const [onEditTitle, setEditTitle] = useState(false)


    const submitPublishNew = (ev) => {
        showPopup({
            ref: ref,
            heading: <div className="heading-6 popup-header">Bước cuối trước khi đăng bài viết</div>,
            style: { width: '87.2rem' },
            content: <PopupPublishNews ref={ref} item={ev} />
        })
    }

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
    }, [])

    return <form className="col" style={{ width: '100%', height: '100%', flex: 1 }}>
        <Popup ref={ref} />
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }} >
                <div className="col col24 col16-xxl col16-xl col18-lg col20-md" style={{ padding: '2rem 3.2rem 1.6rem 3.2rem', '--gutter': '0px', gap: '3.2rem' }}>
                    {onEditTitle ? <TextArea
                        autoFocus
                        style={{ width: '100%', height: 'fit-content', padding: 0, border: 'none', minHeight: '3.8rem' }}
                        placeholder={'Nhập tiêu đề bài viết ...'}
                        name={'title'}
                        className="heading-4"
                        register={methods.register('title')}
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
                    <CustomCKEditor
                        className="news-content-editor"
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
            <div className="row col24 col16-xxl col16-xl col18-lg col20-md" style={{ '--gutter': '0px', gap: '0.8rem', padding: '1.6rem 3.2rem' }}>
                <div style={{ flex: 1 }}></div>
                {methods.watch('title') ? <button type="button" className="row button-grey">
                    <div className="button-text-3">Lưu nháp</div>
                </button> : null}
                <button type="submit" onClick={methods.handleSubmit(submitPublishNew)} className={`row ${methods.watch('title') && methods.watch('description') ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }}>
                    <div className="button-text-3">Đăng bài viết</div>
                </button>
            </div>
        </div>
    </form>
}