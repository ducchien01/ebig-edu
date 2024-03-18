import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { getData, postData } from "../../baseDA"
import { TopicItem } from "./da"

export class TopicController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'TopicAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TopicItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}