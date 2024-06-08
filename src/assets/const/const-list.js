import { OutlineBooks, FilledBooks, OutlineUserProfile, OutlineStar, OutlineVideoPlaylist, OutlineGChart, OutlineVerified, OutlineTimeAlarm, OutlineHome, FilledHome, OutlineShop, OutlineCompass, OutlineBell, FilledBell, OutlineChat, FilledChat, FilledShop, OutlineGroup, FilledGroup } from './icon'
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
        name: 'Centers',
        link: 'center',
        path: 'centers',
        icon: <OutlineGroup width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledGroup width='2.4rem' height='2.4rem' />,
    },
    {
        id: 4,
        parentId: 1,
        name: 'Education',
        link: 'education',
        icon: <OutlineBooks width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBooks width='2.4rem' height='2.4rem' />,
    },
    {
        id: 5,
        parentId: 1,
        name: 'Shop',
        link: 'ecomerce',
        icon: <OutlineShop width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledShop width='2.4rem' height='2.4rem' />,
    },
    {
        id: 6,
        parentId: 1,
        name: 'Discovery',
        link: 'discovery',
        icon: <OutlineCompass width='2.4rem' height='2.4rem' />,
        selectedIcon: <OutlineCompass width='2.4rem' height='2.4rem' />,
    },
    // {
    //     id: 6,
    //     parentId: 1,
    //     name: 'Notification',
    //     link: 'notification',
    //     icon: <OutlineBell width='2.4rem' height='2.4rem' />,
    //     selectedIcon: <FilledBell width='2.4rem' height='2.4rem' />,
    // },
    {
        id: 7,
        parentId: 1,
        name: 'Chat',
        link: 'chat',
        icon: <OutlineChat width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledChat width='2.4rem' height='2.4rem' />,
    },
]

// react-router-dom use path params: exp with params id & type => ...link/:id/:type => make optional ...link/:id?/:type?
export const extendView = [
    {
        name: 'Chỉnh sửa bài học',
        slug: 'lessons-settings',
        parentId: 'lessons',
        path: 'center/course/lessons-settings/:id/:lessonid',
        link: 'center/course',
    },
    {
        name: 'Tổng quan',
        slug: 'overview',
        path: 'center/course/overview/:id',
        link: 'center/course',
    },
    {
        name: 'Giáo trình',
        slug: 'lessons',
        path: 'center/course/lessons/:id',
        link: 'center/course',
    },
    {
        name: 'Danh sách lớp',
        slug: 'additional-class',
        path: 'center/course/additional-class/:id',
        link: 'center/course',
    },
    // {
    //     name: 'Câu hỏi và đề thi',
    //     slug: 'exams',
    //     path: 'center/course/exams/:id',
    //     link: 'center/course',
    // },
    // {
    //     name: 'Danh sách học viên',
    //     slug: 'students',
    //     path: 'center/course/students/:id',
    //     link: 'center/course',
    // },
    {
        name: 'exam details',
        // slug: 'certificate',
        path: 'center/exam/:id',
        link: 'center/exam',
    },
    {
        name: 'Home',
        link: 'center',
        path: 'center/:id?',
    },
    {
        name: 'question details',
        // slug: 'certificate',
        path: 'center/question/:id',
        link: 'center/question',
    },
    {
        name: 'news details',
        path: '/:id?',
        link: 'my-page',
    },
    {
        name: 'news details',
        path: 'social/news/:id',
        link: 'social/news',
    },
    {
        name: 'news add edit',
        path: 'center/news/create',
        link: 'center/news/create',
    },
    {
        name: 'news add edit',
        path: 'center/news/edit/:id',
        link: 'center/news/edit',
    },
    {
        name: 'news add edit',
        path: 'social/news/create',
        link: 'social/news/create',
    },
    {
        name: 'news add edit',
        path: 'social/news/edit/:id',
        link: 'social/news/edit',
    },
    {
        name: 'topic details',
        path: 'discovery/topic/:id',
        link: 'social/discovery/topic',
    },
    {
        name: 'course details',
        path: 'education/courses',
        link: 'education/courses',
    },
    {
        name: 'course details',
        path: 'education/course/:id',
        link: 'education/course',
    },
    {
        name: 'exam details',
        path: 'education/exam/:id',
        link: 'education/exam',
    },
    {
        name: 'testing',
        path: 'education/testing/:id',
        link: 'education/testing',
    },
    {
        name: 'exam-result',
        path: 'education/exam-result/:id',
        link: 'education/exam-result',
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
        link: 'ecomerce/cart/payment/processing',
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
            '|', 'fontSize',
            '|', 'bold', 'italic',
            '|', 'bulletedList',
            '|', 'link', 'blockQuote', 'codeBlock',
            '|', 'ckbox'
        ],
        shouldNotGroupWhenFull: false,
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

