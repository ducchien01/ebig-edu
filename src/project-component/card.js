import { NavLink } from "react-router-dom"
import { Text } from "../component/export-component"

export const PostCard = ({ className = 'col', imgUrl, imgStyle, heading, title, content, actions, style, to }) => {
    return <div className={`${className} post-card-container`} style={style}>
        <NavLink to={to} className="row thumbnail" style={imgStyle}>
            <img src={imgUrl} style={{ width: '100%', height: '100%' }} alt="" />
        </NavLink>
        <div className="col" style={{ gap: '0.8rem', flex: 1 }}>
            {heading}
            {title && typeof title === 'string' ? <NavLink to={to}>
                <Text maxLine={2} className="heading-6" style={{ width: '100%' }}>{title}</Text>
            </NavLink> : title}
            {content && typeof content === 'string' ? <Text maxLine={3} className="body-2" style={{ width: '100%' }}>{content}</Text> : content}
            {actions}
        </div>
    </div>
}

export const InforCard = ({ className = 'col', style, avatar, avatarSize = '6.4rem', title, subTitle, content, actions }) => {
    return <div className={`${className} infor-card-container`} style={style}>
        <img src={avatar} className="avatar" style={{ width: avatarSize, height: avatarSize, borderRadius: '50%' }} alt="" />
        <div className="col infor-details">
            {title && (typeof title === 'string' ? <Text className="heading-7" maxLine={2}>{title}</Text> : title)}
            {subTitle && (typeof subTitle === 'string' ? <Text className="subtitle-4" maxLine={2}>{subTitle}</Text> : subTitle)}
            {content && (typeof content === 'string' ? <Text className="body-3" style={{ padding: '0.4rem 0' }} maxLine={3}>{content}</Text> : content)}
        </div>
        {actions}
    </div>
}