import { useSelector } from 'react-redux';
import GroupDefaultBg from '../../../../assets/groups-bg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../../../../component/export-component';
import './home.css'

export default function CenterHome() {
    const userInfor = useSelector((state) => state.account.data)

    return <div className='col'>
        <div style={{ position: 'relative' }}>
            <img src={GroupDefaultBg} alt='' style={{ width: '100%' }} />
            <button type='button' className='row edit-button'>
                <FontAwesomeIcon icon={faEdit} style={{ fontSize: '2rem', color: '#fff' }} />
                <Text className='button-text-2' style={{ color: '#fff' }}>Chỉnh sửa</Text>
            </button>
        </div>
    </div>
}