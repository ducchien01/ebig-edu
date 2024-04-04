import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Ultis, uuidv4 } from "../../../../Utils";
import { Popup, Text, TextField, showPopup } from "../../../../component/export-component";
import { CheckboxForm, RadioButtonForm } from "../../../../project-component/component-form";
import { useForm } from "react-hook-form";
import { OrderController } from "../order/controller";

export default function EcomPayment() {
    const { state } = useLocation()
    const ref = useRef()
    const { control, register, handleSubmit, setValue, watch } = useForm({ shouldFocusError: false, defaultValues: { method: 'banking' } })

    const renderInputInfor = () => {
        const infor = [{ key: 'customerName', label: 'Họ và tên', required: true }, { key: 'mobile', label: 'Số điện thoại', required: true }, { key: 'address', label: 'Địa chỉ', required: true }]
    }

    const onSubmit = (ev) => {
        let newOrder = ev
        newOrder.id = uuidv4()
        newOrder.shopId = state.from.id
        newOrder.statusPayment = 0
        newOrder.orderDetails = (state.products ?? []).map(e => {
            return {
                id: uuidv4(),
                name: e.name,
                price: e.price,
                discount: 0,
                totalPrice: e.price,
                orderId: newOrder.id,
                productId: e.id,
                type: e.type
            }
        })
        debugger
        OrderController.add(newOrder).then(res => {
            if(res) finishPayment()
        })
    }

    const finishPayment = () => {
        showPopup({
            ref: ref,
            heading: <div className="heading-6 popup-header">Thực hiện thanh toán</div>,
            // content: 
        })
    }

    useEffect(() => {
    }, [])

    return <form onSubmit={handleSubmit} className="row" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--light-background)', padding: '2rem 2rem 0.8rem 2rem' }}>
        <Popup ref={ref} />
        <div className="row col20-xxl col20-xl col24" style={{ '--gutter': '0px', gap: '2rem', padding: '3.6rem', backgroundColor: '#ffffff', justifyContent: 'space-between', borderRadius: '0.8rem', alignItems: 'start' }}>
            <div className="row" style={{ flex: 1, width: '100%' }}>
                <div className="col col20-xxl col24" style={{ '--gutter': '0px', gap: '2.4rem' }}>
                    <div className="heading-4">Chi tiết thanh toán</div>
                    <div className="row" style={{ gap: '1.2rem' }}>
                        <TextField
                            style={{ padding: '1.2rem 1.6rem', flex: 1, width: '100%', height: '4.8rem' }}
                            placeholder="Tìm hoặc nhập mã phiếu giảm giá"
                        />
                        <button type="button" className="row button-primary" style={{ padding: '1.2rem 2rem' }}>
                            <div className="button-text-1">Áp dụng mã</div>
                        </button>
                    </div>
                    <div className="col" style={{ padding: '2.4rem 0', gap: '2rem' }}>
                        <Text className="heading-5" maxLine={2} style={{ width: '100%' }}>Thông tin người mua</Text>
                        {/* <div className="label-1" style={{ padding: '1rem 2.4rem', backgroundColor: 'var(--background)', borderRadius: '0.4rem' }}>Bạn đã có tài khoản? <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Ấn vào đây để đăng nhập</NavLink>.</div> */}
                        <div className="row" style={{ flexWrap: 'wrap', gap: '2.4rem 3.2rem' }}>
                            { }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col" style={{ gap: '2.4rem' }}>
                <div className="heading-4">Đơn hàng của bạn</div>
                <div className="col" style={{ padding: '2rem 2.4rem', backgroundColor: 'var(--background)', maxWidth: '42.8rem', borderRadius: '0.8rem' }}>
                    <div className="col" style={{ gap: '1.2rem' }}>
                        <div className="heading-6">Sản phẩm</div>
                        {(state.products ?? []).map(item => {
                            return <div key={item.id} className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                                <div className="col" style={{ gap: '0.4rem', flex: 1 }}>
                                    <Text className="heading-8" maxLine={2} style={{ width: '100%' }}>{item.name}</Text>
                                    <Text className="body-3" maxLine={2} style={{ width: '100%' }}>Shop: {state.from?.name ?? '-'}</Text>
                                </div>
                                <Text className="button-text-3" maxLine={1} style={{ maxWidth: '11.6rem' }}>{Ultis.money(item.price)}đ</Text>
                            </div>
                        })}
                        <div className="row" style={{ gap: '0.8rem', alignItems: 'start', borderBottom: 'var(--border-grey1)', paddingBottom: '1.6rem' }}>
                            <Text className="label-1" maxLine={2} style={{ flex: 1, width: '100%' }}>Tổng giá sản phẩm</Text>
                            <Text className="heading-7" maxLine={1} style={{ maxWidth: '12rem' }}>{state.products?.length ? Ultis.money(state.products.map(e => e.price).reduce((a, b) => a + b)) : '0'}đ</Text>
                        </div>
                    </div>
                    <div className="col" style={{ padding: '1.6rem 0', borderBottom: 'var(--border-grey1)', gap: '1.2rem' }}>
                        <div className="heading-6">Vận chuyển</div>
                        <div className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                            <Text className="heading-8" maxLine={2} style={{ width: '100%', flex: 1 }}>Phí cố định</Text>
                            <Text className="button-text-3" maxLine={1} style={{ maxWidth: '11.6rem' }}>-</Text>
                        </div>
                        <div className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                            <Text className="heading-8" maxLine={2} style={{ width: '100%', flex: 1 }}>Phí ship nhanh</Text>
                            <Text className="button-text-3" maxLine={1} style={{ maxWidth: '11.6rem' }}>-</Text>
                        </div>
                        <div className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                            <Text className="heading-8" maxLine={2} style={{ width: '100%', flex: 1 }}>Tổng phí ship</Text>
                            <Text className="button-text-3" maxLine={1} style={{ maxWidth: '11.6rem' }}>-</Text>
                        </div>
                    </div>
                    <div className="row" style={{ gap: '0.8rem', padding: '1.6rem 0', borderBottom: 'var(--border-grey1)' }}>
                        <Text className="heading-6" >Tổng cộng</Text>
                        <Text className="heading-6" maxLine={1} style={{ flex: 1, width: '100%', textAlign: 'end' }}>{state.products?.length ? Ultis.money(state.products.map(e => e.price).reduce((a, b) => a + b)) : '0'}0đ</Text>
                    </div>
                    <div className="col" style={{ gap: '1.6rem', padding: '1.6rem 0', borderBottom: 'var(--border-grey1)' }}>
                        <RadioButtonForm register={register} label={'Chuyển khoản ngân hàng'} name="method" size={'2rem'} value={'banking'} />
                        <RadioButtonForm register={register} label={'Sử dụng thẻ thanh toán quốc tế'} name="method" size={'2rem'} value={'visa'} />
                        <RadioButtonForm register={register} label={'Sử dụng thẻ ATM nội địa'} name="method" size={'2rem'} value={'atm'} />
                    </div>
                    <div className="body-3" style={{ padding: '1.6rem 0' }}>
                        Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn đặt hàng, hỗ trợ trải nghiệm của bạn trên trang web này và cho các mục đích khác được mô tả trong
                        <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}> chính sách bảo mật của chúng tôi</NavLink>.
                    </div>
                    <div className="row" style={{ gap: '0.8rem', marginBottom: '2.4rem' }}>
                        <CheckboxForm control={control} name={'agree'} size={'2rem'} value={watch('agree')} label={<div className="label-4">Tôi đã đọc và đồng ý với <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>điều khoản và điều kiện</NavLink>.</div>} />
                    </div>
                    <button type="submit" className={`row ${watch('agree') ? 'button-primary' : 'button-disabled border'}`} style={{ width: '100%', padding: '1.2rem 0' }}>
                        <div className="button-text-1">Thanh toán</div>
                    </button>
                </div>
            </div>
        </div>
    </form>
}