import SchoolClass from "../screen/module/class/class";
import SchoolCourse from "../screen/module/course/course";
import SchoolCurriculum from "../screen/module/curriculum/curriculum";
import EduDashboard from "../screen/module/dashboard/dashboard";
import SchoolMentor from "../screen/module/mentor/mentor";
import EduSchedule from "../screen/module/schedule/schedule";
import CourseDetails from '../screen/module/course/local-component/details'
import Preview from "../screen/module/school-mn-export-view/preview";
import EduStudent from "../screen/module/student/student";
import ProfileView from "../screen/module/customer/profile-view";

export const getcomponentRouter = (moduleCode) => {
    switch (moduleCode) {
        case "edu-management/dashboard":
            return <EduDashboard />;
        case "edu-management/schedule":
            return <EduSchedule />;
        case "edu-management/school/course":
            return <SchoolCourse />;
        case "edu-management/school/course/details":
            return <CourseDetails />;
        case "edu-management/school/class":
            return <SchoolClass />;
        case "edu-management/school/mentor":
            return <SchoolMentor />;
        case "edu-management/school/course/preview":
            return <Preview />;
        case "edu-management/school/curriculum":
            return <SchoolCurriculum />;
        case "edu-management/student":
            return <EduStudent />;
        case "user/profile":
            return <ProfileView />;
        default:
            break;
    }
};