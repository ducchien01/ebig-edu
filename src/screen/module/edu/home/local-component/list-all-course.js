import { useEffect, useState } from "react";
import { InfiniteScroll, Text } from "../../../../../component/export-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { CourseController } from "../../course/controller";
import { PostCard } from "../../../../../project-component/card";
import { getFilesByIds } from "../../../../base-controller";
import { CustomerController } from "../../../customer/controller";
import { OutlineHeart, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from "../../../../../assets/const/icon";
import { Ultis } from "../../../../../Utils";
import ConfigAPI from "../../../../../config/configApi";

export default function ListAllCourse() {
    const [data, setData] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [total, setTotal] = useState(0)

    const getData = async () => {
        const res = await CourseController.getListSimple({ page: Math.floor((data.length / 20)) + 1, take: 20 })
        if (res) {
            if (total !== res.totalCount) setTotal(res.totalCount)
            let customerIds = res.data.map(e => e.customerId).filter(id => customerList.every(item => item.id !== id))
            if (customerIds.length) {
                CustomerController.getByIds(customerIds).then(cusRes => {
                    if (cusRes) setCustomerList(cusRes)
                })
            }
            setData([...data, ...res.data])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className="col" style={{ gap: '2.4rem', flex: 1 }}>
        <Text className="heading-4">Khám phá tất cả khoá học</Text>
        <div className="row" style={{ gap: '3.2rem', padding: '1.2rem 0', width: '100%', borderTop: 'var(--border-grey1)', borderBottom: 'var(--border-grey1)' }}>
            <div className="row" style={{ gap: '1.2rem', flex: 1 }}></div>
            <button className="row button-grey" style={{ borderRadius: 0, borderLeft: 'var(--border-grey1)', backgroundColor: 'transparent', padding: '1.2rem 3.2rem' }}>
                <Text className="button-text-3">Đặt lại</Text>
                <FontAwesomeIcon icon={faRotate} style={{ fontSize: '1.4rem' }} />
            </button>
        </div>
        <InfiniteScroll handleScroll={total !== data.length ? getData : undefined} className="row" style={{ flexWrap: 'wrap', overflow: 'hidden auto', flex: 1, height: '100%', width: '100%', gap: '3.2rem 4rem', alignItems: 'stretch' }}>
            {data.map((item, i) => {
                const customer = customerList.find(e => e.id === item.customerId)
                return <PostCard
                    key={item.id}
                    to={'/social/education/course/' + item.id}
                    style={{ '--gutter': '4rem' }}
                    className="col col6"
                    imgUrl={ConfigAPI.imgUrl + item.thumbnailId}
                    heading={<div className="row" style={{ gap: '0.8rem' }}>
                        <img src={customer?.avatarUrl} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                        <Text className="label-4">{customer?.name ?? '-'}</Text>
                    </div>}
                    title={item.name}
                    content={item.description}
                    actions={<div className='col' style={{ gap: '2.4rem', flex: 1, justifyContent: 'end', height: '100%' }}>
                        <div className='row' style={{ gap: '0.8rem' }}>
                            <OutlineUserProfile />
                            <Text className='button-text-3'>1k2</Text>
                            <Text className='button-text-3'>-</Text>
                            <OutlineStar />
                            <Text className='button-text-3'>4.7 (1k1)</Text>
                        </div>
                        <div className='row'>
                            <Text className='heading-7' style={{ flex: 1, width: '96%' }}>{item.price ? Ultis.money(item.price) : ''}</Text>
                            <button type='button' className='row icon-button32'><OutlineHeart width='2rem' height='2rem' /></button>
                            <button type='button' className='row icon-button32'><OutlineShoppingCart width='2rem' height='2rem' /></button>
                        </div>
                    </div>}
                />
            })}
        </InfiniteScroll>
    </div>
}