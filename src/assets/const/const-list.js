import { OutlineBooks, FilledBooks, OutlineShoppingBag, FilledShoppingBag, OutlineStatics, FilledStatics, OutlineWallet, FilledWallet, OutlineUserProfile, OutlineStar, OutlineVideoPlaylist, OutlineGChart, OutlineVerified, OutlineTimeAlarm } from './icon'
import demoAvatar from '../demo-avatar.png';
import Overview from '../../screen/module/course/local-component/overview';
import ScheduleFee from '../../screen/module/course/local-component/schedule-fee';
import CourseCurriculum from '../../screen/module/course/local-component/course-curriculum';
import FormEditLesson from '../../screen/module/course/local-component/edit-lesson';
import MyUploadAdapter from '../../project-component/ckeditor';
export const menuList = [
    {
        id: 2,
        parentId: 1,
        name: 'Education Management',
        link: 'edu-management',
        icon: <OutlineBooks width='2.4rem' height='2.4rem' />,
        selectedIcon: <FilledBooks width='2.4rem' height='2.4rem' />,
    },
    {
        id: 3,
        parentId: 1,
        name: 'Cart Management',
        link: 'cart-management',
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
        link: 'edu-management/dashboard',
    },
    {
        id: 8,
        parentId: 2,
        name: 'Teaching Schedule',
        link: 'edu-management/schedule',
    },
    {
        id: 9,
        parentId: 2,
        name: 'School Management',
        link: 'edu-management/school',
    },
    {
        id: 10,
        parentId: 2,
        name: 'Student Management',
        link: 'edu-management/student',
    },
    {
        id: 11,
        parentId: 9,
        listId: [2, 9],
        name: 'Course',
        link: 'edu-management/school/course',
    },
    {
        id: 12,
        parentId: 9,
        listId: [2, 9],
        name: 'Class',
        link: 'edu-management/school/class',
    },
    {
        id: 13,
        parentId: 9,
        listId: [2, 9],
        name: 'Mentor',
        link: 'edu-management/school/mentor',
    },
    {
        id: 14,
        parentId: 9,
        listId: [2, 9],
        name: 'Curriculum',
        link: 'edu-management/school/curriculum',
    },
    {
        id: 15,
        parentId: 6,
        name: 'Hồ sơ cá nhân',
        link: 'user/profile',
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

// react-router-dom use path params: exp with params id & type => ...link/:id/:type => make optional ...link/(/:id)(/:type)
export const extendView = [
    {
        name: 'Chỉnh sửa bài học',
        slug: 'lesson-content',
        parentId: 'lessons',
        path: 'edu-management/school/course/details/textbook/lesson-content/:id',
        link: 'edu-management/school/course/details',
        element: () => <FormEditLesson />
    },
    {
        name: 'Danh sách bài học',
        slug: 'lessons',
        parentId: 'textbook',
        path: 'edu-management/school/course/details/textbook/lessons/:id',
        link: 'edu-management/school/course/details',
        element: (data) => <CourseCurriculum data={data} />
    },
    {
        name: 'Tài liệu đính kèm',
        slug: 'files',
        parentId: 'textbook',
        path: 'edu-management/school/course/details/textbook/files/:id',
        link: 'edu-management/school/course/details',
    },
    {
        name: 'Tổng quan',
        slug: 'overview',
        path: 'edu-management/school/course/details/overview/:id',
        link: 'edu-management/school/course/details',
        element: (data) => <Overview data={data} />
    },
    {
        name: 'Lịch học và học phí',
        slug: 'shedule-fee',
        path: 'edu-management/school/course/details/shedule-fee/:id',
        link: 'edu-management/school/course/details',
        element: (data) => <ScheduleFee data={data} />
    },
    {
        name: 'Giáo trình',
        slug: 'textbook',
        path: 'edu-management/school/course/details/textbook/:id',
        link: 'edu-management/school/course/details',
    },
    {
        name: 'Chứng chỉ',
        slug: 'certificate',
        path: 'edu-management/school/course/details/certificate/:id',
        link: 'edu-management/school/course/details',
    },
    {
        name: 'Xem trước khóa học',
        // slug: 'certificate',
        path: 'edu-management/school/course/school-mn-export-view/:id',
        link: 'edu-management/school/course/preview',
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
            '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', 'wordBreak',
            '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
            '|', 'link', 'blockQuote', 'codeBlock',
            '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
            '|', 'ckbox'
        ],
        shouldNotGroupWhenFull: false
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: false
    },
    ckbox: {
        tokenUrl: "https://file-mamager.wini.vn/",
        serviceOrigin: "https://file-mamager.wini.vn/"
    },
    // simpleUpload: {
    //   uploadUrl: '/upload-endpoint', // Replace with your server upload endpoint
    // },
};

export class LessonType {
    static video = 1
    static text = 2
    static task = 3

    static list = [this.video, this.text, this.task]
}

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