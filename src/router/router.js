import SchoolClass from "../screen/module/class/class";
import SchoolCourse from "../screen/module/course/course";
import SchoolCurriculum from "../screen/module/curriculum/curriculum";
import EduDashboard from "../screen/module/dashboard/dashboard";
import SchoolMentor from "../screen/module/mentor/mentor";
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
            case "edu-management/school/course":
                return <SchoolCourse />;
            case "edu-management/school/class":
                return <SchoolClass />;
            case "edu-management/school/mentor":
                return <SchoolMentor />;
            case "edu-management/school/curriculum":
                return <SchoolCurriculum />;
            default:
                break;
        }
    }

};