import React from 'react';
import './checkbox.css';

const CheckboxComponent = ({ label, onClick, value }) => {
    return (
        <div className="checkboxContainer row">
            <input
                type="checkbox"
                className="checkboxInput"
                id="customCheckbox"
                checked={value}
                onChange={onClick}
            />
            <label htmlFor="customCheckbox" className="checkboxLabel"></label>
            {label && <span className='regular2 row'>{label}</span>}
        </div>
    );
};

export default CheckboxComponent;