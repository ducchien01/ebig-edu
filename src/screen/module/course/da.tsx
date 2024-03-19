import { CourseLessonItem } from "../lesson/da"
import { TagItem } from "../tag/da"

export interface CourseCateItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    cateId?: string,
    courseId?: string
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
    quantity?: number, // BE đang thiếu
    income?: number, // BE đang thiếu
    courseCates?: Array<CourseCateItem>,
    courseTags?: Array<TagItem>
    courseLessons?: Array<CourseLessonItem>,
}