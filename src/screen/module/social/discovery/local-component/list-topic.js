import { Text } from "../../../../../component/export-component"
import topicThumnailDemo from '../../../../../assets/demo-image3.png'
import { PostCard } from "../../../../../project-component/card"
import { useEffect, useState } from "react"
import { TopicController } from "../../../topic/controller"

export default function ListTopic() {
    const [data, setData] = useState([])

    useEffect(() => {
        TopicController.getListSimple({ page: 1, take: 12 }).then(res => {
           if(res) setData(res)
        })
    }, [])

    return <div className='row' style={{ width: '100%', justifyContent: 'center', padding: '6rem 2rem' }}>
        <div className='col col16-xxl col18 col20-md col24-sm' style={{ '--gutter': '0px', gap: '3.2rem' }}>
            <Text className='heading-5'>Topic được quan tâm nhiều</Text>
            <div className='row' style={{ flexWrap: 'wrap', gap: '3.2rem 4rem', width: '100%', alignItems: 'stretch' }}>
                {data.map((item, i) => {
                    return <PostCard
                        key={'topic-' + i}
                        className='col col4'
                        to={`/social/discovery/topic/${item.id}`}
                        style={{ '--gutter': '4rem', gap: '2rem' }}
                        imgUrl={topicThumnailDemo}
                        imgStyle={{ height: '20rem' }}
                        title={item.name}
                    />
                })}
            </div>
        </div>
    </div>
}