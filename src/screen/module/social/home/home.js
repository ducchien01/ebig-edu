import { FilledSEdit } from "../../../../assets/const/icon"
import { Popup, Text, TextField, showPopup } from "../../../../component/export-component"
import { AccountController } from "../../account/controller"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import './home.css'
import ListNews from "./local-component/list-news"
import NewsDetails from "../new/news-details"
import SidebarActions from "../../../layout/sidebar/sidebar-actions"
import PopupLogin from "../../account/popup-login"
import CustomerPage from "./local-component/customer-page"
import { useSelector } from "react-redux"
import { uuidRegex } from "../../../../assets/const/const-list"
import RightSidebar from "./local-component/right-sidebar"

export default function SocialHome({ customerPage = false }) {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const ref = useRef()
    const isLogin = AccountController.token()
    const userInfor = useSelector((state) => state.account.data)
    const [selectedTab, setSelectedTab] = useState()

    useEffect(() => {
        if (id && userInfor?.id === id) {
            setSelectedTab(0)
        } else {
            setSelectedTab(1)
        }
    }, [location.pathname, userInfor])

    return selectedTab != undefined ? <div>
        <Popup ref={ref} />
        <div className="col body-sidebar" >
            <TextField
                prefix={<FontAwesomeIcon icon={faSearch} />}
                style={{ height: '4rem', padding: '0.8rem 1.6rem' }}
                className="search-default body-3"
                placeholder="Tìm kiếm bài viết"
            />
            <div className="row">
                <Text maxLine={1} style={{ flex: 1, width: '100%' }} className="heading-7">Bảng tin</Text>
                <button type="button" onClick={() => {
                    if (isLogin) {
                        navigate('/social/news/create')
                    } else {
                        showPopup({
                            ref: ref,
                            content: <PopupLogin ref={ref} />
                        })
                    }
                }} className="row button-infor" style={{ backgroundColor: 'transparent' }}>
                    <FilledSEdit width="1.4rem" height="1.4rem" color="#366AE2" />
                    <div className="button-text-5">Tạo bài viết</div>
                </button>
            </div>
            <div className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto', gap: '1.2rem' }}>
                {userInfor?.id ? <NavLink to={`/${userInfor.id}`} className={`news-bookmark-tab ${selectedTab === 0 ? 'selected' : ''}`}>
                    <div className="label-3">Trang cá nhân</div>
                </NavLink> : null}
                <NavLink to={'/'} className={`news-bookmark-tab ${selectedTab === 1 ? 'selected' : ''}`}>
                    <div className="label-3">Bảng tin</div>
                </NavLink>
                <NavLink to={'/social/my-news'} className={`news-bookmark-tab ${selectedTab === 2 ? 'selected' : ''}`}>
                    <div className="label-3">Đã lưu</div>
                </NavLink>
            </div>
            <SidebarActions />
        </div>
        <div style={{ float: 'right' }}>
            {id?.match(uuidRegex) ? customerPage ? <CustomerPage /> : <NewsDetails id={id} isLogin={isLogin} /> : <HomeNewsInfor isLogin={isLogin} />}
        </div>
    </div> : <div />
}

const HomeNewsInfor = ({ isLogin = false }) => {
    return <>
        <RightSidebar />
        <ListNews isLogin={isLogin} />
    </>
}