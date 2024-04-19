import { forwardRef, useEffect, useRef, useState } from "react"
import { Popup, Text, TextField, closePopup, showPopup } from "../component/export-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

const InputTime = ({ style, className, defaultValue, onChange, helperText }) => {
    const ref = useRef()
    const [value, setValue] = useState(defaultValue)

    const showPickerPopup = (ev) => {
        if (value?.length) {
            var initHoursValue = parseFloat(value.split(':')[0])
            var initMinutesValue = parseFloat(value.split(':')[1])
        }
        showPopup({
            ref: ref,
            hideButtonClose: true,
            clickOverlayClosePopup: true,
            style: { backgroundColor: '#ffffff', left: `${ev.pageX}px`, top: `${ev.pageY}px`, width: '24rem' },
            content: <PickerHMPoup ref={ref} initH={initHoursValue} initM={initMinutesValue} onChange={(hValue, mValue) => {
                setValue(`${hValue < 10 ? `0${hValue}` : hValue}:${mValue < 10 ? `0${mValue}` : mValue}`)
                onChange(hValue, mValue)
            }} />,
        })
    }

    useEffect(() => {
        setValue(defaultValue)
    },[defaultValue])

    return <div className={`picker-time-hm-container ${className ?? ''}`} style={style}>
        <Popup ref={ref} />
        <TextField
            className="input-time-container placeholder-2"
            placeholder="hh:mm"
            value={value}
            onChange={(ev) => {
                setValue(ev.target.value)
            }}
            helperText={helperText}
            onBlur={(ev) => {
                const splitValue = ev.target.value.trim().split(':')
                if (splitValue.length == 2 && !isNaN(parseFloat(splitValue[0])) && !parseFloat(splitValue[1])) {
                    let hValue = parseFloat(splitValue[0])
                    let mValue = parseFloat(splitValue[1])
                    setValue(`${hValue < 10 ? `0${hValue}` : hValue}:${mValue < 10 ? `0${mValue}` : mValue}`)
                    onChange(hValue, mValue)
                } else if (splitValue.length == 1 && !isNaN(parseFloat(splitValue[0]))) {
                    let hValue = parseFloat(splitValue[0])
                    onChange(parseFloat(splitValue[0]), 0)
                    setValue(`${hValue < 10 ? `0${hValue}` : hValue}:00`)
                } else {
                    if (defaultValue) {
                        var initH = parseFloat(defaultValue.split(':')[0])
                        var initM = parseFloat(defaultValue.split(':')[1])
                    }
                    setValue(defaultValue ?? '')
                    onChange(initH, initM)
                }
            }}
            suffix={<button type="button" className="row" onClick={showPickerPopup}><FontAwesomeIcon icon={faClock} style={{ fontSize: '1.2rem', color: '#00204D99' }} /></button>}
        />
    </div>
}

const PickerHMPoup = forwardRef(function PickerHMPoup(data, ref) {
    const [selectedH, setSelectedH] = useState(data.initH)
    const [selectedM, setSelectedM] = useState(data.initM)

    const onSubmit = (ev) => {
        if (data.onChange) data.onChange(selectedH ?? 0, selectedM ?? 0)
        closePopup(ref)
    }

    return <div className="col">
        <div className="col picker-time-container">
            <div className="row" style={{ flex: 1 }}>
                <div className="scroll-picker-hours col">{Array.from({ length: 24 }).map((_, i) => <button key={`hours-${i}`} type="button"
                    className={`label-4 ${selectedH === (i) ? 'selected' : ''}`}
                    style={{ width: '100%' }}
                    onClick={() => { setSelectedH(i) }}
                >
                    {i < 10 ? `0${i}` : i}
                </button>)}
                </div>
                <div className="scroll-picker-minutes col">{Array.from({ length: 60 }).map((_, i) => <button key={`min-${i}`} type="button"
                    className={`label-4 ${selectedM === (i) ? 'selected' : ''}`}
                    style={{ width: '100%' }}
                    onClick={() => { setSelectedM(i) }}
                >{i < 10 ? `0${i}` : i}
                </button>)}
                </div>
            </div>
        </div>
        <div className="row popup-footer" style={{ justifyContent: 'space-between' }}>
            <Text style={{ opacity: 0.6 }} onClick={() => { closePopup(ref) }}>Cancel</Text>
            <button onClick={onSubmit} style={{ padding: '0.4rem 0.8rem', borderRadius: '0.4rem' }} type="button" className="button-primary row"><div className="button-text-3">Apply</div></button>
        </div>
    </div>
})

export default InputTime