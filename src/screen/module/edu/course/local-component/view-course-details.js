import { Text } from "../../../../../component/export-component";
import demoAvatar from '../../../../../assets/demo-avatar1.png'
import demoAvatar2 from '../../../../../assets/demo-avatar.png'
import mediaImg from '../../../../../assets/media.png'
import banner from '../../../../../assets/banner1.png'
import { useEffect, useState } from "react";
import { listCommonInfor } from "../../../../../assets/const/const-list";
import { NavLink, useParams } from "react-router-dom";
import { FilledSocialSharing, OutlineHeart, OutlineShoppingCart, OutlineStar, OutlineUserProfile } from "../../../../../assets/const/icon";
import { CourseController } from "../controller";
import { CustomerController } from "../../../customer/controller";
import { Ultis } from "../../../../../Utils";
import ConfigAPI from "../../../../../config/configApi";
import { getFilesByIds } from "../../../../base-controller";

export default function ViewCourseDetails() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [activeFilterTab, setActiveFilterTab] = useState(0)
    const [expert, setExpert] = useState()

    const renderTabView = () => {
        switch (activeFilterTab) {
            case 0:
                return <OverallTab data={data} />
            default:
                return <div></div>
        }
    }

    useEffect(() => {
        if (id) {
            CourseController.getById(id).then(async res => {
                if (res) {

                    CustomerController.getById(res.customerId).then(cusRes => {
                        if (cusRes) setExpert(cusRes)
                    })
                    let imgIds = []
                    if (res.pictureId) imgIds.push(res.pictureId)
                    if (res.thumbnailId) imgIds.push(res.thumbnailId)
                    if (imgIds) {
                        const imgRes = await getFilesByIds(imgIds)
                        if (imgRes) {
                            var newData = {
                                ...res,
                                pictureUrl: imgRes.find(e => e.id === res.pictureId).url,
                                thumbnailUrl: imgRes.find(e => e.id === res.thumbnailId).url
                            }
                        }
                    }
                    setData(newData ?? res)
                }
            })
        }
    }, [])

    return <div className="col preview-container" style={{ gap: '4rem' }}>
        {data ? <>
            <div className="hero-header col" style={{ backgroundImage: `url(${ConfigAPI.fileUrl + data.pictureUrl})` }}>
                <div className="header-text col" style={{ gap: '1.2rem', width: '100%' }}>
                    <Text className="heading-3">{data.name}</Text>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <img src={expert?.avatarUrl} alt="" style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                        <Text className="label-2">{expert?.name ?? expert?.userName}</Text>
                        <div className="label-4">.</div>
                        <div className="row tag-infor">Khóa học Online</div>
                        <div className="label-4">.</div>
                        <OutlineUserProfile color="#ffffff" />
                        <Text className="label-2">{data.quantity ?? 0} học sinh</Text>

                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="details-block col">
                    <div className="col tab-container">
                        <div className="tab-header-2 row">
                            <div className={`tab-btn label-4 row ${activeFilterTab === 0 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(0)}>Tổng quan</div>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 1 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(1)}>Nội dung khóa học</div>
                            <div className={`tab-btn label-4 row ${activeFilterTab === 2 ? 'selected' : ''}`} onClick={() => setActiveFilterTab(2)}>Đánh giá</div>
                        </div>
                        <div className="tab-body-2 col" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden auto', padding: '1.2rem 3.2rem' }}>
                            {renderTabView()}
                        </div>
                    </div>
                </div>
                <div className="more-infor-block col">
                    <div className="col" style={{ gap: '1.6rem' }}>
                        <Text className="heading-4" style={{ '--max-line': 1 }}>{`${Ultis.money(data.price)}đ`}</Text>
                        <button type="button" className="row button-primary" style={{ padding: '1.2rem 2rem' }}>
                            <div className="button-text-3">Mua khóa học</div>
                        </button>
                    </div>
                    <div className="row" style={{ gap: '1.6rem', padding: '1.6rem', borderRadius: '0.8rem', backgroundColor: 'var(--background)', border: 'var(--border-grey1)' }}>
                        <div className="col" style={{ flex: 1, width: '100%', gap: '0.8rem' }}>
                            <Text className="heading-7">Mua cùng khóa dạy kèm trực tuyến với chuyên gia.</Text>
                            <div className="row" style={{ gap: '0.8rem' }}>
                                <div className="tag-infor row button-text-3" >Course</div>
                                <div className="body-3">+</div>
                                <div className="tag-success row button-text-3" >Mentor</div>
                            </div>
                            <div className="body-3">Tiết kiệm hơn 30%</div>
                        </div>
                        <div className="tag-infor row button-text-3 border">Chỉ từ 500.000đ</div>
                    </div>
                    <div className="col" style={{ gap: '1.6rem' }}>
                        <img src={demoAvatar} alt="" style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
                        <div className="col" style={{ gap: '0.4rem' }}>
                            <Text className="heading-7">Phan Minh Anh</Text>
                            <div className="row" style={{ paddingBottom: '0.4rem', gap: '0.4rem' }}>
                                <div className="subtitle-4">200 bài viết</div>
                                <div className="subtitle-4">.</div>
                                <div className="subtitle-4">12 khóa học</div>
                                <div className="subtitle-4">.</div>
                                <div className="subtitle-4">334 người theo dõi </div>
                            </div>
                            <Text className="body-3" style={{ '--max-line': 4 }}>
                                Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.
                            </Text>
                        </div>
                        <button type="button" className="row button-primary" style={{ width: 'fit-content' }}>
                            <div className="button-text-3">Theo dõi</div>
                        </button>
                    </div>
                    <div className="col" style={{ margin: '1.2rem 0', width: '100%', height: 1, backgroundColor: 'var(--background)' }}></div>
                    <div className="col" style={{ gap: '3.2rem' }}>
                        <div className="col" style={{ gap: '0.8rem' }}>
                            <Text className="heading-7">Các khóa học khác từ chuyên gia</Text>
                            <Text className="body-3">Tìm hiểu thêm các khóa học khác từ chuyên gia</Text>
                            <div className="col">
                                {Array.from({ length: 4 }).map((item, i) => <div key={'other-course-' + i} className="row" style={{ padding: '1.2rem 0', gap: '1.6rem' }}>
                                    <img src={mediaImg} alt="" style={{ width: '5.6rem', height: '5.6rem' }} />
                                    <Text className="heading-7" style={{ flex: 1, width: '100%' }}>Thiết kế UI/UX cho người mới bắt đầu</Text>
                                    <div className="row button-text-3 border tag-disabled">250.000đ</div>
                                </div>)}
                            </div>
                        </div>
                        <div className="col" style={{ background: `no-repeat center/cover url(${banner})`, padding: '1.6rem 15.6rem 1.6rem 2rem', width: '100%', gap: '1.6rem', borderRadius: '0.8rem' }}>
                            <Text className="heading-7" style={{ color: '#ffffff', }}>Trở thành chuyên gia để viết bài, giảng dạy và bán hàng</Text>
                            <button type="button" className="row button-text-3" style={{ padding: '0.6rem 1.2rem', borderRadius: '0.8rem', backgroundColor: '#ffffff', color: 'var(--primary-color)', width: 'fit-content' }}>Đăng ký ngay</button>
                        </div>
                        <div className="col" style={{ gap: '2rem' }}>
                            <div className="heading-7">Danh mục liên quan</div>
                            <div className="row" style={{ flexWrap: 'wrap', gap: '1.6rem 0.8rem' }}>
                                {['Programming', 'Data Science', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity'].map((e, i) => <div key={'relate-tag-' + i} className="row button-text-3 tag-disabled">{e}</div>)}
                            </div>
                            <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>Xem thêm các chủ đề</Text>
                        </div>
                    </div>
                </div>
            </div></> : null}
    </div>
}

const OverallTab = ({ data }) => {
    return <>
        <div className="group-tag-infor row" style={{ marginBottom: '2.4rem' }}>
            {listCommonInfor.map((item, i) => <div className="row tag-disabled">
                {item.icon}
                <Text className="button-text-3">{data?.[item.name]} {item.title}</Text>
            </div>)}
        </div>
        <div className="col" style={{ gap: '1.6rem' }}>
            <img style={{ width: '100%', borderRadius: '0.8rem' }} src="https://s3-alpha-sig.figma.com/img/6fef/4aa8/1304a208051abd5930880838abb6487f?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pZWPEM8Oozv0ctVXRJihFOZ5QlcvNNX4UCzlX0kVXVAf0dvOT7Cl7-jxBx-LpKID8EfBkivtbZhLVn7AMrMkVvDHzFktFQYABiSmEb0mv0UbBxNxB57rPMnJ6l2d4HeyiyVXyI8sUXptI~9MhBDyt37hAItdmZWLXijRlqwzKsROEo-7m5GvY4n484i28ca1Z94lX7n0DSuUNedyD3y1bhA18EXMuh2RkYmwWJGDJ1QJRnDzf7SiwC3geKokF3hdv1kok0wrqLaaDrZPyEJtWTBwPj2yeV3s-ZBknGOwL0rijsCPnkf~wct0SgVLeIa-49-Q767HQq1jMBhTYASIOQ__" alt="" />
            <div className="row" style={{ gap: '1.6rem' }}>
                <button type="button" className="row" style={{ gap: '0.8rem' }}>
                    <FilledSocialSharing />
                    <div className="button-text-3">Chia sẻ</div>
                </button>
                <button type="button" className="row" style={{ gap: '0.8rem' }}>
                    <OutlineHeart />
                    <div className="button-text-3">Thêm vào mục yêu thích</div>
                </button>
            </div>
            <div className="col" style={{ marginBottom: '1.6rem', width: '100%', height: 1, backgroundColor: 'var(--background)' }}></div>
        </div>
        <div className="col" style={{ gap: '4rem', padding: '2rem 0' }}>
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
            <div className="row" style={{ padding: '2.4rem', gap: '2.4rem', backgroundColor: '#F9FAFB', borderRadius: '0.8rem', alignItems: 'start' }}>
                <img style={{ width: '10.4rem', height: '10.4rem', borderRadius: '50%' }} src={demoAvatar2} alt="" />
                <div className="col" style={{ gap: '1.6rem', width: '100%', flex: 1 }}>
                    <div className="col" style={{ gap: '0.4rem' }}>
                        <Text className="heading-7">Phan Minh Anh</Text>
                        <div className="row" style={{ paddingBottom: '0.4rem', gap: '0.4rem' }}>
                            <div className="subtitle-4">200 bài viết</div>
                            <div className="subtitle-4">.</div>
                            <div className="subtitle-4">12 khóa học</div>
                            <div className="subtitle-4">.</div>
                            <div className="subtitle-4">334 người theo dõi </div>
                        </div>
                        <div className="body-3">
                            He uses the language of cinema to compose his images, moving beyond what one sees and depicting what he wants others to see. He believes that in our overly crowded lives, sketching and painting invites us to move at a more deliberate pace, giving us a true sense of place, where unexpected stories are revealed.
                        </div>
                    </div>
                    <button type="button" className="row button-primary" style={{ width: 'fit-content' }}>
                        <div className="button-text-3">Theo dõi</div>
                    </button>
                </div>
            </div>
            <div className="col" style={{ gap: '4rem' }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                    <div className="heading-5">Đề xuất khóa học liên quan</div>
                    <NavLink to="" className='button-text-3' style={{ color: 'var(--primary-color)' }}>Xem tất cả</NavLink>
                </div>
                <div className="row" style={{ flexWrap: 'wrap', gap: '4rem' }}>
                    {Array.from({ length: 3 }).map((item, i) => <div className="col col8 col12-sm" style={{ gap: '2.4rem', '--gutter': '4rem' }}>
                        <img style={{ width: '100%', height: '18.4rem' }} src={mediaImg} alt="" />
                        <div className="row" style={{ gap: '0.8rem' }}>
                            <img src={demoAvatar} alt="" style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }} />
                            <Text className="label-4">Phan Minh Anh</Text>
                        </div>
                        <div className="col" style={{ gap: '0.8rem' }}>
                            <Text className="heading-6">Thiết kế UI/UX dành cho người mới bắt đầu</Text>
                            <Text className="body-2">Create a CD cover by photographing day-to-day objects</Text>
                            <div className="row" style={{ gap: '0.8rem' }}>
                                <OutlineUserProfile />
                                <div className="subtitle-4">1K2</div>
                                <div className="subtitle-4">.</div>
                                <OutlineStar />
                                <div className="subtitle-4">4.7 (1k1)</div>
                            </div>
                            <div className="row">
                                <Text className="heading-6" style={{ '--max-line': 1, flex: 1, width: '100%' }}>235,000đ - 2,500,000đ</Text>
                                <button type="button" className="row" style={{ alignItems: 'center' }}><OutlineHeart width="2rem" height="2rem" /></button>
                                <button type="button" className="row" style={{ alignItems: 'center' }}><OutlineShoppingCart width="2rem" height="2rem" /></button>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </>
}