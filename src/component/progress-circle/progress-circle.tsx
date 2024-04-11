import { CSSProperties } from 'react'
import './progress-circle.css'
import React from 'react'

export function ProgressCircle({ percent, style, fillColor, percentColor, strokeWidth, strokeColor, textStyle }: {
    /** value:  0 - 100 (%)*/
    percent?: number,
    style?: CSSProperties,
    fillColor?: string,
    percentColor?: string,
    strokeWidth?: number,
    strokeColor?: string,
    textStyle?: CSSProperties
}) {
    const radius = 30 - (strokeWidth ?? 4)
    const diameter = Math.PI * 2 * radius;
    const strokeOffset = (1 - ((percent ?? 0) / 100)) * diameter;
    return <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 60, height: 60, ...(style ?? {}) }} >
        <path d={`M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`} style={{ fill: "none", stroke: strokeColor ?? "#E6EAF0", strokeWidth: strokeWidth ?? '4px', }} />
        <path d={`M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`} style={{ fill: fillColor ?? "none", stroke: percentColor ?? "var(--primary-color)", strokeWidth: strokeWidth ?? '4px', strokeLinecap: 'round', strokeDasharray: `${diameter}px ${diameter}px`, strokeDashoffset: `${strokeOffset}px` }} />
        <text x="50%" y="50%" fill="#00204D" dy=".3em" textAnchor="middle" fontSize={16} fontWeight={'600'} style={textStyle}>{percent ?? 0}%</text>
    </svg>
}

