import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
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

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl +(AccountController.token() ? 'NewAuth' : 'New') + '/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response as {totalCount: number, data: Array<NewItem>}
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (newItem: NewItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'NewAuth/Action?action=add', {
            data: { data: newItem }
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

    static edit = async (newItem: NewItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'NewAuth/Action?action=edit', {
            data: {
                id: newItem.id,
                data: newItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as NewItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listNewId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'NewAuth/Action?action=delete', {
            data: { ids: listNewId }
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