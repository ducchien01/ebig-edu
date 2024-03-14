import { TagItem } from "../tag/da"

interface CourseCateItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    cateId?: string,
    courseId?: string
}

interface CourseLessonItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    lessonId?: string,
    courseId?: string,
    sort?: number,
}

export enum CourseStatus {
    draft = 0,
    published = 1,
    end = 2,
}

export interface CourseItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    nameAscii?: string,
    description?: string,
    topicId?: string,
    targets?: string,
    level?: number,
    tools?: string,
    suitable?: string,
    isComment?: boolean,
    isCertificate?: boolean,
    isContent?: boolean,
    customerId?: string,
    status?: number,
    price?: number,
    pictureId?: string,
    thumbnailId?: string, // BE đang thiếu
    shortIntro?: string, // BE đang thiếu
    courseCates?: Array<CourseCateItem>,
    courseTags?: Array<TagItem>
    courseLessons?: Array<CourseLessonItem>
}