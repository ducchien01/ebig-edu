import { forwardRef, useEffect, useRef, useState } from "react"
import { NewController } from "../../new/controller"
import { InfiniteScroll, Popup, Text, showPopup } from "../../../../../component/export-component"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import thumbnailDemo from '../../../../../assets/demo-image3.png'
import { FilledLogoFacebook, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineSharing, OutlineThumbUp } from "../../../../../assets/const/icon"
import { TopicController } from "../../../topic/controller"
import { PostCard } from "../../../../../project-component/card"
import { CheckboxForm } from "../../../../../project-component/component-form"
import { useForm } from "react-hook-form"
import { uuidv4 } from "../../../../../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function ListNews({ isLogin = false }) {
    const ref = useRef()
    const [newsData, setNewsData] = useState([])
    const [topicList, setTopicList] = useState([])
    const [filterTab, setFilterTab] = useState(0)

    const showShareOptions = (ev) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col more-action-popup">
                <button type="button" className="row" >
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

    useEffect(() => {
        NewController.getAll().then(res => {
            if (res) setNewsData(res)
        })
        TopicController.getAll().then(res => {
            if (res) setTopicList(res)
        })
    }, [])

    return <>
        <Popup ref={ref} />
        <InfiniteScroll handleScroll={() => {
            // NewController.getAll().then(res => {
            //     setNewsData([...newsData, ...res])
            // })
        }} className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem', gap: '4rem', '--gutter': '0px' }}>
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
                            return <PostCard
                                key={'new-' + i}
                                className="row"
                                style={{ gap: '4.8rem' }}
                                to={`/social/home/news/${item.id}`}
                                imgUrl={thumbnailDemo}
                                imgStyle={{ width: '16.2rem', height: '16.2rem' }}
                                heading={<div className="row" style={{ gap: '0.8rem', maxWidth: '100%', width: 'fit-content' }}>
                                    <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                                    <div className="label-3">Phan Minh Anh</div>
                                    <Text className="subtitle-3">trong</Text>
                                    <Text maxLine={1} className="button-text-3" style={{ flex: 1, maxWidth: '100%', width: 'fit-content' }}>“UIUX cho người mới bắt đầu vào người mới bắt đầu”</Text>
                                    <div className="label-4">.</div>
                                    <Text className="subtitle-3">12 tháng 09</Text>
                                </div>}
                                title={'Dishonest fonts, sustainable design, how to be strategic, color with gen AI'}
                                content={`“I couldn't stop thinking about the thought process of turning to social media, emphasis on the social, and asking no one to talk to you. This idea — that we can safely expect to insulate ourselves from responses to our posts is indicative of how rapidly the social media environment has changed in the just three years.”`}
                                actions={<div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                                    <div className="tag-disabled row">
                                        <div className="button-text-3">{topicList.find(e => e.id === item.topicId)?.name ?? ''}</div>
                                    </div>
                                    <div className="row" style={{ flex: 1, width: '100%' }}>
                                        <div className="tag-disabled row" style={{ backgroundColor: 'transparent' }}>
                                            <OutlineThumbUp width="1.6rem" height="1.6rem" />
                                            <div className="button-text-3">1,2k</div>
                                        </div>
                                        <div className="label-4">.</div>
                                        <div className="tag-disabled row" style={{ backgroundColor: 'transparent' }}>
                                            <OutlineChat width="1.6rem" height="1.6rem" />
                                            <div className="button-text-3">1,2k</div>
                                        </div>
                                    </div>
                                    <button type="button" className="row icon-button32" onClick={showAddBookmark}><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                                    <button type="button" className="row icon-button32" onClick={showShareOptions} >
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