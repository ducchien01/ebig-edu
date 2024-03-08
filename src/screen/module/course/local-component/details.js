import React, { useEffect, useState } from 'react';
import { NavLink, useHref, useLocation, useNavigate, useParams } from "react-router-dom";
import { FilledSendMessage } from '../../../../assets/const/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { extendView } from '../../../../assets/const/const-list';
import { Checkbox, Text } from '../../../../component/export-component';

const listView = extendView.filter(e => e.link === 'edu-management/school/course/details')
export default function CourseDetails() {
    const { id } = useParams()
    const location = useLocation()
    const [selectedView, setSelectedView] = useState(listView[0])
    const [data, setData] = useState()

    const onSelectView = (item, ev) => {
        const suffixIcon = ev.target.closest('.details-sidebar-tile').querySelector('.svg-inline--fa')
        if (suffixIcon.classList.contains('fa-chevron-down')) {
            item.isExpand = true
            suffixIcon.classList.remove('fa-chevron-down')
            suffixIcon.classList.add('fa-chevron-up')
        } else {
            item.isExpand = false
            suffixIcon.classList.remove('fa-chevron-up')
            suffixIcon.classList.add('fa-chevron-down')
        }
    }

    useEffect(() => {
        const pathFragment = location.pathname.split("/")
        setSelectedView(listView.find(e => pathFragment.includes(e.slug)))
        if (id && !data) {
            setData({})
        }
    }, [location.pathname])

    return <div className="details-view-container col" >
        <div className='details-view-header row' >
            <div className='col header-breadcum' >
                <div className='row' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách Course</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                    <div className='button-text-6 selected'>Tạo mới Course</div>
                </div>
                <div className='heading-6'>Tạo mới Course</div>
            </div>
            <NavLink type='button' to={`/edu-management/school/course/school-mn-export-view/${id}`} className='button-primary row' style={{ padding: '0.6rem 1.2rem' }}>
                <FilledSendMessage color='white' />
                <div className='button-text-3'>Xuất bản khóa học</div>
            </NavLink>
        </div>
        <div className='details-view-body row' style={{ width: '100%', height: '100%', flex: 1 }}>
            <div className='details-view-body-sidebar col'>
                <Text className='heading-7'>UI/UX cho người mới bắt đầu</Text>
                <div className='col' >
                    {listView.filter(e => {
                        if (selectedView.parentId === e.slug) e.isExpand = true
                        return !e.parentId;
                    }).map((item, index) => {
                        const children = listView.filter(e => e.parentId === item.slug)
                        item.isExpand ??= children.some(e => e.isExpand)
                        return <div key={`sidebar-tile-${index}`} className='col' style={{ width: '100%' }}>
                            <NavLink to={children.length ? null : `/${item.path.replace(':id', id)}`} className={`row details-sidebar-tile ${selectedView?.slug === item.slug ? 'selected' : ''}`} onClick={(ev) => {
                                if (children.length)
                                    onSelectView(item, ev)
                            }} >
                                <Checkbox style={{ borderRadius: '50%' }} size={'2rem'} disabled value={false} />
                                <Text className='label-3' style={{ flex: 1, '--max-line': 1, with: '100%' }}>{item.name}</Text>
                                {children.length ? <FontAwesomeIcon icon={item.isExpand ? faChevronUp : faChevronDown} style={{ fontSize: '1.4rem', color: '#00204D' }} fillOpacity={0.6} /> : null}
                            </NavLink>
                            {children.map((child, j) => <NavLink to={`/${child.path.replace(':id', id)}`} key={`sidebar-tile-${index}-${j}`} style={{ paddingLeft: '4.4rem' }} className={`row details-sidebar-tile ${selectedView?.slug === child.slug || child.isExpand ? 'selected' : ''}`} >
                                <Text className='label-3' style={{ flex: 1, '--max-line': 1, width: '100%' }}>{child.name}</Text>
                            </NavLink>)}
                        </div>
                    })}
                </div>
            </div>
            <div className='details-view-body-content col'>
                {selectedView?.element ? selectedView.element(data) : null}
            </div>
        </div>
    </div>
}