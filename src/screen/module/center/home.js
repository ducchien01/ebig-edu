import { useSelector } from 'react-redux';
import { ComponentStatus, Dialog, DialogAlignment, Text, ToastMessage, showDialog } from '../../../component/export-component';
import './home.css'
import GroupDefaultBg from '../../../assets/groups-bg.png'
import { useForm } from 'react-hook-form';
import { Select1Form, TextFieldForm } from '../../../project-component/component-form';
import { useEffect, useRef, useState } from 'react';
import { TopicController } from '../topic/controller';
import { RootState } from '../../../store';
import { FilledPhone, OutlineLocation } from '../../../assets/const/icon';
import { CenterController } from './controller';
import { uuidv4 } from '../../../Utils';
import { CenterPermisson } from './da';
import { NavLink, useLocation } from 'react-router-dom';
import { eduExpertModules } from '../../../assets/const/const-list';
import EduSchedule from '../edu/schedule/schedule';
import EduStudent from '../edu/student/student';
import SchoolCourse from '../edu/course/course';
import SchoolClass from '../edu/class/class';
import SchoolMentor from '../edu/mentor/mentor';
import CurriculumManagment from '../edu/curriculum/curriculum';
import ExamManagment from '../edu/exam/exam';
import QuestionManagment from '../edu/question/question';
import SidebarActions from '../../layout/sidebar/sidebar-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function CenterHome() {
    const userInfor = useSelector((state) => state.account.data)

    return userInfor?.customerCenters ? <CenterManagement /> : <CenterRegister />

}

const CenterRegister = () => {
    const userInfor = useSelector((state) => state.account.data)
    const methods = useForm({ shouldFocusError: false })
    const dialogRef = useRef()
    const [topics, setTopics] = useState({ data: [] })

    const createCenter = (ev) => {
        showDialog({
            ref: dialogRef,
            alignment: DialogAlignment.center,
            status: ComponentStatus.WARNING,
            title: 'Bạn chắc chắn muốn đăng ký trung tâm mới',
            onSubmit: async () => {
                console.log(ev)
                ev.ownerId = userInfor.id
                ev.id = uuidv4()
                const res = await CenterController.add(ev)
                if (!res) return
                const customerCenterRes = await CenterController.addMember([{
                    id: uuidv4(),
                    centerId: res[0],
                    customerId: userInfor.id,
                    permisson: CenterPermisson.owner,
                    name: userInfor.name ?? userInfor.userName,
                }])
                if (!customerCenterRes) return
                ToastMessage.success('Bạn đã đăng ký trung tâm thành công')
                window.location.reload()
            }
        })
    }

    const getTopics = async (page, nameSearch) => {
        if (nameSearch?.length) var filter = [{ field: 'name', operator: 'contains', value: nameSearch }]
        if (page) {
            const res = await TopicController.getListSimple({ page: page, take: 20, filter: filter })
            if (res) {
                const newList = [...topics.data, ...res.data.filter(e => topics.data.every(el => el.id !== e.id))]
                setTopics({ totalCount: res.totalCount, data: newList })
                return newList
            }
            return []
        } else {
            const res = await TopicController.getListSimple({ page: 1, take: 20, filter: filter })
            if (res) setTopics(res)
            return res.data
        }
    }

    useEffect(() => {
        getTopics()
    }, [])

    useEffect(() => {

        console.log("??????: ", userInfor)
    }, [userInfor])

    return <div>
        <Dialog ref={dialogRef} />
        <div className="col body-sidebar" >
            <Text className='heading-5'>Đăng ký trung tâm</Text>
            <div className='row' style={{ gap: '0.8rem' }}>
                <img src={userInfor?.avatarUrl} alt='' style={{ width: '4.8rem', height: '4.8rem', borderRadius: '50%' }} />
                <div className='col' style={{ gap: '0.2rem' }}>
                    <Text className='title-3'>{userInfor?.name ?? userInfor?.userName ?? '-'}</Text>
                    <Text className='subtitle-3'>Chủ trung tâm</Text>
                </div>
            </div>
            <div className='col' style={{ flex: 1, overflow: 'hidden auto', gap: '1.6rem' }}>
                <TextFieldForm
                    placeholder={'Tên trung tâm'}
                    name={'name'}
                    register={methods.register}
                    errors={methods.formState.errors}
                />
                <TextFieldForm
                    placeholder={'Số điện thoại'}
                    name={'phone'}
                    register={methods.register}
                    errors={methods.formState.errors}
                />
                <Select1Form
                    placeholder={'Lĩnh vực'}
                    name={'topicId'}
                    control={methods.control}
                    errors={methods.formState.errors}
                    options={topics.data}
                    handleLoadmore={async (ev, searchLength) => {
                        const _tmpPage = searchLength ?? topics.data.length
                        if (_tmpPage !== topics.totalCount) {
                            const res = await getTopics(Math.floor(_tmpPage / 20 + 1), ev)
                            return res
                        }
                    }}
                />
                <TextFieldForm
                    placeholder={'Địa chỉ'}
                    name={'address'}
                    register={methods.register}
                    errors={methods.formState.errors}
                />
            </div>
            <button type='button' onClick={methods.handleSubmit(createCenter)} className={`row ${methods.watch('name') && methods.watch('topicId') && methods.watch('phone') && methods.watch('address') ? 'button-primary' : 'button-disabled'}`} style={{ width: '100%' }}>
                <Text className='button-text-3'>Tạo</Text>
            </button>
        </div>
        <div style={{ float: 'right' }}>
            <div className='row' style={{ width: '100%', justifyContent: 'center' }}>
                <div className='col preview-center-container col20-xxl col20-xl col24' style={{ '--gutter': '0px', padding: '2.4rem' }}>
                    <div className='col' style={{ borderRadius: '0.8rem', border: 'var(--border-grey1)', padding: '1.6rem', gap: '2rem' }}>
                        <Text className='heading-7' style={{ color: '#00204D' }}>Xem trước</Text>
                        <div className='center-bg col'>
                            <img src={GroupDefaultBg} alt='' style={{ width: '100%', borderRadius: '0.8rem' }} />
                        </div>
                        <div className='row' style={{ gap: '1.2rem' }}>
                            <Text className='heading-5'>{methods.watch('name')?.length ? methods.watch('name') : 'Tên trung tâm'}</Text>
                            {methods.watch('topicId')?.length ? <div className='tag-disabled'><Text className='button-text-3'>{topics.data.find(e => e.id === methods.watch('topicId'))?.name ?? '-'}</Text></div> : undefined}
                        </div>
                        <div className='row' style={{ gap: '0.8rem' }}>
                            <FilledPhone />
                            <Text className='button-text-3'>Số điện thoại liên hệ: {methods.watch('phone')}</Text>
                        </div>
                        <div className='row' style={{ gap: '0.8rem' }}>
                            <OutlineLocation />
                            <Text className='button-text-3'>Địa chỉ: {methods.watch('address')}</Text>
                        </div>
                        <div className='col divider' style={{ margin: '0.4rem 0', height: '1.6px' }} />
                        <div className='row' style={{ padding: '1.6rem', margin: '0 1.6rem', backgroundColor: 'var(--disabled-background)', borderRadius: '0.8rem', width: 'calc(100% - 3.2rem)' }}>
                            <Text className='heading-6'>Giới thiệu</Text>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div style={{ position: 'relative' }}>
                <img src={GroupDefaultBg} alt='' style={{ width: '100%' }} />
                <button type='button' className='row edit-button'>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '2rem', color: '#fff' }} />
                    <Text className='button-text-2' style={{ color: '#fff' }}>Chỉnh sửa</Text>
                </button>
            </div> */}
            <div>

            </div>
        </div>
    </div>
}

