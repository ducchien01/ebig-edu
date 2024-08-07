import { Text } from "wini-web-components"
import avatarDemo from '../../../../../assets/demo-avatar.png'
import { NavLink } from "react-router-dom"

export default function RightSidebar() {
    return <div className="right-sidebar col">
        <div className="col" style={{ gap: '1.6rem' }}>
            <Text className="heading-7" >Top bài viết trong tuần</Text>
            <div className="col" style={{ gap: '2.4rem' }}>
                {Array.from({ length: 3 }).map((item, i) => {
                    return <div key={'top-' + i} className="col" style={{ gap: '0.4rem' }}>
                        <div className="row" style={{ gap: '0.8rem' }}>
                            <img src={avatarDemo} alt="" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%' }} />
                            <Text className="label-5">Jackie Colburn</Text>
                            <Text className="label-4">.</Text>
                            <Text className="subtitle-4">12 tháng 09</Text>
                        </div>
                        <Text className="label-3" maxLine={2} style={{ width: '100%' }}>How i got into and managed to walk away from burnout</Text>
                    </div>
                })}
            </div>
            <NavLink className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem thêm</NavLink>
        </div>
        <div className="col" style={{ width: '100%', gap: '1.6rem' }}>
            <Text className="heading-7" maxLine={2}>Các chủ đề được quan tâm nhất</Text>
            <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => {
                    return <button type="button" key={'tag-' + i} className="row button-grey"><div className="button-text-5">{e}</div></button>
                })}
            </div>
            <NavLink to='' className='button-text-3' style={{ color: 'var(--primary-color)' }}>Khám phá thêm</NavLink>
        </div>
        {/* {isLogin && <ListExpertByTopic />} */}
    </div>
}