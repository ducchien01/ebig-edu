import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Text } from "../../../../component/export-component"
import demoImage from '../../../../assets/demo-image5.png'
import { FilledCoins, FilledPeople } from "../../../../assets/const/icon"

export default function ListMentor({ data = [] }) {
              const [list, setList] = useState([])

              useEffect(() => {
                            setList(data)
              }, [data])

              return <div className="row list-card-mentor-infor">
                            {list.map((e, i) => <div key={`card-${i}`} className='card-mentor-infor col col12'>
                                          <div className="row top">
                                                        <div className="demo-img" style={{ backgroundImage: `url(${demoImage})` }}></div>
                                                        <div className="row">
                                                                      <div className="col" style={{ rowGap: '2.4rem', flex: 1, width: '100%' }}>
                                                                                    <div className="col" style={{ rowGap: 4 }}>
                                                                                                  <Text className="heading-7">Giáo trình của khóa UI/UX cho người mới bắt đầu</Text>
                                                                                                  <Text className="subtitle-4">Khai giảng 12/10/2023</Text>
                                                                                    </div>
                                                                                    {/* <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text> */}
                                                                                    {/* <Text className="row button-text-3" style={{ backgroundColor: '#FFF3EB', color: '#FC6B03' }}>Đã kết thúc</Text> */}
                                                                                    <Text className="row button-text-3" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Đã xuất bản</Text>
                                                                                    {/* <Text className="row button-text-3" style={{ backgroundColor: '#E8F7EF', color: '#39AC6D' }}>Đang diễn ra</Text> */}
                                                                      </div>
                                                                      <button type="button" className="row"><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99' }} /></button>
                                                        </div>
                                          </div>
                                          <div className="row bottom">
                                                        <div className="row" style={{ columnGap: '2.4rem' }}>
                                                                      <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                                    <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledPeople /></div>
                                                                                    <Text className="button-text-3" style={{ color: '#00204D99' }} >8/32 học viên</Text>
                                                                      </div>
                                                                      <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                                    <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledCoins /></div>
                                                                                    <Text className="button-text-3" style={{ color: '#00204D99' }} >Doanh thu 2.000.000</Text>
                                                                      </div>
                                                        </div>
                                                        <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                      <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                                                                      <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem trước</Text>
                                                        </div>
                                          </div>
                            </div>)}
              </div>
}