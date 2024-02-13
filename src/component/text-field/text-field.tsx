import React, { CSSProperties, ReactNode } from "react";
import './text-field.css'

interface TextFieldProps {
              value?: string,
              maxLength?: number,
              defaultValue?: string,
              onChange?: React.ChangeEventHandler<HTMLInputElement>,
              onBlur?: React.FocusEventHandler<HTMLInputElement>,
              onFocus?: React.FocusEventHandler<HTMLInputElement>,
              placeholder?: string,
              disabled?: boolean,
              readOnly?: boolean,
              className?: string,
              helperText?: string,
              name?: string,
              suffix?: ReactNode,
              prefix?: ReactNode,
              helperTextColor?: string,
              style?: CSSProperties,
              type?: React.HTMLInputTypeAttribute,
}

export class TextField extends React.Component<TextFieldProps> {
              render(): React.ReactNode {
                            let inputFont: CSSProperties | undefined = undefined
                            if (this.props.style) {
                                          const { font, fontSize, fontFamily, fontWeight, lineHeight, textAlign, textDecoration, textOverflow, color } = this.props.style
                                          inputFont = {
                                                        font: font,
                                                        fontSize: fontSize,
                                                        fontFamily: fontFamily,
                                                        fontWeight: fontWeight,
                                                        lineHeight: lineHeight,
                                                        textAlign: textAlign,
                                                        textDecoration: textDecoration,
                                                        textOverflow: textOverflow,
                                                        color: color
                                          }
                                          delete this.props.style.font
                                          delete this.props.style.fontSize
                                          delete this.props.style.fontFamily
                                          delete this.props.style.fontWeight
                                          delete this.props.style.lineHeight
                                          delete this.props.style.textAlign
                                          delete this.props.style.textDecoration
                                          delete this.props.style.textOverflow
                                          delete this.props.style.color
                            }
                            return <div
                                          className={`text-field-container row ${this.props.className ?? ''} ${this.props.helperText?.length && 'helper-text'}`}
                                          style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
                            >
                                          {this.props.prefix}
                                          <input
                                                        // autoComplete={autoComplete ? 'on' : 'new-password'}
                                                        className='placeholder-2'
                                                        style={inputFont}
                                                        maxLength={this.props.maxLength}
                                                        name={this.props.name}
                                                        type={this.props.type ?? 'text'}
                                                        defaultValue={this.props.defaultValue}
                                                        value={this.props.value}
                                                        placeholder={this.props.placeholder}
                                                        readOnly={this.props.readOnly}
                                                        disabled={this.props.disabled}
                                                        onChange={this.props.onChange}
                                                        onFocus={this.props.onFocus}
                                                        onBlur={this.props.onBlur}
                                          />
                                          {this.props.suffix}
                            </div>
              }
}