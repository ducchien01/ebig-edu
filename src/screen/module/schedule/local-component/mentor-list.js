import { useRef, useState } from 'react';
import avatarDemo2 from '../../../../assets/demo-avatar2.png';
import { CellAlignItems, Pagination, Popup, Table, TbBody, TbCell, TbHeader, TbRow, Text, showPopup } from '../../../../component/export-component';
import demoAvatar from '../../../../assets/demo-avatar1.png'

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
                                                                                    <Text className="subtitle-4" style={{ textAlign: 'center' }} maxLine={1}>{e.schedule}</Text>
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
              const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
              const [selected, setSelected] = useState()

              return <div className="col" style={{ maxHeight: "100%", flex: 1 }}>
                            <div className="popup-body">
                                          <Table>
                                                        <TbHeader>
                                                                      <TbCell fixed={true} style={{ minWidth: 360 }}>Học viên</TbCell>
                                                                      <TbCell style={{ minWidth: 150, }} >Khóa mentor</TbCell>
                                                                      <TbCell style={{ minWidth: 80, }} align={CellAlignItems.center}>Số buổi</TbCell>
                                                                      <TbCell style={{ minWidth: 180, }} >Ngày bắt đầu</TbCell>
                                                                      <TbCell style={{ minWidth: 240, }} >Thời gian hẹn</TbCell>
                                                                      <TbCell fixed={true} style={{ minWidth: 240, }} align={CellAlignItems.center} >Action</TbCell>
                                                        </TbHeader>
                                                        <TbBody>
                                                                      {
                                                                                    Array.from({ length: 10 }).map((_, index) => <TbRow key={index} className={`${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}>
                                                                                                  <TbCell fixed={true} style={{ minWidth: 360, }} >
                                                                                                                <div className='row' style={{ gap: '1.2rem', padding: '0.8rem' }}>
                                                                                                                              <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', backgroundImage: `url(${demoAvatar})` }}></div>
                                                                                                                              <div className='col' style={{ gap: 4 }}>
                                                                                                                                            <Text maxLine={1}>Homelander</Text>
                                                                                                                                            <Text maxLine={1}>Namdt10</Text>
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                  </TbCell>
                                                                                                  <TbCell style={{ minWidth: 150, }} ><Text style={{ width: '100%' }}>The Complete 2023 Web Development Bootcamp</Text></TbCell>
                                                                                                  <TbCell style={{ minWidth: 80, }} align={CellAlignItems.center}><Text>5</Text></TbCell>
                                                                                                  <TbCell style={{ minWidth: 180, }} >18/10/2023</TbCell>
                                                                                                  <TbCell style={{ minWidth: 240, }} >19:00 - 20:00 Thứ 3,6 hàng tuần</TbCell>
                                                                                                  <TbCell fixed={true} style={{ minWidth: 240, }}>
                                                                                                                {selected === index ? <div className="row" style={{ gap: 8 }}>
                                                                                                                              <button type="button" className="row" style={{ gap: '0.8rem' }} onClick={() => { }}>
                                                                                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                                                          <path d="M8.00016 1.33203C6.68162 1.33203 5.39269 1.72302 4.29636 2.45557C3.20004 3.18811 2.34555 4.2293 1.84097 5.44747C1.33638 6.66565 1.20436 8.00609 1.4616 9.2993C1.71883 10.5925 2.35377 11.7804 3.28612 12.7127C4.21847 13.6451 5.40636 14.28 6.69956 14.5373C7.99277 14.7945 9.33321 14.6625 10.5514 14.1579C11.7696 13.6533 12.8108 12.7988 13.5433 11.7025C14.2758 10.6062 14.6668 9.31724 14.6668 7.9987C14.6617 6.23216 13.9577 4.53945 12.7085 3.29032C11.4594 2.04119 9.7667 1.33716 8.00016 1.33203V1.33203ZM6.88905 11.0065L3.88128 7.9987L4.66683 7.21314L6.88905 9.43536L11.3335 4.99092L12.1191 5.77647L6.88905 11.0065Z" fill="#39AC6D" />
                                                                                                                                            </svg>
                                                                                                                                            <Text className='button-text-3' style={{ color: '#39AC6D' }}>Chấp nhận</Text>

                                                                                                                              </button>
                                                                                                                              <button type="button" className="row" style={{ gap: '0.8rem' }} onClick={() => { }}>
                                                                                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                                                          <path d="M8.00016 1.33203C6.68162 1.33203 5.39269 1.72302 4.29636 2.45557C3.20004 3.18811 2.34555 4.2293 1.84097 5.44747C1.33638 6.66565 1.20436 8.00609 1.4616 9.2993C1.71883 10.5925 2.35377 11.7804 3.28612 12.7127C4.21847 13.6451 5.40636 14.28 6.69956 14.5373C7.99277 14.7945 9.33321 14.6625 10.5514 14.1579C11.7696 13.6533 12.8108 12.7988 13.5433 11.7025C14.2758 10.6062 14.6668 9.31724 14.6668 7.9987C14.6617 6.23216 13.9577 4.53945 12.7085 3.29032C11.4594 2.04119 9.7667 1.33716 8.00016 1.33203V1.33203ZM10.7502 9.96314L9.96461 10.7487L8.00016 8.78425L6.03572 10.7487L5.25016 9.96314L7.21461 7.9987L5.25016 6.03425L6.03572 5.2487L8.00016 7.21314L9.96461 5.2487L10.7502 6.03425L8.78572 7.9987L10.7502 9.96314Z" fill="#E14337" />
                                                                                                                                            </svg>
                                                                                                                                            <Text className='button-text-3' style={{ color: '#E14337' }}>Từ chối</Text>
                                                                                                                              </button>
                                                                                                                </div> : null}
                                                                                                  </TbCell>
                                                                                    </TbRow>
                                                                                    )
                                                                      }
                                                        </TbBody>
                                          </Table>
                            </div>
                            <div className="popup-footer row">
                                          <Pagination
                                                        /// Size
                                                        currentPage={pageDetails.page}
                                                        /// pageSize
                                                        itemPerPage={pageDetails.size}
                                                        // data.total
                                                        totalItem={10}
                                                        /// action
                                                        onChangePage={(page, size) => {
                                                                      if (pageDetails.page !== page || pageDetails.size !== size) {
                                                                                    setPageDetails({ page: page, size: size });
                                                                      }
                                                        }}
                                          />
                            </div>
              </div>
}