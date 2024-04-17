import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { ExamAnswerItem } from "./da"

export class ExamAnswerController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'AnswerAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamAnswerItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'AnswerAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `AnswerAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as ExamAnswerItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (examAnswerItem: ExamAnswerItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'AnswerAuth/Action?action=add', {
            data: { data: examAnswerItem }
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

    static edit = async (examAnswerItem: ExamAnswerItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'AnswerAuth/Action?action=edit', {
            data: {
                id: examAnswerItem.id,
                data: examAnswerItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as ExamAnswerItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listExamAnswerId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'AnswerAuth/Action?action=delete', {
            data: { ids: listExamAnswerId }
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