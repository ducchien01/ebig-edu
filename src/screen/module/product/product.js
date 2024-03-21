import { NavLink } from "react-router-dom";
import { Text } from "../../../component/export-component";
import './product.css'
import ListProduct from "./local-component/list-product";

export default function ProductView() {
    return <div className="cart-view col view-container">
        <div className="heading-5" >Danh sách sản phẩm</div>
        <div className="row noti-identification">
            <div className="col" style={{ flex: 1, width: '100%', gap: '0.8rem' }}>
                <Text className="heading-7" style={{ width: '100%' }}>Hồ sơ bán hàng của bạn chưa được xác thực</Text>
                <Text maxLine={3} className="body-3" style={{ width: '100%' }}>Bạn vẫn có thể tạo và cấu hình sản phẩm mới, tuy nhiên sản phẩm này sẽ không được đăng bán trên sàn thương mại điện tử eBig cho đến khi bạn xác thực hồ sơ bán hàng và ký hợp đồng với eBig</Text>
            </div>
            <NavLink to='' className='row button-primary'><div className="button-text-3">Xác thực hồ sơ</div></NavLink>
        </div>
        <ListProduct />
    </div>
}