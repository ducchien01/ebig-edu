import './switch.css';

export class SwitchSize {
    static size20 = 'size20';
    static size24 = 'size24';

    static getSize = (size) => {
        switch (size) {
            case SwitchSize.size20:
                return SwitchSize.size20;
            case SwitchSize.size24:
                return SwitchSize.size24;
            default:
                return SwitchSize.size20;
        }
    }
}

export default function SwitchComponent({ value, onchanged, size }) {
    return (
        <label className={`switch ${SwitchSize.getSize(size)}`}>
            <input type="checkbox" defaultValue={true} checked={value} onChange={onchanged} />
            <span className="slider round"></span>
        </label>
    );
}