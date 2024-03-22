import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function MothBusiness() {
    const list = [
        {
            title: 'Doanh thu',
            number: '1.284.035.024',
            percent: 15,
        },
        {
            title: 'Lợi nhuận',
            number: '880.055.025',
            percent: 15,
        },
        {
            title: 'Học viên mới',
            number: 312,
            percent: -5,
        },
        {
            title: 'Tổng số học viên',
            number: 969,
            percent: 30
        },
    ]

    return <div className='block-view col'>
        <div className='block-title heading-6'>Kinh doanh tháng này</div>
        <div className='row card-business-infor'>
            <div className='row list-business-infor' >
                {list.map((e, i) => <div key={`new-st-card-${i}`} className='business-infor col6 col12-lg col12-md col12-sm col' style={{ '--gutter': '0px' }}>
                    <div className='col' style={{ rowGap: 4 }}>
                        <div className='highlight-5'>{e.number}</div>
                        <div className='subtitle-4'>{e.title}</div>
                    </div>
                    <div className='row' style={{ columnGap: 8 }}>
                        <div className='button-text-5' style={{ color: e.percent < 0 ? '#E14337' : '#39AC6D' }}><FontAwesomeIcon icon={e.percent < 0 ? faArrowDown : faArrowUp} /> {Math.abs(e.percent)}%</div>
                        <div className='button-text-5'>so với tháng trước</div>
                    </div>
                </div>)}
            </div>
            <div className='block-btn button-text-3'>Xem báo cáo</div>
        </div>
    </div>
}