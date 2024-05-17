import { useEffect, useState } from "react"

export default function CoutDownText({ remain = 0, time = 1800, style = {}, className, onEnd = () => { } }) {
    const [timer, setTimer] = useState(time - remain)

    const getMinute = () => {
        const mValue = Math.floor(timer / 60)
        return mValue < 10 ? `0${mValue}` : mValue
    }

    const getSecond = () => {
        const sValue = timer % 60
        return sValue < 10 ? `0${sValue}` : sValue
    }

    useEffect(() => {
        if (timer) {
            var interval = setInterval(function () {
                if (timer) {
                    setTimer(timer - 1)
                }
            }, 1000)
        } else {
            if (onEnd) onEnd()

        }
        return () => clearInterval(interval);
    }, [timer])

    return <div className={className ?? "body-3"} style={{ color: 'var(--error-color)', ...style }}>{`${getMinute()}:${getSecond()}`}</div>
}