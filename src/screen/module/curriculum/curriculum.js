import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './curriculum.css'
import { faCloudArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ListCurriculum from './local-component/list-curriculum'
import { Text } from '../../../component/export-component'

export default function SchoolCurriculum() {
              const navigate = useNavigate()

              return <div className='col school-curriculum view-container'>
                            <div className='col'>
                                          <div className="view-header row" style={{ border: 'none' }}>
                                                        <div className="heading-4">Tải lên</div>
                                                        <div className='row' style={{ gap: 8 }}>
                                                                      <button type="button" className="suffix-btn row" onClick={() => navigate()} style={{ backgroundColor: 'var(--background)' }}>
                                                                                    <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: '#00204D99', fontSize: '1.6rem' }} />
                                                                                    <Text className="button-text-3" style={{ color: '#00204D99' }}>Tải lên</Text>
                                                                      </button>
                                                                      <button type="button" className="suffix-btn row" onClick={() => navigate()} style={{ backgroundColor: 'var(--primary-color)' }}>
                                                                                    <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '1.6rem' }} />
                                                                                    <Text className="button-text-3" style={{ color: '#ffffff' }}>Tạo mới</Text>
                                                                      </button>
                                                        </div>
                                          </div>
                                          <ListCurriculum data={Array.from({ length: 6 })} />
                            </div>
              </div>
}