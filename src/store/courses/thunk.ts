import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "./types";
import { getCourses } from "../../services";
import { addCourseAction, deleteCourseAction, setCoursesAction, updateCourseAction } from "./actions";
import instance from "../../helpers/axios";

export const fetchCourses = createAsyncThunk<any, void>("courses/fetchCourses", async (_, { dispatch }) => {
    const data = await getCourses();
    dispatch(setCoursesAction(data));
});

export const deleteCourseFromServer = createAsyncThunk<any, string>("courses/deleteCourse", async (courseId, { dispatch }) => {
    try {
        const _ = await instance.delete(`/courses/${courseId}`);
        dispatch(deleteCourseAction(courseId));
    } catch (error) {

    }
});

export const addCourseToServer = createAsyncThunk<any, Course>("courses/addCourse", async (course, { dispatch }) => {
    try {
        const { data } = await instance.post("/courses/add", course);
        dispatch(addCourseAction(data.result));
    } catch (error) {
        console.log(error);
    }
});

export const updateCourseOnServer = createAsyncThunk<any, Course>("courses/updateCourse", async (course, { dispatch }) => {
    try {
        const { data } = await instance.put(`/courses/${course.id}`, course);
        dispatch(updateCourseAction(data.result));
    } catch (error) {
        console.log(error);
    }
});