import { TagItem } from "../../tag/da";

export enum ExamStatus {
    draft = 0,
    test = 1,
    real = 2,
}

export interface ExamItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    code?: string,
    level?: number,
    lessonId?: string,
    customerId?: string,
    status?: number,
    quantity?: number,
    time?: number,
    dateStart?: number,
    topicId?: string,
    cateId?: string,
    tags?: Array<TagItem>,
}

