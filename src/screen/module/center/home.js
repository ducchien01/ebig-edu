import { useSelector } from 'react-redux';
import { ComponentStatus, Dialog, DialogAlignment, Popup, Select1, Text, TextField, ToastMessage, closePopup, showDialog, showPopup } from '../../../component/export-component';
import './home.css'
import GroupDefaultBg from '../../../assets/groups-bg.png'
import { useForm } from 'react-hook-form';
import { Select1Form, TextFieldForm } from '../../../project-component/component-form';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { TopicController } from '../topic/controller';
import { RootState } from '../../../store';
import { FilledPeople, FilledPhone, OutlineLocation, OutlineSharing } from '../../../assets/const/icon';
import { CenterController } from './controller';
import { uuidv4 } from '../../../Utils';
import { CenterPermisson } from './da';
import { NavLink, useLocation, useParams } from 'react-router-dom';
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
import { faChevronDown, faChevronUp, faEdit, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CustomerController } from '../customer/controller';
import CommonTab from './local-component/common';
import { ValidateType, validateForm } from '../../../project-component/validate';
import CenterRegister from './local-component/register';
import ListMember from './local-component/list-member';
import ListCourse from '../edu/course/local-component/list-course';
import ConfigAPI from '../../../config/configApi';
import { uploadFiles } from '../../baseDA';

export default function CenterHome() {
    const { id } = useParams()
    const userInfor = useSelector((state) => state.account.data)

    return id ? <CenterManagement centerId={id} userInfor={userInfor} permisson={userInfor?.customerCenters?.find(e => e.centerId === id)?.permisson} /> : <CenterRegister />

}

