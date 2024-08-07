import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../base-controller"
import { getData, postData } from "../../baseDA"
import { AccountController } from "../account/controller"
import { TopicItem } from "./da"

export class TopicController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'TopicAuth' : 'Topic') + '/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TopicItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + (AccountController.token() ? 'TopicAuth' : 'Topic') + '/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response as { totalCount: number, data: Array<TopicItem> }
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'TopicAuth' : 'Topic') + `/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as TopicItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'TopicAuth' : 'Topic') + `/GetListByIds`, {
            data: ids ?? []
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TopicItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByParentIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + `TopicAuth/ListItembyParentIds`, {
            data: ids ?? []
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TopicItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getFields = async () => {
        const response = await getData(ConfigAPI.ebigUrl + 'TopicAuth/GetField')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<TopicItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (topicItem: TopicItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TopicAuth/Action?action=add', {
            data: { data: topicItem }
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

    static edit = async (topicItem: TopicItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TopicAuth/Action?action=edit', {
            data: {
                id: topicItem.id,
                data: topicItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as TopicItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listTopicId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TopicAuth/Action?action=delete', {
            data: { ids: listTopicId }
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