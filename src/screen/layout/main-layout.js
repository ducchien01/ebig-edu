import React, { createRef, useRef, useState } from 'react';
import { useEffect } from 'react'
import './main-layout.css'
import { extendView } from '../../assets/const/const-list';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getcomponentRouter } from '../../router/router';
import HeaderView from './header/header';
import SideBar from './sidebar/sidebar';
import { AccountActions } from '../module/account/reducer';
import { useDispatch } from 'react-redux';
import { AccountController } from '../module/account/controller';
import { Popup, showPopup } from 'wini-web-components';
import PopupLogin from '../module/account/popup-login';

const loginPopupRef = createRef()
export default function MainLayout({ menu = [] }) {
    const [modules, setModules] = useState([])
    const dispatch = useDispatch()
    const location = useLocation()
    const ref = useRef()
    const loginRef = useRef()

    useEffect(() => {
        if (AccountController.token()) {
            AccountActions.getInfor(dispatch)
            setModules(menu)
        } else {
            if (location.pathname.startsWith('/center')) window.location.replace('/')
            setModules(menu.filter(e => e.link !== 'center'))
        }
    }, [menu])

    useEffect(() => {
        loginPopupRef.current = {
            loginPopup: () => {
                showPopup({
                    ref: loginRef,
                    content: <PopupLogin ref={loginRef} />
                })
            }
        }
    }, [])

    useEffect(() => {
        if (ref.current)
            ref.current.scrollTo(0, 0)
    }, [location.pathname])

    return <div id='main-layout' className="main-layout col">
        <Popup ref={loginRef} />
        <HeaderView />
        <div ref={ref} className='main-layout-body'>
            <SideBar menu={modules} />
            <div className="view col">
                <Routes>
                    {modules.filter(e => modules.every(el => e.id !== el.parentId)).map(function (prop, key) {
                        return <Route
                            path={prop.path ?? prop.link}
                            element={getcomponentRouter(prop.path ?? prop.link)}
                            key={key + '-' + prop.link}
                            exact
                        />;
                    }
                    )}
                    {extendView.map((prop, key) => <Route
                        path={prop.path ?? prop.link}
                        element={getcomponentRouter(prop.link)}
                        key={`extend-${key}`}
                        exact
                    />
                    )}
                </Routes>
            </div>
        </div>
    </div>
}

export const showLoginPopup = () => {
    if (loginPopupRef.current?.loginPopup)
        loginPopupRef.current.loginPopup()
}