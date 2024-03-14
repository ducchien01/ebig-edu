import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { getData } from "../../baseDA"
import { TagItem } from "./da"

export class TagController {
    static getAll = async () => {
        const response = await getData(ConfigAPI.ebigUrl + 'TagAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TagItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}