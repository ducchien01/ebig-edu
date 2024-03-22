import ProfileView from "../screen/module/customer/profile-view";
import SchoolClass from "../screen/module/edu/class/class";
import SchoolCourse from "../screen/module/edu/course/course";
import CourseDetails from "../screen/module/edu/course/course-details";
import SchoolCurriculum from "../screen/module/edu/curriculum/curriculum";
import EduDashboard from "../screen/module/edu/dashboard/dashboard";
import SchoolMentor from "../screen/module/edu/mentor/mentor";
import EduSchedule from "../screen/module/edu/schedule/schedule";
import Preview from "../screen/module/edu/school-mn-export-view/preview";
import EduStudent from "../screen/module/edu/student/student";
import ProductView from "../screen/module/product/product";
import SocialHome from "../screen/module/social/home/home";

export const getcomponentRouter = (moduleCode) => {
    switch (moduleCode) {
        case 'social/home':
            return <SocialHome />
        case "edu/home/dashboard":
            return <EduDashboard />;
        case "edu/home/schedule":
            return <EduSchedule />;
        case "edu/home/school/course":
            return <SchoolCourse />;
        case "edu/home/school/course/details":
            return <CourseDetails />;
        case "edu/home/school/class":
            return <SchoolClass />;
        case "edu/home/school/mentor":
            return <SchoolMentor />;
        case "edu/home/school/course/preview":
            return <Preview />;
        case "edu/home/school/curriculum":
            return <SchoolCurriculum />;
        case "edu/home/student":
            return <EduStudent />;
        case "edu/user/profile":
            return <ProfileView />;
        case "product-management":
            return <ProductView />;
        default:
            break;
    }
};