import { OutlineBooks, FilledBooks, OutlineUserProfile, OutlineStar, OutlineVideoPlaylist, OutlineGChart, OutlineVerified, OutlineTimeAlarm, OutlineHome, FilledHome, OutlineShop, OutlineCompass, OutlineBell, FilledBell, OutlineChat, FilledChat, FilledShop } from './icon'
import MyUploadAdapter from '../../project-component/ckeditor';
export const modules = [
    {
        id: 2,
        parentId: 1,
        name: 'Social',
        link: 'social',
        path: '',
        icon: <OutlineHome width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledHome width='2.4rem' height='2.4rem' />,
    },
    {
        id: 3,
        parentId: 1,
        name: 'Education',
        link: 'education',
        icon: <OutlineBooks width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBooks width='2.4rem' height='2.4rem' />,
    },
    {
        id: 4,
        parentId: 1,
        name: 'Shop',
        link: 'ecomerce',
        icon: <OutlineShop width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledShop width='2.4rem' height='2.4rem' />,
    },
    {
        id: 5,
        parentId: 1,
        name: 'Discovery',
        link: 'discovery',
        icon: <OutlineCompass width='2.4rem' height='2.4rem' />,
        selectedIcon: <OutlineCompass width='2.4rem' height='2.4rem' />,
    },
    {
        id: 6,
        parentId: 1,
        name: 'Notification',
        link: 'notification',
        icon: <OutlineBell width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBell width='2.4rem' height='2.4rem' />,
    },
    {
        id: 7,
        parentId: 1,
        name: 'Chat',
        link: 'chat',
        icon: <OutlineChat width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledChat width='2.4rem' height='2.4rem' />,
    },
]

export const eduExpertModules = [
    {
        id: 1,
        name: 'Dashboard',
        link: 'education/dashboard',
    },
    {
        id: 2,
        name: 'Teaching Schedule',
        link: 'education/schedule',
    },
    {
        id: 3,
        name: 'Course Management',
    },
    {
        id: 4,
        name: 'Exam Management',
    },
    {
        id: 5,
        name: 'Student Management',
        link: 'education/students',
    },
    {
        id: 6,
        parentId: 3,
        name: 'Course',
        link: 'education/courses',
    },
    {
        id: 7,
        parentId: 3,
        name: 'Class',
        link: 'education/classes',
    },
    {
        id: 8,
        parentId: 3,
        name: 'Mentor',
        link: 'education/mentors',
    },
    {
        id: 9,
        parentId: 3,
        name: 'Curriculum',
        link: 'education/curriculum',
    },
    {
        id: 10,
        parentId: 4,
        name: 'Exam',
        link: 'education/exams',
    },
    {
        id: 11,
        parentId: 4,
        name: 'Question',
        link: 'education/questions',
    },
]

// react-router-dom use path params: exp with params id & type => ...link/:id/:type => make optional ...link/(/:id)(/:type)
export const extendView = [
    {
        name: 'Chỉnh sửa bài học',
        slug: 'lessons-settings',
        parentId: 'lessons',
        path: 'education/courses/details/lessons-settings/:id/:lessonid',
        link: 'education/courses/details',
    },
    {
        name: 'Tổng quan',
        slug: 'overview',
        path: 'education/courses/details/overview/:id',
        link: 'education/courses/details',
    },
    {
        name: 'Danh sách bài học',
        slug: 'lessons',
        path: 'education/courses/details/lessons/:id',
        link: 'education/courses/details',
    },
    {
        name: 'Bán kèm lớp học',
        slug: 'additional-class',
        path: 'education/courses/details/additional-class/:id',
        link: 'education/courses/details',
    },
    {
        name: 'Xem trước khóa học',
        // slug: 'certificate',
        path: 'education/courses/preview/:id',
        link: 'education/courses/preview',
    },
    {
        name: 'exam details',
        // slug: 'certificate',
        path: 'education/exams/details/:id',
        link: 'education/exams/details',
    },
    {
        name: 'question details',
        // slug: 'certificate',
        path: 'education/questions/details/:id',
        link: 'education/questions/details',
    },
    {
        name: 'news details',
        path: 'social/news/:id',
        link: 'social/news',
    },
    {
        name: 'topic details',
        path: 'discovery/topic/:id',
        link: 'social/discovery/topic',
    },
    {
        name: 'course details',
        path: 'education/course/:id',
        link: 'education/course',
    },
    {
        name: 'cart',
        path: 'ecomerce/cart',
        link: 'ecomerce/cart',
    },
    {
        name: 'cart',
        path: 'ecomerce/cart/payment',
        link: 'ecomerce/cart/payment',
    },
    {
        name: 'cart',
        path: 'ecomerce/cart/payment/processing/:id',
        link: 'social/ecomerce/cart/payment/processing',
    },
]

export const supportModule = [
    {
        id: 2,
        name: 'Help',
        link: ''
    },
    {
        id: 3,
        name: 'Status',
        link: ''
    },
    {
        id: 4,
        name: 'About',
        link: ''
    },
    {
        id: 5,
        name: 'Careers',
        link: ''
    },
    {
        id: 6,
        name: 'Blog',
        link: ''
    },
    {
        id: 7,
        name: 'Privacy',
        link: ''
    },
    {
        id: 8,
        name: 'Terms',
        link: ''
    },
    {
        id: 9,
        name: 'Text to speech',
        link: ''
    },
    {
        id: 10,
        name: 'Teams',
        link: ''
    },
]

export const editorConfiguration = {
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    extraPlugins: [function (editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }],
    toolbar: {
        items: [
            'undo', 'redo',
            '|', 'imageUpload',
            '|', 'heading',
            '|', 'bold', 'italic',
            '|', 'link', 'blockQuote', 'codeBlock',
            '|', 'ckbox'
        ],
        shouldNotGroupWhenFull: false
    },
    // ckbox: {
    //     tokenUrl: "https://file-mamager.wini.vn/",
    //     serviceOrigin: "https://file-mamager.wini.vn/"
    // },
};

export const listCommonInfor = [
    {
        name: 'students',
        title: 'học viên',
        icon: <OutlineUserProfile />
    },
    {
        name: 'rate',
        title: '',
        icon: <OutlineStar />
    },
    {
        name: 'lesons',
        title: 'lessons',
        icon: <OutlineVideoPlaylist />
    },
    {
        name: 'files',
        title: 'tài liệu đính kèm',
        icon: <OutlineBooks />
    },
    {
        name: 'level',
        title: '',
        icon: <OutlineGChart />
    },
    {
        name: 'certificate',
        title: 'Chứng chỉ tốt nghiệp',
        icon: <OutlineVerified />
    },
    {
        name: 'duration',
        title: 'truy cập khóa học',
        icon: <OutlineTimeAlarm />
    },
]

export const studentLevelList = [
    {
        id: 0,
        name: 'Beginner'
    },
    {
        id: 1,
        name: 'Junior'
    },
    {
        id: 2,
        name: 'Mid-level'
    },
    {
        id: 3,
        name: 'Senior'
    },
]

