import React, { useState } from 'react';
import demoImg2 from '../../../../../assets/demo-image2.png';
import demoImg3 from '../../../../../assets/demo-image3.png';
import demoImg4 from '../../../../../assets/demo-image4.png';
import { FilledBook } from '../../../../../assets/const/icon';
import { ProgressBar } from 'wini-web-components';
import { PostCard } from '../../../../../project-component/card';

export default function TeachingProcessList() {
    const [activeProcessTab, setActiveProcessTab] = useState(0)
    const list = [
        {
            name: 'Thiết kế UI/UX dành cho người mới bắt đầu',
            next: 'Review bài tập số 2',
            img: demoImg2,
            totalLesson: 80,
            endLesson: 24,
        },
        {
            name: 'Copy-writing for beginner',
            next: 'Review bài tập số 5',
            img: demoImg3,
            totalLesson: 70,
            endLesson: 10,
        },
        {
            name: 'HTML-CSS-JS cơ bản',
            next: 'Css selector',
            img: demoImg2,
            totalLesson: 50,
            endLesson: 30,
        },
        {
            name: 'Thiết kế UI/UX bằng Figma',
            next: 'Import thư viện',
            img: demoImg4,
            totalLesson: 60,
            endLesson: 17,
        },
        {
            name: 'React-js tutorial',
            next: 'Function Component',
            img: demoImg3,
            totalLesson: 80,
            endLesson: 66,
        },
        {
            name: 'Flutter tutorial',
            next: 'Setup environment',
            img: demoImg4,
            totalLesson: 30,
            endLesson: 5,
        },
    ]

    return <div className='block-view col'>
        <div className='block-title heading-5'>Tiến trình giảng dạy</div>
        <div className="col tab-container">
            <div className="tab-header-2 row">
                <div className={`tab-btn label-4 row ${activeProcessTab === 0 ? 'selected' : ''}`} onClick={() => setActiveProcessTab(0)}>Lớp học</div>
                <div className={`tab-btn label-4 row ${activeProcessTab === 1 ? 'selected' : ''}`} onClick={() => setActiveProcessTab(1)}>Mentor</div>
            </div>
            <div className="tab-body-2 row">
                {activeProcessTab ? <div></div> : <div className="row course-process-list">
                    {list.map(function (e, i) {
                        return <PostCard
                            key={`card-img-${i}`}
                            className='col col6 col12-md col12-sm'
                            style={{ '--gutter': '4rem', gap: '2.4rem' }}
                            imgUrl={e.img}
                            title={e.name}
                            content={<div className="row" style={{ columnGap: '0.8rem', flexWrap: 'wrap' }}>
                                <FilledBook />
                                <div className='button-text-3'>Sắp diễn ra:</div>
                                <div className='body-3'>{e.next}</div>
                            </div>}
                            actions={<div className='col' style={{ gap: '0.8rem' }}>
                                <ProgressBar percent={Math.round(e.endLesson * 100 / e.totalLesson)} progressBarOnly={true} style={{ width: '100%' }} />
                                <div className="row" style={{ columnGap: '1rem' }}>
                                    <div className="heading-8">{e.endLesson}/{e.totalLesson} buổi</div>
                                    <div className="row button-text-3 percent-tag">{Math.round(e.endLesson * 100 / e.totalLesson)}%</div>
                                </div>
                            </div>}
                        />
                    })}
                </div>}
            </div>
        </div>
    </div>
}