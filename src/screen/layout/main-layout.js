import React, { useState } from 'react';
import { useEffect } from 'react'
import './main-layout.css'
import { centerModules, extendView } from '../../assets/const/const-list';
import { Route, Routes } from 'react-router-dom';
import { getcomponentRouter } from '../../router/router';
import HeaderView from './header/header';
import SideBar from './sidebar/sidebar';
import { AccountActions } from '../module/account/reducer';
import { useDispatch } from 'react-redux';
import { AccountController } from '../module/account/controller';
export default function MainLayout({ menu = [] }) {
    const [modules, setModules] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (AccountController.token()) {
            AccountActions.getInfor(dispatch)
            setModules(menu)
        } else {
            if (window.location.pathname.startsWith('/center')) window.location.replace('/')
            setModules(menu.filter(e => e.link !== 'center'))
        }
    }, [menu])

    useEffect(() => {
        document.body.querySelector('.main-layout').onscroll = undefined
    }, [window.location.pathname])

    return <div className="main-layout col">
        <HeaderView />
        <div className='main-layout-body'>
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
                    {[...centerModules, ...extendView].map((prop, key) => <Route
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