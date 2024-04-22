import { CourseItem } from "../course/da";

export interface MentorItem extends CourseItem {
    content?: string,
    courseId?: string,
    startDate?: number,
    endDate?: number,
    schedule?: string, // BE chưa thêm
}
