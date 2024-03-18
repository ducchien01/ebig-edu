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

// export const uploadFile = async ({ listFile, docId }) => {
//     listFile = [...listFile];
//     const now = new Date();
//     let headersObj: any = await headers();
//     headersObj.folder = UserService.user().id;
//     headersObj.collectionId = docId;
//     headersObj.code = ProjectDA.obj.Code;
//     headersObj.datee = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`; // datee chư sko phải date
//     let listFileResult = [];
//     for (let i = 0; i < Math.ceil(listFile.length / 5); i++) {
//         const formData = new FormData();
//         let endIndex = i * 5 + 5;
//         if (listFile.length < endIndex) {
//             endIndex = listFile.length;
//         }
//         let sliceList = listFile.slice(i * 5, endIndex);
//         for (let j = 0; j < sliceList.length; j++) {
//             formData.append("files", sliceList[j]);
//         }
//         let result = await BaseDA.postFile(ConfigApi.socketWiniFile + '/uploadfile', {
//             headers: headers,
//             formData: formData,
//         })
//         listFileResult.push(...result);
//     }
//     return listFileResult;
// }

