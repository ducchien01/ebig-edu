import { Text } from "../../../../../component/export-component"
import { InforCard } from "../../../../../project-component/card"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import { NavLink } from "react-router-dom"

export default function ListExpertByTopic({ topic }) {
    return <div className="col" style={{ gap: '1.6rem' }}>
        <Text className="heading-7" maxLine={2} style={{ width: '100%' }}>Các chuyên gia trong {topic ? 'topic bạn đang đọc' : 'các chủ đề bạn quan tâm'}</Text>
        <div className="col" style={{ gap: '2.4rem' }}>
            {Array.from({ length: 3 }).map((item, i) => {
                return <InforCard
                    key={'expert-' + i}
                    // to={`/${item.id}`}
                    className="row"
                    avatar={avatarDemo}
                    style={{ padding: 0, border: 'none' }}
                    avatarSize="4rem"
                    title={<Text className="heading-8" maxLine={1}>Zulie Rane</Text>}
                    subTitle={'I am a History Educator and a Lifelong Learner with a'}
                    actions={<button type="button" className="row button-primary">
                        <div className="button-text-3">Theo dõi</div>
                    </button>}
                />
            })}
        </div>
        <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem thêm</NavLink>
    </div>
}