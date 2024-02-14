import { faCloudArrowDown, faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Text, TextField } from "../../../../component/export-component"
import demoImage from '../../../../assets/demo-image5.png'
import { FilledBook, FilledClock, FilledSetupPreferences } from "../../../../assets/const/icon"

export default function ListCurriculum({ data = [] }) {
              const [list, setList] = useState([])

              useEffect(() => {
                            setList(data)
              }, [data])

              return <div className="col" style={{ rowGap: '2.4rem' }}>
                            <div className="row filter-header-container">
                                          <TextField style={{ border: 'none', maxWidth: '32rem' }} placeholder="Tìm kiếm " prefix={<FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.6rem', color: '#00204D99' }} />} />
                                          <div style={{ height: '1.6rem', width: 1, backgroundColor: '#00358033' }} ></div>
                                          <button type="button" className="row" style={{ gap: '0.8rem', cursor: 'pointer' }}>
                                                        <div style={{ width: '1.6rem', height: '1.6rem' }}><FilledSetupPreferences /></div>
                                                        <Text className="button-text-3" style={{ color: '#00204D99' }}>Bộ lọc</Text>
                                          </button>
                            </div>
                            <div className="row list-card-curriculum-infor">
                                          {list.map((e, i) => <div key={`card-${i}`} className='card-curriculum-infor col col12'>
                                                        <div className="row top">
                                                                      <div className="demo-img" style={{ backgroundImage: `url(${demoImage})` }}></div>
                                                                      <div className="row">
                                                                                    <div className="col" style={{ rowGap: '2.4rem', flex: 1, width: '100%' }}>
                                                                                                  <div className="col" style={{ rowGap: 4 }}>
                                                                                                                <Text className="heading-7">Giáo trình của khóa UI/UX cho người mới bắt đầu</Text>
                                                                                                                <Text className="subtitle-4">Art & Design, Science fiction</Text>
                                                                                                  </div>
                                                                                                  {/* <Text className="row button-text-3" style={{ backgroundColor: '#F2F5F8', color: '#00204D99' }}>Bản nháp</Text> */}
                                                                                                  {/* <Text className="row button-text-3" style={{ backgroundColor: '#FFF3EB', color: '#FC6B03' }}>Đã kết thúc</Text> */}
                                                                                                  <Text className="row button-text-3" style={{ backgroundColor: '#EDF2FD', color: '#366AE2' }}>Beginner</Text>
                                                                                    </div>
                                                                                    <button type="button" className="row"><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '2rem', color: '#00204D99' }} /></button>
                                                                      </div>
                                                        </div>
                                                        <div className="row bottom">
                                                                      <div className="row" style={{ columnGap: '2.4rem' }}>
                                                                                    <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                                                  <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledBook /></div>
                                                                                                  <Text className="button-text-3" style={{ color: '#00204D99' }} >32 bài học</Text>
                                                                                    </div>
                                                                                    <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                                                  <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledClock /></div>
                                                                                                  <Text className="button-text-3" style={{ color: '#00204D99' }} >180h 20m 15s</Text>
                                                                                    </div>
                                                                      </div>
                                                                      <div className="row" style={{ columnGap: '0.8rem' }}>
                                                                                    <FontAwesomeIcon icon={faCloudArrowDown} style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />
                                                                                    <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Download</Text>
                                                                      </div>
                                                        </div>
                                          </div>)}
                            </div>
              </div >
}