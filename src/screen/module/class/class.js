import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './class.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ListClass from './local-component/list-class'

export default function SchoolClass() {
              const navigate = useNavigate()
              const [activeFilterTab, setActiveFilterTab] = useState(0)

              return <div className='col school-class view-container'>
                            <div className='col'>
                                          <div className="view-header row" style={{ border: 'none' }}>
                                                        <div className="heading-4">Danh sách Class</div>
                                                        <button type="button" className="suffix-btn row" onClick={() => navigate()} style={{ backgroundColor: 'var(--primary-color)' }}>
                                                                      <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                                                                      <div className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</div>
                                                        </button>
                                          </div>
                                          <div className="col tab-container">
                                                        <div className="tab-header-2 row">
                                                                      <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(0)}>Tất cả</div>
                                                                      <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(1)}>Đã xuất bản</div>
                                                                      <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(2)}>Bản nháp</div>
                                                        </div>
                                                        <div className="tab-body-2 row">
                                                                      <ListClass data={Array.from({ length: activeFilterTab === 0 ? 6 : activeFilterTab === 1 ? 2 : 4 })} />
                                                        </div>
                                          </div>
                            </div>
              </div>
}