import { forwardRef, useEffect, useRef, useState } from "react"
import { NewController } from "../../new/controller"
import { Popup, Text, closePopup, showPopup } from "../../../../../component/export-component"
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
import { NewStatus } from "../../new/da"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { uuidRegex } from "../../../../../assets/const/const-list"
import PopupPersonalSuggestion from "./personal-suggestion"

export default function ListNews({ isLogin = false }) {
    const userInfor = useSelector((state) => state.account.data)
    const ref = useRef()
    const location = useLocation()
    const [newsData, setNewsData] = useState({ totalCount: undefined, data: [] })
    const [interactInfor, setInteractInfor] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [topicList, setTopicList] = useState([])
    const [followTopics, setFollowTopics] = useState([])
    const [filterTab, setFilterTab] = useState('trending')
    const [fixedTabbar, setFixedTabbar] = useState()

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

    const showPersonalSuggesttion = () => {
        showPopup({
            ref: ref,
            heading: <div className="popup-header col" style={{ alignItems: 'start' }}>
                <Text className="heading-6">Cá nhân hóa các đề xuất</Text>
                <Text className="subtitle-3">Điều chỉnh các đề xuất bằng cách cập nhật chủ đề, chuyên gia bạn đang theo dõi</Text>
            </div>,
            style: { width: '70%', height: '80%' },
            content: <PopupPersonalSuggestion ref={ref} />
        })
    }

    const getData = async (page) => {
        let _filter = [{ field: 'status', operator: '=', value: NewStatus.published }]
        if (filterTab.match(uuidRegex)) {
            _filter.push({ field: 'topicId', operator: '=', value: filterTab })
        }
        const res = await NewController.getListSimple({
            page: page ?? 1,
            take: 10,
            filter: _filter
        })
        if (res) {
            const newList = res.data.filter(e => newsData.data.every(el => el.id !== e.id))
            getInteractInfor(newList)
            const _newTopicIds = newList.map(e => e.topicId).filter(id => topicList.every(e => e.id !== id))
            if (_newTopicIds) TopicController.getByIds(_newTopicIds).then((topics) => {
                if (topics) setTopicList([...topicList, ...topics])
            })
            const customerIds = newList.map(e => e.customerId).filter(id => id && customerList.every(e => e.id !== id))
            CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setCustomerList(cusRes)
            })
            if (page) {
                setNewsData({
                    totalCount: res.totalCount,
                    data: [...newsData.data, ...newList]
                })
            } else {
                setNewsData(res)
            }
        }
    }

    const getInteractInfor = (list) => {
        RatingController.getRatingLikeByIds(list.map(e => e.id)).then(res => {
            if (res) setInteractInfor(res)
        })
    }

    useEffect(() => { getData() }, [filterTab])

    useEffect(() => {
        if (isLogin && userInfor?.listTopic?.length) {
            const _topicIds = userInfor.listTopic.split(',')
            TopicController.getByIds(_topicIds).then(res => {
                if (res) setFollowTopics(res)
            })
        }
    }, [isLogin, userInfor])

    useEffect(() => {
        const loadMore = (ev) => {
            if (Math.round(ev.target.offsetHeight + ev.target.scrollTop) >= (ev.target.scrollHeight - 1)) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', loadMore)
                getData(Math.floor((newsData.data.length / 10)) + 1)
            } else if (window.location.pathname !== location.pathname) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', loadMore)
            }
        }
        if (newsData.totalCount > 10 && newsData.totalCount !== newsData.data.length)
            document.body.querySelector('.main-layout').addEventListener('scroll', loadMore)
    }, [newsData])

    useEffect(() => {
        const handleScroll = () => {
            let _tabbar = document.getElementById('handle-tabbar')
            if (!_tabbar) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', handleScroll)
                return
            }
            _tabbar = _tabbar.getBoundingClientRect()
            const _header = document.body.querySelector('.header').getBoundingClientRect()
            if (_tabbar.y < _header.height) {
                setFixedTabbar({ position: 'fixed', top: _header.height, width: _tabbar.width, zIndex: 2 })
            } else if (_tabbar.y >= _header.height) {
                setFixedTabbar(undefined)
            }
        }
        document.body.querySelector('.main-layout').addEventListener('scroll', handleScroll)
    }, [])

    return <>
        <Popup ref={ref} />
        <div className="col">
            {isLogin &&
                <div id='handle-tabbar' style={{ height: '6rem' }}>
                    <div className='row' style={{ justifyContent: 'center', backgroundColor: '#fff', ...(fixedTabbar ?? {}) }}>
                        <div className="row filter-container col24 col20-xxl">
                            <button type="button" className="icon-button24 row" onClick={showPersonalSuggesttion}>
                                <FontAwesomeIcon icon={faPlus} style={{ color: 'var(--primary-color)' }} />
                            </button>
                            <div className="row">
                                <button className={`filter-tab ${filterTab === 'trending' ? 'selected' : ''}`} onClick={() => { setFilterTab('trending') }}>
                                    <Text className="label-4">Bài viết xu hướng</Text>
                                </button>
                                <button className={`filter-tab ${filterTab === 'following' ? 'selected' : ''}`} onClick={() => { setFilterTab('following') }}>
                                    <Text className="label-4">Đang theo dõi</Text>
                                </button>
                                {followTopics.map((item, i) => {
                                    return <button key={'tab-' + i} className={`filter-tab ${filterTab === item.id ? 'selected' : ''}`} onClick={() => { setFilterTab(item.id) }}>
                                        <Text className="label-4">{item.name}</Text>
                                    </button>
                                })}
                            </div>
                            {/* <button type="button" className="row">
                                <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.4rem', color: '#00204D99' }} />
                            </button> */}
                        </div>
                    </div>
                </div>}
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl" style={{ gap: '2.4rem', '--gutter': '0px' }}>
                    <div className="col" style={{ gap: '2.4rem', padding: '1.6rem' }}>
                        {newsData.data.map((item, i) => {
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
                                    <Text className="subtitle-4">{item.dateCreated ? Ultis.datetoString(new Date(item.dateCreated)) : '-'}</Text>
                                </div>}
                                title={item.title}
                                content={<div style={{ maxHeight: '16rem' }} dangerouslySetInnerHTML={{ __html: item.description.replace(/(<figure)(.*?)(<\/figure>)/g, '') }} className="comp-text news-show-ckeditor-content"></div>}
                                actions={<div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                                    <div className="button-grey row">
                                        <div className="button-text-5">{topicList.find(e => e.id === item.topicId)?.name ?? ''}</div>
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
        </div>
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