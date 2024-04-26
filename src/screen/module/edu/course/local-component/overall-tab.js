import { NavLink } from "react-router-dom"
import { FilledSocialSharing, OutlineBooks, OutlineGChart, OutlineHeart, OutlineLock, OutlineTimeAlarm, OutlineVerified, OutlineVideoPlaylist } from "../../../../../assets/const/icon"
import { Text } from "../../../../../component/export-component"
import ConfigAPI from "../../../../../config/configApi"
import { studentLevelList } from "../../../../../assets/const/const-list"
import CourseRatingTab from "./rating-tab"

export default function OverallTab({ data, rateDetails, isPaid, buyOptions }) {
    return <>
        <img src={ConfigAPI.imgUrl + data.thumbnailId} alt="" style={{ width: '100%', borderRadius: '0.8rem' }} />
        <div className="row" style={{ paddingTop: '1.6rem', gap: '1.6rem' }}>
            <button type="button" className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                <FilledSocialSharing />
                <div className="button-text-3">Chia sẻ</div>
            </button>
            <button type="button" className="row button-grey" style={{ padding: 0, backgroundColor: 'transparent' }}>
                <OutlineHeart />
                <div className="button-text-3">Thêm vào mục yêu thích</div>
            </button>
        </div>
        {<div className="col buy-course-with-options" style={{ gap: '2.4rem', display: 'none', padding: '3.2rem 2rem' }}>{buyOptions}</div>}
        <div className="col divider" style={{ width: '100%' }}></div>
        {isPaid ? null : <div className="row" style={{ width: '100%', padding: '2.4rem 3.2rem', gap: '2.4rem', flexWrap: 'wrap', backgroundColor: 'var(--background)', border: 'var(--border-grey1)', borderRadius: '0.8rem' }}>
            <div className="row tag-disabled col12 col24-sm col24-min" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '2.4rem', justifyContent: 'start' }}>
                <OutlineVideoPlaylist width="2rem" height="2rem" />
                <div className="button-text-3">{data.courseLessons?.filter(e => e.lessonId)?.length} bài học</div>
            </div>
            <div className="row tag-disabled col12 col24-sm col24-min" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '2.4rem', justifyContent: 'start' }}>
                <OutlineBooks width="2rem" height="2rem" />
                <div className="button-text-3">24 tài liệu đính kèm</div>
            </div>
            <div className="row tag-disabled col12 col24-sm col24-min" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '2.4rem', justifyContent: 'start' }}>
                <OutlineGChart width="2rem" height="2rem" />
                <div className="button-text-3">{studentLevelList.find(e => e.id === data.level)?.name ?? '-'}</div>
            </div>
            <div className="row tag-disabled col12 col24-sm col24-min" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '2.4rem', justifyContent: 'start' }}>
                <OutlineVerified width="2rem" height="2rem" color={data.isCertificate ? '#39AC6D' : undefined} />
                <div className="button-text-3">Chứng chỉ tốt nghiệp</div>
            </div>
            <div className="row tag-disabled col12 col24-sm col24-min" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '2.4rem', justifyContent: 'start' }}>
                <OutlineTimeAlarm width="2rem" height="2rem" color={data.isCertificate ? '#39AC6D' : undefined} />
                <div className="button-text-3">12 tháng truy cập khóa học</div>
            </div>
        </div>}
        <div className="col" style={{ gap: '4rem', padding: '3.2rem 0' }}>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Giới thiệu tổng quan</div>
                <div className="body-2">{data.description}</div>
            </div>
            <div className="col" style={{ padding: '2.4rem', gap: '1.6rem', border: 'var(--border-grey1)', borderRadius: '0.8rem' }}>
                <div className="heading-5">Mục tiêu cuối khoá</div>
                <ul>
                    {(data.targets ? JSON.parse(data.targets) : []).map(e => {
                        return <li key={e.id} className="body-1" style={{ marginLeft: '2.4rem' }}>{e.value}</li>
                    })}
                </ul>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Khóa học phù hợp với ai?</div>
                <div className="body-2">{data.suitable}</div>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Thời gian truy cập khóa học?</div>
                <div className="body-2">Bạn có thể truy cập khóa học trong vòng 12 tháng.</div>
            </div>
            <div className="col" style={{ gap: '1.6rem' }}>
                <div className="heading-5">Công cụ cần chuẩn bị?</div>
                <div className="body-2">{data.tools}</div>
            </div>
        </div>
        {isPaid ? null : <>
            <div className="col divider"></div>
            <div className="col" style={{ gap: '3.2rem', paddingTop: '2rem' }}>
                <div className="heading-4">Nội dung khóa học</div>
                {(data?.courseLessons ?? []).filter(e => !e.parentId).map((item, i) => {
                    let children = data.courseLessons.filter(e => e.parentId === item.id)
                    return <div key={item.id} className="col" style={{ gap: '2rem' }}>
                        <Text className="heading-5" maxLine={1} style={{ width: '100%' }}>{`U${i + 1}: ${item.name}`}</Text>
                        <div className="col" style={{ gap: '1.6rem' }}>
                            {children.map(child => {
                                return <NavLink key={child.id} className="row button-grey" style={{ backgroundColor: 'transparent', padding: 0 }}>
                                    <OutlineLock />
                                    <Text className="label-4" maxLine={1} style={{ width: '100%', flex: 1 }}>{child.name}</Text>
                                </NavLink>
                            })}
                        </div>
                    </div>
                })}
            </div>
            {rateDetails ? <>
                <div className="col divider"></div>
                <CourseRatingTab rateDetails={rateDetails} />
            </> : null}
        </>}
    </>
}