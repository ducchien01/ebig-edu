import { Ultis } from "../../../Utils";
import ConfigAPI from "../../../config/configApi";
import { decryptData, encryptData } from "../../base-controller";
import { postData } from "../../baseDA";
import { ToastMessage } from "../../../component/export-component";

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
        const response = await postData(ConfigAPI.ebigUrl + 'Account/refresh-token', {
            headers: {
                'Content-Type': 'application/json',
                token: this.refreshToken()
            }
        })
        if (response.data.code === 200) {
            setToken(response.data.data)
            setTimeRefresh()
        } else if (response.data.code === 404) {
            ToastMessage.errors('Phiên đăng nhập của bạn đã hết hạn')
            Ultis.clearStorage()
            window.location.href = '/'
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
        debugger
        if (res) {
            if (res.code === 200)
                return res.data
            else
                ToastMessage.errors(res.message)

        }
        return null
    }
}