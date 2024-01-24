export default class ConfigAPI {
    static loginUrl = "https://dhm.wini.vn/";
    // static loginUrl = "http://192.168.1.9:9010/api/";

    static fileUrl = "https://file-mamager.wini.vn/";
    // static fileUrl = "http://10.15.144.116:9092/";
    // static customerUrl = Url+ "http://http://10.15.144.62:9010/";
    // static Url = "http://http://10.15.144.62:/";

    // static customerUrl = "http://10.15.144.62:9010/";
    // static baseUrl = "http://10.15.144.62:9010/";
    // static noti = "http://10.15.144.62:9012/";
    // static productUrl = "10.15.144.116:9013/";
    // static newsUrl = "http://10.15.144.62:9011/";

    static customerUrl = "https://dhm.wini.vn/api/";
    // static customerUrl = "http://192.168.1.9:9010/api/";
    static baseUrl = "https://dhm.wini.vn/api/";
    // static baseUrl = "http://192.168.1.9:9010/api/";
    static noti = "http://esign.wini.vn/api/";
    static productUrl = "https://product.wini.vn/api/";
    static newsUrl = "https://news.wini.vn/api/";



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