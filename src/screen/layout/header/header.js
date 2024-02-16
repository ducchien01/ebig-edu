import React from 'react';
import { FilledBell, FilledChat, OutlineSearch } from '../../../assets/const/icon'
import './header.css'
import demoAvatar from '../../../assets/demo-avatar.png';
import { TextField } from '../../../component/export-component';

export default function HeaderView() {
    return <div className="header row">
        <div className="logo"></div>
        <div className="action row">
            <TextField prefix={<div className='prefix-icon-search row'><OutlineSearch /></div>} className='search-ebig placeholder-2' placeholder='Tìm kiếm trên eBig' />
            <button type='button' className='action-icon'><FilledBell color='#ffffff' /></button>
            <button type='button' className='action-icon'><FilledChat color='#ffffff' /></button>
            <button type='button' className='user-infor' style={{ backgroundImage: `url(${demoAvatar})` }}></button>
        </div>
    </div>
}