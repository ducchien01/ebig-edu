import CryptoJS from 'crypto-js';
import { postData } from './baseDA';
import ConfigAPI from '../config/configApi';
import { ToastMessage } from '../component/export-component';
const secretPass = "lkjhgndsa123!@#";

export const encryptData = (text: string) => {
    const data = CryptoJS.AES.encrypt(JSON.stringify(text), secretPass).toString();
    return data;
}
export const decryptData = (text: string) => {
    if (text) {
        const bytes = CryptoJS.AES.decrypt(text, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    }
    return null;
}

interface FilterItem {
    key: string,
    value: string,
    /** value: contains , > , < , =  */
    operator: string,
}

export interface FilterListSimpleBody {
    /** number of element in response list */
    take?: number,
    /** reponse list = element index of ((page - 1) * take) to element index of (page * take) */
    page?: number,
    /** object in response list only return value of prop in selectProps */
    selectProps?: Array<string>,
    /** response list is sorted by elements in this list */
    sort?: Array<string>,
    /** response list return elements have key and value (conatins or valid) according to this list  */
    filter?: Array<FilterItem>
}

export const getListSimpleBase = async (url: string, params?: FilterListSimpleBody) => {
    const response = await postData(url, {
        data: {
            "loadOptions": {
                "requireTotalCount": true,
                "skip": (params?.take ?? 10) * ((params?.page ?? 1) - 1),
                "take": params?.take ?? 10,
                "sort": (params?.sort ?? []).map(e => {
                    return {
                        "selector": e,
                        "desc": true
                    }
                }),
                "select": params?.selectProps ?? [] //  chọn trường
            },
            "filter": params?.filter ? params?.filter.map(e => [e.key, 'contains', e.value]).reduce((a, b) => a.concat(b)) : [], // "startswith", "endswith", "contains", "notcontains"
        }
    })
    return response
}

export const getFilesByIds = async (listId: Array<string>) => {
    let res = await postData(ConfigAPI.ebigUrl + 'SystemFileAuth/GetListByIds', { data: listId })
    if (res.code === 200) {
        return res.data
    } else {
        ToastMessage.errors(res.message)
    }
    return null
}