import React from 'react';
import { useEffect } from 'react'
import HeaderView from '../../local-component/header/header'
import SideBar from '../../local-component/sidebar/sidebar'
import './main-layout.css'
import { menuList } from '../../assets/const/const-list';
import { Route, Routes } from 'react-router-dom';
import { getcomponentRouter } from '../../router/router';
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