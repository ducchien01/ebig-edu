import { forwardRef } from "react"
import { Select1, SelectMultiple, Text, TextField, closePopup } from "../../../../component/export-component"
import { useForm } from "react-hook-form"

const PopupAddNewCurriculumn = forwardRef(function PopupAddNewCurriculumn(data, ref) {
              const methods = useForm({ shouldFocusError: false, defaultValues: { name: '' } })

              const onSubmit = (ev) => {
                            console.log(ev)
              }

              return <form className="col" style={{ width: '52rem', flex: 1 }}>
                            <div className="popup-body col" style={{ padding: '1.6rem 2.4rem', gap: '2rem' }}>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Tên giáo trình</Text>
                                                        <TextField
                                                                      value={methods.watch('name')}
                                                                      style={{ width: '100%' }}
                                                                      placeholder="Đặt tên cho giáo trình của bạn"
                                                                      onChange={(ev) => { methods.setValue('name', ev.target.value.trim()) }}
                                                        />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Phân loại chủ đề</Text>
                                                        <Select1
                                                                      options={[]}
                                                                      style={{ width: '100%' }}
                                                                      placeholder="Chọn chủ đề"
                                                        />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Tag chủ đề (Tối đa 5)</Text>
                                                        <SelectMultiple
                                                                      options={[]}
                                                                      style={{ width: '100%' }}
                                                                      placeholder="Chọn chủ đề được gán thẻ"
                                                        />
                                          </div>
                                          <div className="col" style={{ gap: 8 }}>
                                                        <Text className="label-3">Trình độ</Text>
                                                        <Select1
                                                                      options={[]}
                                                                      style={{ width: '100%' }}
                                                                      placeholder="Chọn trình độ"
                                                        />
                                          </div>
                            </div>
                            <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
                                          <Text style={{ cursor: 'pointer' }} onClick={() => { closePopup(ref) }} className="button-text-3" >Hủy</Text>
                                          <button type="button" className={`submit-popup-btn button-text-3 ${methods.watch('name')?.length ? 'active' : ''}`} onClick={methods.handleSubmit(onSubmit)}>Tạo mới</button>
                            </div>
              </form>
})

export default PopupAddNewCurriculumn