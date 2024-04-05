import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RatingController } from "../../../edu/rating/controller"
import { Pagination, Rating, Text, TextArea } from "../../../../../component/export-component"
import { CustomerController } from "../../../customer/controller"
import { useForm } from "react-hook-form"
import { Ultis } from "../../../../../Utils"

export default function ListComment({ rating = false }) {
    const methods = useForm({ defaultValues: { message: '', value: 0 } })
    const { id } = useParams()
    const user = CustomerController.userInfor()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [data, setData] = useState()
    const [customerList, setCustomerList] = useState([])

    const getListCommnet = async (page, size) => {
        const res = await RatingController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ field: 'LinkId', operator: '=', value: id }, { field: 'ParentId', operator: "=", value: null }] })
        if (res) {

            let customerIds = res.data.map(e => e.customerId)
            CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setCustomerList(cusRes)
            })
            setData(res)
        }
    }

    const sendRating = (ev) => {
        methods.reset(ev)
    }

    useEffect(() => {
        getListCommnet()
    }, [])

    return <div className="col" style={{ gap: '2.4rem' }}>
        <form className="col" style={{ gap: '1.2rem' }}>
            <div className="row">
                <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                    <img src={user?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    <Text className="label-3">{user?.name}</Text>
                </div>
                {rating && <Rating value={methods.watch('value')} onChange={(rate) => { methods.setValue('value', rate) }} />}
            </div>
            <div className="col comment-box">
                <TextArea
                    register={methods.register('message')}
                    name={'message'}
                    style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                    placeholder="Bạn thấy khóa học này thế nào?"
                />
                <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem' }}>
                    <button type="button" className={`row ${methods.watch('value') ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }} onClick={methods.handleSubmit(sendRating)}>
                        <div className="button-text-3">Phản hồi</div>
                    </button>
                </div>
            </div>
        </form>
        {(data?.data ?? []).filter(e => !e.parentId).map(item => {
            const customer = customerList.find(e => e.id === item.customerId)
            return <div key={item.id} className="col" style={{ gap: '2.4rem' }}>
                <div className="col" style={{ gap: '0.8rem' }}>
                    <div className="row">
                        <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                            <img src={customer?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                            <Text className="label-3">{customer?.name}</Text>
                            <Text className="label-3">.</Text>
                            <Text className="subtitle-3">{Ultis.datetoString(new Date(item.dateCreated))}</Text>
                        </div>
                        {rating && <Rating value={item.value} />}
                    </div>
                    <Text className="body-2" maxLine={2}>{item.message}</Text>
                </div>
            </div>
        })}
        <Pagination
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
}