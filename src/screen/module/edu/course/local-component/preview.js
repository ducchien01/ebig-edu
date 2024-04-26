import { Text } from "../../../../../component/export-component";
import mediaImg from '../../../../../assets/media.png'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseController } from "../controller";
import { CustomerController } from "../../../customer/controller";
import { Ultis } from "../../../../../Utils";
import { InforCard } from "../../../../../project-component/card";
import OverallTab from "./overall-tab";
import ConfigAPI from "../../../../../config/configApi";

export default function Preview() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [activeFilterTab, setActiveFilterTab] = useState(0)
    const user = CustomerController.userInfor()

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
            CourseController.getById(id).then(res => {
                if (res) setData(res)
            })
        } //getById
    }, [])

    return <div className="col preview-container" style={{ gap: '4rem' }}>
        {data ? <>
            <div className="img-header col" style={{ backgroundImage: `url(${ConfigAPI.imgUrl + data?.pictureId})` }}>
                <div className="header-text col" style={{ gap: '1.2rem', width: '100%' }}>
                    <Text className="heading-3">{data.name}</Text>
                    <div className="row" style={{ gap: '0.8rem' }}>
                        <img src={user.avatarUrl} alt="" style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
                        <Text className="label-2">{user.name ?? user.userName}</Text>
                        <div className="label-4">.</div>
                        <div className="row tag-infor">Course</div>
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
                    <InforCard
                        style={{ border: 'none', alignItems: 'start', textAlign: 'start' }}
                        avatar={user.avatarUrl}
                        avatarSize="8rem"
                        title={user.name}
                        subTitle={`${200} bài viết . ${12} khóa học . ${334} người theo dõi`}
                        content={'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.'}
                        actions={<button type="button" className="row button-primary" style={{ width: 'fit-content' }}>
                            <div className="button-text-3">Theo dõi</div>
                        </button>}
                    />
                    <div className="col divider" style={{ width: '100%' }}></div>
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
                        {/* <div className="col" style={{ background: `no-repeat center/cover url(${banner})`, padding: '1.6rem min(25%, 15.6rem) 1.6rem 2rem', width: '100%', gap: '1.6rem', borderRadius: '0.8rem' }}>
                            <Text className="heading-7" style={{ color: '#ffffff', }} maxLine={2}>Trở thành chuyên gia để viết bài, giảng dạy và bán hàng</Text>
                            <button type="button" className="row button-text-3" style={{ padding: '0.6rem 1.2rem', borderRadius: '0.8rem', backgroundColor: '#ffffff', color: 'var(--primary-color)', width: 'fit-content' }}>Đăng ký ngay</button>
                        </div> */}
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