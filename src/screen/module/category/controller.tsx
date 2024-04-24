import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../base-controller"
import { postData } from "../../baseDA"
import { CateItem } from "./da"

export class CategoryController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'Cate/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CateItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getAllAuth = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'CateAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CateItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'Cate/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimpleAuth = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'CateAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `Cate/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as CateItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }
    
    static getByIdAuth = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `CateAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as CateItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (cateItem: CateItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CateAuth/Action?action=add', {
            data: { data: cateItem }
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

    static edit = async (cateItem: CateItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CateAuth/Action?action=edit', {
            data: {
                id: cateItem.id,
                data: cateItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as CateItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listCateId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CateAuth/Action?action=delete', {
            data: { ids: listCateId }
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