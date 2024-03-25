import { useEffect, useRef, useState } from "react"
import { NewController } from "../../new/controller"
import { Popup, Text, showPopup } from "../../../../../component/export-component"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import thumbnailDemo from '../../../../../assets/demo-image3.png'
import { FilledLogoFacebook, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineSharing, OutlineThumbUp } from "../../../../../assets/const/icon"
import { TopicController } from "../../../topic/controller"
import { PostCard } from "../../../../../project-component/card"

export default function ListNews() {
    const ref = useRef()
    const [newsData, setNewsData] = useState([])
    const [topicList, setTopicList] = useState([])

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

    useEffect(() => {
        NewController.getAll().then(res => {
            if (res)
                setNewsData(res)
        })
        TopicController.getAll().then(res => {
            if (res)
                setTopicList(res)
        })
    }, [])

    return <>
        <Popup ref={ref} />
        {newsData.map((item, i) => {
            return <PostCard
                key={'new-' + i}
                className="row"
                style={{ gap: '4.8rem' }}
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
                    <button type="button" className="row icon-button32"><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                    <button type="button" className="row icon-button32" onClick={showShareOptions} >
                        <OutlineSharing width="2rem" height="2rem" />
                    </button>
                </div>}
            />
        })}
    </>
}