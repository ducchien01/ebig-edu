import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './curriculum.css'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CellAlignItems, Pagination, Table, TbBody, TbCell, TbHeader, TbRow, Text, TextField } from '../../../../component/export-component'
import { FilledSetupPreferences, FilledTrashCan } from '../../../../assets/const/icon'
import { useEffect, useState } from 'react'
import { LessonController } from '../lesson/controller'
import { LessonType } from '../lesson/da'
import { Ultis } from '../../../../Utils'

export default function CurriculumManagment() {
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 })
    const [data, setData] = useState()

    const getData = (page, size) => {
        LessonController.getListSimple({
            page: page ?? pageDetails.page,
            take: size ?? pageDetails.size,
            filter: [{ field: 'type', operator: '<>', value: LessonType.examTask }]
        }).then(res => {
            if (res) setData(res)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='col' style={{ width: '100%', height: '100%', flex: 1, gap: '2rem', padding: '2.4rem 3.2rem' }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="heading-4">Danh sách bài học</div>
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
                    <TbCell fixed={true} style={{ minWidth: 200 }}>Tên bài học</TbCell>
                    <TbCell style={{ minWidth: 80, }} >Loại</TbCell>
                    <TbCell style={{ minWidth: 120, }} >Ngày tạo</TbCell>
                    <TbCell fixed={true} style={{ minWidth: 80, }} align={CellAlignItems.center}>Action</TbCell>
                </TbHeader>
                <TbBody>
                    {
                        (data?.data ?? []).map((item, index) => <TbRow key={index}>
                            <TbCell fixed={true} style={{ minWidth: 200, }} >
                                <Text maxLine={2} style={{ width: '100%' }}>{item.name}</Text>
                            </TbCell>
                            <TbCell style={{ minWidth: 80, }} >{item.type === LessonType.video ? 'video' : item.type === LessonType.paragraph ? 'bài viết' : 'bài kiểm tra'}</TbCell>
                            <TbCell style={{ minWidth: 120, }} >{item.dateCreated ? Ultis.datetoString(new Date(item.dateCreated)) : '-'}</TbCell>
                            <TbCell fixed={true} style={{ minWidth: 80, }} align={CellAlignItems.center}>
                                {/* <button><FilledTrashCan /></button> */}
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
                totalItem={data?.totalCount}
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