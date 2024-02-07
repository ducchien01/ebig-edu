import React from 'react';
import demoImg2 from '../../../../assets/demo-image2.png';
import demoImg3 from '../../../../assets/demo-image3.png';
import demoImg4 from '../../../../assets/demo-image4.png';
import { FilledBook } from '../../../../assets/const/icon';
import { ProgressBar } from '../../../../component/export-component';

export default function CourseList() {
              return <div className="row course-list">
                            {
                                          [
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
                                          ].map((e, i) => <div key={`card-img-${i}`} className='card-view-course col6 col12-md col12-sm' >
                                                        <div className='course-img' style={{ backgroundImage: `url(${e.img})` }}></div>
                                                        <div className="col course-infor">
                                                                      <div className="heading-7">{e.name}</div>
                                                                      <div className="row">
                                                                                    <FilledBook width={16} height={16} />
                                                                                    <div>{e.next}</div>
                                                                      </div>
                                                                      <div>
                                                                                    <ProgressBar percent={Math.round(e.endLesson * 100 / e.totalLesson)} progressBarOnly={true} style={{ width: '100%' }} />
                                                                                    <div className="row">
                                                                                                  <div className="heading-8">{e.endLesson}/{e.totalLesson} buổi</div>
                                                                                                  <div className="row button-text3">{Math.round(e.endLesson * 100 / e.totalLesson)}%</div>
                                                                                    </div>
                                                                      </div>
                                                        </div>
                                          </div>)
                            }
              </div>
}