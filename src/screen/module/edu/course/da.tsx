import { CourseLessonItem } from "../lesson/da"
import { TagItem } from "../../tag/da"
import { ClassItem } from "../class/da"
import { MentorItem } from "../mentor/da"

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
    quatity?: number,
    pictureId?: string,
    thumbnailId?: string,
    haveClass?: boolean,
    haveMentor?: boolean,
    totalComment?: number,
    totalRating?: number,
    countLesson?: number,
    countLessonUsed?: number,
    cateId?: string,
    courseTags?: Array<TagItem>,
    courseLessons?: Array<CourseLessonItem>,
    classes?: Array<ClassItem>,
    mentors?: Array<MentorItem>,
}