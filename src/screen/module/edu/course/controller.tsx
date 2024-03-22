import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { CourseItem } from "./da"

export class CourseController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'CourseAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getById = async (id: string) => {
        const response = await postData(ConfigAPI.ebigUrl + `CourseAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as CourseItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (courseItem: CourseItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/Action?action=add', {
            data: { data: courseItem }
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

    static edit = async (courseItem: CourseItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/Action?action=edit', {
            data: {
                id: courseItem.id,
                data: courseItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as CourseItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listCourseId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/Action?action=delete', {
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