import { NavLink, useLocation } from "react-router-dom";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Ultis } from "../../../../Utils";
import { Popup, Text, TextField, showPopup } from "../../../../component/export-component";
import { CheckboxForm, RadioButtonForm, Select1Form, TextFieldForm } from "../../../../project-component/component-form";
import { useForm } from "react-hook-form";
import { OrderController } from "../order/controller";
import { CustomerController } from "../../customer/controller";
import QRCode from '../../../../assets/qr-banking.png'
import { differenceInSeconds } from "date-fns";
import { OrderType } from "../order/da";

export default function EcomPayment() {
    const { state } = useLocation()
    const ref = useRef()
    const [timer, setTimer] = useState()
    const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ shouldFocusError: false, defaultValues: { method: 'banking' } })

    const onSubmit = (ev) => {
        const user = CustomerController.userInfor()
        let newOrder = ev
        newOrder.shopId = state.from.id
        newOrder.statusPayment = 0
        newOrder.customerId = user.id
        newOrder.email = user.email
        newOrder.type = OrderType.course
        newOrder.totalPrice = state.products?.length ? state.products.map(e => e.price).reduce((a, b) => a + b) : 0
        newOrder.orderDetails = (state.products ?? []).map(e => {
            return {
                name: e.name,
                price: e.price,
                discount: 0,
                totalPrice: e.price,
                productId: e.id,
                type: e.type,
                quantity: 1,
                orderId: newOrder.id,
            }
        })
        if (newOrder.id) {
            OrderController.edit(newOrder).then(res => {
                if (res) finishPayment(newOrder)
            })
        } else {
            OrderController.add(newOrder).then(newId => {
                if (newId) {
                    setValue(newId)
                    newOrder.id = newId
                    finishPayment(newOrder)
                }
            })
        }
    }

    const onError = () => { }

    const finishPayment = (orderItem) => {
        let now = new Date()
        if (timer) {
            var countDown = Math.abs(differenceInSeconds(timer, now))
        } else {
            setTimer(now)
        }
        showPopup({
            ref: ref,
            heading: <div className="heading-6 popup-header">Thực hiện thanh toán</div>,
            content: <PopupPaymentSubmit ref={ref} orderItem={orderItem} timer={countDown ?? 0} />,
        })
    }

    useEffect(() => {
        console.log("??????????", state)
    }, [])

    return <form onSubmit={handleSubmit(onSubmit, onError)} className="row" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--light-background)', padding: '2rem 2rem 0.8rem 2rem' }}>
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
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <TextFieldForm
                                    label={'Họ và tên'}
                                    required={true}
                                    name={'customerName'}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <TextFieldForm
                                    label={'Số điện thoại'}
                                    required={true}
                                    name={'mobile'}
                                    register={register}
                                    errors={errors}
                                    type={'number'}
                                />
                            </div>
                            <div className="col24" style={{ '--gutter': '3.2rem' }}>
                                <TextFieldForm
                                    label={'Địa chỉ'}
                                    name={'address'}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <Select1Form
                                    label={'Thành phố'}
                                    name={'city'}
                                    control={control}
                                    errors={errors}
                                    options={[]}
                                    value={watch('city')}
                                />
                            </div>
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <Select1Form
                                    label={'Quận'}
                                    name={'province'}
                                    control={control}
                                    errors={errors}
                                    options={[]}
                                    value={watch('province')}
                                />
                            </div>
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <Select1Form
                                    label={'Quận'}
                                    name={'ward'}
                                    control={control}
                                    errors={errors}
                                    options={[]}
                                    value={watch('ward')}
                                />
                            </div>
                            <div className="col12" style={{ '--gutter': '3.2rem' }}>
                                <TextFieldForm
                                    label={'ZIP Code'}
                                    name={'zip'}
                                    register={register}
                                    errors={errors}
                                    placeholder={'Nhập mã ZIP Code'}
                                    type={'number'}
                                />
                            </div>
                        </div>
                        <CheckboxForm
                            control={control}
                            label={'Lưu thông tin thanh toán cho lần tiếp theo'}
                            name={'isSave'}
                            size={'1.8rem'}
                            value={watch('isSave')}
                        />
                    </div>
                    <div className="col" style={{ padding: '2.4rem 0', gap: '2rem' }}>
                        <Text className="heading-5" maxLine={2} style={{ width: '100%' }}>Thông tin người nhận hàng</Text>
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
                        <Text className="heading-6" maxLine={1} style={{ flex: 1, width: '100%', textAlign: 'end' }}>{state.products?.length ? Ultis.money(state.products.map(e => e.price).reduce((a, b) => a + b)) : '0'}đ</Text>
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

