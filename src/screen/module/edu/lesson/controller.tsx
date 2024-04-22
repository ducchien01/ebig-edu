import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { CourseLessonItem, LessonItem } from "./da"

export class LessonController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<LessonItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl +'LessonAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `LessonAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as LessonItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static addToCourse = async (courseLessonItem: CourseLessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseLessonAuth/Action?action=add', {
            data: { data: courseLessonItem }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<CourseLessonItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static editCourseLesson = async (courseLessonItem: CourseLessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseLessonAuth/Action?action=edit', {
            data: {
                id: courseLessonItem.id,
                data: courseLessonItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as CourseLessonItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static deleteCourseLesson = async (listCourseLessonId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'CourseLessonAuth/Action?action=delete', {
            data: { ids: listCourseLessonId }
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

    static add = async (lessonItem: LessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=add', {
            data: { data: lessonItem }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<LessonItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static edit = async (lessonItem: LessonItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=edit', {
            data: {
                id: lessonItem.id,
                data: lessonItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as LessonItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }


    static delete = async (listLessonId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=delete', {
            data: { ids: listLessonId }
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