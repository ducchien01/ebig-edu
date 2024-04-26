import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CustomerController } from "../../../customer/controller"
import expertBg from '../../../../../assets/expert-bg.png'
import { Text } from "../../../../../component/export-component"
import ListCustomerNews from "./list-customer-news"
import { NewStatus } from "../../new/da"

export default function CustomerPage() {
    const { id } = useParams()
    const user = CustomerController.userInfor()
    const [customer, setCustomer] = useState()
    const [selectedTab, setSelectedTab] = useState(0)
    const [height, setHeight] = useState(0)

    const renderUI = () => {
        switch (selectedTab) {
            case 0:
                return <ListCustomerNews
                    customer={customer}
                    onScroll={(ev) => {
                        setHeight(ev.target.scrollTop + 'px')
                    }}
                />;
            case 1:
                return <></>;
            case 2:
                return <></>;
            case 3:
                return <ListCustomerNews
                    customer={customer}
                    onScroll={(ev) => {
                        setHeight(ev.target.scrollTop + 'px')
                    }}
                    newStatus={NewStatus.draft}
                />;
            default:
                break;
        }
    }

    useEffect(() => {
        if (user?.id === id) {
            setCustomer(user)
        } else {
            CustomerController.getById(id).then(res => {
                if (res) setCustomer(res)
            })
        }
    }, [])

    return <div className="col" style={{ flex: 1, height: '100%', width: '100%', position: 'relative' }}>
        <div className="col hero-header" style={{ position: 'absolute', top: `max(-${height}, -22.4rem)`, left: 0, right: 0, gap: '2.4rem' }}>
            <img src={expertBg} alt="" style={{ width: '100%', height: '20rem' }} />
            <div className="row filter-news-container" style={{ padding: '0 2rem', zIndex: 2 }}>
                <div className="row" style={{ gap: '1.6rem', borderBottom: '1px inset #00358014', backgroundColor: '#ffffff' }}>
                    <div className={`filter-news-tab ${selectedTab === 0 ? 'selected' : ''}`} onClick={() => { setSelectedTab(0) }}>
                        <Text className="label-4">Bài viết</Text>
                    </div>
                    <div className={`filter-news-tab ${selectedTab === 1 ? 'selected' : ''}`} onClick={() => { setSelectedTab(1) }}>
                        <Text className="label-4">Danh mục bài viết</Text>
                    </div>
                    <div className={`filter-news-tab ${selectedTab === 2 ? 'selected' : ''}`} onClick={() => { setSelectedTab(2) }}>
                        <Text className="label-4">Danh sách khóa học</Text>
                    </div>
                    {user?.id === id ? <div className={`filter-news-tab ${selectedTab === 3 ? 'selected' : ''}`} onClick={() => { setSelectedTab(3) }}>
                        <Text className="label-4">Nháp</Text>
                    </div> : null}
                </div>
            </div>
        </div>
        {renderUI()}
    </div>
}
