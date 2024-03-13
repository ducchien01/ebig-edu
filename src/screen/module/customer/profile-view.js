import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import banner from '../../../assets/banner2.png'
import { Text } from '../../../component/export-component'
import { CustomerController } from './controller'
import './customer.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function ProfileView() {
    const userInfor = CustomerController.userInfor()
    return <div className="profile-view">
        <img src={banner} />
        <div className='col profile-infor-container'>
            <div className='row common-infor-container'>
                <img src={userInfor.avatarUrl} />
                <div className='col' style={{ gap: '0.4rem', paddingBottom: '0.8rem', flex: 1 }}>
                    <Text className='heading-5'>{userInfor.name}</Text>
                    <Text className='subtitle-2'>{userInfor.email}</Text>
                </div>
            </div>
            <CardLinkToAction
                style={{ backgroundColor: 'var(--primary-background)' }}
                headingColor='var(--primary-color)'
                subTitleColor='#00204DCC'
                heading='Xác thực hồ sơ'
                subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum is simply dummy text of the printing and typesetting industry Ipsum of the printing.'
            />
            <div className='row' style={{ gap: '2.4rem' }}>
                <CardLinkToAction
                    style={{ backgroundColor: 'var(--primary-color)', flex: 1 }}
                    heading='Đăng ký làm chuyên gia'
                    subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum is simply dummy text of the printing and typesetting industry Ipsum of the printing.'
                />
                <CardLinkToAction
                    style={{ backgroundColor: '#AC67E4', flex: 1 }}
                    heading='Đăng ký mở khóa học'
                    subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum is simply dummy text of the printing and typesetting industry Ipsum of the printing.'
                />
                <CardLinkToAction
                    style={{ backgroundColor: '#DEA821', flex: 1 }}
                    heading='Bán sản phẩm trên eBig'
                    subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum is simply dummy text of the printing and typesetting industry Ipsum of the printing.'
                />
            </div>
        </div>
    </div>
}

const CardLinkToAction = ({ style, headingColor = '#ffffff', subTitleColor = '#ffffff', heading = '', subtitle = '', linkTo = '' }) => {
    return <div className='col action-option-block' style={style}>
        <div className='row heading-6' style={{ color: headingColor }}>{heading}</div>
        <Text className='subtitle-4' maxLine={4} style={{ marginBottom: '0.8rem', color: subTitleColor, width: '100%' }}>{subtitle}</Text>
        <div className='row' style={{ justifyContent: 'end' }}>
            <NavLink to={linkTo}><FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.8rem', color: headingColor }} /></NavLink>
        </div>
    </div>
}