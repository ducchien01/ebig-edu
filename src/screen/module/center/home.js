import { useSelector } from 'react-redux';
import { ComponentStatus, Dialog, DialogAlignment, Text, ToastMessage, showDialog } from '../../../component/export-component';
import './home.css'
import GroupDefaultBg from '../../../assets/groups-bg.png'
import { useForm } from 'react-hook-form';
import { Select1Form, TextFieldForm } from '../../../project-component/component-form';
import { useEffect, useRef, useState } from 'react';
import { TopicController } from '../topic/controller';
import { RootState } from '../../../store';
import { FilledPeople, FilledPhone, OutlineLocation, OutlineSharing } from '../../../assets/const/icon';
import { CenterController } from './controller';
import { uuidv4 } from '../../../Utils';
import { CenterPermisson } from './da';
import { NavLink, useLocation } from 'react-router-dom';
import { centerModules } from '../../../assets/const/const-list';
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
import { faChevronDown, faChevronUp, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomerController } from '../customer/controller';
import CommonTab from './local-component/common';

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

            <div>

            </div>
        </div>
    </div>
}

// const renderUI = () => {
//     switch (location.pathname) {
//         case '/center/home':
//             return <Home />
//         case '/center/schedule':
//             return <EduSchedule />
//         case '/center/students':
//             return <EduStudent />
//         case '/center/courses':
//             return <SchoolCourse />
//         case '/center/classes':
//             return <SchoolClass />
//         case '/center/mentors':
//             return <SchoolMentor />
//         case '/center/curriculum':
//             return <CurriculumManagment />
//         case '/center/exams':
//             return <ExamManagment />
//         case '/center/questions':
//             return <QuestionManagment />
//         default:
//             return <Home />
//     }
// }
const CenterManagement = () => {
    const userInfor = useSelector((state) => state.account.data)
    const [centerData, setCenterData] = useState()
    const [activeTab, setActiveTab] = useState(0)
    const [members, setMembers] = useState({ totalCount: undefined, data: [] })

    const getData = async () => {
        const centerId = userInfor.customerCenters[0]?.centerId
        if (centerId) {
            const centerItem = await CenterController.getById(centerId)
            CenterController.getListSimpleMember({ page: 1, take: 8, filter: [{ field: 'centerId', operator: '=', value: centerId }] }).then(async (memRes) => {
                if (memRes) {
                    const customerIds = memRes.data.map(e => e.customerId).filter(id => members.data.every(e => e.id !== id))
                    if (customerIds.length) {
                        const customerItems = await CustomerController.getByIds(customerIds)
                        if (!customerItems) return
                        setMembers({
                            totalCount: memRes.totalCount,
                            data: [...members.data, ...customerItems]
                        })
                    }
                }
            })
            if (!centerItem) return
            if (centerItem.topicId) {
                const res = await TopicController.getById(centerItem.topicId)
                if (res) centerItem.topicName = res.name
            }
            setCenterData(centerItem)
        }
    }

    const renderUI = () => {
        switch (activeTab) {
            case 1: // Thành viên
                return <div></div>;
            case 2: // Đào tạo
                return <div></div>;
            case 3: // Sản phẩm
                return <div></div>;
            case 4: // Doanh thu
                return <div></div>;
            default: // 0: Bài viết
                return <CommonTab centerItem={centerData} />;
        }
    }

    useEffect(() => {
        if (userInfor) getData()
        document.body.querySelector('.main-layout').onscroll = (ev) => {
            // if (total !== newsData.length) {
            //     if (Math.round(ev.target.offsetHeight + ev.target.scrollTop) >= (ev.target.scrollHeight - 1)) getData()
            // }
        }
    }, [userInfor])

    return <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col col18-xxl col18-xl col20-lg col24' style={{ '--gutter': '0px' }}>
            <div style={{ position: 'relative' }}>
                <img src={GroupDefaultBg} alt='' style={{ width: '100%', maxHeight: '30rem', borderRadius: '0 0 0.8rem 0.8rem' }} />
                <button type='button' className='row edit-button'>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '2rem', color: '#fff' }} />
                    <Text className='button-text-2' style={{ color: '#fff' }}>Chỉnh sửa</Text>
                </button>
            </div>
            <div className='col' style={{ padding: '1.6rem 2.4rem', gap: '0.6rem' }}>
                <div className='row' style={{ gap: '0.4rem 0.8rem', flexWrap: 'wrap' }}>
                    <Text className='heading-4'>{centerData?.name ?? '-'}</Text>
                    {centerData?.topicName ? <div className='tag-infor'><Text className='button-text-3'>{centerData?.topicName ?? '-'}</Text></div> : undefined}
                </div>
                <div className='row' style={{ gap: '0.8rem' }}>
                    <FilledPeople />
                    <Text className='button-text-3'>{members.totalCount > 1000 ? (members.totalCount / 1000).toFixed(1) : members.totalCount} thành viên</Text>
                </div>
                <div className='row' style={{ gap: '0.8rem', padding: '0.8rem 0' }}>
                    <div style={{ flex: 1, position: 'relative', height: '3.6rem' }}>
                        {
                            members.data.map((e, i) => {
                                return <img
                                    key={e.id}
                                    alt=''
                                    src={e.avatarUrl}
                                    style={{ position: 'absolute', width: '3.6rem', height: '3.6rem', borderRadius: '3.6rem', top: 0, left: `${2.4 * i}rem`, border: '1px solid #fff' }}
                                />
                            })
                        }
                    </div>
                    <button type='button' className='row button-primary' style={{ borderRadius: '0.8rem' }}>
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem' }} />
                        <Text className='button-text-3'>Mời</Text>
                    </button>
                    <button type="button" className="row button-grey" style={{ borderRadius: '0.8rem', padding: '0.8rem 1.6rem' }} onClick={(ev) => { }} >
                        <OutlineSharing width="2rem" height="2rem" />
                        <Text className='button-text-3'>Chia sẻ</Text>
                    </button>
                </div>
                <div className="tab-header-2 row" style={{ overflow: 'auto hidden', scrollbarWidth: 'none', gap: '0.8rem' }}>
                    <div className={`tab-btn label-4 row ${activeTab === 0 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 0 ? 'bold' : '400' }} onClick={() => { setActiveTab(0) }}>Bài viết</div>
                    <div className={`tab-btn label-4 row ${activeTab === 1 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 1 ? 'bold' : '400' }} onClick={() => { setActiveTab(2) }}>Thành viên</div>
                    <div className={`tab-btn label-4 row ${activeTab === 2 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 2 ? 'bold' : '400' }} onClick={() => { setActiveTab(1) }}>Đào tạo</div>
                    <div className={`tab-btn label-4 row ${activeTab === 3 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 3 ? 'bold' : '400' }} onClick={() => { setActiveTab(3) }}>Sản phẩm</div>
                    <div className={`tab-btn label-4 row ${activeTab === 4 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 4 ? 'bold' : '400' }} onClick={() => { setActiveTab(4) }}>Doanh thu</div>
                </div>

            </div>
            {renderUI()}
        </div>
    </div>
}