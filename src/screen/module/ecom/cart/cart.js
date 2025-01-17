import { CellAlignItems, Checkbox, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField } from "wini-web-components";
import demoImg from '../../../../assets/demo-image4.png'
import { FilledTrashCan } from "../../../../assets/const/icon";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfigAPI from "../../../../config/configApi";
import { Ultis } from "../../../../Utils";

export default function EcomCart() {
    const { state } = useLocation()
    const [productList, setProductList] = useState([])

    const getResult = () => {
        const resultList = productList.filter(e => e.checked)
        return <div className="col" style={{ gap: '1.6rem', alignItems: 'stretch', width: '100%', maxWidth: '38rem' }}>
            <div className="row" style={{ gap: '0.8rem', width: '100%' }}>
                <button className="row button-infor" style={{ flex: 1, width: '100%', padding: '0.8rem 1.6rem' }}>
                    <div className="button-text-3">Cập nhật giỏ hàng</div>
                </button>
                <NavLink to={'payment'} state={{ from: state.from, products: resultList }} className={`row ${resultList ? 'button-primary' : 'button-disabled'}`} style={{ flex: 1, width: '100%' }}>
                    <div className="button-text-3">Đặt hàng</div>
                </NavLink>
            </div>
            <div className="col" style={{ gap: '1.2rem' }}>
                <div className="heading-6" style={{ padding: '0.8rem 0 1.6rem 0', borderBottom: 'var(--border-grey1)' }}>Đơn hàng</div>
                <div className="col" style={{ alignItems: 'stretch' }}>
                    <div className="row" style={{ padding: '1rem 0', gap: '0.8rem', justifyContent: 'space-between' }}>
                        <Text className="label-1" style={{ flex: 1 }} maxLine={2}>Tổng giá sản phẩm</Text>
                        <Text className="button-text-3" >{resultList.length ? Ultis.money(resultList.map(e => e.price).reduce((a, b) => a + b)) : '0'}đ</Text>
                    </div>
                    <div className="row" style={{ padding: '1rem 0', gap: '0.8rem', justifyContent: 'space-between' }}>
                        <Text className="label-1" style={{ flex: 1 }} maxLine={2}>VAT</Text>
                        <Text className="button-text-3" >0đ</Text>
                    </div>
                    <div className="row" style={{ padding: '1rem 0', gap: '0.8rem', justifyContent: 'space-between' }}>
                        <Text className="label-1" style={{ flex: 1 }} maxLine={2}>Khuyến mãi</Text>
                        <Text className="button-text-3" >?</Text>
                    </div>
                    <div className="row" style={{ padding: '1rem 0', gap: '0.8rem', justifyContent: 'space-between' }}>
                        <Text className="label-1" style={{ flex: 1 }} maxLine={2}>Phí ship (cố định)</Text>
                        <Text className="button-text-3" >?</Text>
                    </div>
                </div>
                <div className="row" style={{ padding: '1.6rem 0 0.8rem 0', borderTop: 'var(--border-grey1)', gap: '0.8rem', justifyContent: 'space-between' }}>
                    <Text className="heading-6" style={{ flex: 1 }} maxLine={2}>Tổng cộng</Text>
                    <Text className="heading-6" >{resultList.length ? Ultis.money(resultList.map(e => e.price).reduce((a, b) => a + b)) : '0'}đ</Text>
                </div>
            </div>
        </div>
    }

    useEffect(() => {
        if (state.products) setProductList(state.products)
    }, [])

    return <div className="row" style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', minHeight: '98rem' }}>
        <div className="col col20-xxl col20-xl col24" style={{ padding: '3.6rem', gap: '2.4rem', height: '100%', '--gutter': '0px' }}>
            <div className="col" style={{ gap: '3.2rem', flex: 1, height: '100%' }}>
                <div className="heading-4">Giỏ hàng</div>
                <div style={{ flex: 1, height: '100%', width: '100%', overflow: 'auto' }}>
                    <Table>
                        <TbHeader>
                            <TbCell fixed style={{ minWidth: '4.4rem' }} align={CellAlignItems.center}><Checkbox size='2rem' value={productList.length && productList.every(e => e.checked)} onChange={(v) => {
                                setProductList(productList.map(e => {
                                    e.checked = v
                                    return e
                                }))
                            }} /></TbCell>
                            <TbCell style={{ minWidth: '50.4rem', }} >Thông tin sản phẩm</TbCell>
                            <TbCell style={{ minWidth: '16.4rem', }} >Đơn vị tính</TbCell>
                            <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >Đơn giá</TbCell>
                            <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >VAT</TbCell>
                            <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >Thành tiền</TbCell>
                            <TbCell fixed style={{ minWidth: '16.4rem', }} align={CellAlignItems.center} >Hành động</TbCell>
                        </TbHeader>
                        <TbBody>
                            {
                                productList.map((item, index) => <TbRow key={index}>
                                    <TbCell fixed style={{ minWidth: '4.4rem' }} align={CellAlignItems.center}><Checkbox size='2rem' value={item.checked} onChange={(v) => {
                                        setProductList(productList.map(e => {
                                            if (e.id === item.id) e.checked = v
                                            return e
                                        }))
                                    }} /></TbCell>
                                    <TbCell style={{ minWidth: '50.4rem', }} >
                                        <div className="row" style={{ width: '100%', gap: '1.6rem', padding: '2.4rem 1.6rem', alignItems: 'start' }}>
                                            {item.thumbnailId && <img src={ConfigAPI.imgUrl + item.thumbnailId} alt="" style={{ width: '11.8rem', borderRadius: '0.4rem' }} />}
                                            <div className="col" style={{ padding: '1.2rem 0', flex: 1 }}>
                                                <Text maxLine={2} className="heading-7" style={{ width: '100%' }}>{item.name}</Text>
                                                <Text maxLine={1} className="subtitle-3" style={{ width: '100%' }}>By {state?.from?.name ?? '-'}</Text>
                                            </div>
                                        </div>
                                    </TbCell>
                                    <TbCell style={{ minWidth: '16.4rem', }} >{item.unit}</TbCell>
                                    <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >{Ultis.money(item.price)}đ</TbCell>
                                    <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >0đ</TbCell>
                                    <TbCell style={{ minWidth: '16.4rem', }} align={CellAlignItems.end} >{Ultis.money(item.price)}đ</TbCell>
                                    <TbCell fixed style={{ minWidth: '16.4rem', }} align={CellAlignItems.center} >
                                        <button className="row icon-button16">
                                            <FilledTrashCan />
                                        </button>
                                    </TbCell>
                                </TbRow>
                                )
                            }
                        </TbBody>
                    </Table>
                </div>
            </div>
            <div className="row" style={{ width: '100%', gap: '2.4rem', justifyContent: 'space-between', alignItems: 'start' }}>
                <div className="row" style={{ gap: '1.2rem' }}>
                    <TextField
                        style={{ width: '31.2rem' }}
                        placeholder="Nhập mã khuyến mãi"
                    />
                    <button className="row button-infor">
                        <div className="button-text-3">Sử dụng mã</div>
                    </button>
                </div>
                {getResult()}
            </div>
        </div>
    </div>
}