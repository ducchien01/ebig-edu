import { NavLink } from "react-router-dom"
import { FilledBell, FilledSocialSharing } from "../../../../../assets/const/icon"

export default function ComingList() {
    const list = [
        {
            title: 'Toán cao cấp đại học',
            content: 'Buổi 15: Lý thuyết đại cương phần tổng quan',
            link: '',
            note: '',
            time: new Date().getTime(),
        },
        {
            title: 'Coach 1:1 Nguyễn Minh Nguyệt',
            content: 'Buổi 1: Giới thiệu',
            link: '',
            note: 'Chấm bài bạn Nguyệt',
            time: 1706689800000
        },
        {
            title: 'Toán cao cấp đại học',
            content: 'Buổi 16: Kiểm tra học phần',
            link: '',
            note: 'Chuẩn bị dụng cụ dạy học',
            time: 1706702400000
        },
    ]

    return <div className='block-view col'>
        <div className='block-title heading-6'>Sắp diễn ra</div>
        <div className='row list-card'>
            {
                list.sort((a, b) => {
                    const now = new Date().getTime()
                    return Math.abs(a.time - now) - Math.abs(b.time - now)
                }).map((e, i) => {
                    const eTime = new Date(e.time)
                    return <div key={`card-${i}`} className={`card-view-1 row ${i === 0 ? 'col12' : 'col6'} col24-lg col24-md col24-sm col24-min`} style={{ '--gutter': '2.4rem', columnGap: '4rem', padding: '2.8rem 2.4rem' }}>
                        <div className='row text-content' style={{ columnGap: 40 }}>
                            {i === 0 ? <div className='col' style={{ rowGap: 4 }}>
                                <div className='heading-4'>{`${eTime.getHours()}:${eTime.getMinutes()}`}</div>
                                <div className='subtitle-3'>{`${eTime.getDate()} tháng ${eTime.getMonth() + 1}`}</div>
                            </div> : null}
                            <div className='col text-content'>
                                <div className='heading-7'>{e.title}</div>
                                <div className='subtitle-4'>{e.content}</div>
                                {i === 0 ? null : <div className='body-3' style={{ marginTop: 4 }}>{e.note}</div>}
                            </div>
                        </div>
                        {i === 0 ? <NavLink className='button-primary row'>
                            <FilledSocialSharing color='white' />
                            <div className='button-text-3'>Vào dạy</div>
                        </NavLink> : <div className='noti row'>
                            <FilledBell color='#366AE2' />
                        </div>}
                    </div>;
                })
            }

        </div>
    </div>
}