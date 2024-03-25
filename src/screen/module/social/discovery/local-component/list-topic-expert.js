import { InforCard } from "../../../../../project-component/card"
import avatarDemo from '../../../../../assets/demo-avatar2.png'

export default function ListTopicExpert() {
    return <div className='row' style={{ gap: '2rem', width: '100%' }}>
        {Array.from({ length: 5 }).map((item, i) => {
            return <InforCard
                key={'expert-' + i}
                style={{ flex: 1 }}
                avatar={avatarDemo}
                title={'Katie Cooper'}
                subTitle={'375 người theo dõi'}
                content={'Sr. Product Designer at Forge Studio working...'}
                actions={<button type="button" className="row button-primary"><div className="button-text-3">Theo dõi</div></button>}
            />
        })}
    </div>
}