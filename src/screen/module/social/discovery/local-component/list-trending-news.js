import { OutlineBookMarkAdd, OutlineChat, OutlineThumbUp } from "../../../../../assets/const/icon"
import { Text } from "wini-web-components"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import thumnailDemo from '../../../../../assets/demo-image4.png'
import { PostCard } from "../../../../../project-component/card"

export default function ListTrendingNews() {
    return <div className='row' style={{ flexWrap: 'wrap', gap: '5.6rem 4rem', width: '100%' }}>
        {Array.from({ length: 5 }).map((item, i) => {
            return <PostCard
                key={'news-' + i}
                className={`col ${i < 2 ? 'col12' : i < 4 ? 'col8 col12-sm col12-min' : 'col8 col0-sm col0-min'}`}
                style={{ '--gutter': '4rem' }}
                imgUrl={thumnailDemo}
                imgStyle={{ height: i < 2 ? '28.6rem' : '19.2rem' }}
                heading={<div className="row" style={{ gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className="label-3">Phan Minh Anh</Text>
                    <Text className="label-4">.</Text>
                    <Text className="subtitle-3">12 tháng 09</Text>
                </div>}
                title={'Dishonest fonts, sustainable design, how to be strategic, color with gen AI'}
                content={`I couldn't stop thinking about the thought process of turning to social media, emphasis on`}
                actions={<div className="row" style={{ gap: '1.2rem', width: '100%' }}>
                    <div className="row" style={{ flex: 1, width: '100%', gap: '0.8rem' }}>
                        <div className="tag-disabled row" style={{ backgroundColor: 'transparent', padding: '0' }}>
                            <OutlineThumbUp width="1.6rem" height="1.6rem" />
                            <div className="button-text-3">1,2k</div>
                        </div>
                        <div className="label-4">.</div>
                        <div className="tag-disabled row" style={{ backgroundColor: 'transparent', padding: '0' }}>
                            <OutlineChat width="1.6rem" height="1.6rem" />
                            <div className="button-text-3">1,2k</div>
                        </div>
                    </div>
                    <button type="button" className="row icon-button32"><OutlineBookMarkAdd width="2rem" height="2rem" /></button>
                </div>}
            />
        })}
    </div >
}