const CenterManagement = ({ userInfor, centerId, permisson }) => {
    const [centerData, setCenterData] = useState()
    const [activeTab, setActiveTab] = useState(0)
    const [fixedTabbar, setFixedTabbar] = useState()
    const [members, setMembers] = useState({ totalCount: undefined, data: [] })
    const ref = useRef()
    const filePickerRef = useRef()

    const getMembers = async () => {
        const res = await CenterController.getListSimpleMember({ page: 1, take: 8, filter: [{ field: 'centerId', operator: '=', value: centerId }] })
        if (res) {
            const customerIds = res.data.map(e => e.customerId)
            if (customerIds.length) {
                const customerItems = await CustomerController.getByIds(customerIds)
                if (!customerItems) return
                setMembers({
                    totalCount: res.totalCount,
                    data: customerItems
                })
            }
        }
    }

    const getData = async () => {
        const centerItem = await CenterController.getById(centerId)
        getMembers()
        if (!centerItem) return
        if (centerItem.topicId) {
            const res = await TopicController.getById(centerItem.topicId)
            if (res) centerItem.topicName = res.name
        }
        setCenterData(centerItem)
    }

    const renderUI = () => {
        switch (activeTab) {
            case 1: // Thành viên
                return <ListMember centerItem={centerData} permisson={permisson} reloadMember={members} onDelete={getMembers} />;
            case 2: // Đào tạo
                return <ListCourse centerItem={centerData} permisson={permisson} />;
            case 3: // Sản phẩm
                return <div></div>;
            case 4: // Doanh thu
                return <div></div>;
            default: // 0: Bài viết
                return <CommonTab centerItem={centerData} userInfor={userInfor} permisson={permisson} />;
        }
    }

    const showPopupAddMember = () => {
        showPopup({
            ref: ref,
            style: { width: '80%', maxWidth: '60rem', backgroundColor: '#fff' },
            heading: <div className="heading-6 popup-header" style={{ textAlign: 'center' }}>Thêm thành viên</div>,
            content: <PopupAddMember
                ref={ref}
                centerId={centerData.id}
                permisson={permisson}
                onClose={async (newCustomerIds) => {
                    if (newCustomerIds?.length) {
                        const customerItems = await CustomerController.getByIds(newCustomerIds)
                        if (!customerItems) return
                        setMembers({
                            totalCount: members.totalCount + newCustomerIds.length,
                            data: [...customerItems, ...members.data.slice(0, members.data.length - newCustomerIds.length + 1)]
                        })
                    }
                }}
            />
        })
    }

    const pickThumbnail = async (ev) => {
        if (ev.target.files && ev.target.files[0]) {
            const res = await uploadFiles([ev.target.files[0]])
            if (res) {
                const editRes = await CenterController.edit({
                    ...centerData,
                    thumbnailId: res[0].id
                })
                if (editRes) {
                    ToastMessage.success('Cập nhật ảnh bìa trung tâm thành công')
                    setCenterData({
                        ...centerData,
                        thumbnailId: res[0].id
                    })
                }
            }
        }
    }

    useEffect(() => {
        getData()
    }, [userInfor])

    useEffect(() => {
        const handleScroll = () => {
            let _tabbar = document.getElementById('handle-tabbar')
            if (!_tabbar) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', handleScroll)
                return
            }
            _tabbar = _tabbar.getBoundingClientRect()
            const _header = document.body.querySelector('.header').getBoundingClientRect()
            if (_tabbar.y < _header.height) {
                setFixedTabbar({ position: 'fixed', top: _header.height, width: _tabbar.width, zIndex: 2 })
            } else if (_tabbar.y >= _header.height) {
                setFixedTabbar(undefined)
            }
        }
        document.body.querySelector('.main-layout').addEventListener('scroll', handleScroll)
    }, [])

    return <div className='col'>
        <Popup ref={ref} />
        <div className='row' style={{ justifyContent: 'center', backgroundColor: '#fff' }}>
            <div className='col col18-xxl col18-xl col20-lg col24' style={{ '--gutter': '0px' }}>
                <div style={{ position: 'relative' }}>
                    <img src={centerData?.thumbnailId ? (ConfigAPI.imgUrl + centerData.thumbnailId) : GroupDefaultBg} alt='' style={{ width: '100%', maxHeight: '30rem' }} />
                    <button type='button' className='row edit-button' onClick={() => { filePickerRef.current.click() }}>
                        <input accept={'image/jpg, image/png, image/jpeg'} ref={filePickerRef} type='file' hidden onChange={pickThumbnail} />
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '2rem', color: '#fff' }} />
                        <Text className='button-text-2' style={{ color: '#fff' }}>Chỉnh sửa</Text>
                    </button>
                </div>
                <div className='col' style={{ padding: '1.6rem 2.4rem 0', gap: '0.6rem' }}>
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
                        <button type='button' onClick={showPopupAddMember} className='row button-primary' style={{ borderRadius: '0.8rem' }}>
                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.4rem' }} />
                            <Text className='button-text-3'>Mời</Text>
                        </button>
                        <button type="button" className="row button-grey" style={{ borderRadius: '0.8rem', padding: '0.8rem 1.6rem' }} onClick={(ev) => { }} >
                            <OutlineSharing width="2rem" height="2rem" />
                            <Text className='button-text-3'>Chia sẻ</Text>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id='handle-tabbar' style={{ height: '4rem' }}>
            <div className='row' style={{ justifyContent: 'center', backgroundColor: '#fff', ...(fixedTabbar ?? {}) }}>
                <div className='col col18-xxl col18-xl col20-lg col24' style={{ '--gutter': '0px' }}>
                    <div className="tab-header-2 row" style={{ overflow: 'auto hidden', scrollbarWidth: 'none', gap: '0.8rem' }}>
                        <div className={`tab-btn label-4 row ${activeTab === 0 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 0 ? 'bold' : '400' }} onClick={() => { setActiveTab(0) }}>Bài viết</div>
                        <div className={`tab-btn label-4 row ${activeTab === 1 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 1 ? 'bold' : '400' }} onClick={() => { setActiveTab(1) }}>Thành viên</div>
                        <div className={`tab-btn label-4 row ${activeTab === 2 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 2 ? 'bold' : '400' }} onClick={() => { setActiveTab(2) }}>Đào tạo</div>
                        <div className={`tab-btn label-4 row ${activeTab === 3 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 3 ? 'bold' : '400' }} onClick={() => { setActiveTab(3) }}>Sản phẩm</div>
                        <div className={`tab-btn label-4 row ${activeTab === 4 ? 'selected' : ''}`} style={{ width: '8.8rem', justifyContent: 'center', fontWeight: activeTab === 4 ? 'bold' : '400' }} onClick={() => { setActiveTab(4) }}>Doanh thu</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col col18-xxl col18-xl col20-lg col24' style={{ '--gutter': '0px' }}>
                {renderUI()}
            </div>
        </div>
    </div>
}

