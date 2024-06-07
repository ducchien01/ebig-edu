import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { ComponentStatus, Dialog, DialogAlignment, Text, ToastMessage, showDialog } from "../../../../component/export-component"
import { uuidv4 } from "../../../../Utils"
import { CenterController } from "../controller"
import { TopicController } from "../../topic/controller"
import { Select1Form, TextFieldForm } from "../../../../project-component/component-form"
import { FilledPhone, OutlineLocation } from "../../../../assets/const/icon"
import GroupDefaultBg from '../../../../assets/groups-bg.png'
import { CenterPermisson } from "../da"

export default function CenterRegister() {
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
        <div className="col body-sidebar" style={{ paddingRight: 0 }}>
            <Text className='heading-5'>Đăng ký trung tâm</Text>
            <div className='row' style={{ gap: '0.8rem' }}>
                <img src={userInfor?.avatarUrl} alt='' style={{ width: '4.8rem', height: '4.8rem', borderRadius: '50%' }} />
                <div className='col' style={{ gap: '0.2rem' }}>
                    <Text className='title-3'>{userInfor?.name ?? userInfor?.userName ?? '-'}</Text>
                    <Text className='subtitle-3'>Chủ trung tâm</Text>
                </div>
            </div>
            <div className='col' style={{ flex: 1, overflow: 'hidden auto' }}>
                <div className='col' style={{ paddingRight: '1.6rem', gap: '1.6rem' }}>
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
            </div>
            <div className='col' style={{ paddingRight: '1.6rem' }}>
                <button type='button' onClick={methods.handleSubmit(createCenter)} className={`row ${methods.watch('name') && methods.watch('topicId') && methods.watch('phone') && methods.watch('address') ? 'button-primary' : 'button-disabled'}`} style={{ width: '100%' }}>
                    <Text className='button-text-3'>Tạo</Text>
                </button>
            </div>
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