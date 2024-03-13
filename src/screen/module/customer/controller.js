import { Ultis } from "../../../Utils"
import ConfigAPI from "../../../config/configApi"
import { postData } from "../../baseDA"
import { parseUserInfor } from "./da.tsx"

export class CustomerController {
    static userInfor = () => parseUserInfor({ json: JSON.parse(Ultis.getStorage('userInfor')) })
    static getInfor = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerAuth/GetInfo')
        if (response) {
            if (response.code === 200) {
                Ultis.setStorage('userInfor', JSON.stringify(response.data))
                return response
            }
        }
        return null
    }
}