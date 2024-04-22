import { PostCard } from "../../../../../project-component/card";
import thumbnailDemo from '../../../../../assets/demo-image4.png';
import avatarDemo from '../../../../../assets/demo-avatar2.png';
import { Text } from "../../../../../component/export-component";
import { OutlineStar, OutlineUserProfile } from "../../../../../assets/const/icon";

export default function ListCourse() {
    return <div className="row" style={{ gap: '4rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {Array.from({ length: 6 }).map((item, i) => {
            return <PostCard
                key={'course-' + i}
                imgUrl={thumbnailDemo}
                className={`col col8 ${i < 4 ? 'col12-sm col12-min' : 'col-sm col0-min'}`}
                style={{ gap: '0.8rem', '--gutter': '4rem' }}
                imgStyle={{ with: '100%', height: '19.8rem' }}
                heading={<div className="row" style={{ padding: '0.8rem 0', gap: '0.8rem' }}>
                    <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className="label-4">Phan Minh Anh</Text>
                    <Text className="label-4">.</Text>
                    <div className="row tag-infor">Course</div>
                </div>}
                title={'Thiết kế UI/UX dành cho người mới bắt đầu'}
                content={'Create a CD cover by photographing day-to-day objects'}
                actions={<div className="row" style={{ gap: '0.8rem' }}>
                    <div className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                        <OutlineUserProfile />
                        <div className="button-text-3">1k2</div>
                    </div>
                    <div className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                        <OutlineStar />
                        <div className="button-text-3">4.7 (1k1)</div>
                    </div>
                </div>}
            />;
        })}
    </div>
}