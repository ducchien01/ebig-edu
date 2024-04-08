import React, { CSSProperties, ReactNode } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SliderProps {
    children?: Array<ReactNode>,
    autoPlay?: boolean,
    /** default: 2000ms */
    duration?: number,
    className?: string,
    iconSize?: number | string,
    iconColor?: string,
    prevButton?: ReactNode,
    nextButton?: ReactNode,
    style?: CSSProperties
}

interface SliderState {
    page: number
}

export class CustomSlider extends React.Component<SliderProps, SliderState> {
    state: Readonly<SliderState> = {
        page: 0
    }

    autoPlay = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && (index + 1) === this.props.children.length)
            index = -1
        this.setState({ page: index + 1 })
    }

    componentDidMount(): void {
        if (this.props.autoPlay) {
            this.setState({ page: 0 })
        }
    }

    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>): void {
        if (this.props.autoPlay) {
            setTimeout(this.autoPlay, this.props.duration ?? 2000)
        }
    }

    render() {
        return <AwesomeSlider
            style={this.props.style}
            className={`custom-slider-container ${this.props.className ?? ''}`}
            selected={this.state.page}
            bullets={false}
            organicArrows={false}
            buttonContentLeft={this.props.prevButton ?? <FontAwesomeIcon icon={faCircleChevronLeft} style={{ color: this.props.iconColor ?? '#ffffff', fontSize: this.props.iconSize ?? '2.4rem' }} />}
            buttonContentRight={this.props.nextButton ?? <FontAwesomeIcon icon={faCircleChevronRight} style={{ color: this.props.iconColor ?? '#ffffff', fontSize: this.props.iconSize ?? '2.4rem' }} />}
        >
            {this.props.children}
        </AwesomeSlider>
    }
}