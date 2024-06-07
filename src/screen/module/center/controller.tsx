import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../base-controller"
import { postData } from "../../baseDA"
import { AccountController } from "../account/controller"
import { CenterItem, CustomerCenterItem } from "./da"

export class CenterController {
    static getInfor = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'Center/GetInfo')
        if (response) {
            if (response.code === 200) {
                return response.data as CenterItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (type: number, params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + `Center/GetListSimpleByRequestBase`, params)
        if (response) {
            if (response.code === 200) {
                return response as { totalCount: number, data: Array<CenterItem> }
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `Center/GetItemById?Id=${id}`)
        if (response) {
            return response.data as CenterItem
        }
        return null
    }

    static getByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + `Center/ListItemByIds`, {
            data: ids
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CenterItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (centerItem: CenterItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'Center/Action?action=add', {
            data: { data: [centerItem] }
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

    static edit = async (centerItem: CenterItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'Center/Action?action=edit', {
            data: { data: [centerItem] }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as CenterItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listCenterId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'Center/Action?action=delete', {
            data: { ids: listCenterId }
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

    // member in center
    static getListSimpleMember = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'CustomerCenter/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response as { totalCount: number, data: Array<CustomerCenterItem> }
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getMemberById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `CustomerCenter/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as CustomerCenterItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static addMember = async (memberItemList: Array<CustomerCenterItem>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerCenter/Action?action=add', {
            data: { data: memberItemList }
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

    static editMember = async (memberItemList: Array<CustomerCenterItem>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerCenter/Action?action=edit', {
            data: { data: memberItemList }
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

    static deleteMember = async (memberIds: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CustomerCenter/Action?action=delete', {
            data: { 
                data: [],
                ids: memberIds }
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