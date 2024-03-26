import demoImage from '../../../../../assets/demo-image5.png'
import avatarDemo from '../../../../../assets/demo-avatar2.png'
import { PostCard } from "../../../../../project-component/card"
import { Text } from '../../../../../component/export-component'
import { OutlineHeart, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from '../../../../../assets/const/icon'
import { useEffect, useState } from 'react'
import { CourseController } from '../../course/controller'

export default function ListCommonCourse() {
    const [data, setData] = useState([])

    useEffect(() => {
        CourseController.getListSimple({ page: 1, take: 4 }).then(res => {
            if (res) setData(res)
        })
    }, [])

    return <div className="row" style={{ gap: '4rem' }}>
        {data.map((item, i) => {
            return <PostCard
                key={'discount-course-' + i}
                to={'/social/education/course/' + item.id}
                className='col6 col'
                style={{ '--gutter': '4rem' }}
                imgUrl={demoImage}
                imgStyle={{ height: '18.4rem' }}
                heading={<div className="row" style={{ gap: '0.8rem', paddingBottom: '1.6rem' }}>
                    <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className='label-4' maxLine={1} style={{ flex: 1, width: '100%' }}>Phan Minh Anh</Text>
                </div>}
                title={item.name}
                content={'Create a CD cover by photographing day-to-day objects'}
                actions={<div className='col' style={{ gap: '2.4rem' }}>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <OutlineUserProfile />
                        <Text className='button-text-3'>1k2</Text>
                        <Text className='button-text-3'>-</Text>
                        <OutlineStar />
                        <Text className='button-text-3'>4.7 (1k1)</Text>
                    </div>
                    <div className='row'>
                        <Text className='heading-7' style={{ flex: 1, width: '96%' }}>235,000 - 2,500,000</Text>
                        <button type='button' className='row icon-button32'><OutlineHeart width='2rem' height='2rem' /></button>
                        <button type='button' className='row icon-button32'><OutlineShoppingCart width='2rem' height='2rem' /></button>
                    </div>
                </div>}
            />
        })}
    </div >
}