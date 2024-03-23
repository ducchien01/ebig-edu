import { Ultis } from "../../../Utils";
import ConfigAPI from "../../../config/configApi";
import { decryptData, encryptData } from "../../base-controller";
import { postData } from "../../baseDA";
import { ToastMessage } from "../../../component/export-component";
import { CustomerController } from "../customer/controller";
import { BaseDA } from "../../../da/baseDA";

const setToken = (txt) => Ultis.setStorage('token', txt)
const setTimeRefresh = () => {
    var now = Date.now() / 1000 + 9 * 60
    Ultis.setStorage('time_refresh', now)
}

const setRefreshToken = (txt) => Ultis.setStorage('refreshToken', encryptData(txt))

export class AccountController {
    static token = () => Ultis.getStorage('token')
    static timeRefresh = () => parseFloat(Ultis.getStorage('time_refresh') ?? '0')
    static refreshToken = () => decryptData(Ultis.getStorage('refreshToken'))

    static refreshNewToken = async () => {
        const response = await BaseDA.post(ConfigAPI.ebigUrl + `Account/refresh-token?token=${this.refreshToken()}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.code === 200) {
            setToken(response.data)
            setTimeRefresh()
        } else if (response.code === 404) {
            ToastMessage.errors('Phiên đăng nhập của bạn đã hết hạn')
            Ultis.clearStorage()
            window.location.href = '/' + window.location.pathname.split('/')[1]
        } else {
            ToastMessage.errors(response.message)
        }
    }

    static login = async (ggToken) => {
        const res = await postData(ConfigAPI.ebigUrl + 'Account/LoginAccessAsync', {
            data: {
                type: 'google',
                code: ggToken,
                mode: 0
            }
        })
        if (res) {
            if (res.code === 200) {
                setTimeRefresh()
                setToken(res.data.token)
                setRefreshToken(res.data.refreshToken)
                await CustomerController.getInfor()
                window.location.href = '/' + window.location.pathname.split('/')[1]
            } else {
                ToastMessage.errors(res.message)
            }
        }
    }

    static logout = () => {
        Ultis.clearStorage()
        window.location.href = '/' + window.location.pathname.split('/')[1]
    }
}