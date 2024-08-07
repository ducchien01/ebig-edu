import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CustomerController } from "../../../customer/controller"
import expertBg from '../../../../../assets/expert-bg.png'
import { Text } from "wini-web-components"
import ListCustomerNews from "./list-customer-news"
import { NewStatus } from "../../new/da"
import { useSelector } from "react-redux"

export default function CustomerPage() {
    const { id } = useParams()
    const userInfor = useSelector((state) => state.account.data)
    const [customer, setCustomer] = useState()
    const [selectedTab, setSelectedTab] = useState(0)
    const [fixedTabbar, setFixedTabbar] = useState()

    const renderUI = () => {
        switch (selectedTab) {
            case 0:
                return <ListCustomerNews customer={customer} />;
            case 1:
                return <></>;
            case 2:
                return <></>;
            case 3:
                return <ListCustomerNews customer={customer} newStatus={NewStatus.draft} />;
            default:
                break;
        }
    }

    useEffect(() => {
        if (userInfor?.id === id) {
            setCustomer(userInfor)
        } else {
            CustomerController.getById(id).then(res => {
                if (res) setCustomer(res)
            })
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            let _tabbar = document.getElementById('handle-tabbar-customer-page')
            if (!_tabbar) {
                document.body.querySelector('.main-layout').removeEventListener('scroll', handleScroll)
                return
            }
            _tabbar = _tabbar.getBoundingClientRect()
            const _header = document.body.querySelector('.header').getBoundingClientRect()
            if (_tabbar.y < _header.height) {
                setFixedTabbar({ position: 'fixed', top: _header.height, width: _tabbar.width, zIndex: 2 })
            } else if (_tabbar.y >= _header.height) {
                setFixedTabbar(undefined)
            }
        }
        document.body.querySelector('.main-layout').addEventListener('scroll', handleScroll)
    }, [])

    return <div className="col">
        <div className="col hero-header">
            <img src={expertBg} alt="" style={{ width: '100%', height: '20rem' }} />
            <div id='handle-tabbar-customer-page' style={{ height: '6rem' }}>
                <div className='row' style={{ justifyContent: 'center', backgroundColor: '#fff', ...(fixedTabbar ?? {}) }}>
                    <div className="row filter-container col24 col20-xxl">
                        <div className="row">
                            <button className={`filter-tab ${selectedTab === 0 ? 'selected' : ''}`} onClick={() => { setSelectedTab(0) }}>
                                <Text className="label-4">Bài viết</Text>
                            </button>
                            <button className={`filter-tab ${selectedTab === 1 ? 'selected' : ''}`} onClick={() => { setSelectedTab(1) }}>
                                <Text className="label-4">Danh mục bài viết</Text>
                            </button>
                            {userInfor?.id === id ? <button className={`filter-tab ${selectedTab === 2 ? 'selected' : ''}`} onClick={() => { setSelectedTab(2) }}>
                                <Text className="label-4">Nháp</Text>
                            </button> : undefined}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {renderUI()}
    </div>
}
