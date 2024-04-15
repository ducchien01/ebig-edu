import { LessonItem, LessonType } from "../lesson/da";

export interface ExamQuestionItem extends LessonItem {
    type: LessonType.examTask
}

