import React from 'react';
import { FilledBell, FilledChat, OutlineSearch } from '../../../assets/const/icon'
import './header.css'
import { TextField } from '../../../component/export-component';
import { CustomerController } from '../../module/customer/controller';

export default function HeaderView() {
    return <div className="header row">
        <div className="logo"></div>
        <div className="action row">
            <TextField prefix={<OutlineSearch />} className='search-ebig placeholder-2' placeholder='Tìm kiếm trên eBig' />
            <button type='button' className='action-icon'><FilledBell color='#ffffff' width='2.4rem' height='2.4rem' /></button>
            <button type='button' className='action-icon'><FilledChat color='#ffffff' width='2.4rem' height='2.4rem' /></button>
            <button type='button' className='user-infor' style={{ backgroundImage: `url(${CustomerController.userInfor().avatarUrl})` }}></button>
        </div>
    </div>
}