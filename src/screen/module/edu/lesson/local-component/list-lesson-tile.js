import { useParams } from "react-router-dom"
import { FilledCircleQuestion, FilledFileText, FilledLogoYoutube } from "../../../../../assets/const/icon"
import { Text } from "wini-web-components"
import { LessonType } from "../da"

export default function ListLessonTile({ courseLessons = [], selectedId, style = {}, onSelected }) {
    const { lessonid } = useParams()
    const getPrefixIcon = (type) => {
        switch (type) {
            case LessonType.video:
                return <FilledLogoYoutube />
            case LessonType.paragraph:
                return <FilledFileText />
            case LessonType.task:
                return <FilledCircleQuestion />
            default:
                return <div></div>;
        }
    }

    return <div className="col " style={{ padding: '2.4rem 0', borderTop: 'var(--border-grey1)', gap: '3.2rem', flex: 1, height: '100%', width: '100%', ...style }}>
        <Text className="heading-6">Danh sách bài học</Text>
        <div className="col" style={{ overflow: 'hidden auto', flex: 1, height: '100%' }}>
            {courseLessons.filter(e => !e.parentId).map((item, i) => {
                let children = courseLessons.filter(e => e.parentId === item.id)
                return <div key={item.id} className="col" style={{ gap: '1.2rem' }}>
                    <div className="row" style={{ gap: '1.4rem' }}>
                        <div className="row label-2" style={{ width: '3.6rem', height: '3.6rem', borderRadius: '50%', backgroundColor: 'var(--background)', justifyContent: 'center' }}>{`U${i + 1}`}</div>
                        <Text maxLine={1} className="heading-7" style={{ width: '100%', flex: 1 }}>{item.name}</Text>
                        <Text maxLine={1} className="body-3">{`${i + 1}/${courseLessons.filter(e => !e.parentId).length}`}</Text>
                    </div>
                    <div className="col" style={{ paddingLeft: '4rem' }}>
                        {children.map(childItem => {
                            let check = false
                            if (selectedId) {
                                check = selectedId === childItem.id
                            } else {
                                check = childItem.lessonId === lessonid
                            }
                            return <button onClick={() => {
                                if (onSelected) onSelected(childItem)
                            }} key={childItem.id} className="row" style={{ padding: '0.8rem 1rem', gap: '0.8rem', borderRadius: '0.8rem', backgroundColor: check ? 'var(--background)' : null, cursor: onSelected ? 'auto' : 'context-menu' }}>
                                {getPrefixIcon(childItem.type)}
                                <Text className="label-4" maxLine={1} style={{ flex: 1, width: '100%' }}>{childItem.name}</Text>
                            </button>
                        })}
                    </div>
                </div>
            })}
        </div>
    </div>
}