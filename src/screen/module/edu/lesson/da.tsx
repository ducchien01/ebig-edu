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
    answer?: string
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
    paragraph = 2,
    task = 3,
    examTask = 4,
}

export enum QuestionType {
    checkbox = 1,
    radio = 2,
    essay = 3,
}

export interface AnswerItem {
    id?: string,
    content?: string,
    isCorrect?: boolean,
}

export interface QuestionItem {
    type?: QuestionType,
    question?: string,
    answers?: Array<AnswerItem>,
    fileId?: string
}