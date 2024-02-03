import EduDashboard from "../screen/module/dashboard/dashboard";
import EduSchedule from "../screen/module/schedule/schedule";

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
            case "edu-management/schedule":
                return <EduSchedule />;
            default:
                break;
        }
    }

};