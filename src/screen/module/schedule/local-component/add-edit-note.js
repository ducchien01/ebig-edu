import { forwardRef } from "react"
import { DatePicker, RadioButton, Select1, Text, TextField, closePopup } from "../../../../component/export-component"
import { Controller, useForm } from "react-hook-form"

const PopupAddEditNote = forwardRef(function PopupAddEditNote(data, ref) {
              const methods = useForm({ shouldFocusError: false, defaultValues: { 'autoTimeUnit': 'phút', 'timeNote': 'auto' } })

              const onSubmit = (ev) => {
                            console.log(ev)
              }

              return <form className="col" style={{ width: '52rem', flex: 1, maxHeight: '69rem' }}>
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
                                                        <div className="row" style={{ gap: 4 }}>
                                                                      <RadioButton name="timeNote" value={'auto'} defaultChecked size={'1.6rem'} onChange={() => { methods.setValue('timeNote', 'auto') }} />
                                                                      <Text className="label-3">Tự động</Text>
                                                        </div>
                                                        {methods.watch('timeNote') === 'auto' ? <div className="row" style={{ gap: '0.8rem' }}>
                                                                      <Select1
                                                                                    className="body-3"
                                                                                    placeholder="Chọn thời điểm"
                                                                                    options={[]}
                                                                                    style={{ flex: 2, width: '100%' }}
                                                                      />
                                                                      <TextField className="body-3" placeholder={`Số ${methods.watch('autoTimeUnit')}`} type="number" style={{ flex: 1, width: '100%' }} />
                                                                      <Select1
                                                                                    className="body-3"
                                                                                    value={methods.watch('autoTimeUnit')}
                                                                                    style={{ flex: 1, width: '100%' }}
                                                                                    options={[{ id: 'phút', name: 'phút' }, { id: 'giờ', name: 'giờ' }, { id: 'ngày', name: 'ngày' }]}
                                                                                    onChange={(vl) => {
                                                                                                  methods.setValue('autoTimeUnit', vl.id)
                                                                                    }}
                                                                      />
                                                        </div> : null}
                                                        <div className="row" style={{ gap: 4 }}>
                                                                      <RadioButton name="timeNote" value={'custom'} size={'1.6rem'} onChange={() => { methods.setValue('timeNote', 'custom') }} />
                                                                      <Text className="label-3">Tự nhập thời gian</Text>
                                                        </div>
                                                        {methods.watch('timeNote') === 'custom' ? <div className="row" style={{ gap: '0.8rem' }}>
                                                                      <TextField placeholder="hh:mm" className="body-3" />
                                                                      <DatePicker placeholder="Chọn ngày" />
                                                        </div> : null}
                                          </div>
                            </div>
                            <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
                                          <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
                                          <button type="button" className="submit-popup-note button-text-3" onClick={methods.handleSubmit(onSubmit)}>Tạo nhắc nhở</button>
                            </div>
              </form>
})

export default PopupAddEditNote