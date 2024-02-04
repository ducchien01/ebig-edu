import { useState } from "react"
import './progress-bar.css'

const downArrowSvg = <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.41046 8.01097C5.03087 7.66301 4.42368 7.66301 4.04408 8.01097C3.65197 8.37041 3.65197 8.96293 4.04408 9.32236L11.3168 15.989C11.6964 16.337 12.3036 16.337 12.6832 15.989L19.9559 9.32236C20.348 8.96293 20.348 8.37041 19.9559 8.01097C19.5763 7.66301 18.9691 7.66301 18.5895 8.01097L12 14.0514L5.41046 8.01097Z" fill="#00204D" fillOpacity="0.6" />
</svg>

const upArrowSvg = <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.5895 15.989L12 9.94862L5.41046 15.989C5.03087 16.337 4.42368 16.337 4.04408 15.989C3.65197 15.6296 3.65197 15.0371 4.04408 14.6776L11.3168 8.01097C11.6964 7.66301 12.3036 7.66301 12.6832 8.01097L19.9559 14.6776C20.348 15.0371 20.348 15.6296 19.9559 15.989C19.5763 16.337 18.9691 16.337 18.5895 15.989Z" fill="#00204D" fillOpacity="0.6" />
</svg>


export default function ProgressBar({ status, percent, titleText, title, hideTitle = false, progressBarOnly = false, fullColor, percentColor }) {
              const [openDetails, setOpenDetails] = useState(true)
              return <div className="progress-bar-container col">
                            {(hideTitle || progressBarOnly) ? null : (title ?? <div className="title-container row">
                                          <div className="heading-8">{titleText}</div>
                                          <button type="button" className="suffix-action" onClick={() => { setOpenDetails(!openDetails) }}>{openDetails ? downArrowSvg : upArrowSvg}</button>
                            </div>)}
                            {openDetails ? <div>
                                          <div className="progress-bar-tile" style={{ '--percent-color': percentColor, '--full-color': fullColor }}></div>
                                          {progressBarOnly ? null : <div className="label-4">{percent}/100</div>}
                            </div> : null}

              </div>
}