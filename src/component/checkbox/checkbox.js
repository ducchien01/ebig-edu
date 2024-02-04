import React from 'react';
import './checkbox.css';

export default function Checkbox({ onChange, value, defaultValue, checkColor = '#ffffff', disabled = false, style }) {
    
    delete style.backgroundColor
    delete style['background-color']
    return (
        <label className="checkbox-container row" style={{}} >
            <input type="checkbox" checked={value} defaultChecked={defaultValue} onChange={onChange} disabled={disabled} />
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M6.72 11.52 L10.8 15.6 L18 7.2" fill="none" strokeLinecap="round" stroke={checkColor} />
            </svg>
        </label>
    );
};
