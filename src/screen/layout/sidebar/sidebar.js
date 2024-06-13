import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sidebar.css'
import { useSelector } from 'react-redux';
import { CustomerType } from '../../module/customer/da';

export default function SideBar({ menu = [] }) {
    const userInfor = useSelector((state) => state.account.data)
    const location = useLocation()
    const naviagte = useNavigate()
    const [selected, setSelected] = useState([])
    const [isExpand, setIsExpand] = useState(true)

    useEffect(() => {
        const newSelectedList = menu.filter(e => {
            if (e.parentId === 1) e.isExpand ??= true
            return location.pathname.startsWith('/' + e.link);
        })
        setSelected(newSelectedList.length ? newSelectedList : menu.slice(0, 1))
    }, [location.pathname, menu])

    return <div className={`col sidebar ${isExpand ? 'expand' : ''}`} >
        <div className='col' style={{ flex: 1 }}>
            {menu.filter(e => e.parentId === 1).map((item, index) => {
                const isSelected = selected.some(e => e.id === item.id)
                return <button key={`sidebar-item-${index}`} onClick={() => {
                    if (isSelected && document.body.querySelector('.body-sidebar')) {
                        setIsExpand(!isExpand)
                    } else {
                        naviagte('/' + (item.path ?? item.link))
                    }
                }} className={`sidebar-item ${isSelected ? 'selected' : ''}`}>
                    {selected.some(e => e.id === item.id) ? (userInfor?.type === CustomerType.expert && item.selectedExpertIcon ? item.selectedExpertIcon : item.selectedIcon) : (userInfor?.type === CustomerType.expert && item.expertIcon ? item.expertIcon : item.icon)}
                </button>
            })}
        </div>
        {/* {AccountController.token() ? <button type='button' onClick={dialogLogout}><OutlineCircleArrowLeft width={"2.4rem"} height={"2.4rem"} /></button> : null} */}
    </div>
}
