import { Controller } from "react-hook-form";
import { Checkbox, RadioButton, Select1, SelectMultiple, Switch, Text, TextArea, TextField } from "../component/export-component";

export function TextFieldForm({ value, label, control, required = false, name, type, placeholder, errors, maxLength, readOnly = false, disabled = false, suffix, prefix, onChange, onBlur, width = '100%', helperText }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required ? (helperText ?? `Vui lòng ${(placeholder ? placeholder : label ? `Nhập ${label}` : 'gía trị').toLowerCase()}`) : null }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <TextField
                style={{ width: '100%' }}
                placeholder={placeholder ? placeholder : label ? `Nhập ${label.toLowerCase()}` : ''}
                value={value}
                suffix={suffix}
                prefix={prefix}
                disabled={disabled}
                readOnly={readOnly}
                type={type}
                onChange={(ev) => {
                    field.onChange(ev.target.value)
                    if (onChange) onChange(ev)
                }}
                onBlur={onBlur}
                maxLength={maxLength}
                helperText={errors?.[name] && errors[name].message}
            />
        </div>}
    />
}

export function TextAreaForm({ value, label, control, required = false, name, placeholder, errors, maxLength, readOnly = false, disabled = false, onChange, onBlur, width = '100%', helperText }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required ? (helperText ?? `Vui lòng ${(placeholder ? placeholder : label ? `Nhập ${label}` : 'gía trị').toLowerCase()}`) : null }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <TextArea
                style={{ width: '100%' }}
                placeholder={placeholder ? placeholder : label ? `Nhập ${label.toLowerCase()}` : ''}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                onChange={(ev) => {
                    field.onChange(ev.target.value)
                    if (onChange) onChange(ev)
                }}
                onBlur={onBlur}
                maxLength={maxLength}
                helperText={errors?.[name] && errors[name].message}
            />
        </div>}
    />
}

export function Select1Form({ value, options, control, label, required = false, name, placeholder, searchPlaceholder, errors, disabled = false, onChange, width = '100%', helperText }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required ? (helperText ?? `Vui lòng ${(placeholder ? placeholder : label ? `Chọn ${label}` : 'gía trị').toLowerCase()}`) : null }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <Select1
                style={{ width: '100%' }}
                placeholder={placeholder ? placeholder : label ? `Chọn ${label.toLowerCase()}` : ''}
                value={value}
                searchPlaceholder={searchPlaceholder}
                options={options}
                disabled={disabled}
                onChange={(ev) => {
                    field.onChange(ev.id)
                    if (onChange) onChange(ev)
                }}
                helperText={errors?.[name] && errors[name].message}
            />
        </div>}
    />
}

export function SelectMultipleForm({ value, options, control, label, required = false, name, placeholder, errors, disabled = false, onChange, width = '100%', helperText }) {
    return <Controller
        name={name}
        control={control}
        rules={{ required: required ? (helperText ?? `Vui lòng ${(placeholder ? placeholder : label ? `Chọn ${label}` : 'gía trị').toLowerCase()}`) : null }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', overflow: 'visible', width: width }}>
            {label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{label}</Text>
                {required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <SelectMultiple
                style={{ width: '100%' }}
                placeholder={placeholder ? placeholder : label ? `Chọn ${label.toLowerCase()}` : ''}
                value={value}
                options={options}
                disabled={disabled}
                onChange={(listValue) => {
                    field.onChange(listValue)
                    if (onChange) onChange(listValue)
                }}
                helperText={errors?.[name] && errors[name].message}
            />
        </div>}
    />
}

export function SwitchForm({ value, label, control, name, disabled = false, onChange, size }) {
    return <Controller
        name={name}
        control={control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem' }}>
            <Switch value={value} disabled={disabled} size={size} onChange={(newValue) => {
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
            {label ? <Text className="label-4" maxLine={1}>{label}</Text> : null}
        </div>}
    />
}

export function RadioButtonForm({ value, label, defaultChecked, control, name, disabled = false, onChange, size }) {
    return <Controller
        name={name}
        control={control}
        render={({ field }) => <div className="row" style={{ gap: 4 }}>
            <RadioButton value={value} disabled={disabled} size={size ?? '1.6rem'} defaultChecked={defaultChecked} name={name} onChange={(ev) => {
                field.onChange(ev.target.value)
                if (onChange) onChange(ev.target.value)
            }} />
            {label ? <Text className="label-3" maxLine={1}>{label}</Text> : null}
        </div>}
    />
}