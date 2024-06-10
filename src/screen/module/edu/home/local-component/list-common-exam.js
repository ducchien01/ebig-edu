import { Text } from '../../../../../component/export-component'
import { FilledBook, FilledClock, OutlineStar } from '../../../../../assets/const/icon'
import { useEffect, useState } from 'react'
import { ExamController } from '../../exam/controller'
import { CenterController } from '../../../center/controller'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function ListCommonExam() {
    const [data, setData] = useState([])
    const [listCenter, setListCenter] = useState([])

    useEffect(() => {
        ExamController.getListSimple({ page: 1, take: 4, filter: [{ field: 'status', operator: '=', value: 1 }] }).then(res => {
            const centerIds = res.data.map(e => e.centerId)
            if (centerIds) CenterController.getByIds(centerIds).then(cusRes => {
                if (cusRes) setListCenter(cusRes)
            })
            if (res) setData(res.data)
        })
    }, [])

    return <div className="row" style={{ gap: '4rem', alignItems: 'stretch' }}>
        {data.map((item, i) => {
            const centerItem = listCenter.find(e => e.id === item.centerId)
            return <div key={item.id} className="row" style={{ gap: '1.6rem', padding: '1.6rem', borderBottom: 'var(--border-grey1)', width: '100%' }}>
                <div className="col" style={{ gap: '0.8rem', flex: 1 }}>
                    <div className="div" style={{ gap: '1.2rem' }}>
                        <Text className="heading-7">{item.name}</Text>
                        <NavLink to={'/center/' + centerItem?.id} className="semibold2" style={{ color: 'var(--primary-color)' }}>
                            {centerItem?.name ?? '-'}
                        </NavLink>
                    </div>
                    <div className="row" style={{ gap: '1.2rem' }}>
                        <div className="row" style={{ gap: '0.4rem' }}>
                            <FilledClock />
                            <Text className="subtitle-3">{item.time} phút</Text>
                        </div>
                        <div className="row" style={{ gap: '0.4rem' }}>
                            <FilledBook />
                            <Text className="subtitle-3">{item.quantityQuestion}</Text>
                        </div>
                        <div className="row" style={{ gap: '0.4rem' }}>
                            <OutlineStar />
                            <Text className="subtitle-3">0(0)</Text>
                        </div>
                    </div>
                </div>
                <NavLink to={`/education/exam/${item.id}`} className={'row button-infor border'} style={{ borderRadius: '0.8rem' }}>
                    <Text className="button-text-3">Vào thi</Text>
                    <FontAwesomeIcon icon={faArrowRight} />
                </NavLink>
            </div>
        })}
    </div >
}