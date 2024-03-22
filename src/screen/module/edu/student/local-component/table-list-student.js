import { faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilledFileDownload, FilledSetupPreferences } from "../../../../../assets/const/icon";
import { CellAlignItems, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField } from "../../../../../component/export-component";
import { useState } from "react";
import demoAvatar from '../../../../../assets/demo-avatar.png'

export default function ListStudent() {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [selected, setSelected] = useState()

    return <div className='col'>
        <div className='col' style={{ padding: '1.6rem 0', gap: '0.4rem' }}>
            <div className='heading-7'>Danh sách học viên</div>
            <div className='subtitle-4'>Danh sách học viên từ tất cả các khóa học và lớp học của bạn</div>
        </div>
        <div className="row filter-header-container">
            <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.4rem', color: '#00204D99' }} />} />
            <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
            <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                <FilledSetupPreferences />
                <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
            </button>
        </div>
        <div>
            <Table>
                <TbHeader>
                    <TbCell fixed={true} style={{ minWidth: 360 }}>Học viên</TbCell>
                    <TbCell style={{ minWidth: 150, }} >Đăng nhập lần cuối</TbCell>
                    <TbCell style={{ minWidth: 80, }}>Tham gia</TbCell>
                    <TbCell style={{ minWidth: 180, }} >Số khóa học</TbCell>
                    <TbCell style={{ minWidth: 240, }} >Trạng thái</TbCell>
                    <TbCell style={{ minWidth: 240, }} >Tổng học phí</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 240, }} align={CellAlignItems.center} >Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        Array.from({ length: 10 }).map((_, index) => <TbRow key={index} className={`${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}>
                            <TbCell fixed={true} style={{ minWidth: 360, }} >
                                <div className='row' style={{ gap: '1.2rem', padding: '0.8rem' }}>
                                    <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', backgroundImage: `url(${demoAvatar})` }}></div>
                                    <div className='col' style={{ gap: 4 }}>
                                        <Text maxLine={1}>Homelander</Text>
                                        <Text maxLine={1}>Namdt10</Text>
                                    </div>
                                </div>
                            </TbCell>
                            <TbCell style={{ minWidth: 150, }} ><Text style={{ width: '100%' }}>22 ngày trước</Text></TbCell>
                            <TbCell style={{ minWidth: 80, }} >4 năm trước</TbCell>
                            <TbCell style={{ minWidth: 180, }} align={CellAlignItems.center}>2</TbCell>
                            <TbCell style={{ minWidth: 240, }} >
                                <div className="tag-infor row" style={{ width: 'fit-content' }}>
                                    <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
                                    <div className="button-text-3">Đang học</div>
                                </div>
                            </TbCell>
                            <TbCell style={{ minWidth: 240, }} >9.000.000</TbCell>
                            <TbCell fixed={true} style={{ minWidth: 240, }}>
                                <div className="row" style={{ gap: '0.8rem' }}>
                                    <button type="button" className="row" style={{ gap: '0.8rem' }} onClick={() => { }}>
                                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '1.4rem', color: '#00204D66' }} />
                                    </button>
                                    <button type="button" className="row" style={{ gap: '0.8rem' }} onClick={() => { }}>
                                        <FilledFileDownload />
                                    </button>
                                </div>
                            </TbCell>
                        </TbRow>
                        )
                    }
                </TbBody>
            </Table>
        </div>
        <div className="popup-footer row">
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