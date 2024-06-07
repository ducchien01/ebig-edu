import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CenterController } from "../controller"
import { Text } from "../../../../component/export-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faListDots, faPlus } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import { CenterPermisson } from "../da"
import GroupDefaultBg from '../../../../assets/groups-bg.png'
import ConfigAPI from "../../../../config/configApi"
import { TopicController } from "../../topic/controller"

export default function ListCenter() {
    const userInfor = useSelector((state) => state.account.data)
    const [centers, setCenters] = useState([])
    const [topics, setTopics] = useState([])

    useEffect(() => {
        console.log(userInfor)
        if (userInfor && userInfor.customerCenters.length) {
            CenterController.getByIds(userInfor.customerCenters.map(e => e.centerId)).then(async (res) => {
                if (res) {
                    const topicIds = res.map(e => e.topicId)
                    setCenters(res)
                    if (topicIds) {
                        const _topics = await TopicController.getByIds(topicIds)
                        if (topicIds) setTopics(_topics)
                    }
                }
            })
        }
    }, [userInfor])

    return <div className="row" style={{ justifyContent: 'center' }}>
        <div className="col col18-xxl col20-xl col20-lg col24" style={{ '--gutter': '0px', padding: '2.4rem 3.2rem' }}>
            <div className="row">
                <Text className="heading-5" style={{ flex: 1 }} maxLine={1}>Trung tâm của bạn</Text>
                <NavLink to={'/center'} className="button-primary row">
                    <FontAwesomeIcon icon={faPlus} />
                    <Text className="button-text-3">Tạo mới</Text>
                </NavLink>
            </div>
            <div className="row" style={{ gap: '1.2rem 1.6rem', padding: '2rem 0', flexWrap: 'wrap' }}>
                {centers.filter(centerItem => userInfor.customerCenters.some(e => e.permisson === CenterPermisson.owner && e.centerId === centerItem.id)).map(centerItem => {
                    const topicItem = topics.find(e => e.id === centerItem.topicId)
                    return <div key={centerItem.id} className="col col8-xxl col8-xl col12-lg col12-md col24" style={{ gap: '1.6rem', padding: '1.6rem', borderRadius: '0.8rem', border: 'var(--border-grey1)', backgroundColor: '#fff', '--gutter': '1.6rem' }}>
                        <div className="row" style={{ gap: '1.6rem', alignItems: 'start' }}>
                            <img
                                src={centerItem.thumbnailId ? `${ConfigAPI.imgUrl + centerItem.thumbnailId}` : centerItem.pictureId ? `${ConfigAPI.imgUrl + centerItem.pictureId.split(',')[0]}` : GroupDefaultBg}
                                alt=""
                                style={{ borderRadius: '0.4rem', width: '20%', minWidth: '12rem', height: '8rem' }}
                            />
                            <div className="col" style={{ flex: 1, gap: '0.4rem' }}>
                                <Text style={{ width: '100%' }} maxLine={2} className="semibold3">{centerItem.name}</Text>
                                <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>{topicItem?.name}</Text>
                            </div>
                        </div>
                        <div className="row" style={{ gap: '1.6rem' }}>
                            <NavLink to={`/center/${centerItem.id}`} className={'row button-infor'} style={{ borderRadius: '0.8rem', padding: '1.2rem 2.4rem', flex: 1 }}><Text className="button-text-3">Xem trung tâm</Text></NavLink>
                            <button type="button" className="row icon-button40" style={{ backgroundColor: 'var(--background)', borderRadius: '0.8rem' }}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                        </div>
                    </div>
                })}
            </div>
            <div className="col divider" style={{ backgroundColor: '#00358014' }} />
            <Text className="heading-6">Trung tâm đang tham gia</Text>
            <div className="row" style={{ gap: '1.2rem 1.6rem', padding: '2.4rem 0', flexWrap: 'wrap' }}>
                {centers.filter(centerItem => userInfor.customerCenters.some(e => e.permisson !== CenterPermisson.owner && e.centerId === centerItem.id)).map(centerItem => {
                    const topicItem = topics.find(e => e.id === centerItem.topicId)
                    return <div key={centerItem.id} className="col col8-xxl col8-xl col12-lg col12-md col24" style={{ gap: '1.6rem', padding: '2rem', borderRadius: '0.8rem', border: 'var(--border-grey1)', backgroundColor: '#fff', '--gutter': '1.6rem' }}>
                        <div className="row" style={{ gap: '2rem', alignItems: 'start' }}>
                            <img
                                src={centerItem.thumbnailId ? `${ConfigAPI.imgUrl + centerItem.thumbnailId}` : centerItem.pictureId ? `${ConfigAPI.imgUrl + centerItem.pictureId.split(',')[0]}` : GroupDefaultBg}
                                alt=""
                                style={{ borderRadius: '0.4rem', width: '10rem', height: '8rem' }}
                            />
                            <div className="col" style={{ flex: 1, gap: '0.4rem' }}>
                                <Text style={{ width: '100%' }} maxLine={2} className="semibold3">{centerItem.name}</Text>
                                <Text className="button-text-3" style={{ color: 'var(--primary-color)' }}>{topicItem?.name}</Text>
                            </div>
                        </div>
                        <div className="row" style={{ gap: '1.2rem' }}>
                            <NavLink to={`/center/${centerItem.id}`} className={'row button-infor'} style={{ borderRadius: '0.8rem', padding: '1.2rem 2.4rem', flex: 1 }}><Text className="button-text-3">Xem trung tâm</Text></NavLink>
                            <button type="button" className="row icon-button40" style={{ backgroundColor: 'var(--background)', borderRadius: '0.8rem' }}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}