import { useEffect, useRef, useState } from "react"
import { NewController } from "./controller"
import { Popup, Text, closePopup, showPopup } from "../../../../component/export-component"
import avatarDemo from "../../../../assets/demo-avatar2.png"
import { NavLink } from "react-router-dom"
import ListExpertByTopic from "../home/local-component/list-expert"
import { FilledLogoFacebook, FilledSEdit, FilledTrashCan, OutlineBookMarkAdd, OutlineChat, OutlineFileCopy, OutlineSharing, OutlineThumbUp } from "../../../../assets/const/icon"
import './news.css'
import ListComment from "./local-component/list-comment"
import { CustomerController } from "../../customer/controller"
import { Ultis } from "../../../../Utils"
import { RatingController } from "../../edu/rating/controller"
import ConfigAPI from "../../../../config/configApi"
import { useSelector } from "react-redux"

export default function NewsDetails({ id, isLogin = false }) {
    const ref = useRef()
    const userInfor = useSelector((state) => state.account.data)
    const [data, setData] = useState()
    const [customer, setCustomer] = useState()

    const showShareOptions = (ev) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col more-action-popup">
                <button type="button" className="row" onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
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

    useEffect(() => {
        NewController.getById(id).then(res => {
            if (res) {
                RatingController.getRatingLikeByIds([id]).then(interactRes => {
                    if (interactRes) {
                        setData({
                            ...res,
                            totalRating: interactRes[0]?.totalRating ?? 0,
                            totalLike: interactRes[0]?.totalLike ?? 0,
                        })
                    }
                })
                if (res.customerId !== userInfor?.id) {
                    CustomerController.getById(res.customerId).then(cusRes => {
                        if (cusRes) setCustomer(cusRes)
                    })
                } else {
                    setCustomer(userInfor)
                }
            }
        })
    }, [])

    return data ? <>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <Popup ref={ref} />
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl col20-xl" style={{ padding: '2.4rem 2rem', gap: '4rem', '--gutter': '0px' }}>
                    <div className="row" style={{ gap: '2.4rem', alignItems: 'start' }}>
                        <div className="col" style={{ gap: '1.6rem', flex: 1 }}>
                            <Text className="heading-3" style={{ width: '100%' }}>{data.title}</Text>
                            {data.newsTags?.length ? <div className="row" style={{ gap: '0.8rem' }}>
                                {data.newsTags.map(e => <Text key={e.id} className="button-text-3" style={{ color: 'var(--primary-color)' }}>{e.name}</Text>)}
                            </div> : null}
                        </div>
                        {userInfor?.id === customer?.id && <div className="row" style={{ gap: '0.8rem' }}>
                            <NavLink to={`/social/news/edit/${id}`} className="row button-grey" style={{ backgroundColor: 'transparent', padding: '0.4rem' }}>
                                <FilledSEdit width="2.4rem" height="2.4rem" />
                            </NavLink>
                            <button className="row button-grey" style={{ backgroundColor: 'transparent', padding: '0.4rem' }}>
                                <FilledTrashCan width="2.4rem" height="2.4rem" />
                            </button>
                        </div>}
                    </div>
                    <div className="col" style={{ gap: '3.2rem' }}>
                        <div className="row" style={{ gap: '1.6rem' }}>
                            <img src={customer?.avatarUrl} alt="" style={{ width: '4.8rem', height: '4.8rem' }} />
                            <div className="col" style={{ gap: '0.4rem' }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="heading-7">{customer?.name}</Text>
                                    <Text className="heading-7">.</Text>
                                    {userInfor?.id !== customer?.id && <Text onClick={() => { }} className="button-text-3" style={{ color: 'var(--primary-color)' }}>Theo dõi</Text>}
                                </div>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="subtitle-4">Đăng ngày</Text>
                                    <Text className="subtitle-4">{data.dateCreated ? Ultis.datetoString(new Date(data.dateCreated)) : '-'}</Text>
                                </div>
                            </div>
                        </div>
                        {data.pictureId ? <img src={ConfigAPI.imgUrl + data.pictureId} alt="" style={{ width: '100%', borderRadius: '0.8rem' }} /> : null}
                        <div dangerouslySetInnerHTML={{ __html: data.description }} className="news-show-ckeditor-content show-all"></div>
                        <div className="row" style={{ gap: '1.2rem', borderTop: 'var(--border-grey1)', borderBottom: 'var(--border-grey1)', padding: '0.8rem 0' }}>
                            <div className="row" style={{ flex: 1 }}>
                                <div className="row tag-disabled" style={{ backgroundColor: 'transparent' }}>
                                    <OutlineThumbUp width="2.4rem" height="2.4rem" />
                                    <div className="button-text-3">{data.totalLike}</div>
                                </div>
                                <div className="label-4">.</div>
                                <div className="row tag-disabled" style={{ backgroundColor: 'transparent' }}>
                                    <OutlineChat width="2.4rem" height="2.4rem" />
                                    <div className="button-text-3">{data.totalRating}</div>
                                </div>
                            </div>
                            <button><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                            <button type="button" onClick={showShareOptions}><OutlineSharing width="2rem" height="2rem" /></button>
                        </div>
                    </div>
                    <ListComment />
                </div>
            </div>
        </div>
        <div className="additional-infor-view col">
            <div className="col" style={{ gap: '1.6rem' }}>
                <Text className="heading-7" >Top bài viết trong tuần</Text>
                <div className="col" style={{ gap: '2.4rem' }}>
                    {Array.from({ length: 3 }).map((item, i) => {
                        return <div key={'top-' + i} className="col" style={{ gap: '0.4rem' }}>
                            <div className="row" style={{ gap: '0.8rem' }}>
                                <img src={avatarDemo} alt="" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%' }} />
                                <Text className="label-5">Jackie Colburn</Text>
                                <Text className="label-4">.</Text>
                                <Text className="subtitle-4">12 tháng 09</Text>
                            </div>
                            <Text className="label-3" maxLine={2} style={{ width: '100%' }}>How i got into and managed to walk away from burnout</Text>
                        </div>
                    })}
                </div>
                <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem thêm</NavLink>
            </div>
            <div className="col" style={{ width: '100%', gap: '1.6rem' }}>
                <Text className="heading-7" maxLine={2}>Các chủ đề được quan tâm nhất</Text>
                <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                    {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => {
                        return <div key={'tag-' + i} className="row tag-disabled"><div className="button-text-3">{e}</div></div>
                    })}
                </div>
                <NavLink to='' className='button-text-3' style={{ color: 'var(--primary-color)' }}>Khám phá thêm</NavLink>
            </div>
            {isLogin && <ListExpertByTopic />}
        </div>
    </> : <></>
}