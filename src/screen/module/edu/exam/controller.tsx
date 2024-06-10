import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { ExamItem } from "./da"

export class ExamController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'ExamAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'ExamAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response as { totalCount: number, data: Array<ExamItem> }
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `ExamAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as ExamItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (examItem: ExamItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ExamAuth/Action?action=add', {
            data: { data: examItem }
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

    static edit = async (examItem: ExamItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ExamAuth/Action?action=edit', {
            data: {
                id: examItem.id,
                data: examItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as ExamItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listExamId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ExamAuth/Action?action=delete', {
            data: { ids: listExamId }
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