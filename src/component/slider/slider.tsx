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
    style?: CSSProperties,
    buttons?: boolean,
    onChage?: (i: number) => void
}

interface SliderState {
    page: number
}

export class CustomSlider extends React.Component<SliderProps, SliderState> {
    private intervalPlay: any
    constructor(props: SliderProps) {
        super(props)
        this.state = {
            page: 0
        }
        this.autoPlay = this.autoPlay.bind(this)
    }

    nextPage = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && (index + 1) < this.props.children.length) {
            this.setState({ page: index + 1 })
            if (this.props.onChage) this.props.onChage(index + 1)
        }
    }

    previousPage = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && index > 0) {
            this.setState({ page: index - 1 })
            if (this.props.onChage) this.props.onChage(index - 1)
        }
    }


    private autoPlay = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && (index + 1) === this.props.children.length)
            index = -1
        this.setState({ page: index + 1 })
        if (this.props.onChage) this.props.onChage(index + 1)
    }

    componentDidMount(): void {
        if (this.props.autoPlay) this.intervalPlay = setInterval(this.autoPlay, this.props.duration ?? 2000)
    }



    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>): void {
        if (this.props.autoPlay !== prevProps.autoPlay && !this.props.autoPlay) clearInterval(this.intervalPlay)
    }

    render() {
        return <AwesomeSlider
            style={this.props.style}
            className={`custom-slider-container ${this.props.className ?? ''}`}
            selected={this.state.page}
            bullets={false}
            buttons={this.props.buttons || this.props.buttons == undefined ? (this.props.children && this.props.children?.length > 1) : false}
            organicArrows={false}
            buttonContentLeft={this.props.prevButton ?? <FontAwesomeIcon icon={faCircleChevronLeft} style={{ color: this.props.iconColor ?? '#ffffff', fontSize: this.props.iconSize ?? '2.4rem' }} />}
            buttonContentRight={this.props.nextButton ?? <FontAwesomeIcon icon={faCircleChevronRight} style={{ color: this.props.iconColor ?? '#ffffff', fontSize: this.props.iconSize ?? '2.4rem' }} />}
        >
            {this.props.children}
        </AwesomeSlider>
    }
}