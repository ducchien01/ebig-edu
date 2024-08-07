import { useEffect, useRef, useState } from "react"
import { NewController } from "../../new/controller"
import { TopicController } from "../../../topic/controller"
import { RatingController } from "../../../edu/rating/controller"
import { NewStatus } from "../../new/da"
import { Text, closePopup, showPopup } from "wini-web-components"
import ConfigAPI from "../../../../../config/configApi"
import { FilledLogoFacebook, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineSharing, OutlineThumbUp } from "../../../../../assets/const/icon"
import { Ultis } from "../../../../../Utils"
import { PostCard } from "../../../../../project-component/card"

export default function ListCustomerNews({ customer, newStatus = NewStatus.published }) {
    const ref = useRef()
    const [newsData, setNewsData] = useState([])
    const [total, setTotal] = useState()
    const [interactInfor, setInteractInfor] = useState([])
    const [topicList, setTopicList] = useState([])

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


    const getInteractInfor = (list) => {
        RatingController.getRatingLikeByIds(list.map(e => e.id)).then(res => {
            if (res) setInteractInfor(res)
        })
    }

    const getData = () => {
        NewController.getListSimple({ page: Math.floor((newsData.length / 30)) + 1, take: 30, filter: [{ field: 'status', operator: '=', value: newStatus }, { field: 'customerId', operator: '=', value: customer.id }] }).then(res => {
            if (res) {
                if (res.totalCount !== total) setTotal(res.totalCount)
                let _newsData = newsData
                if (newsData[0]?.status !== newStatus) {
                    _newsData = []
                }
                const newList = res.data.filter(e => _newsData.every(el => el.id !== e.id))
                getInteractInfor(newList)
                setNewsData([..._newsData, ...newList])
            }
        })
    }

    useEffect(() => {
        TopicController.getAll().then(res => {
            if (res) setTopicList(res)
        })
    }, [])

    useEffect(() => {
        setNewsData([])
        if (customer?.id) getData()
    }, [customer, newStatus])

    return <div className="row" style={{ width: '100%' }}>
        <div className="col col16 col24-md col24-sm col24-min" style={{ gap: '3.2rem', padding: '1.6rem', '--gutter': '0px' }}>
            {newsData.map((item, i) => {
                const itemInteractInfor = interactInfor.find(e => e.linkId === item.id)
                return <PostCard
                    key={'new-' + i}
                    className="row"
                    style={{ gap: '4rem', alignItems: 'start' }}
                    to={`/social/news/${item.id}`}
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
                        <button className="button-grey row">
                            <div className="button-text-5">{topicList.find(e => e.id === item.topicId)?.name ?? ''}</div>
                        </button>
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
    </div>
}