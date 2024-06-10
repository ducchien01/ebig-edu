import { forwardRef, useEffect, useRef, useState } from "react"
import { NewController } from "../../social/new/controller"
import { Popup, Text, TextField, ToastMessage, closePopup, showPopup } from "../../../../component/export-component"
import { FilledLogoFacebook, FilledPhone, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineLocation, OutlineSharing, OutlineThumbUp } from "../../../../assets/const/icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faEdit } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import { CenterController } from "../controller"
import { RatingController } from "../../edu/rating/controller"
import { NewStatus } from "../../social/new/da"
import { CustomerController } from "../../customer/controller"
import { PostCard } from "../../../../project-component/card"
import ConfigAPI from "../../../../config/configApi"
import { Ultis } from "../../../../Utils"
import { useNavigate } from "react-router-dom"
import { CenterPermisson } from "../da"

export default function CommonTab({ centerItem, userInfor, permisson }) {
    const navigate = useNavigate()
    const [centerData, setCenterData] = useState()
    const [news, setNews] = useState({ totalCount: undefined, data: [] })
    const [customerList, setCustomerList] = useState([])
    const [interactInfor, setInteractInfor] = useState([])
    const ref = useRef()

    const getInteractInfor = (list) => {
        RatingController.getRatingLikeByIds(list.map(e => e.id)).then(res => {
            if (res) setInteractInfor(res)
        })
    }

    const showShareOptions = (ev, newId) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col more-action-popup">
                <button type="button" className="row" onClick={() => {
                    navigator.clipboard.writeText(window.location.href.replace('social', '') + `social/news/${newId}`)
                    closePopup(ref)
                }}>
                    <OutlineFileCopy />
                    <Text className="label-4">Sao chép đường liên kết</Text>
                </button>
                <button type="button" className="row">
                    <FilledLogoFacebook />
                    <Text className="label-4">Chia sẻ lên Facebook</Text>
                </button>
            </div>
        })
    }

    const getNews = async (page) => {
        const res = await NewController.getListSimple({ page: page ?? Math.floor((news.data.length / 10)) + 1, take: 10, filter: [{ field: 'status', operator: '=', value: NewStatus.published }, { field: 'centerId', operator: '=', value: centerItem.id }] })
        if (res) {
            const newList = res.data.filter(e => news.data.every(el => el.id !== e.id))
            getInteractInfor(newList)
            const customerIds = newList.map(e => e.customerId).filter(id => id && customerList.every(e => e.id !== id))
            CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setCustomerList(cusRes)
            })
            setNews({
                totalCount: res.totalCount,
                data: [...news.data, ...newList]
            })
        }
    }

    const showPopupEditDescription = () => {
        showPopup({
            ref: ref,
            style: { width: '80%', maxWidth: '68rem', backgroundColor: '#fff' },
            heading: <div className="heading-6 popup-header" style={{ textAlign: 'center' }}>Viết mô tả</div>,
            content: <PopupEditDescription description={centerData.description} ref={ref} onSubmit={(vl) => {
                const newCenterData = { ...centerData, description: vl }
                CenterController.edit(newCenterData).then(res => {
                    if (res) {
                        ToastMessage.success('Cập nhật mô tả thành công')
                        setCenterData(newCenterData)
                    }
                })
            }} />
        })
    }

    useEffect(() => {
        if (centerItem) {
            setCenterData(centerItem)
            getNews(1)
        }
    }, [centerItem])

    useEffect(() => {
        const loadMore = (ev) => {
            if (!document.getElementById('center-common-tab')) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', loadMore)
                return
            }
            if (Math.round(ev.target.offsetHeight + ev.target.scrollTop) >= (ev.target.scrollHeight - 1)) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', loadMore)
                getNews()
            }
        }
        if (news.totalCount > 10 && news.totalCount !== news.data.length)
            document.body.querySelector('.main-layout').addEventListener('scroll', loadMore)
    }, [news])

    return centerData ? <div id="center-common-tab" className="col">
        <Popup ref={ref} />
        <div className='col' style={{ padding: '2.4rem', margin: '2.4rem 4.8rem 0.8rem', backgroundColor: '#fff', borderRadius: '0.8rem', width: 'calc(100% - 9.6rem)', gap: '0.8rem' }}>
            <Text className='heading-6'>Giới thiệu</Text>
            <div className="col divider" style={{ margin: '0.4rem 0', height: 1, backgroundColor: '#00358014' }} />
            <div className='row' style={{ gap: '0.8rem' }}>
                <FilledPhone height="2rem" width="2rem" />
                <Text className='regular3'>{centerData?.phone ?? '-'}</Text>
            </div>
            <div className='row' style={{ gap: '0.8rem', alignItems: 'start' }}>
                <div style={{ marginTop: '0.2rem' }}><OutlineLocation height="2rem" width="2rem" /></div>
                <Text maxLine={2} style={{ flex: 1 }} className='regular3'>{centerData?.address ?? '-'}</Text>
            </div>
            <div className="row" style={{ gap: '0.8rem', paddingTop: '0.8rem' }}>
                <Text className='heading-6' style={{ marginTop: '0.2rem' }}>Mô tả</Text>
                {permisson === CenterPermisson.owner || permisson === CenterPermisson.admin ? <button type="button" onClick={showPopupEditDescription} className="row icon-button28"><FontAwesomeIcon icon={faEdit} /></button> : undefined}
            </div>
            {centerData.description?.length ? <Text className="regular2" showMore maxLine={4} style={{ width: '100%' }}>{centerData.description}</Text> : undefined}
        </div>
        <div className="col" style={{ gap: '3.2rem', padding: '2.4rem' }}>
            {permisson === CenterPermisson.owner || permisson === CenterPermisson.admin ? <button type="button" onClick={() => { navigate('/center/news/create', { state: { centerId: centerItem.id } }) }} className='row' style={{ backgroundColor: '#fff', borderRadius: '1.2rem', width: 'calc(100% - 4.8rem)', margin: '0 2.4rem', gap: '1.6rem', padding: '1.6rem 2.4rem' }}>
                <img src={userInfor?.avatarUrl} alt="" style={{ width: '4.4rem', height: '4.4rem', borderRadius: '50%' }} />
                <TextField
                    className="regular3"
                    style={{ flex: 1, border: 'none', borderRadius: '2.4rem', height: '4.8rem', padding: '0 1.6rem', textAlign: 'start' }}
                    placeholder="Đăng bài viết mới..."
                    disabled
                />
                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '2.4rem', color: '#667994' }} />
            </button> : undefined}
            {news.data.map((item, i) => {
                const itemInteractInfor = interactInfor.find(e => e.linkId === item.id)
                const customer = customerList.find(e => e.id === item.customerId)
                return <PostCard
                    key={item.id}
                    className="row"
                    style={{ gap: '4rem', alignItems: 'start' }}
                    to={`/center/news/${item.id}`}
                    state={{ centerId: centerItem.id }}
                    imgUrl={ConfigAPI.imgUrl + item.pictureId}
                    imgStyle={{ width: '16.2rem', height: '16.2rem' }}
                    heading={<div className="row" style={{ gap: '0.8rem', maxWidth: '100%', width: 'fit-content' }}>
                        <img src={customer?.avatarUrl} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                        <div className="label-3">{customer?.name ?? '-'}</div>
                        <div className="label-4">.</div>
                        <Text className="subtitle-3">{item.dateCreated ? Ultis.datetoString(new Date(item.dateCreated)) : '-'}</Text>
                    </div>}
                    title={item.title}
                    content={<div style={{ maxHeight: '16rem' }} dangerouslySetInnerHTML={{ __html: item.description.replace(/(<figure)(.*?)(<\/figure>)/g, '') }} className="comp-text news-show-ckeditor-content"></div>}
                    actions={<div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                        <div className="row" style={{ flex: 1, width: '100%' }}>
                            <div className="tag-disabled row" style={{ backgroundColor: 'transparent' }}>
                                <OutlineThumbUp width="1.6rem" height="1.6rem" />
                                <div className="button-text-3">{itemInteractInfor?.totalLike ?? '0'}</div>
                            </div>
                            <div className="label-4">.</div>
                            <div className="tag-disabled row" style={{ backgroundColor: 'transparent' }}>
                                <OutlineChat width="1.6rem" height="1.6rem" />
                                <div className="button-text-3">{itemInteractInfor?.totalRating ?? '0'}</div>
                            </div>
                        </div>
                        <button type="button" className="row icon-button32" onClick={() => { }}><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                        <button type="button" className="row icon-button32" onClick={(ev) => { showShareOptions(ev, item.id) }} >
                            <OutlineSharing width="2rem" height="2rem" />
                        </button>
                    </div>}
                />
            })}
        </div>
    </div> : <div />
}

const PopupEditDescription = forwardRef(function PopupEditDescription(data, ref) {
    const methods = useForm({ shouldFocusError: false })

    useEffect(() => {
        methods.setValue('description', data.description ?? '')
    }, [])

    return <div className="col">
        <textarea
            {...methods.register('description')}
            placeholder="Mô tả về trung tâm của bạn..."
            className="regular"
            style={{ minHeight: '24rem', outline: 'none', border: 'none', resize: 'none', padding: '1.6rem' }}
        />
        <div className="row popup-footer">
            <Text className="button-text-3" onClick={() => { closePopup(ref) }}>Hủy</Text>
            <div style={{ flex: 1 }} />
            <button
                type="button"
                className={`row ${methods.watch('description') ? 'button-primary' : 'button-disabled'}`}
                onClick={() => {
                    data.onSubmit(methods.getValues('description'))
                    closePopup(ref)
                }}
            >
                <Text className="button-text-3">Xác nhận</Text>
            </button>
        </div>
    </div>
})