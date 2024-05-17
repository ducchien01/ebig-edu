import demoImage from '../../../../../assets/demo-image5.png'
import avatarDemo from '../../../../../assets/demo-avatar2.png'
import { PostCard } from "../../../../../project-component/card"
import { Text } from '../../../../../component/export-component'
import { OutlineHeart, OutlineLightning, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from '../../../../../assets/const/icon'
import { useEffect, useState } from 'react'
import { ExamController } from '../../exam/controller'
import { CustomerController } from '../../../customer/controller'

export default function ListCommonExam() {
    const [data, setData] = useState([])
    const [listCustomer, setListCustomer] = useState([])

    useEffect(() => {
        ExamController.getListSimple({ page: 1, take: 4, filter: [{ field: 'status', operator: '=', value: 1 }] }).then(res => {
            const customerIds = res.data.map(e => e.customerId)
            if (customerIds) CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setListCustomer(cusRes)
            })
            if (res) setData(res.data)
        })
    }, [])

    return <div className="row" style={{ gap: '4rem', alignItems: 'stretch' }}>
        {data.map((item, i) => {
            const customer = listCustomer.find(e => e.id === item.customerId)
            return <PostCard
                to={`exam/${item.id}`}
                key={'discount-course-' + i}
                className={`col col6 ${i < 3 ? i < 2 ? 'col8-sm col12-min' : 'col8-sm col0-min' : 'col0-sm col0-min'}`}
                style={{ '--gutter': '4rem' }}
                imgUrl={demoImage}
                imgStyle={{ height: '18.4rem' }}
                heading={<div className="row" style={{ gap: '0.8rem', paddingBottom: '1.6rem' }}>
                    <img src={customer?.avatarUrl} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className='label-4' maxLine={1} style={{ flex: 1, width: '100%' }}>{customer?.name}</Text>
                </div>}
                title={item.name}
                // content={'Create a CD cover by photographing day-to-day objects'}
                actions={<div className='col' style={{ gap: '2.4rem' }}>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <OutlineUserProfile />
                        <Text className='button-text-3'>1k2</Text>
                        <Text className='button-text-3'>-</Text>
                        <OutlineLightning />
                        <Text className='button-text-3'>{item.time}phút</Text>
                    </div>
                </div>}
            />
        })}
    </div >
}