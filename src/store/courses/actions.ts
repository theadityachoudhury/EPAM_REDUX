import { Course } from './types';
import { addCourse, deleteCourse, setCourses, setLoading, updateCourse } from './reducer';


export const setCoursesAction = (courses: Course[]) => setCourses(courses);

export const addCourseAction = (course: Course) => addCourse(course);

export const deleteCourseAction = (courseId: string) => deleteCourse(courseId);

export const setLoadingAction = (loading: boolean) => setLoading(loading);

export const updateCourseAction = (course: Course) => updateCourse(course);