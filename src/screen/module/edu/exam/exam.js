import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CellAlignItems, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField } from "../../../../component/export-component";
import { FilledSetupPreferences } from "../../../../assets/const/icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function ExamManagment() {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [selected, setSelected] = useState()

    return <div className='col' style={{ width: '100%', height: '100%', flex: 1, gap: '2rem', padding: '2.4rem 3.2rem' }}>
        <div className='col' style={{ padding: '1.6rem 0', gap: '0.4rem' }}>
            <div className='heading-5'>Danh sách đề thi</div>
        </div>
        <div className="row filter-header-container">
            <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />} />
            <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
            <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                <FilledSetupPreferences />
                <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
            </button>
        </div>
        <div className="col" style={{ flex: 1, height: '100%', overflow: 'auto' }}>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: 360 }}>Tên</TbCell>
                    <TbCell style={{ minWidth: 150, }} >Mã đề</TbCell>
                    <TbCell style={{ minWidth: 80, }}>Trình độ</TbCell>
                    <TbCell style={{ minWidth: 120, }} >Chủ đề</TbCell>
                    <TbCell style={{ minWidth: 120, }} align={CellAlignItems.center}>Thời gian thi (Phút)</TbCell>
                    <TbCell style={{ minWidth: 160, }} >Lệ phí</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 180, }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        Array.from({ length: 10 }).map((_, index) => <TbRow key={index} className={`${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}>
                            <TbCell fixed={true} style={{ minWidth: 360, }} >
                                <NavLink to={`/`} style={{color: 'var(--primary-color)'}}>Thi lái tàu</NavLink>
                            </TbCell>
                            <TbCell style={{ minWidth: 150, }} ><Text style={{ width: '100%' }}>FJYFJUF</Text></TbCell>
                            <TbCell style={{ minWidth: 80, }} >Begginer</TbCell>
                            <TbCell style={{ minWidth: 120, }}>Đường thủy</TbCell>
                            <TbCell style={{ minWidth: 120, }} align={CellAlignItems.center}>120</TbCell>
                            <TbCell style={{ minWidth: 160, }} >1,290,000vnđ</TbCell>
                            <TbCell fixed={true} style={{ minWidth: 180, }}>
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