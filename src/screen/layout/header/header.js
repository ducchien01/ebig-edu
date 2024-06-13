import React, { forwardRef, useRef, useState } from 'react';
import { FilledThreeLines, OutlineBell, OutlineBookMark, OutlineBooks, OutlineHeart, OutlineSearch, OutlineSettings, OutlineShop, OutlineShoppingCart, OutlineUserProfile } from '../../../assets/const/icon'
import './header.css'
import { ComponentStatus, Dialog, DialogAlignment, Popup, Text, TextField, closePopup, showDialog, showPopup } from '../../../component/export-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AccountController } from '../../module/account/controller';
import { useSelector } from 'react-redux';
import { showLoginPopup } from '../main-layout';

export default function HeaderView() {
    const userInfor = useSelector((state) => state.account.data)
    const [search, setSearch] = useState(false)
    const isLogin = AccountController.token()
    const [showSideBar, setShowSidebar] = useState(false)
    const ref = useRef()
    const dialogRef = useRef()

    const dialogLogout = () => {
        showDialog({
            ref: dialogRef,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn đăng xuất',
            onSubmit: AccountController.logout,
        })
    }

    const showUserActions = (ev) => {
        const _box = ev.target.getBoundingClientRect()
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            hideButtonClose: true,
            style: { top: `${_box.y + _box.height + 2}px`, right: `${document.body.offsetWidth - _box.right}px`, position: 'absolute', width: 'fit-contents' },
            content: <PopupUserActions
                ref={ref}
                userInfor={userInfor}
                logout={() => {
                    closePopup(ref)
                    dialogLogout()
                }}
            />
        })
    }

    return <div className={`header row ${showSideBar ? 'expand' : ''}`}>
        <Dialog ref={dialogRef} />
        <Popup ref={ref} />
        <button type='button' onClick={() => { setShowSidebar(!showSideBar) }} className='row icon-button32'>
            <div onClick={() => { setShowSidebar(false) }} className='navigation-sidebar-overlay' style={{ display: showSideBar ? 'block' : 'none' }}></div>
            <FilledThreeLines width='2.6rem' height='2.6rem' />
        </button>
        <div className="logo"></div>
        <div className="action row">
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
            {isLogin ?
                <>
                    <button type='button' className='row icon-button32'><OutlineShoppingCart width='2.6rem' height='2.6rem' /></button>
                    <button type='button' className='row icon-button32'><OutlineBell width='2.6rem' height='2.6rem' /></button>
                    <button type='button' onClick={showUserActions}>
                        <img src={userInfor?.avatarUrl} alt='' style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    </button>
                </> :
                <button type='button' onClick={showLoginPopup} className='row button-primary' ><Text className='button-text-3'>Đăng nhập</Text></button>
            }
        </div>
    </div>
}

const PopupUserActions = forwardRef(function PopupUserActions(data, ref) {
    return <div className='col more-action-popup' style={{ padding: '1.2rem 0', width: '22rem' }}>
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineUserProfile />
            <Text className='label-4'>Trang cá nhân</Text>
        </button>
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineBookMark />
            <Text className='label-4'>Trang cá nhân</Text>
        </button>
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineHeart />
            <Text className='label-4'>Wishlist</Text>
        </button>
        <div className='col divider' />
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineBooks />
            <Text className='label-4'>Quản lý giảng dạy</Text>
        </button>
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineShop />
            <Text className='label-4'>Quản lý bán hàng</Text>
        </button>
        <div className='col divider' />
        <button className='row' style={{ gap: '1.2rem', padding: '1rem 1.6rem' }}>
            <OutlineSettings />
            <Text className='label-4'>Cài đặt</Text>
        </button>
        <div className='col divider' />
        <button type='button' onClick={data.logout} className='col' style={{ gap: '0.4rem', padding: '1rem 1.6rem' }}>
            <Text className='label-4' style={{ color: 'var(--error-color)' }}>Đăng xuất</Text>
            <Text className='subtitle-4' >{data.userInfor?.email ?? ''}</Text>
        </button>
    </div>
})