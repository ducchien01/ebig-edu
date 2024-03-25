import { OutlineBooks, FilledBooks, OutlineShoppingBag, FilledShoppingBag, OutlineStatics, FilledStatics, OutlineWallet, FilledWallet, OutlineUserProfile, OutlineStar, OutlineVideoPlaylist, OutlineGChart, OutlineVerified, OutlineTimeAlarm, OutlineHome, FilledHome, OutlineShop, OutlineCompass, OutlineBell, FilledBell, OutlineChat, FilledChat } from './icon'
import demoAvatar from '../demo-avatar.png';
import MyUploadAdapter from '../../project-component/ckeditor';
export const eduModules = [
    {
        id: 2,
        parentId: 1,
        name: 'Education Management',
        link: 'edu/home',
        icon: <OutlineBooks width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBooks width='2.4rem' height='2.4rem' />,
    },
    {
        id: 3,
        parentId: 1,
        name: 'Cart Management',
        link: 'product-management',
        icon: <OutlineShoppingBag width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledShoppingBag width='2.4rem' height='2.4rem' />,
    },
    {
        id: 4,
        parentId: 1,
        name: 'Analytics',
        link: 'analytics',
        icon: <OutlineStatics width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledStatics width='2.4rem' height='2.4rem' />,
    },
    {
        id: 5,
        parentId: 1,
        name: 'Finance',
        link: 'fiance',
        icon: <OutlineWallet width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledWallet width='2.4rem' height='2.4rem' />,
    },
    {
        id: 6,
        parentId: 1,
        name: 'Tài khoản cá nhân',
        link: 'user',
        icon: <div style={{ width: '2.4rem', height: '2.4rem', backgroundImage: `url(${demoAvatar})` }}></div>,
        selectedIcon: <div style={{ width: '2.4rem', height: '2.4rem', backgroundImage: `url(${demoAvatar})` }}></div>,
    },
    {
        id: 7,
        parentId: 2,
        name: 'Dashboard',
        link: 'edu/home/dashboard',
        path: 'home/dashboard',
    },
    {
        id: 8,
        parentId: 2,
        name: 'Teaching Schedule',
        link: 'edu/home/schedule',
        path: 'home/schedule',
    },
    {
        id: 9,
        parentId: 2,
        name: 'School Management',
        link: 'edu/home/school',
        path: 'home/school',
    },
    {
        id: 10,
        parentId: 2,
        name: 'Student Management',
        link: 'edu/home/student',
        path: 'home/student',
    },
    {
        id: 11,
        parentId: 9,
        listId: [2, 9],
        name: 'Course',
        link: 'edu/home/school/course',
        path: 'home/school/course',
    },
    {
        id: 12,
        parentId: 9,
        listId: [2, 9],
        name: 'Class',
        link: 'edu/home/school/class',
        path: 'home/school/class',
    },
    {
        id: 13,
        parentId: 9,
        listId: [2, 9],
        name: 'Mentor',
        link: 'edu/home/school/mentor',
        path: 'home/school/mentor',
    },
    {
        id: 14,
        parentId: 9,
        listId: [2, 9],
        name: 'Curriculum',
        link: 'edu/home/school/curriculum',
        path: 'home/school/curriculum',
    },
    {
        id: 15,
        parentId: 6,
        name: 'Hồ sơ cá nhân',
        link: 'edu/user/profile',
        path: 'user/profile',
    },
    {
        id: 16,
        parentId: 6,
        name: 'Tài khoản liên kết',
        link: 'user/linked-account',
    },
    {
        id: 17,
        parentId: 6,
        name: 'Mật khẩu và bảo mật',
        link: 'user/security',
    },
]

export const socialModules = [
    {
        id: 2,
        parentId: 1,
        name: 'Home',
        link: 'social/home',
        path: 'home',
        icon: <OutlineHome width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledHome width='2.4rem' height='2.4rem' />,
    },
    {
        id: 3,
        parentId: 1,
        name: 'Education',
        link: 'social/education',
        path: 'education',
        icon: <OutlineBooks width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBooks width='2.4rem' height='2.4rem' />,
    },
    {
        id: 4,
        parentId: 1,
        name: 'Shop',
        link: 'social/shop',
        path: 'shop',
        icon: <OutlineShop width='2.4rem' height='2.4rem' />,
        selectedIcon: <OutlineShop width='2.4rem' height='2.4rem' />,
    },
    {
        id: 5,
        parentId: 1,
        name: 'Discovery',
        link: 'social/discovery',
        path: 'discovery',
        icon: <OutlineCompass width='2.4rem' height='2.4rem' />,
        selectedIcon: <OutlineCompass width='2.4rem' height='2.4rem' />,
    },
    {
        id: 6,
        parentId: 1,
        name: 'Notification',
        link: 'social/notification',
        path: 'notification',
        icon: <OutlineBell width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBell width='2.4rem' height='2.4rem' />,
    },
    {
        id: 7,
        parentId: 1,
        name: 'Chat',
        link: 'social/chat',
        path: 'chat',
        icon: <OutlineChat width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledChat width='2.4rem' height='2.4rem' />,
    },
]

// react-router-dom use path params: exp with params id & type => ...link/:id/:type => make optional ...link/(/:id)(/:type)
export const extendView = [
    {
        name: 'Chỉnh sửa bài học',
        slug: 'lesson-content',
        parentId: 'lessons',
        path: 'school/course/details/textbook/lesson-content/:id/:lessonid',
        link: 'edu/school/course/details',
    },
    {
        name: 'Danh sách bài học',
        slug: 'lessons',
        parentId: 'textbook',
        path: 'school/course/details/textbook/lessons/:id',
        link: 'edu/school/course/details',
    },
    {
        name: 'Tài liệu đính kèm',
        slug: 'files',
        parentId: 'textbook',
        path: 'school/course/details/textbook/files/:id',
        link: 'edu/school/course/details',
    },
    {
        name: 'Tổng quan',
        slug: 'overview',
        path: 'school/course/details/overview/:id',
        link: 'edu/school/course/details',
    },
    {
        name: 'Lịch học và học phí',
        slug: 'shedule-fee',
        path: 'school/course/details/shedule-fee/:id',
        link: 'edu/school/course/details',
    },
    {
        name: 'Giáo trình',
        slug: 'textbook',
        path: 'school/course/details/textbook/:id',
        link: 'edu/school/course/details',
    },
    // {
    //     name: 'Chứng chỉ',
    //     slug: 'certificate',
    //     path: 'edu/school/course/details/certificate/:id',
    //     link: 'edu/school/course/details',
    // },
    {
        name: 'Xem trước khóa học',
        // slug: 'certificate',
        path: 'school/course/preview/:id',
        link: 'edu/school/course/preview',
    },
    {
        name: 'topic details',
        path: 'discovery/topic/:id',
        link: 'social/discovery/topic',
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
    ckbox: {
        tokenUrl: "https://file-mamager.wini.vn/",
        serviceOrigin: "https://file-mamager.wini.vn/"
    },
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