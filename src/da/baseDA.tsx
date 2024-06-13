import { ToastMessage } from "../component/export-component";
import { showLoginPopup } from "../screen/layout/main-layout";
import { AccountController } from "../screen/module/account/controller";

export interface ObjWithKnownKeys {
    [k: string]: any;
}

export class BaseDA {
    static post = async (url: string, { headers, body }: { headers?: ObjWithKnownKeys, body?: any }) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers ?? { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            if (response.status === 200) {
                const jsonData = await response.json()
                return jsonData
            } else if (response.status === 401) {
                ToastMessage.errors('Không có quyền truy cập')
                showLoginPopup()
            } else {
                const txt = await response.text()
                console.error("Failed to POST data:", txt);
            }
        } catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    }

    static postFile = async (url: string, { headers, body }: { headers?: ObjWithKnownKeys, body?: FormData }) => {
        try {
            if (headers) {
                delete headers["Content-Type"]
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            })
            if (response.status === 200) {
                const jsonData = await response.json()
                return jsonData
            } else if (response.status === 401) {
                ToastMessage.errors('Không có quyền truy cập')
                setTimeout(AccountController.logout, 1000)
            } else {
                const txt = await response.text()
                console.error("Failed to POST data:", txt);
            }
        } catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    }

    static get = async (url: string, { headers }: { headers?: ObjWithKnownKeys }) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            })
            if (response.status === 200) {
                const jsonData = await response.json()
                return jsonData
            } else if (response.status === 401) {
                ToastMessage.errors('Không có quyền truy cập')
                setTimeout(AccountController.logout, 1000)
            } else {
                const txt = await response.text()
                console.error("Failed to POST data:", txt);
            }
        } catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    }
}