import { ToastMessage } from "../component/export-component"
import ConfigAPI from "../config/configApi"
import { BaseDA, ObjWithKnownKeys } from "../da/baseDA"
import { AccountController } from "./module/account/controller"

const getHeaders = async () => {
    const timeRefresh = AccountController.timeRefresh()
    const now = Date.now() / 1000
    let headersObj
    if (timeRefresh && timeRefresh > 0 && timeRefresh <= now) {
        await AccountController.refreshNewToken()
        headersObj = {
            refreshToken: AccountController.refreshToken(),
            Authorization: `Bearer ${AccountController.token()}`,
            'Content-Type': 'application/json'
        }
    } else if (AccountController.token()) {
        headersObj = {
            Authorization: `Bearer ${AccountController.token()}`,
            'Content-Type': 'application/json'
        }
    }
    return headersObj
}

export const postData = async (url: string, { data, headers }: { data?: any, headers?: ObjWithKnownKeys } = {}) => {
    const headersObj: any = await getHeaders()
    const response = await BaseDA.post(url, {
        headers: headers ? { ...headersObj, ...headers } : headersObj,
        body: data
    })
    return response
}

export const getData = async (url: string, { headers }: { headers?: ObjWithKnownKeys } = {}) => {
    const headersObj: any = await getHeaders()
    const response = await BaseDA.get(url, {
        headers: headers ? { ...headersObj, ...headers } : headersObj,
    })
    return response
}

export const uploadFiles = async (listFile: Array<File>) => {
    listFile = [...listFile];
    const headersObj: any = await getHeaders()
    const formData = new FormData();
    listFile.forEach(e => {
        formData.append("files", e);
    })
    const response = await BaseDA.postFile(ConfigAPI.fileUrl + 'SystemFileAuth/Upload', {
        headers: headersObj,
        body: formData,
    })
    if (response.code === 200) {
        return response.data
    } else {
        ToastMessage.errors(response.message)
    }
    return null;
}