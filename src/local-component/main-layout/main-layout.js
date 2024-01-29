import React from 'react';
import { useEffect } from 'react'
import HeaderView from '../header/header'
import SideBar from '../sidebar/sidebar'
import './main-layout.css'
export default function MainLayout() {
              useEffect(() => { }, [])
              return <div className="main-layout col">
                            <HeaderView />
                            <div className='main-layout-body row'>
                                          <SideBar />
                                          <div className="view"></div>
                            </div>
              </div>
}