const PopupAddMember = forwardRef(function PopupAddMember(data, ref) {
    const [emails, setEmails] = useState([])
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const methods = useForm({ shouldFocusError: false, defaultValues: { mail: '' } })

    const checkValidEmail = (value) => {
        const checkEmail = validateForm({ list: [{ Name: 'mail', Validate: [{ type: ValidateType.email }] }], formdata: { mail: value.trim() } })
        return !checkEmail
    }

    const searchCustomer = async (value) => {
        const _mail = value.trim()
        if (_mail.length) {
            if (emails.some(e => e.email === _mail)) {
                methods.setValue('mail', '')
                return
            }
            if (valid) {
                const res = await CustomerController.getIDByEmail(_mail)
                if (res) {
                    const ids = res.split(",")
                    CustomerController.getByIds(ids).then(cusRes => {
                        if (cusRes) setEmails([...emails, ...cusRes])
                    })
                }
            } else {
                setEmails([...emails, { email: _mail, invalid: true }])
            }
            methods.setValue('mail', '')
        } else {
            setValid(false)
        }
    }

    const submitInvite = async () => {
        setLoading(true)
        const _mail = methods.getValues('mail').trim()
        const newCustomerCenters = []
        if (valid && _mail.length && emails.every(e => e.email !== _mail)) {
            const ids = await CustomerController.getIDByEmail(_mail)
            if (ids?.length) {
                const _newMember = await CustomerController.getById(ids[0])
                if (_newMember.customerCenters?.some(el => el.centerId === data.centerId)) {
                    setLoading(false)
                    ToastMessage.errors(_mail + ' đã là thành viên trong trung tâm')
                    return
                }
                newCustomerCenters.push({
                    id: uuidv4(),
                    name: _newMember.name ?? 'member',
                    dateCreated: (new Date()).getTime(),
                    customerId: _newMember.id,
                    centerId: data.centerId,
                    permisson: CenterPermisson.member,
                })
            }
        }
        newCustomerCenters.push(...emails.filter(e => !e.invalid && (!e.customerCenters?.length || e.customerCenters.every(el => el.centerId !== data.centerId))).map(e => {
            return {
                id: uuidv4(),
                name: e.name ?? 'member',
                dateCreated: (new Date()).getTime(),
                customerId: e.id,
                centerId: data.centerId,
                permisson: e.permisson ?? CenterPermisson.member,
            }
        }))
        if (!newCustomerCenters.length) {
            setLoading(false)
            ToastMessage.errors('Tài khoản đã là thành viên trong trung tâm')
            return
        }
        const res = await CenterController.addMember(newCustomerCenters)
        if (res) {
            ToastMessage.success('Thêm thành viên mới thành công')
            data.onClose(newCustomerCenters.map(e => e.customerId))
            closePopup(ref)
        } else {
            setLoading(false)
        }
    }

    return <div className="col">
        <div className='row' style={{ gap: '1.6rem', flex: 1, padding: '0.8rem' }}>
            <div className='row input-invite-member'>
                {
                    emails.map((e, i) => {
                        return <div key={e.id ?? e.mail + '-' + i} className={`row ${e.invalid ? 'tag-error' : 'button-grey'}`} style={{ padding: '0.4rem', borderRadius: '0.2rem' }}>
                            <Text className='button-text-3'>{e.email}</Text>
                            <button type='button' onClick={() => {
                                setEmails(emails.filter(el => el.email !== e.email))
                            }} style={{ padding: '0.4rem' }}>
                                <FontAwesomeIcon icon={faXmark} style={{ fontSize: '1.4rem' }} />
                            </button>
                        </div>
                    })
                }
                <input
                    style={{ flex: 1, minWidth: '12rem' }}
                    className='regular2'
                    placeholder='Nhập email'
                    onKeyDown={(ev) => {
                        if (ev.key.toLowerCase() === 'enter') searchCustomer(ev.target.value)
                    }}
                    name='mail'
                    {...methods.register('mail', {
                        onChange: (ev) => {
                            const _tmp = checkValidEmail(ev.target.value)
                            if (valid !== _tmp) setValid(_tmp)
                        },
                    })}
                />
            </div>
            <button type='button' onClick={submitInvite} className={`row ${((emails.length && emails.every(e => !e.invalid)) || valid) && !loading ? 'button-primary' : 'button-disabled'}`} style={{ borderRadius: '0.4rem', padding: '0.8rem 1.6rem' }}>
                <Text className='button-text-3'>Mời</Text>
            </button>
        </div>
        <div className='col' style={{ padding: '1.6rem' }}>
            {
                emails.filter(e => !e.invalid).map(e => {
                    return <div key={e.id} className='row' style={{ gap: '0.8rem', height: '6rem', borderBottom: 'var(--border-grey1  )' }}>
                        <img src={e.avatarUrl} alt='' style={{ borderRadius: '50%', width: '4rem', height: '4rem' }} />
                        <div className='col' style={{ gap: '0.4rem', flex: 1 }}>
                            <Text className='title-3'>{e.name ?? e.userName}</Text>
                            <Text className='subtitle-3'>{e.email}</Text>
                        </div>
                        {
                            e.customerCenters?.some(el => el.centerId === data.centerId) ?
                                <Text className='semibold2'>Đã là thành viên</Text> :
                                <Select1
                                    className='regular2'
                                    style={{ border: 'none', width: '12rem' }}
                                    hideSearch
                                    disabled={data.permisson == undefined || data.permisson === CenterPermisson.member}
                                    options={[{ id: CenterPermisson.admin, name: 'Quản trị viên' }, { id: CenterPermisson.member, name: 'Thành viên' }]}
                                    value={e.permisson ?? CenterPermisson.member}
                                    onChange={(vl) => {
                                        setEmails(emails.map(el => {
                                            if (el.id === e.id) el.permisson = vl.id
                                            return el
                                        }))
                                    }}
                                />
                        }
                    </div>
                })
            }
        </div>
    </div>
})

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