export default class ConfigAPI {
    static loginUrl = "https://dhm.wini.vn/";
    static fileUrl = "http://10.15.144.116:9092/";



    static base_headers = (contentType) => {
        return {
            "accept": "*/*",
            "token": localStorage.getItem("token"),
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": contentType != null ? contentType : 'application/json',
        }
    }
    static file_headers = () => {
        return {
            "accept": "*/*",
            token: localStorage.getItem('token'),
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
            // "language": "vi"
        };
    }
}