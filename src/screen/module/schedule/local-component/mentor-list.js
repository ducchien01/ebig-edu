import { useRef } from 'react';
import avatarDemo2 from '../../../../assets/demo-avatar2.png';
import { Popup, Text, showPopup } from '../../../../component/export-component';

export default function MeentorList() {
              const list = [
                            {
                                          title: 'Coach 1:1 Phân tích dữ liệu dành cho beginner',
                                          time: '5 buổi từ 18/09/2023',
                                          student: {
                                                        avatar: avatarDemo2,
                                                        name: 'Nguyễn Minh Nguyệt'
                                          },
                                          timeLimit: '19:00 - 20:00',
                                          schedule: 'Thứ 3, thứ 6 hàng tuần',
                            },
                            {
                                          title: 'Coach 1:1 Design mobile app by Figma',
                                          time: '4 buổi từ 02/06/2023',
                                          student: {
                                                        avatar: avatarDemo2,
                                                        name: 'Nguyễn Minh Nguyệt'
                                          },
                                          timeLimit: '14:00 - 15:30',
                                          schedule: 'Thứ 2, thứ 4 hàng tuần',
                            },
              ]
              const ref = useRef()

              const showFullMentorList = () => {
                            showPopup({
                                          ref: ref,
                                          heading: <div className='popup-header heading-7'>Danh sách đặt lịch đang chờ</div>,
                                          content: <PopupGetFullMentorList />
                            })
              }

              return <div className='block-view col'>
                            <Popup ref={ref} />
                            <div className='block-title row'>
                                          <Text className="heading-5">Đặt lịch mentor</Text>
                                          <button type="button" className='button-text-3' onClick={showFullMentorList}>Xem tất cả</button>
                            </div>
                            <div className="row list-card-view">
                                          {list.map((e, i) => <div key={`card-view-${i}`} className='card-mentor-infor row col12'>
                                                        <div className="col col16-xxl col16-xl col24">
                                                                      <div className="col" style={{ rowGap: '1.2rem' }} >
                                                                                    <div className="col" style={{ rowGap: 4, paddingBottom: '1.2rem' }}>
                                                                                                  <Text className="heading-7">{e.title}</Text>
                                                                                                  <Text className="subtitle-4">{e.time}</Text>
                                                                                    </div>
                                                                                    <div className="row" style={{ columnGap: 4 }}>
                                                                                                  <div className="prefix-avatar-user" style={{ backgroundImage: `url(${e.student.avatar})` }}></div>
                                                                                                  <Text className="label-4">{e.student.name}</Text>
                                                                                    </div>
                                                                      </div>
                                                        </div>
                                                        <div className="col time-infor col8-xxl col8-xl col24">
                                                                      <div className="col" style={{ rowGap: 4 }}>
                                                                                    <Text className="heading-6" style={{ textAlign: 'center' }}>{e.timeLimit}</Text>
                                                                                    <Text className="subtitle-4" style={{ textAlign: 'center' }}>{e.schedule}</Text>
                                                                      </div>
                                                                      <div className="row" >
                                                                                    <button className="button-text-3">Chấp nhận</button>
                                                                                    <button className="button-text-3">Từ chối</button>
                                                                      </div>
                                                        </div>
                                          </div>)
                                          }
                            </div>
              </div>
}

function PopupGetFullMentorList() {
              return <div></div>
}