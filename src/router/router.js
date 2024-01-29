import EduDashboard from "../screen/dashboard/dashboard";

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
            case "edu-management/dashboard":
                return <EduDashboard />;
            default:
                break;
        }
    }

};