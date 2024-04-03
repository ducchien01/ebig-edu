import { useEffect, useState } from "react"

export default function EditVideo({ data }) {
    const [listVideo, setListVideo] = useState([])

    useEffect(() => {
        setListVideo(data?.list ?? [])
    }, [data])

    return <div></div>
}