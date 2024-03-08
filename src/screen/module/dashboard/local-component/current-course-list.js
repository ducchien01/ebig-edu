import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FilledBook } from "../../../../assets/const/icon"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import demoImg5 from '../../../../assets/demo-image5.png';
import demoImg6 from '../../../../assets/demo-image6.png';
import avatarDemo2 from '../../../../assets/demo-avatar2.png';
import { Text } from "../../../../component/export-component";

export default function CurrentCourseList() {
    const list = [
        {
            title: 'Thiết kế UI/UX dành cho người mới bắt đầu',
            next: 'Review bài tập số 2',
            img: demoImg5,
            time: '19:00 - 20:00',
            schedule: 'Thứ 3, thứ 6 hàng tuần',
            students: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        },
        {
            title: 'Thiết kế UI/UX bằng Figma',
            next: 'Review bài tập số 3',
            img: demoImg6,
            time: '19:30 - 21:00',
            schedule: 'Thứ 2, thứ 5 hàng tuần',
            students: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        },
    ]

    return <div className='block-view col'>
        <div className='block-title row'>
            <div className='heading-6'>Lớp học gần đây</div>
            <div className='row group-prev-next'>
                <div className='prev-btn row'><FontAwesomeIcon icon={faChevronLeft} /></div>
                <div className='next-btn row'><FontAwesomeIcon icon={faChevronRight} /></div>
            </div>
        </div>
        <div className='row list-card-view'>
            {list.map((e, i) => <div key={`card-img-${i}`} className='card-current-course row col12' style={{ '--gutter': '2.4rem' }}>
                <div className='prefix-img col8 col24-lg col24-md col24-sm col24-min' style={{ backgroundImage: `url(${e.img})` }}></div>
                <div className='col course-content col16 col24-lg col24-md col24-sm col24-min'>
                    <div className='col content-1'>
                        <div className='heading-7'>Xây dựng khóa học đầu tiên</div>
                        <div className='row' style={{ columnGap: 8 }}>
                            <FilledBook />
                            <div className='button-text-3'>Sắp tới:</div>
                            <div className='button-text-3' style={{ color: 'var(--primary-color)' }}>{e.next}</div>
                        </div>
                    </div>
                    <div className='row content-2'>
                        <div className='col'>
                            <div className='subtitle-4'>{e.students.length} học viên</div>
                            <div className='list-avatar'>
                                {e.students.slice(0, 4).map((st, index) => <div key={`av-${index}`} className='avatar-circle' style={{ left: `${2.4 * index}rem`, backgroundImage: `url(${st.avatar ?? avatarDemo2})` }}></div>)}
                                {e.students.length > 4 ? <div className='avatar-circle col label-5' style={{ left: `9.6rem` }}>+{e.students.length - 4}</div> : null}
                            </div>
                        </div>
                        <div className='col course-time'>
                            <Text className='heading-6' style={{ '--max-line': 1 }}>{e.time}</Text>
                            <Text className='subtitle-4' style={{ '--max-line': 1 }}>{e.schedule}</Text>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
}