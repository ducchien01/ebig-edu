import React, { useRef, useState } from 'react';
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

export default function MainLayout({ menu = [] }) {
    const [modules, setModules] = useState([])
    const dispatch = useDispatch()
    const location = useLocation()
    const ref = useRef()

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
        if (ref.current)
            ref.current.scrollTo(0, 0)
    }, [location.pathname])

    return <div id='main-layout' className="main-layout col">
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