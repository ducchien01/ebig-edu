import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../config/configApi"
import {  postData } from "../../baseDA"
import { TagItem } from "./da"

export class TagController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'TagAuth/GetAll')
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