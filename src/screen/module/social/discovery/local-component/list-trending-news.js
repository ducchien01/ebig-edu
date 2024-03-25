import { OutlineBookMarkAdd, OutlineChat, OutlineThumbUp } from "../../../../../assets/const/icon"
import { Text } from "../../../../../component/export-component"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import { PostCard } from "../../../../../project-component/card"

export default function ListTrendingNews() {
    return <div className='row' style={{ flexWrap: 'wrap', gap: '5.6rem 4rem', width: '100%' }}>
        {Array.from({ length: 5 }).map((item, i) => {
            return <PostCard
                key={'news-' + i}
                className={`col ${i < 2 ? 'col12' : 'col8'}`}
                style={{ '--gutter': '4rem' }}
                imgUrl={'https://s3-alpha-sig.figma.com/img/cd66/9c35/7b4ec9ec6a9a536b02a40a189dd7dcb3?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lwDPIbxnKJnTuEUkJJNf2PAnNw8MM2k1J8ceG-hkaLpCR~tujNtx9fV9idHEWqKSpbV8~dspHalqXqYo6FHFuuuSjmteB~fnxb1LN7woucAyu8eaPUk41Sv5~OgFmh5UnCEgrmtt24GUMqDYga1YiFA~vPizPwl3jF0T2YCf8gAYTF9zJOLrF5mPF1tQQYzKONBWfq4-0bU2lqB6YVLTE42LeoWcIbWj1XCOXJWI7CbsKQvwk0NDqUuktreSo7FqHYDitIT6n0DJTWyqVO25XTIowbuz66CG21vKQj7m5wXcAVoFX~a8aYMv9Hu~cPm0JhCaPSkICn-GaQt9EzyvWg__'}
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