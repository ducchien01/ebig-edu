import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { ClassItem } from "./da"

export class ClassController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'Class/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ClassItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getAllAuth = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'ClassAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ClassItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'Class/GetListSimpleByRequestBase', params)
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
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'ClassAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `ClassAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as ClassItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (classItem: ClassItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ClassAuth/Action?action=add', {
            data: { data: [classItem] }
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

    static edit = async (classItemList: Array<ClassItem>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ClassAuth/Action?action=edit', {
            data: {
                data: classItemList
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as ClassItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listCourseId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ClassAuth/Action?action=delete', {
            data: { ids: listCourseId }
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