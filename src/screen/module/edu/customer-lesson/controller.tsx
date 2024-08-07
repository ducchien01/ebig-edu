import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { CustomerLessonItem } from "./da"

export class CustomerLessonController {
    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'CustomerLessonAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (customerLessonItem: CustomerLessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerLessonAuth/Action?action=add', {
            data: { data: customerLessonItem }
        })
        if (response) {
            if (response.code === 200) {
                return response.data
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static edit = async (customerLessonItem: CustomerLessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerLessonAuth/Action?action=edit', {
            data: {
                id: customerLessonItem.id,
                data: customerLessonItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listCustomerLessonId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerLessonAuth/Action?action=delete', {
            data: { ids: listCustomerLessonId }
        })
        if (response) {
            if (response.code === 200) {
                return response.data
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
}