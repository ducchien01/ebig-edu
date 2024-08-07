import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { TestResultDetailsItem, TestResultItem } from "./da"

export class TestResultController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response as Array<TestResultItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getAllTestAnswer = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestLessonAuth/GetAll')
        if (response) {
            if (response.code === 200) {
                return response as Array<TestResultItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimpleTestAnswer = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'TestLessonAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'TestAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `TestAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as TestResultItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (ratingItem: TestResultItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestAuth/Action?action=add', {
            data: { data: ratingItem }
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

    static addListTestAnswer = async (listAnwser: Array<TestResultDetailsItem>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestLessonAuth/Action?action=add', {
            data: { data: listAnwser }
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

    static edit = async (ratingItem: TestResultItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestAuth/Action?action=edit', {
            data: {
                id: ratingItem.id,
                data: ratingItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as TestResultItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listRatingId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'TestAuth/Action?action=delete', {
            data: { ids: listRatingId }
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