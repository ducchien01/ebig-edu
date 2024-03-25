import { useEffect, useState } from "react"
import { NewController } from "../../new/controller"
import { Text } from "../../../../../component/export-component"
import avatarDemo from "../../../../../assets/demo-avatar2.png"
import { NavLink } from "react-router-dom"
import ListExpertByTopic from "./list-expert"
import { OutlineBookMarkAdd, OutlineChat, OutlineSharing, OutlineThumbUp } from "../../../../../assets/const/icon"

export default function NewsDetails({ id, isLogin = false }) {
    const [data, setData] = useState()

    useEffect(() => {
        NewController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])
    
    return data ? <>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem 2rem', gap: '4rem', '--gutter': '0px' }}>
                    <div className="col" style={{ gap: '1.6rem' }}>
                        <Text className="heading-3" maxLine={2} style={{ width: '100%' }}>Bắc Cực đang ấm lên nhanh hơn gần 4 lần so với phần còn lại của thế giới</Text>
                        <div className="row" style={{ gap: '0.8rem' }}>
                            <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>#Thiết kế trải nghiệm người dùng</Text>
                            <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>#UIUX</Text>
                        </div>
                    </div>
                    <div className="col" style={{ gap: '3.2rem' }}>
                        <div className="row" style={{ gap: '1.6rem' }}>
                            <img src={avatarDemo} alt="" style={{ width: '4.8rem', height: '4.8rem' }} />
                            <div className="col" style={{ gap: '0.4rem' }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="heading-7">Cameron Williamson</Text>
                                    <Text className="heading-7">.</Text>
                                    <Text onClick={() => { }} className="button-text-3" style={{ color: 'var(--primary-color)' }}>Theo dõi</Text>
                                </div>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <Text className="subtitle-4">Đã đăng trong</Text>
                                    <Text maxLine={1} className="button-text-5" style={{ flex: 1, maxWidth: '100%', width: 'fit-content' }}>“UIUX cho người mới bắt đầu vào người mới bắt đầu”</Text>
                                    <div className="label-4">.</div>
                                    <Text className="subtitle-4">12 tháng 09</Text>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ gap: '1.2rem', borderTop: 'var(--border-grey1)', borderBottom: 'var(--border-grey1)', padding: '0.8rem 0' }}>
                            <div className="row" style={{ flex: 1 }}>
                                <div className="row tag-disabled" style={{ backgroundColor: 'transparent' }}>
                                    <OutlineThumbUp width="2.4rem" height="2.4rem" />
                                    <div className="button-text-3">1,2k</div>
                                </div>
                                <div className="label-4">.</div>
                                <div className="row tag-disabled" style={{ backgroundColor: 'transparent' }}>
                                    <OutlineChat width="2.4rem" height="2.4rem" />
                                    <div className="button-text-3">1,2k</div>
                                </div>
                            </div>
                            <button><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                            <button><OutlineSharing width="2rem" height="2rem" /></button>
                        </div>
                    </div>
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