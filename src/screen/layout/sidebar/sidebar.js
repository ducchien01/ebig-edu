import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.css'
import { OutlineCircleArrowLeft } from '../../../assets/const/icon';
import { AccountController } from '../../module/account/controller';
import { ComponentStatus, Dialog, DialogAlignment, showDialog } from '../../../component/export-component';

export default function SideBar({ menu }) {
    const dialogRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const [moduleList, setModuleList] = useState(menu)
    const [selected, setSelected] = useState([])

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
        setSelected(newSelectedList)
    }, [location.pathname])

    return <div className="col sidebar" >
        <Dialog ref={dialogRef} />
        <div className='col' style={{ flex: 1 }}>
            {moduleList.filter(e => e.parentId === 1).map((item, index) => {
                return <NavLink key={`sidebar-item-${index}`} to={item.link} className={`sidebar-item ${selected.some(e => e.id === item.id) ? 'selected' : ''}`}>
                    {selected.some(e => e.id === item.id) ? item.selectedIcon : item.icon}
                </NavLink>
            })}
        </div>
        <button type='button' onClick={dialogLogout}><OutlineCircleArrowLeft width={"2.4rem"} height={"2.4rem"} /></button>
    </div>
}
