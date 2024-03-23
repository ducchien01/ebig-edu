import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { postData } from "../../../baseDA"
import { AccountController } from "../../account/controller"
import { NewItem } from "./da"

export class NewController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'NewAuth' : 'New') + '/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<NewItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'NewAuth' : 'New') + `/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as NewItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}