import { Course } from "../store/courses/types";

export const getCourseFromKey = (courseKey: string, courses: Course[]) => {
    const course = courses.find(course => course.id === courseKey);
    return course;
}