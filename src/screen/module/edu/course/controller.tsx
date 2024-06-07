import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { AccountController } from "../../account/controller"
import { CourseItem } from "./da"

export class CourseController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'Course/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getAllAuth = async () => {
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
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'Course/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response as {totalCount: number, data: Array<CourseItem>}
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimpleAuth = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'CourseAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + (AccountController.token() ? 'CourseAuth' : 'Course') + `/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as CourseItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/ListItemByIds', {
            data: ids ?? []
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getLearningProgressByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseAuth/CListItemByIds', {
            data: ids ?? []
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseItem>
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