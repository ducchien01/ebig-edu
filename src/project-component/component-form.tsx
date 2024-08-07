import { Control, Controller, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { CalendarType, Checkbox, ComponentStatus, DatePicker, ImportFile, OptionsItem, RadioButton, Select1, SelectMultiple, Switch, Text, TextArea, TextField } from "wini-web-components";
import { CSSProperties, ReactNode } from "react";
import { Ultis } from "../Utils";

export function TextFieldForm(params: { label?: string, register: UseFormRegister<any>, required?: boolean, name: string, type?: React.HTMLInputTypeAttribute | "money", placeholder?: string, errors: FieldErrors<FieldValues>, maxLength?: number, readOnly?: boolean, disabled?: boolean, suffix?: ReactNode, prefix?: ReactNode, onChange?: React.ChangeEventHandler<HTMLInputElement>, onBlur?: React.FocusEventHandler<HTMLInputElement>, onFocus?: React.FocusEventHandler<HTMLInputElement>, style?: CSSProperties, className?: string, textFieldStyle?: CSSProperties, autoFocus?: boolean }) {
    return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', ...(params.style ?? {}) }}>
        {params.label ? <div className="row" style={{ gap: 4 }}>
            <Text className="label-3">{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null}
        <TextField
            style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}
            placeholder={params.placeholder ? params.placeholder : params.label ? `Nhập ${params.label.toLowerCase()}` : ''}
            suffix={params.suffix}
            prefix={params.prefix}
            disabled={params.disabled}
            readOnly={params.readOnly}
            type={params.type}
            name={params.name}
            register={params.register(params.name, {
                required: params.required,
                onBlur: params.type === 'money' ? (ev) => {
                    let newPrice = ev.target.value.trim().replaceAll(',', '')
                    ev.target.type = "text"
                    if (!isNaN(parseFloat(newPrice))) {
                        ev.target.value = Ultis.money(parseFloat(newPrice))
                    } else {
                        ev.target.value = ''
                    }
                } : params.onBlur,
                onChange: params.onChange,
            }) as any}
            onFocus={params.type === 'money' ? (ev) => {
                ev.target.value = ev.target.value.replaceAll(',', '')
                ev.target.type = "number"
            } : params.onFocus}
            maxLength={params.maxLength}
            helperText={convertErrors(params.errors, params.name) && (convertErrors(params.errors, params.name)?.message?.length ? convertErrors(params.errors, params.name)?.message : `Vui lòng nhập ${(params.placeholder ? params.placeholder : params.label ? `${params.label}` : 'gía trị').toLowerCase()}`)}
        />
    </div>
}

export function TextAreaForm(params: { label?: string, register: UseFormRegister<any>, required?: boolean, name: string, placeholder?: string, errors: FieldErrors<FieldValues>, maxLength?: number, readOnly?: boolean, disabled?: boolean, onChange?: React.ChangeEventHandler<HTMLTextAreaElement>, onBlur?: React.FocusEventHandler<HTMLTextAreaElement>, onFocus?: React.FocusEventHandler<HTMLTextAreaElement>, style?: CSSProperties, className?: string, textFieldStyle?: CSSProperties }) {
    return <div className="col" style={{ gap: '0.8rem', overflow: 'visible', height: '12rem', ...(params.style ?? {}) }}>
        {params.label ? <div className="row" style={{ gap: 4 }}>
            <Text className="label-3">{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null}
        <TextArea
            className="body-3"
            register={params.register(params.name, {
                required: params.required,
                onBlur: params.onBlur,
            }) as any}
            onFocus={params.onFocus}
            style={{ width: '100%', height: '100%', flex: 1 }}
            placeholder={params.placeholder ? params.placeholder : params.label ? `Nhập ${params.label.toLowerCase()}` : ''}
            disabled={params.disabled}
            readOnly={params.readOnly}
            onChange={params.onChange}
            name={params.name}
            maxLength={params.maxLength}
            helperText={convertErrors(params.errors, params.name) && (convertErrors(params.errors, params.name)?.message?.length ? convertErrors(params.errors, params.name)?.message : `Vui lòng nhập ${(params.placeholder ? params.placeholder : params.label ? `${params.label}` : 'gía trị').toLowerCase()}`)}
        />
    </div>
}

export function DatePickerForm(params: { control: Control<FieldValues>, label?: string, required?: boolean, name: string, placeholder?: string, errors: FieldErrors<FieldValues>, disabled?: boolean, onChange?: (e?: string) => void, style?: CSSProperties, className?: string, pickerType?: CalendarType, hideButtonToday?: boolean }) {
    return <Controller
        name={params.name}
        control={params.control}
        rules={{ required: params.required }}
        render={({ field }) => <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', ...(params.style ?? {}) }}>
            {params.label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{params.label}</Text>
                {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <DatePicker
                style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}
                className="body-3"
                hideButtonToday={params.hideButtonToday}
                placeholder={params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label.toLowerCase()}` : ''}
                value={field.value}
                disabled={params.disabled}
                pickerType={params.pickerType}
                onChange={(date) => {
                    field.onChange(date);
                    if (params.onChange) params.onChange(date);
                }}
                helperText={convertErrors(params.errors, params.name) && (convertErrors(params.errors, params.name)?.message?.length ? convertErrors(params.errors, params.name)?.message : `Vui lòng ${(params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function Select1Form(params: { options: Array<OptionsItem>, control: Control<FieldValues>, label?: string, required?: boolean, name: string, placeholder?: string, searchPlaceholder?: string, errors: FieldErrors<FieldValues>, disabled?: boolean, onChange?: (v?: OptionsItem) => void, style?: CSSProperties, className?: string, handleSearch?: (e: string) => Promise<Array<OptionsItem>>, hideSearch?: boolean }) {
    return <Controller
        name={params.name}
        control={params.control}
        rules={{ required: params.required }}
        render={({ field }) => <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', ...(params.style ?? {}) }}>
            {params.label ? <div className="row" style={{ gap: 4 }}>
                <Text className="label-3">{params.label}</Text>
                {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <Select1
                style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}
                placeholder={params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label.toLowerCase()}` : ''}
                value={field.value}
                searchPlaceholder={params.searchPlaceholder}
                options={params.options}
                disabled={params.disabled}
                onChange={(ev?: OptionsItem) => {
                    field.onChange(ev?.id)
                    if (params.onChange) params.onChange(ev)
                }}
                handleSearch={params.handleSearch}
                hideSearch={params.hideSearch}
                helperText={convertErrors(params.errors, params.name) && (convertErrors(params.errors, params.name)?.message?.length ? convertErrors(params.errors, params.name)?.message : `Vui lòng ${(params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function SelectMultipleForm(params: { options: Array<OptionsItem>, control: Control<FieldValues>, label?: string, required?: boolean, name: string, placeholder?: string, errors: FieldErrors<FieldValues>, disabled?: boolean, onChange?: (v: Array<OptionsItem>) => void, style?: CSSProperties, className?: string }) {
    return <Controller
        name={params.name}
        control={params.control}
        rules={{ required: params.required }}
        render={({ field }) => <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', ...(params.style ?? {}) }}>
            {params.label ? <div className="row" style={{ gap: '0.4rem', width: params.className?.includes('row') ? '20rem' : 'auto' }}>
                <Text className="label-3" style={{ maxWidth: '92%' }}>{params.label}</Text>
                {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <SelectMultiple
                className="body-3"
                style={{ width: '100%', borderRadius: '0.8rem', flex: params.className?.includes('row') ? 1 : undefined }}
                placeholder={params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label.toLowerCase()}` : ''}
                value={field.value}
                options={params.options as any}
                disabled={params.disabled}
                onChange={(listValue) => {
                    field.onChange(listValue)
                    if (params.onChange) params.onChange(listValue as any)
                }}
                helperText={convertErrors(params.errors, params.name) && (convertErrors(params.errors, params.name)?.message?.length ? convertErrors(params.errors, params.name)?.message : `Vui lòng ${(params.placeholder ? params.placeholder : params.label ? `Chọn ${params.label}` : 'gía trị').toLowerCase()}`)}
            />
        </div>}
    />
}

export function SwitchForm(params: { control: Control<FieldValues>, label?: string, name: string, disabled?: boolean, onChange?: (v: boolean) => void, size?: string | number }) {
    return <Controller
        name={params.name}
        control={params.control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem' }}>
            <Switch name={params.name} value={field.value} disabled={params.disabled} size={params.size} onChange={(newValue) => {
                field.onChange(newValue)
                if (params.onChange) params.onChange(newValue)
            }} />
            {params.label ? <Text className="label-4" maxLine={1}>{params.label}</Text> : null}
        </div>}
    />
}

export function CheckboxForm(params: { control: Control<FieldValues>, label?: string, name: string, disabled?: boolean, onChange?: (v: boolean) => void, size?: string | number, radius?: string | number }) {
    return <Controller
        name={params.name}
        control={params.control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem' }}>
            <Checkbox value={field.value} disabled={params.disabled} size={params.size} onChange={(newValue) => {
                field.onChange(newValue)
                if (params.onChange) params.onChange(newValue)
            }} style={{ borderRadius: params.radius ?? '0.4rem' }} />
            {params.label ? typeof params.label === 'string' ? <Text className="label-4" maxLine={1}>{params.label}</Text> : params.label : null}
        </div>}
    />
}

export function RadioButtonForm(params: { value: string, label?: string, register: UseFormRegister<any>, name: string, disabled?: boolean, onChange: (event: any) => void, size: string | number }) {
    return <div className="row" style={{ gap: 4 }}>
        <RadioButton
            value={params.value}
            disabled={params.disabled}
            size={params.size ?? '1.6rem'}
            name={params.name}
            register={params.register(params.name, { onChange: params.onChange }) as any}
        />
        {params.label ? <Text className="label-3" maxLine={1}>{params.label}</Text> : null}
    </div>
}

export function ImportFileForm(params: { name: string, label?: string, control: Control<FieldValues>, maxSize?: number, allowType?: Array<string>, status?: ComponentStatus, onChange?: (a?: File) => void, title?: string, subTitle?: string, style?: CSSProperties, required?: boolean, direction?: 'row' | 'column', multiple?: boolean, className?: string }) {
    return <Controller
        name={params.name}
        control={params.control}
        rules={{ required: params.required }}
        render={({ field }) => <div className="col" style={{ gap: '0.8rem', ...(params.style ?? {}) }}>
            {params.label ? <div className="row" style={{ gap: '0.4rem', width: params.className?.includes('row') ? '20rem' : 'auto' }}>
                <Text className="label-3" style={{ maxWidth: '92%' }}>{params.label}</Text>
                {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null}
            <ImportFile maxSize={params.maxSize} label={params.title} subTitle={params.subTitle} allowType={params.allowType} status={params.status} value={field.value} onChange={(ev) => {
                field.onChange(ev)
                if (params.onChange) params.onChange(ev)
            }} style={{ width: '100%', borderStyle: 'dashed', maxWidth: '100%' }} className={`${params.className ?? ''} ${params.direction ?? 'row'}`} />
        </div>}
    />
}

const convertErrors = (errors: any, name: string) => {
    if (errors && Object.keys(errors).length) {
        const props = name.split(/[.\[\]]/).filter(e => e?.length > 0)
        var value = errors
        for (let p of props) {
            if (value)
                value = value[p]
        }
        return value
    }
    return undefined
}