import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './mentor.css'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CellAlignItems, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField } from '../../../../component/export-component'
import { FilledSetupPreferences, FilledTrashCan } from '../../../../assets/const/icon'
import { useState } from 'react'
import { MentorController } from './controller'

export default function SchoolMentor() {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 })
    const [data, setData] = useState()

    const getData = () => {
        // MentorController.getAllAuth
    }

    return <div className='col' style={{ width: '100%', height: '100%', flex: 1, gap: '2rem', padding: '2.4rem 3.2rem' }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="heading-4">Danh sách bài thi</div>
            <button type="button" className="button-primary row" onClick={() => { }} style={{ backgroundColor: 'var(--primary-color)' }}>
                <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
            </button>
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
                    <TbCell fixed={true} style={{ minWidth: 360 }}>Tiêu đề buổi mentor</TbCell>
                    <TbCell style={{ minWidth: 150, }} >Khóa mentor</TbCell>
                    <TbCell style={{ minWidth: 80, }} align={CellAlignItems.center}>Số buổi</TbCell>
                    <TbCell style={{ minWidth: 180, }} >Ngày bắt đầu</TbCell>
                    <TbCell style={{ minWidth: 240, }} >Thời gian hẹn</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 80, }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        Array.from({ length: 10 }).map((_, index) => <TbRow key={index}>
                            <TbCell fixed={true} style={{ minWidth: 360, }} >
                                <div className='row' style={{ gap: '1.2rem', padding: '0.8rem' }}>
                                    <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }}></div>
                                    <div className='col' style={{ gap: 4 }}>
                                        <Text maxLine={1}>Homelander</Text>
                                        <Text maxLine={1}>Namdt10</Text>
                                    </div>
                                </div>
                            </TbCell>
                            <TbCell style={{ minWidth: 150, }} ><Text style={{ width: '100%' }}>The Complete 2023 Web Development Bootcamp</Text></TbCell>
                            <TbCell style={{ minWidth: 80, }} align={CellAlignItems.center}><Text>5</Text></TbCell>
                            <TbCell style={{ minWidth: 180, }} >18/10/2023</TbCell>
                            <TbCell style={{ minWidth: 80, }} >19:00 - 20:00 Thứ 3,6 hàng tuần</TbCell>
                            <TbCell fixed={true} style={{ minWidth: 240, }} align={CellAlignItems.center}>
                                <button><FilledTrashCan /></button>
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