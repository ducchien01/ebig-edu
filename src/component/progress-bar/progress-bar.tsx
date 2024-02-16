import { CSSProperties, ReactNode, useState } from 'react'
import './progress-bar.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { ComponentStatus, getStatusIcon } from '../export-component'

export function ProgressBar({ status = ComponentStatus.INFOR, percent = 100, titleText, title, hideTitle = false, progressBarOnly = false, fullColor = 'var(--background)', percentColor = 'var(--primary-color)', style }: {
    percent: number,
    titleText?: string,
    title?: ReactNode,
    hideTitle: boolean,
    progressBarOnly: boolean,
    fullColor: string,
    percentColor: string,
    style?: CSSProperties,
    status: ComponentStatus
}) {
    const [openDetails, setOpenDetails] = useState(true)

    return <div className="progress-bar-container col" style={style ? { padding: progressBarOnly ? '0' : '1.6rem 2.4rem', ...style } : { padding: progressBarOnly ? '0' : '1.6rem 2.4rem' }}>
        {(hideTitle || progressBarOnly) ? null : (title ?? <div className="progress-bar-title row">
            <div className="heading-text">{titleText}</div>
            <button type="button" className="suffix-action" onClick={() => { setOpenDetails(!openDetails) }}><FontAwesomeIcon icon={openDetails ? faChevronDown : faChevronUp} /></button>
        </div>)}
        {openDetails ? <div className='progress-bar-tile row'>
            <div className="progress-bar-value" style={{ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%` } as CSSProperties}></div>
            {progressBarOnly || status === ComponentStatus.INFOR ? null : <div className='status-icon'>{getStatusIcon(status)}</div>}
            {progressBarOnly ? null : <div className='text-value'>{percent}/100</div>}
        </div> : null}

    </div>
}