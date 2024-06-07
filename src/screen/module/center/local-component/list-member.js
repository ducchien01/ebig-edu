import { useEffect, useRef, useState } from "react"
import { CenterController } from "../controller"
import { CustomerController } from "../../customer/controller"
import { Popup, Text, TextField, ToastMessage, closePopup, showPopup } from "../../../../component/export-component"
import { CenterPermisson } from "../da"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faSearch } from "@fortawesome/free-solid-svg-icons"
import { OutlineChat } from "../../../../assets/const/icon"
import { AccountActions } from "../../account/reducer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ListMember({ centerItem, permisson, onDelete, reloadMember }) {
    const userInfor = useSelector((state) => state.account.data)
    const [owner, setOwner] = useState()
    const [admins, setAdmins] = useState([])
    const [members, setMembers] = useState({ totalCount: undefined, data: [] })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef()

    const getMembers = async (page) => {
        const res = await CenterController.getListSimpleMember({ page: page ?? Math.floor(members.data.length / 10) + 1, take: 10, filter: [{ field: 'centerId', operator: '=', value: centerItem.id }, { field: 'permisson', operator: '=', value: CenterPermisson.member }] })
        if (res) {
            const customerIds = res.data.map(e => e.customerId).filter(id => members.data.every(mem => mem.id !== id))
            if (customerIds.length) {
                const customerItems = await CustomerController.getByIds(customerIds)
                if (!customerItems) return
                setMembers({
                    totalCount: res.totalCount,
                    data: [...members.data, ...customerItems]
                })
            }
        }
    }

    const showActionOptions = (ev, per, mem) => {
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${ev.pageX}px`, top: `${ev.pageY}px` },
            content: <div className="col more-action-popup">
                {permisson === CenterPermisson.owner ? <button type="button" className="row" onClick={async () => {
                    const res = await CenterController.editMember(
                        [
                            ...mem.customerCenters.filter(e => {
                                const _check = e.centerId === centerItem.id
                                if (_check) e.permisson = CenterPermisson.owner
                                return _check
                            }),
                            ...userInfor.customerCenters.filter(e => e.centerId === centerItem.id).map(e => {
                                return {
                                    ...e,
                                    permisson: CenterPermisson.admin
                                }
                            })
                        ]
                    )
                    if (res) {
                        ToastMessage.success('Chuyển quyền sở hữu trung tâm thành công')
                        switch (per) {
                            case CenterPermisson.admin:
                                setAdmins(admins.filter(e => e.id !== mem.id))
                                break;
                            default:
                                setMembers({
                                    totalCount: members.totalCount - 1,
                                    data: members.data.filter(e => e.id !== mem.id)
                                })
                                break;
                        }
                        AccountActions.getInfor(dispatch)
                    }
                    closePopup(ref)
                }}>
                    <Text className="label-4">Chuyển quyền sở hữu trung tâm</Text>
                </button> : undefined}
                {per === CenterPermisson.admin ? <button type="button" className="row" onClick={async () => {
                    const res = await CenterController.editMember(mem.customerCenters.filter(e => {
                        const _check = e.centerId === centerItem.id
                        if (_check) e.permisson = CenterPermisson.member
                        return _check
                    }))
                    if (res) {
                        ToastMessage.success('Bỏ quyền quản trị thành công')
                        setAdmins(admins.filter(e => e.id !== mem.id))
                        getMembers(1)
                    }
                    closePopup(ref)
                }}>
                    <Text className="label-4">Bỏ quyền quản trị</Text>
                </button> : undefined}
                {per === CenterPermisson.member ? <button type="button" className="row" onClick={async () => {
                    const res = await CenterController.editMember(mem.customerCenters.filter(e => {
                        const _check = e.centerId === centerItem.id
                        if (_check) e.permisson = CenterPermisson.admin
                        return _check
                    }))
                    if (res) {
                        ToastMessage.success('Thành viên ' + mem.name ?? mem.email + ' được cấp quyền quản trị thành công')
                        setMembers({
                            totalCount: members.totalCount - 1,
                            data: members.data.filter(e => e.id !== mem.id)
                        })
                        setAdmins([...admins, mem])
                    }
                    closePopup(ref)
                }}>
                    <Text className="label-4">Cấp quyền quản trị</Text>
                </button> : undefined}
                <button type="button" className="row" onClick={async () => {
                    const res = await CenterController.deleteMember(mem.customerCenters.filter(e => e.centerId === centerItem.id).map(e => e.id))
                    if (res) {
                        if (mem.id === userInfor.id) {
                            ToastMessage.success('Rời trung tâm thành công')
                            AccountActions.getInfor(dispatch)
                            navigate('/centers')
                            return
                        }
                        switch (per) {
                            case CenterPermisson.admin:
                                setAdmins(admins.filter(e => e.id !== mem.id))
                                break;
                            default:
                                setMembers({
                                    totalCount: members.totalCount - 1,
                                    data: members.data.filter(e => e.id !== mem.id)
                                })
                                break;
                        }
                        onDelete()
                        ToastMessage.success('Thành viên ' + mem.name ?? mem.email + ' đã bị xóa khỏi trung tâm')
                    }
                    closePopup(ref)
                }}>
                    <Text className="label-4">{mem.id === userInfor.id ? 'Rời trung tâm' : 'Xóa thành viên'}</Text>
                </button>
            </div>
        })
    }

    const memberTile = (mem, per = CenterPermisson.member) => {
        return <div key={mem?.id} className="row" style={{ gap: '0.8rem', padding: '1.6rem 0.2rem' }}>
            <img src={mem?.avatarUrl} alt="" style={{ borderRadius: '50%', width: '4.8rem', height: '4.8rem' }} />
            <div className='col' style={{ gap: '0.4rem', flex: 1 }}>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className='title-3'>{mem?.name ?? mem?.userName}</Text>
                    <div className="row tag-infor">
                        <Text>{per === CenterPermisson.owner ? 'Chủ trung tâm' : per === CenterPermisson.admin ? 'Quản trị viên' : 'Thành viên'}</Text>
                    </div>
                </div>
                <Text className='subtitle-3'>{mem?.email}</Text>
            </div>
            <button type="button" className="row icon-button40" style={{ backgroundColor: 'var(--background)', borderRadius: '0.8rem' }}>
                <OutlineChat width="2rem" height="2rem" />
            </button>
            {permisson !== CenterPermisson.member && per !== CenterPermisson.owner ?
                <button onClick={(ev) => {
                    showActionOptions(ev, per, mem)
                }} type="button" className="row icon-button40" style={{ backgroundColor: 'var(--background)', borderRadius: '0.8rem' }}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button> : <div style={{ width: '4rem' }} />}
        </div>
    }

    useEffect(() => {
        if (permisson === CenterPermisson.owner) {
            if (userInfor) setOwner(userInfor)
        } else {
            CenterController.getListSimpleMember({ page: 1, take: 1, filter: [{ field: 'centerId', operator: '=', value: centerItem.id }, { field: 'permisson', operator: '=', value: CenterPermisson.owner }] }).then(async (res) => {
                if (res) {
                    const _owner = await CustomerController.getById(res.data[0].customerId)
                    if (_owner) setOwner(_owner)
                }
            })
        }
    }, [permisson, userInfor])

    useEffect(() => {
        if (centerItem) {
            CenterController.getListSimpleMember({ page: 1, take: 50, filter: [{ field: 'centerId', operator: '=', value: centerItem.id }, { field: 'permisson', operator: '=', value: CenterPermisson.admin }] }).then(async (res) => {
                if (res) {
                    const adminIds = res.data.map(e => e.customerId)
                    if (adminIds.length) {
                        const customerItems = await CustomerController.getByIds(adminIds)
                        if (!customerItems) return
                        setAdmins(customerItems)
                    }
                }
            })
            getMembers(1)
        }
    }, [reloadMember])

    return <div className="col" style={{ alignItems: 'center' }}>
        <Popup ref={ref} />
        <div className='col' style={{ padding: '2.4rem', margin: '2.4rem 0', backgroundColor: '#fff', borderRadius: '0.8rem', width: 'calc(100% - 11.2rem)', minWidth: '56rem', gap: '0.8rem' }}>
            <TextField
                style={{ border: 'none', borderRadius: '2.4rem', backgroundColor: 'var(--background)', height: '4rem' }}
                prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#667994', marginTop: '0.1rem' }} />}
                placeholder="Tìm thành viên"
            />
            <div className="col" style={{ padding: '2rem 0', borderBottom: 'var(--border-grey1)' }}>
                <Text className="heading-7">Quản trị viên</Text>
                {owner ? memberTile(owner, CenterPermisson.owner) : undefined}
                {admins.map(mem => { return memberTile(mem, CenterPermisson.admin) })}
            </div>
            <div className="col" style={{ padding: '2rem 0', borderBottom: 'var(--border-grey1)' }}>
                <Text className="heading-7">Thành viên</Text>
                {members.data.map(mem => { return memberTile(mem, CenterPermisson.member) })}
            </div>
        </div>

    </div>
}