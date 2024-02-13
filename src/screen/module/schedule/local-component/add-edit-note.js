import { forwardRef } from "react"
import { Select1, Text, TextField } from "../../../../component/export-component"
import { useForm } from "react-hook-form"

const PopupAddEditNote = forwardRef(function PopupAddEditNote(data, ref) {
              const methods = useForm({ shouldFocusError: false })

              return <div className="col" style={{ width: '52rem', flex: 1, maxHeight: '69rem' }}>
                            <div className="popup-body col" style={{ overflow: 'hidden auto', padding: '1.6rem 2.4rem', rowGap: '2rem' }}>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Lời nhắc nhở</Text>
                                                        <TextField style={{ width: '100%' }} placeholder="Nhập lời nhắc" />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <div className="row" style={{ gap: 4 }}>
                                                                      <Text className="label-3">Khóa học</Text>
                                                                      <Text className="label-4" style={{ color: '#E14337' }}>*</Text>
                                                        </div>
                                                        <Select1 style={{ width: '100%' }} placeholder="Chọn khóa học" options={[]} />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Bài học</Text>
                                                        <Select1 style={{ width: '100%' }} placeholder="Chọn bài học" options={[]} />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Thời gian nhắc nhở</Text>
                                          </div>
                            </div>
                            <div className="row popup-footer"></div>
              </div>
})

export default PopupAddEditNote