const CenterManagement = () => {
    const location = useLocation()
    const [modules, setModules] = useState(eduExpertModules)
    const [selectedId, setSelectedId] = useState()
    const moduleTile = (item) => {
        console.log(location.pathname)
        if (!item.link) {
            var children = modules.filter(e => e.parentId === item.id)
            item.isOpen ??= false
        }
        return <div key={'m-' + item.id} className='col'>
            <NavLink to={item.link ? ('/' + item.link) : null} onClick={children ? () => {
                setModules(modules.map(e => {
                    if (e.id === item.id) e.isOpen = !item.isOpen
                    return e
                }))
            } : null} className={`row expert-module-tile ${selectedId === item.id ? 'selected' : ''}`} style={{ paddingLeft: item.parentId ? '4rem' : '1.6rem' }}>
                <Text maxLine={1} className='label-3' style={{ flex: 1, width: '100%' }}>{item.name}</Text>
                {children ? <FontAwesomeIcon icon={item.isOpen ? faChevronUp : faChevronDown} style={{ fontSize: '1.6rem', color: '#00204D99' }} /> : null}
            </NavLink>
            {children && item.isOpen ? <div className='col'>{children.map(e => moduleTile(e))}</div> : null}
        </div>
    }

    const renderUI = () => {
        switch (location.pathname) {
            case '/education/home':
                return <Home />
            case '/education/schedule':
                return <EduSchedule />
            case '/education/students':
                return <EduStudent />
            case '/education/courses':
                return <SchoolCourse />
            case '/education/classes':
                return <SchoolClass />
            case '/education/mentors':
                return <SchoolMentor />
            case '/education/curriculum':
                return <CurriculumManagment />
            case '/education/exams':
                return <ExamManagment />
            case '/education/questions':
                return <QuestionManagment />
            default:
                return <Home />
        }
    }

    useEffect(() => {
        const selectedModule = eduExpertModules.find(e => e.link && location.pathname.includes(e.link))
        setSelectedId(selectedModule?.id ?? 1)
        if (selectedModule?.parentId) {
            setModules(modules.map(e => {
                if (e.id === selectedModule.parentId) e.isOpen = true
                return e
            }))
        }
    }, [location.pathname])

    return <div>
        <div className='col body-sidebar'>
            <Text className='heading-6'>Center Management</Text>
            <div className='col' style={{ gap: '1.2rem', flex: 1, height: '100%', overflow: 'hidden auto' }}>
                {modules.filter(e => !e.parentId).map(item => moduleTile(item))}
            </div>
            <SidebarActions />
        </div>
        <div style={{ float: 'right' }}>
            {renderUI()}
        </div>
    </div>
}

const Home = () => {
    return <div className='kjdsgfiudsgfiuws'></div>
}