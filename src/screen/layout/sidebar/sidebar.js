import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './sidebar.css'
import { OutlineCircleArrowLeft } from '../../../assets/const/icon';
import { AccountController } from '../../module/account/controller';
import { ComponentStatus, Dialog, DialogAlignment, showDialog } from '../../../component/export-component';
import { useSelector } from 'react-redux';
import { CustomerType } from '../../module/customer/da';

export default function SideBar({ menu = [] }) {
    const userInfor = useSelector((state) => state.account.data)
    const dialogRef = useRef()
    const location = useLocation()
    const [selected, setSelected] = useState([])
    const [isExpand, setIsExpand] = useState(true)

    const dialogLogout = () => {
        showDialog({
            ref: dialogRef,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn đăng xuất',
            onSubmit: AccountController.logout,
        })
    }

    useEffect(() => {
        const newSelectedList = menu.filter(e => {
            if (e.parentId === 1) e.isExpand ??= true
            return location.pathname.startsWith('/' + e.link);
        })
        setSelected(newSelectedList.length ? newSelectedList : menu.slice(0, 1))
    }, [location.pathname])

    return <div className={`col sidebar ${isExpand ? 'expand' : ''}`} >
        <Dialog ref={dialogRef} />
        <div className='col' style={{ flex: 1 }}>
            {menu.filter(e => e.parentId === 1).map((item, index) => {
                const isSelected = selected.some(e => e.id === item.id)
                return <NavLink key={`sidebar-item-${index}`} to={isSelected ? null : (item.path ?? item.link)} onClick={() => {
                    if (isSelected) {
                        setIsExpand(!isExpand)
                    }
                }} className={`sidebar-item ${isSelected ? 'selected' : ''}`}>
                    {selected.some(e => e.id === item.id) ? (userInfor?.type === CustomerType.expert && item.selectedExpertIcon ? item.selectedExpertIcon : item.selectedIcon) : (userInfor?.type === CustomerType.expert && item.expertIcon ? item.expertIcon : item.icon)}
                </NavLink>
            })}
        </div>
        {AccountController.token() ? <button type='button' onClick={dialogLogout}><OutlineCircleArrowLeft width={"2.4rem"} height={"2.4rem"} /></button> : null}
    </div>
}
