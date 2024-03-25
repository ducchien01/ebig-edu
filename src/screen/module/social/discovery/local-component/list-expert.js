import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { Text } from "../../../../../component/export-component"

export default function ListExpert() {
    const [data, setData] = useState([])

    useEffect(() => {
    }, [])

    return <div style={{ position: 'relative', width: '100%', height: '48rem' }}>
        <div className="row" style={{ gap: '4rem', overflow: 'auto hidden', width: '100%' }}>
            {Array.from({ length: 6 }).map((item, i) => {
                return <div key={'new-' + i} className="col expert-intro-container">
                    <Text maxLine={2} className="heading-6" >Lê Minh</Text>
                    <Text maxLine={2} className="body-2" >Nhiếp ảnh gia</Text>
                </div>
            })}
        </div>
        <button type="button" className="button-grey" style={{ borderRadius: '50%', position: 'absolute', left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}>
            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '1.4rem' }} />
        </button>
        <button type="button" className="button-grey" style={{ borderRadius: '50%', position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)' }}>
            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.4rem' }} />
        </button>
    </div>
}