import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { MentorItem } from "./da"

export class MentorController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'MentorAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<MentorItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'MentorAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response.data as Array<MentorItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `MentorAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as MentorItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (mentorItem: MentorItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'MentorAuth/Action?action=add', {
            data: { data: mentorItem }
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

    static edit = async (mentorItem: MentorItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'MentorAuth/Action?action=edit', {
            data: {
                id: mentorItem.id,
                data: mentorItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as MentorItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listMentorId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'MentorAuth/Action?action=delete', {
            data: { ids: listMentorId }
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