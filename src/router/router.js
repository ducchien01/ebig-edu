import ProfileView from "../screen/module/customer/profile-view";
import SchoolClass from "../screen/module/edu/class/class";
import SchoolCourse from "../screen/module/edu/course/course";
import EduDashboard from "../screen/module/edu/dashboard/dashboard";
import EduHome from "../screen/module/edu/home/home";
import SchoolMentor from "../screen/module/edu/mentor/mentor";
import EduSchedule from "../screen/module/edu/schedule/schedule";
import Preview from "../screen/module/edu/course/local-component/preview";
import EduStudent from "../screen/module/edu/student/student";
import SocialDiscoveryView from "../screen/module/social/discovery/discovery";
import DiscoverTopicDetails from "../screen/module/social/discovery/local-component/topic-details";
import SocialHome from "../screen/module/social/home/home";
import ViewCourseDetails from "../screen/module/edu/course/course-details";
import SettingsCourse from "../screen/module/edu/course/local-component/settings-details";
import ListAllCourse from "../screen/module/edu/home/local-component/list-all-course";
import EcomHome from "../screen/module/ecom/product/home";
import EcomCart from "../screen/module/ecom/cart/cart";
import EcomPayment from "../screen/module/ecom/payment/payment";
import PaymentProcess from "../screen/module/ecom/payment/local-component/payment-success";
import ExamManagment from "../screen/module/edu/exam/exam";
import SettingsExam from "../screen/module/edu/exam/local-component/settings-details";
import QuestionManagment from "../screen/module/edu/question/question";
import SettingsQuestion from "../screen/module/edu/question/local-component/settings-details";

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
        case 'social/ecomerce/cart':
            return <EcomCart />
        case 'social/ecomerce/cart/payment':
            return <EcomPayment />
        case 'social/ecomerce/cart/payment/processing':
            return <PaymentProcess />
        case "edu/dashboard":
            return <EduDashboard />;
        case "edu/schedule":
            return <EduSchedule />;
        case "edu/course":
            return <SchoolCourse />;
        case "edu/course/details":
            return <SettingsCourse />;
        case "edu/class":
            return <SchoolClass />;
        case "edu/mentor":
            return <SchoolMentor />;
        case "edu/exam":
            return <ExamManagment />;
        case "edu/exam/details":
            return <SettingsExam />;
        case "edu/question":
            return <QuestionManagment />;
        case "edu/question/details":
            return <SettingsQuestion />;
        case "edu/course/preview":
            return <Preview />;
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