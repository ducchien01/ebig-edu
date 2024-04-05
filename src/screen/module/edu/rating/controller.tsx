import { ToastMessage } from "../../../../component/export-component"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { RatingItem } from "./da"

export class RatingController {
    static getAll = async () => {
        const response = await postData(ConfigAPI.ebigUrl + 'RatingAuth/GetAll')
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
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'RatingAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `RatingAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as RatingItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getByLinkIds = async (ids: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + `RatingAuth/GetListRatingByIds`, {
            data: (ids ?? []).join(',')
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<RatingItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (ratingItem: RatingItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'RatingAuth/Action?action=add', {
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

    static edit = async (ratingItem: RatingItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'RatingAuth/Action?action=edit', {
            data: {
                id: ratingItem.id,
                data: ratingItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as RatingItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listRatingId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'RatingAuth/Action?action=delete', {
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