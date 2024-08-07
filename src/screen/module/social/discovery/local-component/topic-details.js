import { useEffect, useState } from "react"
import { Text } from "wini-web-components"
import topicThumnailDemo from '../../../../../assets/demo-image3.png'
import { PostCard } from "../../../../../project-component/card"
import { NavLink, useParams } from "react-router-dom"
import { TopicController } from "../../../topic/controller"
import ListTrendingNews from "./list-trending-news"
import ListTopicNews from "./list-topic-news"
import ListTopicExpert from "./list-topic-expert"
import ListCourse from "./list-course"

export default function DiscoverTopicDetails() {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        TopicController.getById(id).then(res => {
            if (res) setData(res)
        })
    }, [])

    return data ? <div className="col">
        <div className="col" style={{ padding: '5.6rem 0', alignItems: 'center', gap: '1.6rem' }}>
            <Text maxLine={1} className="heading-4">{data.name}</Text>
            <div className="row" style={{ gap: '0.8rem' }}>
                <Text className="body-2">1.3M Người đang theo dõi</Text>
                <Text className="body-1">.</Text>
                <Text className="body-2">200 Bài viết</Text>
            </div>
            <button type="button" className="row button-primary">
                <div className="button-text-3">Theo dõi Topic</div>
            </button>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem' }}>
                <Text className='heading-5'>Khám phá sâu hơn về {data.name}</Text>
                <div className='row' style={{ gap: '4rem', width: '100%' }}>
                    {Array.from({ length: 5 }).map((item, i) => {
                        return <PostCard
                            key={'topic-' + i}
                            style={{ flex: 1, gap: '2rem' }}
                            imgUrl={topicThumnailDemo}
                            imgStyle={{ height: '20rem' }}
                            title={'Photography & Video'}
                        />
                    })}
                </div>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', alignItems: 'center' }}>
                <Text className='heading-5' style={{ width: '100%' }}>Bài viết xu hướng</Text>
                <ListTrendingNews />
                <NavLink type='button' className='row button-infor border' style={{ backgroundColor: 'transparent' }}>
                    <div className='button-text-3'>Xem thêm</div>
                </NavLink>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', alignItems: 'center' }}>
                <Text className='heading-5' style={{ width: '100%' }}>Danh mục bài viết nhiều người đọc</Text>
                <ListTopicNews />
                <NavLink type='button' className='row button-infor border' style={{ backgroundColor: 'transparent' }}>
                    <div className='button-text-3'>Xem thêm</div>
                </NavLink>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', alignItems: 'center' }}>
                <Text className='heading-5' style={{ width: '100%' }}>Top các chuyên gia</Text>
                <ListTopicExpert />
                <NavLink type='button' className='row button-infor border' style={{ backgroundColor: 'transparent' }}>
                    <div className='button-text-3'>Xem thêm</div>
                </NavLink>
            </div>
        </div>
        <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 1.2rem' }}>
            <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem', padding: '0 2rem' }}>
                <div className='row' style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Text className='heading-5'>Học tập cùng chuyên gia</Text>
                    <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <ListCourse />
            </div>
        </div>
    </div> : <></>
}