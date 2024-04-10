import { NavLink } from "react-router-dom"
import { FilledSocialSharing, FilledStar, OutlineBooks, OutlineGChart, OutlineHeart, OutlineLock, OutlineTimeAlarm, OutlineVerified, OutlineVideoPlaylist } from "../../../../../assets/const/icon"
import { ProgressBar, Rating, Text } from "../../../../../component/export-component"
import ConfigAPI from "../../../../../config/configApi"
import ListComment from "../../../social/new/local-component/list-comment"
import { studentLevelList } from "../../../../../assets/const/const-list"

export default function OverallTab({ data, rateDetails, isPaid }) {
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
        <div className="col divider" style={{ width: '100%' }}></div>
        {isPaid ? null : <div className="row" style={{ width: '100%', padding: '2.4rem 4.8rem', gap: '2.4rem 4.8rem', flexWrap: 'wrap', backgroundColor: 'var(--background)', border: 'var(--border-grey1)', borderRadius: '0.8rem' }}>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineVideoPlaylist width="2rem" height="2rem" />
                <div className="button-text-3">{data.courseLessons?.filter(e => e.lessonId)?.length} bài học</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineBooks width="2rem" height="2rem" />
                <div className="button-text-3">24 tài liệu đính kèm</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineGChart width="2rem" height="2rem" />
                <div className="button-text-3">{studentLevelList.find(e => e.id === data.level)?.name ?? '-'}</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
                <OutlineVerified width="2rem" height="2rem" color={data.isCertificate ? '#39AC6D' : undefined} />
                <div className="button-text-3">Chứng chỉ tốt nghiệp</div>
            </div>
            <div className="row tag-disabled col12" style={{ padding: 0, backgroundColor: 'transparent', '--gutter': '4.8rem' }}>
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
                <div className="col" style={{ gap: '3.2rem', paddingTop: '2rem' }}>
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
            </> : null}
        </>}
    </>
}