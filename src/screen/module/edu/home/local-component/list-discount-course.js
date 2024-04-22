import demoImage from '../../../../../assets/demo-image5.png'
import avatarDemo from '../../../../../assets/demo-avatar2.png'
import { PostCard } from "../../../../../project-component/card"
import { Text } from '../../../../../component/export-component'
import { OutlineHeart, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from '../../../../../assets/const/icon'

export default function ListDiscountCourse() {
    return <div className="row" style={{ gap: '4rem', alignItems: 'stretch' }}>
        {Array.from({ length: 4 }).map((item, i) => {
            return <PostCard
                key={'discount-course-' + i}
                className={`col col6 ${i < 3 ? i < 2 ? 'col8-sm col12-min' : 'col8-sm col0-min' : 'col0-sm col0-min'}`}
                style={{ '--gutter': '4rem' }}
                imgUrl={demoImage}
                imgStyle={{ height: '18.4rem' }}
                heading={<div className="row" style={{ gap: '0.8rem', paddingBottom: '1.6rem' }}>
                    <img src={avatarDemo} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                    <Text className='label-4' maxLine={1} style={{ flex: 1, width: '100%' }}>Phan Minh Anh</Text>
                </div>}
                title={'Thiết kế UI/UX dành cho người mới bắt đầu'}
                content={'Create a CD cover by photographing day-to-day objects'}
                actions={<div className='col' style={{ gap: '2.4rem' }}>
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <OutlineUserProfile />
                        <Text className='button-text-3'>1k2</Text>
                        <Text className='button-text-3'>-</Text>
                        <OutlineStar />
                        <Text className='button-text-3'>4.7 (1k1)</Text>
                    </div>
                    <div className='col'>
                        <div className='row' style={{ gap: '0.8rem' }}>
                            <Text className='button-text-3' style={{ color: 'var(--warning-color)' }}>450,000 VND</Text>
                            <Text className='button-text-3' style={{ color: 'var(--warning-color)' }}>-25%</Text>
                        </div>
                        <div className='row'>
                            <Text className='heading-6' style={{ flex: 1, width: '90%' }}>338,000đ</Text>
                            <button type='button' className='row icon-button32'><OutlineHeart width='2rem' height='2rem' /></button>
                            <button type='button' className='row icon-button32'><OutlineShoppingCart width='2rem' height='2rem' /></button>
                        </div>
                    </div>
                </div>}
            />
        })}
    </div >
}