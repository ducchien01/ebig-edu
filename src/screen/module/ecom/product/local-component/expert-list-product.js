import { useState } from "react";
import { CellAlignItems, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, } from "wini-web-components";
import { NavLink } from "react-router-dom";
import { FilledEdit } from "../../../../../assets/const/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function ListProduct() {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    return <div className="col" style={{ flex: 1, height: '100%' }}>
        <div style={{ flex: 1, height: '100%', width: '100%', overflow: 'auto' }}>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: '40rem' }}>Sản phẩm</TbCell>
                    <TbCell style={{ minWidth: '16rem', }} align={CellAlignItems.center}>Trạng thái</TbCell>
                    <TbCell style={{ minWidth: '16rem', }} align={CellAlignItems.center} >Tổng doanh thu</TbCell>
                    <TbCell fixed={true} style={{ minWidth: '24rem', }} align={CellAlignItems.center} >Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        Array.from({ length: 10 }).map((_, index) => <TbRow key={index}>
                            <TbCell fixed={true} style={{ minWidth: '40rem', }} >
                                <NavLink className='button-text-3' style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>The Complete 2023 Web Development Bootcamp</NavLink>
                            </TbCell>
                            <TbCell style={{ minWidth: '16rem', }} align={CellAlignItems.center}>
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    <div className="tag-disabled row" style={{ width: 'fit-content' }}>
                                        <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', backgroundColor: '#00204D99' }}></div>
                                        <div className="button-text-3">Bản nháp</div>
                                    </div>
                                </div>
                            </TbCell>
                            <TbCell style={{ minWidth: '16rem', }} align={CellAlignItems.center}>2.000.000</TbCell>
                            <TbCell fixed={true} style={{ minWidth: '24rem', }}>
                                <div className="row" style={{ justifyContent: 'center', gap: '0.8rem' }}>
                                    <button type="button" className="row" style={{ width: '1.6rem', height: '1.6rem', justifyContent: 'center' }}><FilledEdit /></button>
                                    <button type="button" className="row" style={{ width: '1.6rem', height: '1.6rem', justifyContent: 'center' }}><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.4rem', color: '#00204D99' }} /></button>
                                </div>
                            </TbCell>
                        </TbRow>
                        )
                    }
                </TbBody>
            </Table>
        </div>
        <div className="row">
            <Pagination
                /// Size
                currentPage={pageDetails.page}
                /// pageSize
                itemPerPage={pageDetails.size}
                // data.total
                totalItem={10}
                /// action
                onChangePage={(page, size) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ page: page, size: size });
                    }
                }}
            />
        </div>
    </div>
}