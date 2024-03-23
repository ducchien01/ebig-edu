import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import {  postData } from "../../baseDA"
import { CateItem } from "./da"

export class CategoryController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'TagAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CateItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}