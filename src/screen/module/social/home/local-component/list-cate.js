import { useState } from "react"
import { InfiniteScroll } from "wini-web-components"

export default function ListCustomerCate({onScroll}) {
    const [total, setTotal] = useState()
    const [listCate, setListCate] = useState([])

    return <InfiniteScroll handleScroll={(onLoadMore, ev) => {
        if (onLoadMore) getData()
        onScroll(ev)
    }} className="col" style={{ flex: 1, height: '100%', overflow: 'hidden auto', zIndex: 1 }}>
        <div className="row" style={{ width: '100%' }}>
            <div className="col col16 col24-md col24-sm col24-min" style={{ gap: '3.2rem', padding: '28.8rem 2rem 1.2rem', '--gutter': '0px' }}>
                
            </div>
        </div>
    </InfiniteScroll>
}