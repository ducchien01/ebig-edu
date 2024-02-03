import React from 'react';
import { useEffect } from 'react'
import './main-layout.css'
import { menuList } from '../../assets/const/const-list';
import { Route, Routes } from 'react-router-dom';
import { getcomponentRouter } from '../../router/router';
import HeaderView from './header/header';
import SideBar from './sidebar/sidebar';
export default function MainLayout() {
              useEffect(() => { }, [])

              return <div className="main-layout col">
                            <HeaderView />
                            <div className='main-layout-body row'>
                                          <SideBar />
                                          <div className="view col">
                                                        <Routes>
                                                                      {menuList.filter(e => e.parentId !== 1).map((prop, key) => {
                                                                                    return (
                                                                                                  <Route
                                                                                                                path={prop.link}
                                                                                                                element={getcomponentRouter(prop.link)}
                                                                                                                key={key}
                                                                                                                exact
                                                                                                  />
                                                                                    );
                                                                      })}
                                                        </Routes>
                                          </div>
                            </div>
              </div>
}