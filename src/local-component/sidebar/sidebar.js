import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sidebar.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { OutlineCircleArrowLeft } from '../../assets/const/icon';
import { menuList } from '../../assets/const/const-list';
export default function SideBar() {
              const location = useLocation()
              const [moduleList, setModuleList] = useState(menuList)
              const [selected, setSelected] = useState([])

              const moduleTile = (item) => {
                            const children = moduleList.filter(e => e.parentId === item.id)
                            if (children.length) item.hideChildren ??= true
                            return <div key={item.id} className='col'>
                                          <NavLink className={`sidebar-module-tile row ${location.pathname.includes(item.link) && !children.length ? 'selected' : ''}`}
                                                        style={{ paddingLeft: 16 * (item.listId?.length ?? 1) }}
                                                        to={children.length ? null : item.link}
                                                        onClick={children.length ? () => {
                                                                      setModuleList(moduleList.map(e => {
                                                                                    return {
                                                                                                  ...e,
                                                                                                  hideChildren: e.id === item.id ? !item.hideChildren : e.hideChildren
                                                                                    }
                                                                      }))
                                                        } : null}
                                          >
                                                        <div className='label-3' style={{ color: '#00204DE5' }}>{item.name}</div>
                                                        {children.length ? <FontAwesomeIcon icon={item.hideChildren ? faChevronDown : faChevronUp} color='#00204D99' /> : null}
                                          </NavLink>
                                          {children.map(childItem => moduleTile(childItem))}
                            </div>
              }

              const expandBody = () => {
                            const topicModule = selected.find(e => e.parentId === 1)
                            return [
                                          <div key={'topic-module-name'} className='title heading-6'>{topicModule?.name}</div>,
                                          <div key={'module-menu'} className='module-menu col'>
                                                        {moduleList.filter(e => e.parentId === topicModule?.id).map(item => moduleTile(item))}
                                          </div>,
                                          <div key={'support-action'} className='support-action row'></div>
                            ]
              }

              useEffect(() => {
                            const pathFragment = location.pathname.split("/")
                            setSelected(menuList.filter(e => pathFragment.some(p => e.link.split('/').some(m => m === p))))
              }, [location.pathname])

              return <div className="row sidebar" expand={selected.find(e => e.parentId === 1)?.isExpand}>
                            <div className="col collapse">
                                          <div className='col'>
                                                        {moduleList.filter(e => e.parentId === 1).map((item, index) => {
                                                                      return <div key={index} className={`sidebar-item ${selected.some(e => e.id === item.id) ? 'selected' : ''}`}
                                                                                    onClick={() => {
                                                                                                  if (selected.some(e => e.id === item.id)) {
                                                                                                                item.isExpand = !item.isExpand
                                                                                                  }
                                                                                                  setSelected(moduleList.filter(e => {
                                                                                                                if (e.id === item.id) {
                                                                                                                              e.isExpand = item.isExpand
                                                                                                                              return true
                                                                                                                }
                                                                                                                return e.parentId === item.id || e.listId?.includes(item.id);
                                                                                                  }))
                                                                                    }}
                                                                      >
                                                                                    {selected.some(e => e.id === item.id) ? item.selectedIcon : item.icon}
                                                                      </div>
                                                        })}
                                          </div>
                                          <button type='button' className='log-out-icon'><OutlineCircleArrowLeft /></button>
                            </div>
                            <div className="col expand"> {expandBody()} </div>
              </div>
}
