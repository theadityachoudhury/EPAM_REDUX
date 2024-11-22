export enum CoursesActionTypes {
    SET_COURSES = 'SET_COURSES',
    ADD_COURSE = 'ADD_COURSE',
    DELETE_COURSE = 'DELETE_COURSE',
}

export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string; // Ensure the date is formatted as a string
    duration: number; // In minutes
    authors: string[]; // Array of author IDs
}