const PopupPaymentSubmit = forwardRef(function PopupPaymentSubmit(data, ref) {
    return <div className="col" style={{ width: '80rem', flex: 1, height: '100%' }}>
        <div className="col" style={{ padding: '3.2rem', gap: '3.2rem', flex: 1, height: '100%', overflow: 'hidden auto' }}>
            <div className="col" style={{ gap: '1.2rem', padding: '1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)' }}>
                <Text className="heading-7">Đơn hàng #746854764</Text>
                <div className="row" style={{ gap: '4rem' }}>
                    <div className="col" style={{ gap: '0.4rem' }}>
                        <Text className="subtitle-4">Người mua</Text>
                        <Text className="body-2">{data.orderItem.customerName}</Text>
                    </div>
                    <div className="col" style={{ gap: '0.4rem' }}>
                        <Text className="subtitle-4">Số điện thoại</Text>
                        <Text className="body-2">{data.orderItem.mobile}</Text>
                    </div>
                    <div className="col" style={{ gap: '0.4rem' }}>
                        <Text className="subtitle-4">Email</Text>
                        <Text className="body-2">{data.orderItem.email}</Text>
                    </div>
                </div>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <Text maxLine={2} className="heading-7" style={{ width: '100%' }}>Sử dụng ứng dụng mobile banking hoặc ví điện tử để quét mã</Text>
                <div className="row" style={{ gap: '4rem', alignItems: 'start' }}>
                    <div className="col" style={{ flex: 1 }}>
                        <img src={QRCode} style={{ width: '100%' }} />
                    </div>
                    <div className="col" style={{ flex: 2, gap: '1.6rem' }}>
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="subtitle-4">Ngân hàng</Text>
                            <Text className="heading-7">Vietcombank - Ngân hàng thương mại cổ phần Ngoại thương Việt Nam</Text>
                        </div>
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="subtitle-4">Số tài khoản</Text>
                            <Text className="heading-7">0451000418849</Text>
                        </div>
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="subtitle-4">Số tiền</Text>
                            <Text className="heading-7">{Ultis.money(data.orderItem.totalPrice)}đ</Text>
                        </div>
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="subtitle-4">Nội dung chuyển khoản</Text>
                            <Text className="heading-7">DH8374593458345</Text>
                        </div>
                        <CoutDownText remain={data.timer} />
                    </div>
                </div>
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            {/* <Text style={{ opacity: 0.6 }}>Thay đổi nội dung đơn hàng</Text> */}
            <Text style={{ opacity: 0.6 }}></Text>
            <NavLink to={'processing/' + data.orderItem.id} style={{ padding: '0.4rem 1.2rem', borderRadius: '2.4rem' }} className="button-primary row">
                <div className="button-text-3">Hoàn tất</div>
            </NavLink>
        </div>
    </div>
})

const CoutDownText = ({ remain = 0 }) => {
    const [timer, setTimer] = useState(1800 - remain)

    const getMinute = () => {
        const mValue = Math.floor(timer / 60)
        return mValue < 10 ? `0${mValue}` : mValue
    }

    const getSecond = () => {
        const sValue = timer % 60
        return sValue < 10 ? `0${sValue}` : sValue
    }

    useEffect(() => {
        const interval = setInterval(function () {
            if (timer) {
                setTimer(timer - 1)
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [timer])

    return <div className="body-3 row" style={{ gap: '0.6rem', padding: '1.2rem 1.6rem', marginTop: '1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--error-background)' }}>
        Vui lòng thanh toán trong
        <div className="body-3" style={{ color: 'var(--error-color)' }}>{`${getMinute()}:${getSecond()}`}</div>
    </div>
}