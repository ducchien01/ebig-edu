import React, { useRef, useState } from 'react';
import { OutlineSearch, OutlineShoppingCart } from '../../../assets/const/icon'
import './header.css'
import { Popup, Text, TextField, showPopup } from '../../../component/export-component';
import { CustomerController } from '../../module/customer/controller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AccountController } from '../../module/account/controller';
import PopupLogin from '../../module/account/popup-login';

export default function HeaderView() {
    const ref = useRef()
    const [search, setSearch] = useState(false)
    const isLogin = AccountController.token()

    return <div className="header row">
        <Popup ref={ref} />
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
                            suffix={<button type='button' className='row icon-button24'><FontAwesomeIcon icon={faXmark} /></button>}
                        /> :
                        <button type='button' className='row icon-button24'><FontAwesomeIcon icon={faSearch} /></button>
                    }
                    <button type='button' className='row icon-button24'><OutlineShoppingCart width='2.4rem' height='2.4rem' /></button>
                    <button type='button'>
                        <img src={CustomerController.userInfor()?.avatarUrl} alt='' style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    </button>
                </> :
                <div className='row' style={{ gap: '0.8rem' }}>
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