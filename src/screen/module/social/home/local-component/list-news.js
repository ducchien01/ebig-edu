import { forwardRef, useEffect, useRef, useState } from "react"
import { NewController } from "../../new/controller"
import { InfiniteScroll, Popup, Text, closePopup, showPopup } from "../../../../../component/export-component"
import { FilledLogoFacebook, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineSharing, OutlineThumbUp } from "../../../../../assets/const/icon"
import { TopicController } from "../../../topic/controller"
import { PostCard } from "../../../../../project-component/card"
import { CheckboxForm } from "../../../../../project-component/component-form"
import { useForm } from "react-hook-form"
import { Ultis, uuidv4 } from "../../../../../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons"
import ConfigAPI from "../../../../../config/configApi"
import { RatingController } from "../../../edu/rating/controller"
import { CustomerController } from "../../../customer/controller"

export default function ListNews({ isLogin = false }) {
    const ref = useRef()
    const [newsData, setNewsData] = useState([])
    const [total, setTotal] = useState()
    const [interactInfor, setInteractInfor] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [topicList, setTopicList] = useState([])
    const [filterTab, setFilterTab] = useState(0)

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

    const showAddBookmark = (ev) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <PopupSelectBookmark ref={ref} />
        })
    }

    const getData = () => {
        NewController.getListSimple({ page: Math.floor((newsData.length / 30)) + 1, take: 30 }).then(res => {
            if (res) {
                if (res.totalCount !== total) setTotal(res.totalCount)
                const newList = res.data.filter(e => newsData.every(el => el.id !== e.id))
                getInteractInfor(newList)
                const customerIds = newList.map(e => e.customerId).filter(id => id && customerList.every(e => e.id !== id))
                CustomerController.getByIds(customerIds).then(cusRes => {
                    if (cusRes) setCustomerList(cusRes)
                })
                setNewsData([...newsData, ...newList])
            }
        })
    }

    const getInteractInfor = (list) => {
        RatingController.getRatingLikeByIds(list.map(e => e.id)).then(res => {
            if (res) setInteractInfor(res)
        })
    }

    useEffect(() => {
        getData()
        TopicController.getAll().then(res => {
            if (res) setTopicList(res)
        })
    }, [])

    return <>
        <Popup ref={ref} />
        <InfiniteScroll handleScroll={total !== newsData.length ? getData : undefined} className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl" style={{ padding: '2rem 3.2rem', gap: '2.4rem', '--gutter': '0px' }}>
                    {isLogin && <div className="row filter-news-container">
                        <button type="button" className="row">
                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem', color: 'var(--primary-color)' }} />
                        </button>
                        <div className="row">
                            {Array.from({ length: 10 }).map((e, i) => {
                                return <div key={'tab-' + i} className={`filter-news-tab ${filterTab === i ? 'selected' : ''}`} onClick={() => {
                                    setFilterTab(i)
                                }}>
                                    <Text className="label-4">Bài viết xu hướng</Text>
                                </div>
                            })}
                        </div>
                        <button type="button" className="row">
                            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                        </button>
                    </div>}
                    <div className="col" style={{ gap: '3.2rem' }}>
                        {newsData.map((item, i) => {
                            const itemInteractInfor = interactInfor.find(e => e.linkId === item.id)
                            const customer = customerList.find(e => e.id === item.customerId)
                            return <PostCard
                                key={'new-' + i}
                                className="row"
                                style={{ gap: '4rem', alignItems: 'start' }}
                                to={`social/news/${item.id}`}
                                imgUrl={ConfigAPI.imgUrl + item.pictureId}
                                imgStyle={{ width: '16.2rem', height: '16.2rem' }}
                                heading={<div className="row" style={{ gap: '0.8rem', maxWidth: '100%', width: 'fit-content' }}>
                                    <img src={customer?.avatarUrl} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                                    <div className="label-3">{customer?.name ?? '-'}</div>
                                    <div className="label-4">.</div>
                                    <Text className="subtitle-3">{item.dateCreated ? Ultis.datetoString(new Date(item.dateCreated)) : '-'}</Text>
                                </div>}
                                title={item.title}
                                content={<div dangerouslySetInnerHTML={{ __html: item.description }} className="news-show-ckeditor-content"></div>}
                                actions={<div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                                    <div className="tag-disabled row">
                                        <div className="button-text-3">{topicList.find(e => e.id === item.topicId)?.name ?? ''}</div>
                                    </div>
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
                                    <button type="button" className="row icon-button32" onClick={showAddBookmark}><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                                    <button type="button" className="row icon-button32" onClick={(ev) => { showShareOptions(ev, item.id) }} >
                                        <OutlineSharing width="2rem" height="2rem" />
                                    </button>
                                </div>}
                            />
                        })}
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    </>
}

const PopupSelectBookmark = forwardRef(function PopupSelectBookmark(data, ref) {
    const methods = useForm({ defaultValues: { list: data.list ?? [{ name: 'Bài viết đã lưu', id: uuidv4() }, { name: 'Danh sách tự tạo 1', id: uuidv4() }, { name: 'Danh sách tự tạo 2', id: uuidv4() },] } })

    return <form className="col" style={{ backgroundColor: '#ffffff', borderRadius: '0.8rem', width: '32rem' }}>
        <div className="col" >
            {methods.watch('list').map((item, i) => {
                return <div className="row" style={{ padding: '1rem 1.6rem' }}>
                    <CheckboxForm
                        key={item.id}
                        label={item.name}
                        control={methods.control}
                        name={`list[${i}].check`}
                        value={item.check}
                        size={'2rem'}
                    />
                </div>
            })}
        </div>
        <div className="row" style={{ width: '100%', borderTop: 'var(--border-grey1)' }}>
            <button type="button" className="row button-infor" style={{ padding: '1.2rem 1.6rem', backgroundColor: 'transparent' }}>
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem' }} />
                <div className="button-text-3">Tạo danh sách mới</div>
            </button>
        </div>
    </form>
})