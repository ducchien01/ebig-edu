import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { FilledSendMessage } from '../../../../../assets/const/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { extendView } from '../../../../../assets/const/const-list';
import { Checkbox, ComponentStatus, Dialog, DialogAlignment, Text, ToastMessage, showDialog } from '../../../../../component/export-component';
import { CourseController } from '../controller';
import FormEditLesson from '../../lesson/lesson-details';
import CourseCurriculum from './course-curriculum';
import Overview from './settings-overview';
import { CourseStatus } from '../da';

export default function SettingsCourse() {
    const { id } = useParams()
    const ref = useRef()
    const naviagte = useNavigate()
    const location = useLocation()
    const [selectedView, setSelectedView] = useState({ slug: 'overview' })
    const [listView, setListView] = useState(extendView.filter(e => e.link === 'edu/course/details').map(e => JSON.parse(JSON.stringify(e))))
    const [data, setData] = useState()

    const checkValidInforToExport = (courseItem) => {
        let needUpdate = false
        const updateListView = listView.map(e => {
            if (!e.valid) {
                switch (e.slug) {
                    case 'overview':
                        const checkProps = ['name', 'topicId', 'level', 'targets', 'thumbnailId', 'price']
                        e.valid = checkProps.every(props => courseItem[props] != null)
                        needUpdate = true
                        break;
                    case 'lessons':
                        e.valid = courseItem.courseLessons?.length ? true : false
                        needUpdate = true
                        break;
                    default:
                        break;
                }
            }
            return e
        })
        if (needUpdate) setListView(updateListView)

    }

    const submitPublishedCourse = () => {
        showDialog({
            ref: ref,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn xuất bản khóa học này',
            onSubmit: () => {
                data.status = CourseStatus.published
                CourseController.edit(data).then(res => {
                    if (res) {
                        ToastMessage.success('Xuất bản khóa học thành công')
                        naviagte(`/edu/course/preview/${id}`)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const pathFragment = location.pathname.split("/")
        let newSelectedView = listView.find(e => pathFragment.includes(e.slug))
        setSelectedView(newSelectedView)
        if (id) {
            CourseController.getById(id).then(res => {
                if (res) setData(res)
                checkValidInforToExport(res)
            })
        }
    }, [location.pathname, id])

    return <div className="details-view-container col" >
        <Dialog ref={ref} />
        <div className='details-view-header row' >
            <div className='col header-breadcum' >
                <div className='row' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách Course</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                    <div className='button-text-6 selected'>Tạo mới Course</div>
                </div>
                <div className='heading-6'>Thông tin chi tiết Course</div>
            </div>
            {data?.status === CourseStatus.draft ? <button type='button' onClick={submitPublishedCourse} className={`${listView.filter(e => !e.parentId).every(e => e.valid) ? 'button-primary' : 'button-grey'} row`} style={{ padding: '0.6rem 1.2rem' }}>
                <FilledSendMessage color={listView.filter(e => !e.parentId).every(e => e.valid) ? 'white' : undefined} />
                <div className='button-text-3'>Xuất bản khóa học</div>
            </button> : null}
        </div>
        <div className='details-view-body row' style={{ width: '100%', height: '100%', flex: 1 }}>
            <div className='details-view-body-sidebar col'>
                <Text className='heading-7'>{data?.name}</Text>
                <div className='col' >
                    {listView.filter(e => !e.parentId).map(function (item, i) {
                        const isSelected = selectedView?.slug === item.slug || selectedView?.parentId === item.slug
                        return <NavLink key={'nav-to-' + i} to={`/edu/${item.path.replace(':id', id)}`} className={`row details-sidebar-tile ${isSelected ? 'selected' : ''}`}>
                            <Checkbox style={{ borderRadius: '50%' }} size={'2rem'} disabled value={item.valid} />
                            <Text className='label-3' maxLine={1} style={{ flex: 1, with: '100%' }}>{item.name}</Text>
                        </NavLink>;
                    })}
                </div>
            </div>
            <div className='details-view-body-content col'>
                {[
                    {
                        slug: 'lessons-settings',
                        element: <FormEditLesson courseData={data} />
                    },
                    {
                        slug: 'lessons',
                        element: <CourseCurriculum data={data} onChangeRequired={checkValidInforToExport} />
                    },
                    {
                        slug: 'overview',
                        element: <Overview data={data} onChangeRequired={checkValidInforToExport} />
                    },
                ].find(e => e.slug === selectedView.slug)?.element}
            </div>
        </div>
    </div>
}