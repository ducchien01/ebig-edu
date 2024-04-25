import { ToastMessage } from "../../../component/export-component"
import ConfigAPI from "../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../base-controller"
import { postData } from "../../baseDA"
import { LikeItem } from "./da"

export class LikeController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'LikeAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<LikeItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'LikeAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `LikeAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as LikeItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getTotalLikeByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + `LikeAuth/GetLikeById`, {
            data: (ids??[]).join(',')
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

    static add = async (likeItem: LikeItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LikeAuth/Action?action=add', {
            data: { data: likeItem }
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

    static edit = async (likeItem: LikeItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LikeAuth/Action?action=edit', {
            data: {
                id: likeItem.id,
                data: likeItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as LikeItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listLikeId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LikeAuth/Action?action=delete', {
            data: { ids: listLikeId }
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