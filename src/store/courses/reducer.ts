import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "./types";

interface CoursesState {
    courses: Course[];
    loading: boolean;
}

const initialState: CoursesState = {
    courses: [],
    loading: true,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
        addCourse: (state, action: PayloadAction<Course>) => {
            state.courses.push(action.payload);
        },
        deleteCourse: (state, action: PayloadAction<string>) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.courses.findIndex(course => course.id === action.payload.id);
            state.courses[index] = action.payload;
        }

    },
});

export const { setCourses, addCourse, deleteCourse, setLoading,updateCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
