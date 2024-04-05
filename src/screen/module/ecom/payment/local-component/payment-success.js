import { useParams } from "react-router-dom";
import { Text } from "../../../../../component/export-component";
import { useEffect, useState } from "react";
import { OrderController } from "../../order/controller";
import { Ultis } from "../../../../../Utils";
import { CustomerController } from "../../../customer/controller";
import { OrderType } from "../../order/da";

export default function PaymentProcess() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [shop, setShop] = useState()

    useEffect(() => {
        if (id) {
            OrderController.getById(id).then(res => {
                if (res) {
                    if (res.shopId) {
                        CustomerController.getById(res.shopId).then(cusRes => {
                            if (cusRes) setShop(cusRes)
                        })
                    }
                    OrderController.getListSimpleDetails({ take: 20, filter: [{ field: 'orderId', operator: 'contains', value: id }] }).then(orders => {
                        if (orders) setData({ ...res, orderDetails: orders.data })
                    })
                    setData(res)
                }
            })
        }
    }, [])

    const getUnit = (type) => {
        switch (type) {
            case OrderType.course:
                return 'Khóa học';
            case OrderType.class:
                return 'Lớp học';
            case OrderType.mentor:
                return 'mentor';
            default:
                return 'Sản phẩm';
        }
    }

    const getOrderDate = () => {
        if (data?.dateCreated) {
            const dateValue = new Date(data.dateCreated)
            switch (dateValue.getDay()) {
                case 0:
                    var wDay = 'Chủ nhật'
                    break;
                case 1:
                    wDay = 'Thứ 2'
                    break;
                case 2:
                    wDay = 'Thứ 3'
                    break;
                case 3:
                    wDay = 'Thứ 4'
                    break;
                case 4:
                    wDay = 'Thứ 5'
                    break;
                case 5:
                    wDay = 'Thứ 6'
                    break;
                case 6:
                    wDay = 'Thứ 7'
                    break;
                default:
                    break;
            }
            return wDay + ' ' + Ultis.datetoString(dateValue, 'dd//mm/yyyy hh:mm')
        }
        return '-'
    }

    return data ? <div className="row" style={{ width: '100%', justifyContent: 'center', padding: '2rem 2rem 0.8rem 2rem', backgroundColor: 'var(--light-background)' }}>
        <div className="col col16-xxl col16-xl col20-sm col18" style={{ '--gutter': '0px', gap: '2.4rem', padding: '3.6rem' }}>
            <div className="tag-success row" style={{ padding: '3.2rem  4.8rem', width: '100%', borderRadius: '0.8rem' }}>
                <div className="heading-7">Bạn đã đăng ký khóa học thành công!</div>
            </div>
            <div className="col" style={{ padding: '2.4rem', gap: '1.2rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                <div className="heading-6">Tóm tắt đơn hàng</div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text maxLine={2} style={{ flex: 1, width: '100%' }} className="heading-8">Mã đơn</Text>
                    <div className="button-text-3">#94756954866495</div>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text maxLine={2} style={{ flex: 1, width: '100%' }} className="heading-8">Ngày đặt hàng</Text>
                    <div className="button-text-3">{getOrderDate()}</div>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text maxLine={2} style={{ flex: 1, width: '100%' }} className="heading-8">Thẻ số **** 3241</Text>
                    <div className="button-text-3" style={{ color: 'var(--warning-color)' }}>Đang xử lý</div>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text maxLine={2} style={{ flex: 1, width: '100%' }} className="label-1">Tổng cộng</Text>
                    <div className="heading-7">3.375.000đ</div>
                </div>
            </div>
            <div className="col" style={{ borderRadius: '0.8rem', padding: '3.2rem 2.4rem', border: 'var(--border-grey1)', gap: '1.2rem' }}>
                <div className="heading-6">Thông tin đơn hàng</div>
                {(data?.orderDetails ?? []).map(item => {
                    return <div key={item.id} className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                        <div className="col" style={{ gap: '0.4rem', flex: 1 }}>
                            <Text className="heading-8" maxLine={2} style={{ width: '100%' }}>{item.name}</Text>
                            <Text className="body-3" maxLine={2} style={{ width: '100%' }}>Shop: {shop?.name ?? '-'} | {getUnit(item.type)}</Text>
                        </div>
                        <Text className="button-text-3" maxLine={1} style={{ maxWidth: '11.6rem' }}>{Ultis.money(item.price)}đ</Text>
                    </div>
                })}
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className="label-1" maxLine={2} style={{ flex: 1, width: '100%' }}>Tổng giá sản phẩm</Text>
                    <Text className="heading-7" maxLine={1} style={{ maxWidth: '12rem' }}>{data?.totalPrice ? Ultis.money(data.totalPrice) : '0'}đ</Text>
                </div>
            </div>
        </div>
    </div> : null
}