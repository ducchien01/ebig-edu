import { forwardRef, useEffect, useState } from "react";
import { Text, ToastMessage, closePopup } from "../../../../../component/export-component";
import { useForm } from "react-hook-form";
import ConfigAPI from "../../../../../config/configApi";
import { Select1Form, SelectMultipleForm } from "../../../../../project-component/component-form";
import { TopicController } from "../../../topic/controller";
import { TagController } from "../../../tag/controller";
import { CategoryController } from "../../../category/controller";
import { CustomerController } from "../../../customer/controller";
import { NewController } from "../controller";
import { useNavigate } from "react-router-dom";
import { NewStatus } from "../da";

const PopupPublishNews = forwardRef(function PopupPublishNews(data, ref) {
    const navigate = useNavigate()
    const methods = useForm({ shouldFocusError: false })
    const [listTopic, setListTopic] = useState([])
    const [listTag, setListTag] = useState([])
    const [listCate, setListCate] = useState([])

    const submitPublishNew = (ev) => {
        let newData = { ...data.item, ...ev }
        delete newData.picture
        newData.status = NewStatus.published
        if (newData.id) {
            NewController.edit(newData).then(res => {
                if (res) {
                    ToastMessage.success('Chỉnh sửa bài viết thành công')
                    navigate('/')
                }
            })
        } else {
            NewController.add(newData).then(res => {
                if (res) {
                    ToastMessage.success('Đăng bài viết thành công')
                    navigate('/')
                }
            })
        }
    }

    useEffect(() => {
        TopicController.getAll().then(res => {
            if (res) setListTopic(res)
        })
        TagController.getAll().then(res => {
            if (res) setListTag(res)
        })
        CategoryController.getListSimpleAuth({ page: 1, take: 50, filter: [{ field: 'customerId', operator: '=', value: CustomerController.userInfor().id }] }).then(res => {
            if (res) setListCate(res.data)
        })
        Object.keys(data.item).forEach(props => {
            methods.setValue(props, data.item[props])
        })
    }, [])

    return <form className="col">
        <div className="row" style={{ flex: 1, height: '100%', width: '100%', padding: '1.6rem 2.4rem', gap: '4rem', alignItems: 'start' }}>
            <div className="col" style={{ gap: '0.8rem' }}>
                <div className="label-3">Ảnh bài viết</div>
                <img src={ConfigAPI.imgUrl + data.item.pictureId} alt="" style={{ width: '25.6rem', borderRadius: '0.8rem', minHeight: '17.2rem' }} />
            </div>
            <div className="col" style={{ gap: '2.4rem', flex: 1 }}>
                <Select1Form
                    label={'Chọn Topic của bài viết'}
                    placeholder={'Chọn Topic'}
                    control={methods.control}
                    name={'topicId'}
                    value={methods.watch('topicId')}
                    options={listTopic}
                />
                <Select1Form
                    label={'Lưu vào danh mục bài viết'}
                    placeholder={'Chọn danh mục'}
                    control={methods.control}
                    name={'cateId'}
                    value={methods.watch('cateId')}
                    options={listCate}
                />
                <SelectMultipleForm
                    control={methods.control}
                    label={'Tag chủ đề (Tối đa 5)'}
                    placeholder={'Chọn chủ đề'}
                    name={'newsTags'}
                    value={methods.watch('newsTags')}
                    options={listTag}
                />
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text onClick={() => { closePopup(ref) }} className="button-text-3" style={{ color: '#00204D99' }}>Hủy</Text>
            <button type="button" className="button-primary row" onClick={methods.handleSubmit(submitPublishNew)}>
                <div className="buttoon-text-3">Đăng bài</div>
            </button>
        </div>
    </form>
})

export default PopupPublishNews