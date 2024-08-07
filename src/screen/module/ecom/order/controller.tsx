import { ToastMessage } from "wini-web-components"
import ConfigAPI from "../../../../config/configApi"
import { FilterListSimpleBody, getListSimpleBase } from "../../../base-controller"
import { postData } from "../../../baseDA"
import { OrderDetailsItem, OrderItem } from "./da"

export class OrderController {
    static getListSimple = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'ShopOrderAuth/GetListSimpleByRequestBase', params)
        if (response) {
            if (response.code === 200) {
                return response
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static getListSimpleDetails = async (params?: FilterListSimpleBody) => {
        const response = await getListSimpleBase(ConfigAPI.ebigUrl + 'ShopOrderDetailAuth/GetListSimpleByRequestBase', params)
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
        const response = await postData(ConfigAPI.ebigUrl + `ShopOrderAuth/GetById?Id=${id}`)
        if (response) {
            if (response.code === 200) {
                return response.data as OrderItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static add = async (orderItem: OrderItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ShopOrderAuth/Action?action=add', {
            data: { data: orderItem }
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

    static addOrderDetails = async (orders: Array<OrderDetailsItem>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ShopOrderDetailAuth/Action?action=add', {
            data: { data: orders ?? [] }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as Array<OrderDetailsItem>
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static edit = async (orderItem: OrderItem) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ShopOrderAuth/Action?action=edit', {
            data: {
                id: orderItem.id,
                data: orderItem
            }
        })
        if (response) {
            if (response.code === 200) {
                return response.data as OrderItem
            } else {
                ToastMessage.errors(response.message)
            }
        }
        return null
    }

    static delete = async (listOrderId: Array<string>) => {
        const response = await postData(ConfigAPI.ebigUrl + 'ShopOrderAuth/Action?action=delete', {
            data: { ids: listOrderId }
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