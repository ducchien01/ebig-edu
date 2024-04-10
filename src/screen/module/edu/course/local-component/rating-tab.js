import { FilledStar } from "../../../../../assets/const/icon"
import { ProgressBar, Rating } from "../../../../../component/export-component"
import ListComment from "../../../social/new/local-component/list-comment"

export default function CourseRatingTab({ rateDetails }) {
    return <div className="col" style={{ gap: '3.2rem', paddingTop: '2rem' }}>
        <div className="heading-4">Đánh giá</div>
        <div className="row" style={{ gap: '4.4rem' }}>
            <div className="col" style={{ gap: '4rem' }}>
                <div className="col">
                    <div className="row" style={{ gap: '1.2rem' }}>
                        <div className="heading-3">{rateDetails?.ratingScore}</div>
                        <FilledStar width="3.2rem" height="3.2rem" color="#FC6B03" />
                    </div>
                    <div className="subtitle-2">Xếp hạng khoá học</div>
                </div>
                <div className="col">
                    <div className="heading-3">{rateDetails ? Object.keys(rateDetails).map(e => e.startsWith('s') ? rateDetails[e] : 0).reduce((a, b) => a + b) : '-'}</div>
                    <div className="subtitle-2">Lượt xếp hạng</div>
                </div>
            </div>
            <div className="col" style={{ flex: 1, gap: '1.4rem' }}>
                {Array.from({ length: 5 }).map((_, i) => {
                    return <ProgressBar key={'star-' + i} progressBarOnly style={{ width: '100%' }} />
                })}
            </div>
            <div className="col" style={{ gap: '1.2rem', alignItems: 'stretch' }}>
                {Array.from({ length: 5 }).map((_, i) => {
                    const star = i === 0 ? 5 : ((5 - i) % 5)
                    return <div key={'rate-' + i} className="row" style={{ gap: '0.8rem' }}>
                        <Rating value={star} />
                        <div className="heading-7">({rateDetails ? rateDetails[`s${star}`] : '-'})</div>
                    </div>
                })}
            </div>
        </div>
        <ListComment rating />
    </div>
}