import { NavLink } from "react-router-dom"
import { Text } from "wini-web-components"

export const PostCard = ({ className = 'col', imgUrl, imgStyle, heading, title, content, actions, style, to, state }) => {
    return <div className={`${className} post-card-container`} style={style}>
        <NavLink to={to} state={state} className="row thumbnail" style={imgStyle}>
            <img src={imgUrl} style={{ width: '100%', height: '100%' }} alt="" />
        </NavLink>
        <div className="col" style={{ gap: '0.8rem', flex: 1 }}>
            {heading}
            {title && typeof title === 'string' ? <NavLink to={to}>
                <Text maxLine={2} className="heading-7" style={{ width: '100%' }}>{title}</Text>
            </NavLink> : title}
            {content && typeof content === 'string' ? <Text maxLine={3} className="body-2" style={{ width: '100%' }}>{content}</Text> : content}
            <div style={{ flex: 1 }} />
            {actions}
        </div>
    </div>
}

export const InforCard = ({ className = 'col', style, avatar, avatarSize = '6.4rem', title, subTitle, content, actions, to }) => {
    return <div className={`${className} infor-card-container`} style={style}>
        <NavLink to={to}>
            <img src={avatar} className="avatar" style={{ width: avatarSize, height: avatarSize, borderRadius: '50%' }} alt="" />
        </NavLink>
        <div className="col infor-details">
            {title && (typeof title === 'string' ? <Text className="heading-7" maxLine={2}>{title}</Text> : title)}
            {subTitle && (typeof subTitle === 'string' ? <Text className="subtitle-4" maxLine={2}>{subTitle}</Text> : subTitle)}
            {content && (typeof content === 'string' ? <Text className="body-3" style={{ padding: '0.4rem 0' }} maxLine={3}>{content}</Text> : content)}
        </div>
        {actions}
    </div>
}

export const CourseCard = ({ className = 'col', imgUrl, imgStyle, title, content, subtitle, bottom, actions, style, to }) => {
    return <div className={`${className} course-card-container`} style={style}>
        <div className="row main-content-container">
            <NavLink to={to} className="row thumbnail" style={imgStyle}>
                <img src={imgUrl} style={{ width: '100%', height: '100%' }} alt="" />
            </NavLink>
            <div className="row" style={{ flex: 1, gap: '1.6rem', alignItems: 'start' }}>
                <div className="col" style={{ gap: '0.4rem', flex: 1 }}>
                    {title && typeof title === 'string' ? <NavLink to={to}>
                        <Text maxLine={2} className="heading-7" style={{ width: '100%' }}>{title}</Text>
                    </NavLink> : title}
                    {subtitle && typeof subtitle === 'string' ? <Text maxLine={2} className="subtitle-4" style={{ width: '100%' }}>{subtitle}</Text> : subtitle}
                    {content}
                </div>
                {actions}
            </div>
        </div>
        {bottom}
    </div>
}