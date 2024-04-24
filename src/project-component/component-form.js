import { Controller } from "react-hook-form";
import { Checkbox, DatePicker, ImportFile, RadioButton, Select1, SelectMultiple, Switch, Text, TextArea, TextField } from "../component/export-component";
import { Ultis } from "../Utils";

export function TextFieldForm({ label, register, required = false, name, type, placeholder, errors, maxLength, readOnly = false, disabled = false, suffix, prefix, onChange, onBlur, onFocus, width = '100%', helperText, className }) {
    return <div className={className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
        {label ? <div className="row" style={{ gap: 4 }}>
            <Text className="label-3">{label}</Text>
            {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null}
        <TextField
            style={{ width: '100%', flex: className?.includes('row') ? 1 : null }}
            placeholder={placeholder ? placeholder : label ? `Nhập ${label.toLowerCase()}` : ''}
            suffix={suffix}
            prefix={prefix}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
            name={name}
            register={register(name, {
                required: required,
                onBlur: onBlur,
                onChange: onChange,
            })}
            onFocus={onFocus}
            maxLength={maxLength}
            helperText={errors?.[name] && (helperText ?? errors.message ?? `Vui lòng ${(placeholder ? placeholder : label ? `Nhập ${label}` : 'gía trị').toLowerCase()}`)}
        />
    </div>
}

export function TextAreaForm({ label, register, required = false, name, placeholder, errors, maxLength, readOnly = false, disabled = false, onChange, onBlur, onFocus, width = '100%', helperText, style = {} }) {
    return <div className="col" style={{ gap: '0.8rem', overflow: 'visible', width: width, height: '12rem', ...style }}>
        {label ? <div className="row" style={{ gap: 4 }}>
            <Text className="label-3">{label}</Text>
            {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null}
        <TextArea
            register={register(name, {
                required: required,
                onBlur: onBlur,
            })}
            onFocus={onFocus}
            style={{ width: '100%', height: '100%', flex: 1 }}
            placeholder={placeholder ? placeholder : label ? `Nhập ${label.toLowerCase()}` : ''}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            maxLength={maxLength}
            helperText={errors?.[name] && (helperText ?? errors.message ?? `Vui lòng ${(placeholder ? placeholder : label ? `Nhập ${label}` : 'gía trị').toLowerCase()}`)}
        />
    </div>
}

export function DatePickerForm({ control, label, required = false, name, placeholder, errors, disabled = false, onChange, width = '100%', helperText, className, pickerType }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => <div className={className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <DatePicker
                style={{ width: '100%', flex: className?.includes('row') ? 1 : null }}
                placeholder={placeholder ? placeholder : label ? `Chọn ${label.toLowerCase()}` : ''}
                value={field.value}
                disabled={disabled}
                pickerType={pickerType}
                onChange={(date) => {
                    field.onChange(date)
                    if (onChange) onChange(date)
                }}
                helperText={errors?.[name] && (helperText ?? errors.message ?? `Vui lòng ${(placeholder ? placeholder : label ? `Chọn ${label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function Select1Form({ value, options, control, label, required = false, name, placeholder, searchPlaceholder, errors, disabled = false, onChange, width = '100%', helperText, className }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => <div className={className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <Select1
                style={{ width: '100%', flex: className?.includes('row') ? 1 : null }}
                placeholder={placeholder ? placeholder : label ? `Chọn ${label.toLowerCase()}` : ''}
                value={value}
                searchPlaceholder={searchPlaceholder}
                options={options}
                disabled={disabled}
                onChange={(ev) => {
                    field.onChange(ev.id)
                    if (onChange) onChange(ev)
                }}
                helperText={errors?.[name] && (helperText ?? errors.message ?? `Vui lòng ${(placeholder ? placeholder : label ? `Chọn ${label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function SelectMultipleForm({ value, options, control, label, required = false, name, placeholder, errors, disabled = false, onChange, width = '100%', helperText, className }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => <div className={className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <SelectMultiple
                style={{ width: '100%', flex: className?.includes('row') ? 1 : null }}
                placeholder={placeholder ? placeholder : label ? `Chọn ${label.toLowerCase()}` : ''}
                value={value}
                options={options}
                disabled={disabled}
                onChange={(listValue) => {
                    field.onChange(listValue)
                    if (onChange) onChange(listValue)
                }}
                helperText={errors?.[name] && (helperText ?? errors.message ?? `Vui lòng ${(placeholder ? placeholder : label ? `Chọn ${label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function SwitchForm({ value, label, control, name, disabled = false, onChange, size }) {
    return <Controller
        name={name}
        control={control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem' }}>
            <Switch name={name} value={value} disabled={disabled} size={size} onChange={(newValue) => {
                field.onChange(newValue)
                if (onChange) onChange(newValue)
            }} />
            {label ? <Text className="label-4" maxLine={1}>{label}</Text> : null}
        </div>}
    />
}

export function CheckboxForm({ value, label, control, name, disabled = false, onChange, size, radius = '0.4rem' }) {
    return <Controller
        name={name}
        control={control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem' }}>
            <Checkbox value={value} disabled={disabled} size={size} onChange={(newValue) => {
                field.onChange(newValue)
                if (onChange) onChange(newValue)
            }} style={{ borderRadius: radius }} />
            {label ? typeof label === 'string' ? <Text className="label-4" maxLine={1}>{label}</Text> : label : null}
        </div>}
    />
}

export function RadioButtonForm({ value, label, register, name, disabled = false, onChange, size }) {
    return <div className="row" style={{ gap: 4 }}>
        <RadioButton
            value={value}
            disabled={disabled}
            size={size ?? '1.6rem'}
            name={name}
            register={register(name, { onChange: onChange })}
        />
        {label ? <Text className="label-3" maxLine={1}>{label}</Text> : null}
    </div>
}

export function ImportFileForm({ name, label, control, maxSize, allowType, status, value, onChange, title, subTitle, width, required = false, direction = 'row', multiple = false }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <ImportFile maxSize={maxSize} label={title} subTitle={subTitle} allowType={allowType} status={status} value={value} onChange={(ev) => {
                field.onChange(ev)
                if (onChange) onChange(ev)
            }} style={{ width: '100%', borderStyle: 'dashed', maxWidth: '100%' }} className={direction} />
        </div>}
    />
}

