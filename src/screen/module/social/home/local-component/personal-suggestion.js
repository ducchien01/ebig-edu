import { forwardRef, useEffect, useState } from "react";
import { Text } from "../../../../../component/export-component";
import { TopicController } from "../../../topic/controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FilledFileText } from "../../../../../assets/const/icon";
import { useDispatch, useSelector } from "react-redux";
import { AccountActions } from "../../../account/reducer";

const PopupPersonalSuggestion = forwardRef(function PopupPersonalSuggestion(data, ref) {
    const userInfor = useSelector((state) => state.account.data)
    const [activeTab, setActiveTab] = useState(0)
    const [topics, setTopics] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        TopicController.getAll().then(res => {
            if (res) setTopics(res.map(e => {
                if (e.parentId === '6d238f94-225a-4e5f-a857-11c6c31dddea')
                    delete e.parentId
                return e
            }))
        })
    }, [])

    const followTopic = (topicIds = []) => {
        const _topicIds = userInfor.listTopic?.split(',') ?? []
        _topicIds.push(...topicIds.filter(id => _topicIds.every(e => e !== id)))
        AccountActions.update(
            dispatch,
            { ...userInfor, listTopic: _topicIds.join(',') }
        )
    }

    const unFollowTopic = (topicIds = []) => {
        let _topicIds = userInfor.listTopic?.split(',') ?? []
        _topicIds = _topicIds.filter(id => topicIds.every(e => id !== e))
        AccountActions.update(
            dispatch,
            { ...userInfor, listTopic: _topicIds.join(',') }
        )
    }

    const renderTopicTile = (item) => {
        let children = []
        if (!item.parentId) children = topics.filter(e => e.parentId === item.id)
        return <div key={item.id} className="col personal-topic-tile">
            <div className="row" style={{ padding: '1.6rem 0', gap: '0.8rem' }}>
                {item.parentId ? <div style={{ width: '5.2rem' }} /> : <button type="button" onClick={() => {
                    setTopics(topics.map(e => {
                        if (e.id === item.id) e.isShow = !item.isShow
                        return e
                    }))
                }} className="row icon-button20">
                    <FontAwesomeIcon icon={item.isShow ? faCaretDown : faCaretRight} />
                </button>}
                <div className="row icon-button32" style={{ backgroundColor: 'var(--background)' }}>
                    <FilledFileText width="2rem" height="2rem" />
                </div>
                <div className="col" style={{ gap: '0.4rem', flex: 1 }}>
                    <Text className="label-3">{item.name}</Text>
                    {item.parentId ?
                        <Text className="label-3">{item?.countNews ?? 0} Bài viết · {item?.totalFollowers ?? 0} Theo dõi</Text> :
                        <Text className="label-3">{children.length ? children.map(e => e.countNews ?? 0).reduce((a, b) => a + b) : 0} Bài viết · {children.length ? children.map(e => e.totalFollowers ?? 0).reduce((a, b) => a + b) : 0} Theo dõi</Text>}
                </div>
                {userInfor?.listTopic?.includes(item.id) ? <button type="button" onClick={() => {
                    unFollowTopic(item.parentId ? [item.id] : [...topics.filter(e => e.parentId === item.id || e.id === item.id).map(e => e.id)])
                }} className="row button-infor border" style={{ width: '9.8rem', padding: '0.4rem 0.8rem' }}>
                    <Text className="button-text-5">Đang theo dõi</Text>
                </button> : <button type="button" onClick={() => {
                    followTopic(item.parentId ? [item.id] : [...topics.filter(e => e.parentId === item.id || e.id === item.id).map(e => e.id)])
                }} className="row button-primary" style={{ width: '9.8rem', padding: '0.4rem 0.8rem' }}>
                    <Text className="button-text-5">Theo dõi</Text>
                </button>}
            </div>
            {
                item.parentId ? undefined : <div className="col">
                    {children.map(e => renderTopicTile(e))}
                </div>
            }
        </div>
    }

    return <div className="col" style={{ padding: '1rem 0', flex: 1, height: '100%', width: '100%', }}>
        <div className="row filter-container" style={{ borderBottom: '1px inset #00358014', padding: 0, margin: '0 2.4rem', width: 'calc(100% - 4.8rem)' }}>
            <button type="button" style={{ width: '9.2rem', justifyContent: 'center' }} className={`row filter-tab ${activeTab === 0 ? 'selected' : ''}`} onClick={() => { setActiveTab(0) }}>
                <Text className="label-4">Chủ đề</Text>
            </button>
            <button type="button" style={{ width: '9.2rem', justifyContent: 'center' }} className={`filter-tab ${activeTab === 1 ? 'selected' : ''}`} onClick={() => { setActiveTab(1) }}>
                <Text className="label-4">Chuyên gia</Text>
            </button>
        </div>
        <div className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto', padding: '2.4rem' }}>
            {topics.filter(e => !e.parentId).map(e => renderTopicTile(e))}
        </div>
    </div>
})

export default PopupPersonalSuggestion