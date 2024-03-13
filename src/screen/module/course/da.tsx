import { ObjWithKnownKeys } from "../../../da/baseDA"

interface CourseCateItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    cateId?: string,
    courseId?: string
}

interface CourseTagItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    tagId?: string,
    courceId?: string
}

interface CourseLessonItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    lessonId?: string,
    courseId?: string,
    sort?: number,
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
    isComment?: true,
    isCertificate?: true,
    isContent?: true,
    customerId?: string,
    status?: number,
    price?: number,
    pictureId?: string,
    courseCates?: Array<CourseCateItem>,
    courseTags?: Array<CourseTagItem>
    courseLessons?: Array<CourseLessonItem>
}