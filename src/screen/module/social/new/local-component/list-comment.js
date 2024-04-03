import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RatingController } from "../../../edu/rating/controller"
import { Pagination, Text, TextArea } from "../../../../../component/export-component"
import { CustomerController } from "../../../customer/controller"

export default function ListComment({rating = false}) {
    const { id } = useParams()
    const user = CustomerController.userInfor()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [list, setList] = useState([])

    const getListCommnet = async (page, size) => {
        const res = await RatingController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ key: 'linkId', value: id }] })
        if (res) setList(res)
    }

    useEffect(() => {
        getListCommnet()
    }, [])

    return <div className="col" style={{ gap: '2.4rem' }}>
        <div className="col" style={{ gap: '1.2rem' }}>
            <div className=""></div>
            <div className="col comment-box">
                <TextArea
                    style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                    placeholder="Bạn thấy khóa học này thế nào?"
                />
                <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem' }}>
                    <button type="button" className="row button-primary" style={{ padding: '0.6rem 1.2rem' }}>
                        <div className="button-text-3">Phản hồi</div>
                    </button>
                </div>
            </div>
        </div>
        {list.filter(e => !e.parentId).map(item => {
            return <div></div>
        })}
        <Pagination
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
}