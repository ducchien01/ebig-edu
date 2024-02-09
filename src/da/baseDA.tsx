const base_headers = () => {
    return {
        "accept": "*/*",
        "token": localStorage.getItem("token"),
        "Authorization": `Bearer ${localStorage.getItem("token")}` ?? "",
        "Content-Type": 'application/json',
    }
}
const file_headers = () => {
    return {
        "accept": "*/*",
        "token": localStorage.getItem('token') ?? '',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
        // "language": "vi"
    };
}

export const uploadFile = async (url: string, { data }: { data: FormData }) => {
    try {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: file_headers(),
            body: data
        };
        const response = await fetch(url, requestOptions)

        if (response.status === 200) {
            const responseJson = await response.json()
            return responseJson;
        } else {
            console.error("occur error: ", response.statusText);
        }
    } catch (error) {
        console.error("Failed to upload file:", error);
        throw error;
    }
};

export const postData = async (url: string, { headers, obj }: { headers: HeadersInit, obj: any }) => {
    try {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: headers || base_headers(),
            body: JSON.stringify(obj)
        };
        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            const responseJson = await response.json()
            return responseJson;
        } else {
            console.error("occur error: ", response.statusText);
        }
    } catch (error) {
        console.error("Failed to POST data:", error);
        throw error;
    }
};

export const getData = async (url: string) => {
    try {
        const requestOptions: RequestInit = {
            method: "GET",
            headers: file_headers(),
        };
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};
