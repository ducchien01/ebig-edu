import demoImage from '../../../../../assets/demo-image5.png'
import avatarDemo from '../../../../../assets/demo-avatar2.png'
import { PostCard } from "../../../../../project-component/card"
import { Text } from '../../../../../component/export-component'
import { OutlineHeart, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from '../../../../../assets/const/icon'
import { useEffect, useState } from 'react'
import { CourseController } from '../../course/controller'
import { Ultis } from '../../../../../Utils'
import { CustomerController } from '../../../customer/controller'
import { RatingController } from '../../rating/controller'
import ConfigAPI from '../../../../../config/configApi'

export default function ListCommonCourse() {
    const [data, setData] = useState([])
    const [listCustomer, setListCustomer] = useState([])

    useEffect(() => {
        CourseController.getListSimple({ page: 1, take: 4 }).then(async (res) => {
            if (res) {
                const customerIds = res.data.map(e => e.customerId)
                if (customerIds) CustomerController.getByIds(customerIds).then(cusRes => {
                    if (cusRes) setListCustomer(cusRes)
                })
                const ratingRes = await RatingController.getByLinkIds(res.data.map(e => e.id))
                setData(res.data.map(e => {
                    const ratingData = ratingRes.find(rate => rate.linkId === e.id)
                    return {
                        ...e,
                        totalStar: ratingData?.totalStart,
                        totalComment: ratingData?.totalComment,
                    }
                }))
            }   
        })
    }, [])

    return <div className="row" style={{ gap: '4rem', alignItems: 'stretch' }}>
        {data.map((item, i) => {
            const customer = listCustomer.find(e => e.id === item.customerId)
            return <PostCard
                key={'discount-course-' + i}
                to={'course/' + item.id}
                className={`col col6 ${i < 3 ? i < 2 ? 'col8-sm col12-min' : 'col8-sm col0-min' : 'col0-sm col0-min'}`}
                style={{ '--gutter': '4rem' }}
                imgUrl={ConfigAPI.imgUrl + item.thumbnailId}
                imgStyle={{ height: '18.4rem' }}
                heading={<div className="row" style={{ gap: '0.8rem', paddingBottom: '1.6rem' }}>
                    <img src={customer?.avatarUrl} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className='label-4' maxLine={1} style={{ flex: 1, width: '100%' }}>{customer?.name}</Text>
                </div>}
                title={item.name}
                content={item.description}
                actions={<div className='col' style={{ gap: '2.4rem', flex: 1, justifyContent: 'end', height: '100%' }}>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <OutlineUserProfile />
                        <Text className='button-text-3'>1k2</Text>
                        <Text className='button-text-3'>-</Text>
                        <OutlineStar />
                        <Text className='button-text-3'>{`${item.totalStar && item.totalComment ? `${(item.totalStar / item.totalComment).toFixed(1)} (${item.totalComment})` : '0 (0)'}`}</Text>
                    </div>
                    <div className='row'>
                        <Text className='heading-7' style={{ flex: 1, width: '96%' }}>{item.price ? Ultis.money(item.price) : ''}</Text>
                        <button type='button' className='row icon-button32'><OutlineHeart width='2rem' height='2rem' /></button>
                        <button type='button' className='row icon-button32'><OutlineShoppingCart width='2rem' height='2rem' /></button>
                    </div>
                </div>}
            />
        })}
    </div >
}