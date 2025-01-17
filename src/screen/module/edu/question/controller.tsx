import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { ExamQuestionItem } from "./da"

export class QuestionController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamQuestionItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'LessonAuth/GetListSimpleByRequestBase', params)
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
                return response.data as ExamQuestionItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + `LessonAuth/GetListByIds`, {
            data: ids ?? []
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamQuestionItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (examQuestionItem: ExamQuestionItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=add', {
            data: { data: examQuestionItem }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamQuestionItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getRandomExam = async (examId: string) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/RandomLessonByExamId', {
            data: examId
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<ExamQuestionItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static edit = async (examQuestionItem: ExamQuestionItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=edit', {
            data: {
                id: examQuestionItem.id,
                data: examQuestionItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as ExamQuestionItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }


    static delete = async (listExamQuestionIds: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'LessonAuth/Action?action=delete', {
            data: { ids: listExamQuestionIds }
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