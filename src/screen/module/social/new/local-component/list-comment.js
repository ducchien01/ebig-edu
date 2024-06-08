import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { RatingController } from "../../../edu/rating/controller"
import { Pagination, Popup, Rating, Text, TextArea, showPopup } from "../../../../../component/export-component"
import { CustomerController } from "../../../customer/controller"
import { useForm } from "react-hook-form"
import { Ultis } from "../../../../../Utils"
import { OutlineChat, OutlineHeart } from "../../../../../assets/const/icon"
import { LikeController } from "../../../like/controller"
import { useSelector } from "react-redux"
import PopupLogin from "../../../account/popup-login"

export default function ListComment({ rating = false }) {
    const methods = useForm({ defaultValues: { message: '', value: 0 } })
    const { id } = useParams()
    const ref = useRef()
    const userInfor = useSelector((state) => state.account.data)
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [data, setData] = useState()
    const [customerList, setCustomerList] = useState([])
    const [myRating, setMyRating] = useState()

    const getListCommnet = async (page, size) => {
        const filterList = [{ field: 'linkId', operator: '=', value: id }, { field: 'parentId', operator: "=", value: null }]
        if (rating) filterList.push({ field: 'customerId', operator: "<>", value: userInfor.id })
        const res = await RatingController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: filterList, sort: ['dateCreated'] })
        if (res) {
            let customerIds = res.data.map(e => e.customerId)
            CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setCustomerList(cusRes)
            })
            setData(res)
        }
    }

    const sendRating = async (ev) => {
        if (userInfor) {
            const newRating = {
                ...ev,
                dateCreated: (new Date()).getTime(),
                customerId: userInfor.id,
                linkId: id,
            }
            const newId = await RatingController.add(newRating)
            if (newId) {
                newRating.id = newId
                if (rating) {
                    setMyRating(newRating)
                } else {
                    getListCommnet()
                    methods.reset()
                }
            }
        } else {
            showPopup({
                ref: ref,
                content: <PopupLogin ref={ref} />
            })
        }
    }

    useEffect(() => {
        if (rating && userInfor) {
            RatingController.getListSimple({ filter: [{ field: 'linkId', operator: '=', value: id }, { field: 'parentId', operator: "=", value: null }, { field: 'customerId', operator: "=", value: userInfor.id }] }).then(res => {
                if (res?.data?.length) setMyRating(res.data[0])
            })
        }
        getListCommnet()
    }, [userInfor])

    return <div className="col" style={{ gap: '2.4rem' }}>
        <Popup ref={ref} />
        {myRating ?
            <RatingCard ratingItem={myRating} customer={userInfor} isRating={rating} showDivider={false} user={userInfor} /> :
            <form className="col" style={{ gap: '1.2rem' }}>
                <div className="row">
                    {userInfor != null ? <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                        <img src={userInfor.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                        <Text className="label-3">{userInfor.name}</Text>
                    </div> : undefined}
                    {rating && <Rating value={methods.watch('value')} onChange={(rate) => {
                        methods.setValue('value', rate)
                        if (!methods.getValues('message')?.length) {
                            switch (rate) {
                                case 1:
                                    methods.setValue('message', 'Rất tệ')
                                    break;
                                case 2:
                                    methods.setValue('message', 'Tệ')
                                    break;
                                case 3:
                                    methods.setValue('message', 'Bình thường')
                                    break;
                                case 4:
                                    methods.setValue('message', 'Tốt')
                                    break;
                                case 5:
                                    methods.setValue('message', 'Tuyệt vời')
                                    break;
                                default:
                                    break;
                            }
                        }
                    }} />}
                </div>
                <div className="col comment-box">
                    <TextArea
                        register={methods.register('message')}
                        name={'message'}
                        style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                        placeholder="Bạn thấy khóa học này thế nào?"
                    />
                    <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem' }}>
                        <button type="button" className={`row ${((methods.watch('value') || !rating) && methods.watch('message')) ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }} onClick={methods.handleSubmit(sendRating)}>
                            <div className="button-text-3">Phản hồi</div>
                        </button>
                    </div>
                </div>
            </form>}
        {(data?.data ?? []).filter(e => !e.parentId).map((item) => {
            const customer = customerList.find(e => e.id === item.customerId)
            return <RatingCard key={item.id} ratingItem={item} customer={customer} isRating={rating} showDivider user={userInfor} />
        })}
        <div className="row" style={{ height: 'fit-content' }}>
            <div style={{ flex: 1 }}></div>
            <Pagination
                hiddenTotal
                style={{ width: 'fit-content' }}
                currentPage={pageDetails.page}
                /// pageSize
                itemPerPage={pageDetails.size}
                // data.total
                totalItem={data?.totalCount}
                /// action
                onChangePage={(page, size) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ ...pageDetails, page: page, size: size });
                    }
                }}
            />
        </div>
    </div>
}

const RatingCard = ({ ratingItem, showDivider = false, isRating = false, customer, user }) => {
    const methods = useForm({ defaultValues: { message: '', value: 0 } })
    const [data, setData] = useState()
    const [children, setChildren] = useState([])
    const [showReply, setShowReply] = useState(false)
    const [customerList, setCustomerList] = useState([])
    const [onReplying, setOnReplying] = useState(false)

    const getReply = async () => {
        const res = await RatingController.getListSimple({ page: Math.floor(children.length / 10) + 1, take: 10, sort: ['dateCreated'], filter: [{ field: 'parentId', operator: "=", value: ratingItem.id }] })
        if (res) {
            let customerIds = res.data.map(e => e.customerId).filter(id => customerList.every(e => e.id !== id))
            if (customerIds.length)
                CustomerController.getByIds(customerIds).then(cusRes => {
                    if (cusRes) setCustomerList([...customerList, ...cusRes])
                })
            LikeController.getTotalLikeByIds(res.data.map(e => e.id)).then(likeRes => {
                let newData = res.data
                if (likeRes?.length) {
                    newData = newData.map(e => {
                        return {
                            ...e,
                            totalLike: likeRes.find(el => el.linkId === e.id)?.totalLike ?? 0
                        }
                    })
                }
                newData = [...children, ...newData.filter(e => children.every(el => el.id !== e.id))]
                setChildren(newData)
            })
        }
    }

    const sendReply = async (ev) => {
        const newReply = {
            ...ev,
            dateCreated: (new Date()).getTime(),
            customerId: user?.id,
            linkId: data.linkId,
            parentId: data.id
        }
        const newId = await RatingController.add(newReply)
        if (newId) {
            newReply.id = newId
            setData({ ...data, totalRating: (data.totalRating ?? 0) + 1 })
            setChildren([newReply, ...children])
            setOnReplying(false)
            if (customerList.every(e => e.id !== user.id)) setCustomerList([...customerList, user])
            if (!showReply) {
                await getReply()
                setShowReply(true)
            }
        }
    }

    const sendLike = async () => {

    }

    useEffect(() => {
        if (customer && customerList.every(e => e.id !== customer.id)) setCustomerList([...customerList, customer])
        setData(ratingItem)
    }, [customer])

    return data ? <div className="col" style={{ gap: '2.4rem' }}>
        {showDivider && <div className="col divider" style={{ width: '100%' }}></div>}
        <div className="col" style={{ gap: '0.8rem' }}>
            <div className="row">
                <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                    <img src={customer?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    <Text className="label-3">{customer?.name}</Text>
                    <Text className="label-3">.</Text>
                    <Text className="subtitle-3">{Ultis.datetoString(new Date(data.dateCreated))}</Text>
                </div>
                {isRating && <Rating value={data.value} />}
            </div>
            <Text className="body-2" maxLine={2}>{data.message}</Text>
        </div>
        <div className="row">
            <div className="row" style={{ flex: 1, gap: '0.8rem' }}>
                <OutlineHeart width="2.4rem" height="2.4rem" />
                <Text className="button-text-3">{data.totalLike ?? 0}</Text>
                <Text className="label-4">.</Text>
                <button onClick={async () => {
                    if (!showReply) {
                        await getReply()
                    }
                    setShowReply(!showReply)
                }} className="row" style={{ gap: '0.8rem' }}>
                    <OutlineChat width="2.4rem" height="2.4rem" />
                    <Text className="button-text-3">{showReply ? 'Đóng bình luận' : (data.totalRating ?? 0)}</Text>
                </button>
            </div>
            {!onReplying && <button onClick={() => { setOnReplying(true) }} className="button-text-3" style={{ color: 'var(--primary-color)' }}>Phản hồi</button>}
        </div>
        {onReplying && <form className="col" style={{ gap: '1.2rem' }}>
            <div className="row">
                <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                    <img src={user?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    <Text className="label-3">{user?.name}</Text>
                </div>
            </div>
            <div className="col comment-box">
                <TextArea
                    register={methods.register('message')}
                    name={'message'}
                    style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                    placeholder="Bạn thấy khóa học này thế nào?"
                />
                <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem', gap: '0.4rem' }}>
                    <button type="button" className={`row ${methods.watch('message') ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }} onClick={methods.handleSubmit(sendReply)}>
                        <div className="button-text-3">Phản hồi</div>
                    </button>
                </div>
            </div>
        </form>}
        {children.length && showReply ? <div className="col" style={{ paddingLeft: '2.4rem', gap: '3.2rem', borderLeft: 'var(--border-grey1)' }}>
            {children.map(child => {
                const cus = customerList.find(e => e.id === child.customerId)
                return <div key={child.id} className="col" style={{ gap: '0.8rem' }}>
                    <div className="row">
                        <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                            <img src={cus?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                            <Text className="label-3">{cus?.name}</Text>
                            <Text className="label-3">.</Text>
                            <Text className="subtitle-3">{Ultis.datetoString(new Date(child.dateCreated))}</Text>
                        </div>
                    </div>
                    <Text className="body-2" maxLine={2}>{child.message}</Text>
                    <div className="row" style={{ paddingTop: '1.6rem', gap: '0.8rem' }}>
                        <OutlineHeart width="2.4rem" height="2.4rem" />
                        <Text className="button-text-3">{child.totalLike ?? 0}</Text>
                    </div>
                </div>
            })}
            {data.totalRating !== children.length ? <Text onClick={getReply} className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem thêm</Text> : null}
        </div> : null}
    </div> : <></>
}