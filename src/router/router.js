var routes = [
    // khai báo thêm router ở đây khi data của user không trả ra.
    // {
    //     path: "/nhap-kho/add",
    //     name: "",
    //     components: <Form />,
    // },
];
export default routes;
export const getUrlRouter = (moduleCode) => {
    switch (moduleCode) {
        case "quan-ly-ho-so-ung-vien":
            return "quan-ly-ho-so-ung-vien";
        case "quan-ly-don-hang":
            return "quan-ly-don-hang";
        case "quan-ly-nguoi-dung-mobile-app":
            return "quan-ly-nguoi-dung-mobile-app";
        case "quan-ly-nguoi-dung-he-thong":
            return "quan-ly-nguoi-dung-he-thong";
        case "quan-ly-lop-hoc":
            return "quan-ly-lop-hoc";
        case "quan-ly-xi-nghiep":
            return "quan-ly-xi-nghiep";
        case "quan-ly-thong-bao":
            return "quan-ly-thong-bao";
        case "quan-ly-ticket":
            return "quan-ly-ticket";
        case "Module":
            return "Module";
        case "Role":
            return "Role";
        case "doi-mat-khau":
            return "doi-mat-khau";
        case "banner":
            return "banner";
        case "gioi-thieu-dhm":
            return "gioi-thieu-dhm";
        case "gioi-thieu-nhat-ban":
            return "gioi-thieu-nhat-ban";
        case "gioi-thieu-cac-hinh-thuc-di-nhat":
            return "gioi-thieu-cac-hinh-thuc-di-nhat";
        case "video":
            return "video";
        case "tin-tuc":
            return "tin-tuc";
        default:
            break;
    }
};
export const getcomponentRouter = (moduleCode, ActionCode) => {
    if (ActionCode) {
        switch (moduleCode) {
            // case "quan-ly-ho-so-ung-vien":
            //     return <QuanLyUngVienForm controller={"Customer"} />;
            default:
                break;
        }
    } else {
        switch (moduleCode) {
            // case "quan-ly-ho-so-ung-vien":
            //     return <QuanLyUngVien controller={"Customer"} />;
            default:
                break;
        }
    }

};