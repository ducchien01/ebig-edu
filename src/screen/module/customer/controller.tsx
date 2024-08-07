import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../base-controller"
import { postData } from "../../baseDA"
import { AccountController } from "../account/controller"
import { UserInforItem } from "./da"

export class CustomerController {
    static getInfor = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerAuth/GetInfo')
        if (response) {
            if (response.code === 200) {
                return response.data as UserInforItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (type: number, params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + (AccountController.token() ? 'CustomerAuth' : 'Customer') + `/GetListSimpleByRequestBase?type=${type}`, params)
        if (response) {
            if (response.code === 200) {
                return response.data as Array<UserInforItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `Customer/GetById?Id=${id}`)
        if (response) {
            return response as UserInforItem
        }
        return null
    }

    static getIDByEmail = async (email: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `CustomerAuth/GetIDbyEmail?email=${email}`)
        if (response) {
            if (response.code === 200) {
                return response.data
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'CustomerAuth' : 'Customer') + `/ListItemByIds`, {
            data: ids
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<UserInforItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static edit = async (customerItem: UserInforItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerAuth/Action?action=edit', {
            data: {
                id: customerItem.id,
                data: [customerItem]
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
}