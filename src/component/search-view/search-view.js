/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { Ultis } from '../../core/Utils';
import { ReusableInput, ReusableSelect2 } from '../TextField/text-field';

export default function SearchForm({ initAction }) {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const { register, control, reset, setValue, handleSubmit, watch, formState: { errors } } = useForm({ shouldFocusError: false });
   const handleFindData = (data) => {
        const params = new URLSearchParams();
        for (const key in data) {
            if (data[key] != null && data[key] !== "") {
                params.append(key, Ultis.parseDate(data[key]));
                else {
                    params.append(key, data[key]);
                }
            }
        }
        navigate('?' + params.toString());
    };
    const clearFormValue = () => {
        reset();
        navigate(``)
    }
    useEffect(() => {
        useEffect(() => {
        for (const [key, value] of searchParams) {
            if (key === "dateCreated") {
                
            } else {
                setValue(key, value);
            }
        }
    }, []);
    }, []);

    const ExampleCustomInput = forwardRef(({ value, onClick, name, required }, ref) => (
        <input
            autoComplete='off'
            name='name'
            type='text'
            value={value}
            placeholder='dd/mm/yyyy'
            onClick={onClick} ref={ref}
        />
    ));
    return (
        <form className="searchForm view-form row-4 row" onSubmit={handleSubmit(handleFindData)}>
            <div className="form-card">
                <ReusableInput
                    register={register}
                    required={false}
                    errors={errors}
                    name={"input1"}
                    label="Search input 1"
                />
            </div>
            <div className="form-card">
                <ReusableInput
                    register={register}
                    required={false}
                    errors={errors}
                    name={"input2"}
                    label="Search input 2"
                />
            </div>
            <div className="form-card">
                <ReusableInput
                    register={register}
                    required={false}
                    errors={errors}
                    name={"input3"}
                    label="Search input 3"
                />
            </div>

            <div className="form-card">
                <ReusableSelect2
                    value={watch('type')}
                    label='Loại hình đơn hàng'
                    name='type'
                    required={false}
                    control={control}
                    errors={errors}
                    options={[]}
                    valueType={'int'}
                />
            </div>
            <div className="form-card">
                <ReusableSelect2
                    value={watch('type')}
                    label='Loại hình đơn hàng'
                    name='type'
                    required={false}
                    control={control}
                    errors={errors}
                    options={[]}
                    valueType={'int'}
                />
            </div>

            <div className="form-card">
                <div className='TextFieldContainer col'>
                    <div className='label-container row'>
                        <span className='label-3'>Ngày tạo</span>
                    </div>
                    <div className='input-container row'>
                        <div className={`input-border row`}>
                            <DatePicker
                                selected={watch("dateCreated") != null ? new Date(watch("dateCreated")) : null}
                                onChange={(date) => {
                                    setValue("dateCreated", Ultis.formatDateTime(date, false))
                                }}
                                customInput={<ExampleCustomInput />}
                            />
                            <div className="suffix-btn-txtfd sufix-icon box24">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="95%" viewBox="0 0 17 16" fill="none">
                                    <path d="M12.3876 2.99967V1.88856C12.3876 1.74122 12.3291 1.59991 12.2249 1.49573C12.1207 1.39154 11.9794 1.33301 11.832 1.33301C11.6847 1.33301 11.5434 1.39154 11.4392 1.49573C11.335 1.59991 11.2765 1.74122 11.2765 1.88856V2.99967H12.3876Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M5.72092 2.99967V1.88856C5.72092 1.74122 5.66239 1.59991 5.5582 1.49573C5.45401 1.39154 5.31271 1.33301 5.16536 1.33301C5.01802 1.33301 4.87671 1.39154 4.77253 1.49573C4.66834 1.59991 4.60981 1.74122 4.60981 1.88856V2.99967H5.72092Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M13.4987 14.1108H3.4987C3.05667 14.1108 2.63275 13.9352 2.32019 13.6226C2.00763 13.3101 1.83203 12.8861 1.83203 12.4441V5.2219C1.83203 4.77987 2.00763 4.35595 2.32019 4.04339C2.63275 3.73082 3.05667 3.55523 3.4987 3.55523H13.4987C13.9407 3.55523 14.3646 3.73082 14.6772 4.04339C14.9898 4.35595 15.1654 4.77987 15.1654 5.2219V12.4441C15.1654 12.8861 14.9898 13.3101 14.6772 13.6226C14.3646 13.9352 13.9407 14.1108 13.4987 14.1108ZM14.0543 6.33301H2.94314V12.4441C2.94314 12.5915 3.00167 12.7328 3.10586 12.837C3.21005 12.9411 3.35136 12.9997 3.4987 12.9997H13.4987C13.646 12.9997 13.7873 12.9411 13.8915 12.837C13.9957 12.7328 14.0543 12.5915 14.0543 12.4441V6.33301Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M6.27648 7.44412H4.05425V9.11079H6.27648V7.44412Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M9.60981 7.44412H7.38759V9.11079H9.60981V7.44412Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M6.27648 10.2219H4.05425V11.8886H6.27648V10.2219Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M9.60981 10.2219H7.38759V11.8886H9.60981V10.2219Z" fill="#282829" fillOpacity="0.6" />
                                    <path d="M12.9431 7.44412H10.7209V9.11079H12.9431V7.44412Z" fill="#282829" fillOpacity="0.6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-button-container row"> {/* có thể bỏ đi */}
                <button type="reset" className="clear-form-button button-text-3 row" onClick={clearFormValue}>
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0205 1.3376C14.3522 1.38257 14.5846 1.68791 14.5397 2.0196L14.0548 5.59535C14.0099 5.92652 13.7054 6.15883 13.3741 6.11467L9.73778 5.62982C9.406 5.58558 9.1729 5.28076 9.21714 4.94897C9.26138 4.61719 9.5662 4.38409 9.89798 4.42833L12.232 4.73952C11.2465 3.50311 9.71472 2.72579 7.99967 2.72579C5.00106 2.72579 2.54513 5.18172 2.54513 8.18034C2.54513 8.51506 2.27379 8.7864 1.93907 8.7864C1.60435 8.7864 1.33301 8.51506 1.33301 8.18034C1.33301 4.51229 4.33162 1.51367 7.99967 1.51367C10.0251 1.51367 11.8538 2.40621 13.0685 3.84811L13.3385 1.85673C13.3835 1.52505 13.6888 1.29262 14.0205 1.3376Z" fill="#282829" fillOpacity="0.6" style={{ mixBlendMode: 'multiply' }} />
                        <path d="M14.6663 8.18093C14.6663 7.84621 14.395 7.57487 14.0603 7.57487C13.7255 7.57487 13.4542 7.84621 13.4542 8.18093C13.4542 11.1795 10.9983 13.6355 7.99965 13.6355C6.28443 13.6355 4.75251 12.858 3.76708 11.6214L6.10135 11.9326C6.43313 11.9768 6.73795 11.7437 6.78219 11.412C6.82643 11.0802 6.59333 10.7754 6.26155 10.7311L2.62518 10.2463C2.29392 10.2021 1.98942 10.4344 1.94452 10.7656L1.45967 14.3413C1.4147 14.673 1.64712 14.9784 1.9788 15.0233C2.31048 15.0683 2.61582 14.8359 2.6608 14.5042L2.93078 12.5131C4.14544 13.955 5.97422 14.8476 7.99965 14.8476C11.6677 14.8476 14.6663 11.849 14.6663 8.18093Z" fill="#282829" fillOpacity="0.6" style={{ mixBlendMode: 'multiply' }} />
                    </svg>
                    Xoá bộ lọc
                </button>
                <button type="submit" className="submit-form-button button-text-3 row">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0285 10.8688C9.11257 11.6014 7.95082 12.0395 6.68675 12.0395C3.72996 12.0395 1.33301 9.64257 1.33301 6.68578C1.33301 3.72898 3.72996 1.33203 6.68675 1.33203C9.64354 1.33203 12.0405 3.72898 12.0405 6.68578C12.0405 7.94988 11.6024 9.11166 10.8697 10.0276L14.6663 13.8241L13.825 14.6654L10.0285 10.8688ZM2.52273 6.68578C2.52273 4.38605 4.38703 2.52175 6.68675 2.52175C8.98648 2.52175 10.8508 4.38605 10.8508 6.68578C10.8508 7.80731 10.4074 8.82529 9.68633 9.57397L9.57495 9.68535C8.82626 10.4064 7.80829 10.8498 6.68675 10.8498C4.38703 10.8498 2.52273 8.9855 2.52273 6.68578Z" fill="white" />
                    </svg>
                    Tìm kiếm
                </button>
            </div>
        </form >
    );
}