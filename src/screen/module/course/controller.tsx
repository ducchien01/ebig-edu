import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { getData } from "../../baseDA"
import { CourseItem } from "./da"

export class CourseController {
    static getAll = async () => {
        const response = await getData(ConfigAPI.ebigUrl + 'CourseAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}