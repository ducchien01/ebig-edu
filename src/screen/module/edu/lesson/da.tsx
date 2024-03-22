export interface LessonItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    nameAscii?: string,
    type?: number,
    customerId?: string,
    courseId?: string,
    fileId?: string,
    content?: string,
}

export interface CourseLessonItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    courseId?: string,
    lessonId?: string,
    sort?: number,
    parentId?: string,
    type?: number,
}

export enum LessonType {
    video = 1,
    text = 2,
    task = 3,
}