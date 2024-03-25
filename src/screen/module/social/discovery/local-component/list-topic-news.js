import topicThumnailDemo from '../../../../../assets/demo-image3.png'
import avatarDemo from '../../../../../assets/demo-avatar1.png'
import { OutlineBookMarkAdd } from "../../../../../assets/const/icon"
import { PostCard } from '../../../../../project-component/card'
import { Text } from '../../../../../component/export-component'

export default function ListTopicNews() {
    return <div className='row' style={{ gap: '3.2rem 4rem', width: '100%', flexWrap: 'wrap' }}>
    {Array.from({ length: 4 }).map((item, i) => {
        return <PostCard
            key={'topic-' + i}
            className="row col12"
            style={{ backgroundColor: 'var(--background)', border: 'var(--border-grey1)', borderRadius: '0.8rem', '--gutter': '4rem', paddingLeft: '2.4rem', alignItems: 'stretch' }}
            imgUrl={topicThumnailDemo}
            imgStyle={{ minHeight: '100%', width: '46%', borderRadius: 0 }}
            heading={<div className="row" style={{ gap: '0.8rem', padding: '1.6rem 0 0.8rem 0' }}>
                <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                <Text className="label-4">Phan Minh Anh</Text>
            </div>}
            title={<Text className="heading-7" style={{ width: '100%' }} maxLine={2}>UI/UX cho người mới bắt đầu</Text>}
            actions={<div className="row" style={{ gap: '0.8rem', paddingBottom: '2.4rem' }}>
                <Text className="body-2" style={{ flex: 1, width: '100%' }}>30 bài viết</Text>
                <button type="button"><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
            </div>}
        />
    })}
</div>
}