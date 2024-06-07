import { NavLink } from 'react-router-dom'
import { Text, TextField } from '../../../../component/export-component'
import './discovery.css'
import ListExpert from './local-component/list-expert'
import ListTrendingNews from './local-component/list-trending-news'
import ListCourse from './local-component/list-course'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ListTopic from './local-component/list-topic'

export default function SocialDiscoveryView() {
    return <div className="col" style={{backgroundColor: '#fff'}}>
        <div className="col" style={{ padding: '5.6rem 0', alignItems: 'center', gap: '2rem' }}>
            <Text maxLine={1} className="heading-4">Khám phá những điều hay nhất trên EBig</Text>
            <TextField
                className='search-default placeholder-2'
                placeholder='Tìm kiếm'
                prefix={<FontAwesomeIcon icon={faSearch} />}
                style={{ height: '4.8rem', width: '55.2rem' }}
            />
            <div className='row' style={{ gap: '1.6rem' }}>
                <Text className='subtitle-4'>Từ khóa tìm kiếm nhiều:</Text>
                {['Design', 'UIUX', 'Data analyst', 'Product'].map((e, i) => <Text key={'topic-' + i} className='subtitle-4'>{e}</Text>)}
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '3.2rem' }}>
                <Text className='heading-5'>Topic được quan tâm nhiều</Text>
                <ListTopic />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '3.2rem', alignItems: 'center' }}>
                <Text className='heading-5' style={{ width: '100%' }}>Bài viết xu hướng</Text>
                <ListTrendingNews />
                <NavLink type='button' className='row button-infor border' style={{ backgroundColor: 'transparent' }}>
                    <div className='button-text-3'>Xem thêm</div>
                </NavLink>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 1.2rem', backgroundColor: 'var(--dark-background)' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <Text className='heading-5' style={{ color: '#ffffff' }}>Các chuyên gia hàng đầu</Text>
                <ListExpert />
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 1.2rem' }}>
            <div className='col col16-xxl col18 col24-md col24-sm col24-min' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <div className='row' style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Text className='heading-5'>Khóa học xu hướng</Text>
                    <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListCourse />
            </div>
        </div>
    </div>
}