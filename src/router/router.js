import ProfileView from "../screen/module/customer/profile-view";
import SchoolClass from "../screen/module/edu/class/class";
import SchoolCourse from "../screen/module/edu/course/course";
import SchoolCurriculum from "../screen/module/edu/curriculum/curriculum";
import EduDashboard from "../screen/module/edu/dashboard/dashboard";
import EduHome from "../screen/module/edu/home/home";
import SchoolMentor from "../screen/module/edu/mentor/mentor";
import EduSchedule from "../screen/module/edu/schedule/schedule";
import Preview from "../screen/module/edu/course/local-component/preview";
import EduStudent from "../screen/module/edu/student/student";
import SocialDiscoveryView from "../screen/module/social/discovery/discovery";
import DiscoverTopicDetails from "../screen/module/social/discovery/local-component/topic-details";
import SocialHome from "../screen/module/social/home/home";
import ViewCourseDetails from "../screen/module/edu/course/local-component/view-course-details";
import CourseDetails from "../screen/module/edu/course/local-component/settings-details";
import ListAllCourse from "../screen/module/edu/home/local-component/list-all-course";
import EcomHome from "../screen/module/ecom/product/home";

export const getcomponentRouter = (moduleCode) => {
    switch (moduleCode) {
        case 'social/home':
            return <SocialHome />
        case 'social/home/news':
            return <SocialHome />
        case 'social/discovery':
            return <SocialDiscoveryView />
        case 'social/discovery/topic':
            return <DiscoverTopicDetails />
        case 'social/education':
            return <EduHome />
        case 'social/education/courses':
            return <ListAllCourse />
        case "social/education/course":
            return <ViewCourseDetails />;
        case 'social/ecomerce':
            return <EcomHome />
        case "edu/dashboard":
            return <EduDashboard />;
        case "edu/schedule":
            return <EduSchedule />;
        case "edu/school/course":
            return <SchoolCourse />;
        case "edu/school/course/details":
            return <CourseDetails />;
        case "edu/school/class":
            return <SchoolClass />;
        case "edu/school/mentor":
            return <SchoolMentor />;
        case "edu/school/course/preview":
            return <Preview />;
        case "edu/school/curriculum":
            return <SchoolCurriculum />;
        case "edu/student":
            return <EduStudent />;
        case "edu/user/profile":
            return <ProfileView />;
        case "product-management":
            // return <ProductView />;
        default:
            break;
    }
};