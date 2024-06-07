import EduHome from "../screen/module/edu/home/home";
import Preview from "../screen/module/edu/course/local-component/preview";
import SocialDiscoveryView from "../screen/module/social/discovery/discovery";
import DiscoverTopicDetails from "../screen/module/social/discovery/local-component/topic-details";
import SocialHome from "../screen/module/social/home/home";
import ViewCourseDetails from "../screen/module/edu/course/course-details";
import SettingsCourse from "../screen/module/edu/course/local-component/settings-details";
import EcomHome from "../screen/module/ecom/product/home";
import EcomCart from "../screen/module/ecom/cart/cart";
import EcomPayment from "../screen/module/ecom/payment/payment";
import PaymentProcess from "../screen/module/ecom/payment/local-component/payment-success";
import SettingsExam from "../screen/module/edu/exam/local-component/settings-details";
import SettingsQuestion from "../screen/module/edu/question/local-component/settings-details";
import SettingsNews from "../screen/module/social/new/local-component/settings-details";
import ViewExamDetails from "../screen/module/edu/exam/exam-details";
import ViewTesting from "../screen/module/edu/exam/local-component/testing";
import ExamResultView from "../screen/module/edu/exam/local-component/exam-result";
import CenterHome from "../screen/module/center/home";
import ListCenter from "../screen/module/center/local-component/list-center";

export const getcomponentRouter = (moduleCode) => {
    switch (moduleCode) {
        case "centers":
            return <ListCenter />;
        case "center":
            return <CenterHome />;
        case 'social':
            return <SocialHome />;
        case 'my-page':
            return <SocialHome customerPage={true} />
        case 'social/news':
            return <SocialHome />
        case 'social/news/create':
            return <SettingsNews />
        case 'social/news/edit':
            return <SettingsNews />
        case 'center/news/create':
            return <SettingsNews />
        case 'center/news/edit':
            return <SettingsNews />
        case 'discovery':
            return <SocialDiscoveryView />
        case 'discovery/topic':
            return <DiscoverTopicDetails />
        case 'education':
            return <EduHome />
        case "center/home":
            return <CenterHome />;
        case "center/schedule":
            return <CenterHome />;
        case "center/courses":
            return <CenterHome />;
        case "center/students":
            return <CenterHome />;
        case "center/classes":
            return <CenterHome />;
        case "center/mentors":
            return <CenterHome />;
        case "center/curriculum":
            return <CenterHome />;
        case "center/exams":
            return <CenterHome />;
        case "center/questions":
            return <CenterHome />;
        case "education/course":
            return <ViewCourseDetails />;
        case 'ecomerce':
            return <EcomHome />
        case 'ecomerce/cart':
            return <EcomCart />
        case 'ecomerce/cart/payment':
            return <EcomPayment />
        case 'ecomerce/cart/payment/processing':
            return <PaymentProcess />
        case "center/courses/details":
            return <SettingsCourse />;
        case "center/exams/details":
            return <SettingsExam />;
        case "center/questions/details":
            return <SettingsQuestion />;
        case "center/courses/preview":
            return <Preview />;
        case "education/exam":
            return <ViewExamDetails />;
        case "education/testing":
            return <ViewTesting />;
        case "education/exam-result":
            return <ExamResultView />;
        // case "edu/user/profile":
        //     return <ProfileView />;
        // case "product-management":
        // return <ProductView />;
        default:
            return <SocialHome />
    }
};