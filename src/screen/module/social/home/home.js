import { FilledSEdit } from "../../../../assets/const/icon"
import { Text, TextField } from "../../../../component/export-component"
import { AccountController } from "../../account/controller"
import avatarDemo from '../../../../assets/demo-avatar.png'
import { NavLink, useLocation, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import './home.css'
import ListNews from "./local-component/list-news"
import ListExpertByTopic from "./local-component/list-expert"
import NewsDetails from "./local-component/news-details"
import SidebarActions from "../../../layout/sidebar/sidebar-actions"

export default function SocialHome() {
    const { id } = useParams()
    const location = useLocation()
    const isLogin = AccountController.token()
    const [selectedTab, setSelectedTab] = useState(0)

    useEffect(() => {

    }, [location.pathname])

    return <div className="row" style={{ flex: 1 }}>
        <div className="col news-sidebar-social" >
            <TextField
                prefix={<FontAwesomeIcon icon={faSearch} />}
                style={{ height: '4rem', padding: '0.8rem 1.6rem' }}
                className="search-default placeholder-2"
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
                <button type="button" className={`news-bookmark-tab ${selectedTab === 0 ? 'selected' : ''}`}>
                    <div className="label-3">Bảng tin</div>
                </button>
                <button type="button" className={`news-bookmark-tab ${selectedTab === 1 ? 'selected' : ''}`}>
                    <div className="label-3">Đã lưu</div>
                </button>
            </div>
            <SidebarActions />
        </div>
        {id ? <NewsDetails id={id} isLogin={isLogin} /> : <HomeNewsInfor isLogin={isLogin} />}
    </div>
}

const HomeNewsInfor = ({ isLogin = false }) => {
    return <>
        <ListNews isLogin={isLogin} />
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
    </>
}