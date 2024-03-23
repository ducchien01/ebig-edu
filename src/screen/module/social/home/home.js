import { FilledSEdit, FilledTrendUp, OutlineBookMarkAdd, OutlineChat, OutlineSharing, OutlineThumbUp } from "../../../../assets/const/icon"
import { Text, TextField } from "../../../../component/export-component"
import { AccountController } from "../../account/controller"
import avatarDemo from '../../../../assets/demo-avatar.png'
import thumbnailDemo from '../../../../assets/demo-image3.png'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import './home.css'
import { supportModule } from "../../../../assets/const/const-list"

export default function SocialHome() {
    const isLogin = AccountController.token()

    return isLogin ? <NewAuthView /> : <NewView />
}

const NewView = () => {
    return <div className="col" style={{ gap: '2.4rem', flex: 1 }}>
        <div className="row" style={{ width: '100%', backgroundColor: 'var(--background)', justifyContent: 'center' }}>
            <div className="col col18 col20-md col24-sm" style={{ width: '72%', gap: '2.4rem', padding: '3.2rem', '--gutter': '0px' }}>
                <div className="row" style={{ gap: '1.6rem', padding: '0 2.4rem' }}>
                    <div className="row" style={{ width: '3.2rem', height: '3.2rem', backgroundColor: '#ffffff', borderRadius: '50%', border: 'var(--border-grey1)', justifyContent: 'center' }}><FilledTrendUp width="2rem" height="2rem" /></div>
                    <Text className="heading-5">Xu hướng trên ebig</Text>
                </div>
                <div className="row" style={{ padding: '0 2.4rem', flexWrap: 'wrap', gap: '3.2rem', width: '100%' }}>
                    {Array.from({ length: 3 }).map(((_, i) => {
                        return <div key={"trend-" + i} className="col8 row" style={{ '--gutter': '3.2rem', gap: '1.6rem', alignItems: 'start' }}>
                            <div className="heading-6">{`0${i + 1}`}</div>
                            <div className="col" style={{ width: '100%', flex: 1, gap: '0.4rem' }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <img src={avatarDemo} alt="" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%' }} />
                                    <Text className="label-3">Jackie Colburn</Text>
                                    <Text className="label-4">.</Text>
                                    <Text className="subtitle-3">12 tháng 09</Text>
                                </div>
                                <Text className="heading-8" maxLine={2} style={{ width: '100%' }}>A personal, non-partisan perspective on the Israel-Hamas war</Text>
                            </div>
                        </div>
                    }))}
                </div>
            </div>
        </div>
        <div className="row" style={{ flex: 1, height: '100%', width: '100%', alignItems: 'start', justifyContent: 'center' }}>
            <div className="row col20 col24-md col24-sm" style={{ '--gutter': '0px', height: '100%' }}>
                <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
                    <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                        <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem', gap: '3.2rem', '--gutter': '0px' }}>
                            {Array.from({ length: 6 }).map((item, i) => {
                                return <div key={'new-' + i} className="row" style={{ gap: '4.8rem' }}>
                                    <div className="col" style={{ gap: '2.4rem', flex: 1, width: '100%' }}>
                                        <div className="col" style={{ gap: '0.4rem ' }}>
                                            <div className="row" style={{ gap: '0.8rem', maxWidth: '100%', width: 'fit-content' }}>
                                                <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                                                <div className="label-3">Phan Minh Anh</div>
                                                <Text className="subtitle-3">trong</Text>
                                                <Text maxLine={1} className="button-text-3" style={{ flex: 1, maxWidth: '100%', width: 'fit-content' }}>“UIUX cho người mới bắt đầu vào người mới bắt đầu”</Text>
                                                <div className="label-4">.</div>
                                                <Text className="subtitle-3">12 tháng 09</Text>
                                            </div>
                                            <Text className="heading-6" maxLine={2} style={{ width: '100%' }}>Dishonest fonts, sustainable design, how to be strategic, color with gen AI</Text>
                                            <Text className="body-2" maxLine={4} style={{ width: '100%', marginTop: '0.4rem' }}>“I couldn’t stop thinking about the thought process of turning to social media, emphasis on the social, and asking no one to talk to you. This idea — that we can safely expect to insulate ourselves from responses to our posts is indicative of how rapidly the social media environment has changed in the just three years.”</Text>
                                        </div>
                                        <div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                                            <div className="tag-disabled row"><div className="button-text-3">UI/UX design</div></div>
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
                                            <button type="button" className="row icon-button32"><OutlineSharing width="2rem" height="2rem" /></button>
                                        </div>
                                    </div>
                                    <img src={thumbnailDemo} alt="" style={{ width: '16.2rem', height: '16.2rem', borderRadius: '0.8rem' }} />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="col" style={{ padding: '3.2rem', width: '44rem', gap: '2rem', borderLeft: 'var(--border-grey1)', height: '100%' }}>
                    <Text className="heading-7" maxLine={2}>Các chủ đề được quan tâm nhất</Text>
                    <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                        {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => {
                            return <div key={'tag-' + i} className="row tag-disabled"><div className="button-text-3">{e}</div></div>
                        })}
                    </div>
                    <NavLink to='' className='button-text-3' style={{ color: 'var(--primary-color)' }}>Khám phá thêm</NavLink>
                </div>
            </div>
        </div>
    </div>
}

const NewAuthView = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    return <div className="row" style={{ flex: 1 }}>
        <div className="col news-sidebar-social" >
            <TextField
                prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />}
                style={{ backgroundColor: 'var(--background)', borderRadius: '2.4rem', height: '4rem', padding: '0.8rem 1.6rem', border: 'none' }}
                placeholder="Tìm kiếm bài viết"
            />
            <div className="row">
                <Text maxLine={1} style={{ flex: 1, width: '100%' }} className="heading-6">Bảng tin</Text>
                <button type="button" className="row button-infor" style={{ backgroundColor: 'transparent' }}>
                    <FilledSEdit width="1.6rem" height="1.6rem" color="#366AE2" />
                    <div className="button-text-3">Tạo bài viết</div>
                </button>
            </div>
            <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto', gap: '1.2rem' }}>
                <button type="button" className={`tab-news ${selectedTab === 0 ? 'selected' : ''}`}>
                    <div className="label-3">Bảng tin</div>
                </button>
                <button type="button" className={`tab-news ${selectedTab === 1 ? 'selected' : ''}`}>
                    <div className="label-3">Đã lưu</div>
                </button>
            </div>
            <div className='support-action row'>
                {supportModule.map((e, i) => <div key={`support-module-${i}`} className='button-text-6'>{e.name}</div>)}
            </div>
        </div>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
                <div className="col col24 col20-xxl col20-xl" style={{ padding: '3.2rem', gap: '3.2rem', '--gutter': '0px' }}>
                    {Array.from({ length: 6 }).map((item, i) => {
                        return <div key={'new-' + i} className="row" style={{ gap: '4.8rem' }}>
                            <div className="col" style={{ gap: '2.4rem', flex: 1, width: '100%' }}>
                                <div className="col" style={{ gap: '0.4rem ' }}>
                                    <div className="row" style={{ gap: '0.8rem', maxWidth: '100%', width: 'fit-content' }}>
                                        <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                                        <div className="label-3">Phan Minh Anh</div>
                                        <Text className="subtitle-3">trong</Text>
                                        <Text maxLine={1} className="button-text-3" style={{ flex: 1, maxWidth: '100%', width: 'fit-content' }}>“UIUX cho người mới bắt đầu vào người mới bắt đầu”</Text>
                                        <div className="label-4">.</div>
                                        <Text className="subtitle-3">12 tháng 09</Text>
                                    </div>
                                    <Text className="heading-6" maxLine={2} style={{ width: '100%' }}>Dishonest fonts, sustainable design, how to be strategic, color with gen AI</Text>
                                    <Text className="body-2" maxLine={4} style={{ width: '100%', marginTop: '0.4rem' }}>“I couldn’t stop thinking about the thought process of turning to social media, emphasis on the social, and asking no one to talk to you. This idea — that we can safely expect to insulate ourselves from responses to our posts is indicative of how rapidly the social media environment has changed in the just three years.”</Text>
                                </div>
                                <div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                                    <div className="tag-disabled row"><div className="button-text-3">UI/UX design</div></div>
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
                                    <button type="button" className="row icon-button32"><OutlineSharing width="2rem" height="2rem" /></button>
                                </div>
                            </div>
                            <img src={thumbnailDemo} alt="" style={{ width: '16.2rem', height: '16.2rem', borderRadius: '0.8rem' }} />
                        </div>
                    })}
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
            <div className="col" style={{ gap: '1.6rem' }}>
                <Text className="heading-7" maxLine={2} style={{ width: '100%' }}>Các chuyên gia trong các chủ đề bạn quan tâm</Text>
                <div className="col" style={{ gap: '2.4rem' }}>
                    {Array.from({ length: 3 }).map((item, i) => {
                        return <div key={'expert-' + i} className="row" style={{ gap: '1.6rem' }}>
                            <img src={avatarDemo} alt="" style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                            <div className="col" style={{ flex: 1, width: '100%', gap: '0.4rem' }}>
                                <Text className="heading-8" maxLine={1} style={{ width: '100%' }}>Zulie Rane</Text>
                                <Text className="subtitle-4" maxLine={3} style={{ width: '100%' }}>I am a History Educator and a Lifelong Learner with a</Text>
                            </div>
                            <button type="button" className="row button-primary">
                                <div className="button-text-3">Theo dõi</div>
                            </button>
                        </div>
                    })}
                </div>
                <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem thêm</NavLink>
            </div>
        </div>
    </div>
}