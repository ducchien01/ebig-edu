import React, { useRef, useState } from 'react';
import { FilledThreeLines, OutlineBell, OutlineSearch, OutlineShoppingCart } from '../../../assets/const/icon'
import './header.css'
import { Popup, Text, TextField, showPopup } from '../../../component/export-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AccountController } from '../../module/account/controller';
import PopupLogin from '../../module/account/popup-login';
import { useSelector } from 'react-redux';

export default function HeaderView() {
    const userInfor = useSelector((state) => state.account.data)
    const ref = useRef()
    const [search, setSearch] = useState(false)
    const isLogin = AccountController.token()
    const [showSideBar, setShowSidebar] = useState(false)

    return <div className={`header row ${showSideBar ? 'expand' : ''}`}>
        <Popup ref={ref} />
        <button type='button' onClick={() => { setShowSidebar(!showSideBar) }} className='row icon-button32'>
            <div onClick={() => { setShowSidebar(false) }} className='navigation-sidebar-overlay' style={{ display: showSideBar ? 'block' : 'none' }}></div>
            <FilledThreeLines width='2.6rem' height='2.6rem' />
        </button>
        <div className="logo"></div>
        <div className="action row">
            {isLogin ?
                <>
                    {search ?
                        <TextField
                            style={{ height: '4rem' }}
                            className='search-ebig placeholder-2'
                            placeholder='Tìm kiếm trên eBig'
                            prefix={<OutlineSearch />}
                            suffix={<button type='button' className='row icon-button32'><FontAwesomeIcon icon={faXmark} /></button>}
                        /> :
                        <button type='button' className='row icon-button32'><FontAwesomeIcon icon={faSearch} /></button>
                    }
                    <button type='button' className='row icon-button32'><OutlineShoppingCart width='2.6rem' height='2.6rem' /></button>
                    <button type='button' className='row icon-button32'><OutlineBell width='2.6rem' height='2.6rem' /></button>
                    <button type='button'>
                        <img src={userInfor?.avatarUrl} alt='' style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    </button>
                </> :
                <div className='row' style={{ gap: '0.8rem' }}>
                    <button type='button' className='row icon-button32' style={{ display: 'none' }}><FontAwesomeIcon icon={faSearch} /></button>
                    <button type='button' onClick={() => {
                        showPopup({
                            ref: ref,
                            content: <PopupLogin ref={ref} />
                        })
                    }} className='row button-grey' style={{ backgroundColor: 'transparent' }}><Text className='button-text-3'>Đăng nhập</Text></button>
                    <button type='button' className='row button-primary'><Text className='button-text-3'>Đăng ký</Text></button>
                </div>
            }
        </div>
    </div>
}