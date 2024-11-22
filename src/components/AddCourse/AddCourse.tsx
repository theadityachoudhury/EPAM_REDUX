import React, { useState } from 'react'
import { Course } from '../../store/courses/types';
import { v4 } from 'uuid';
import { Author } from '../../store/authors/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CourseForm from '../CourseForm/CourseForm';

const AddCourse = () => {
    const [courseData, setCourseData] = useState<Course>({ id: v4(), title: "", description: "", creationDate: new Date().toLocaleDateString(), duration: 0, authors: [] });
    const [CourseAuthors, setCourseAuthors] = useState<Author[]>([]);
    const authorsList = useSelector((state: RootState) => state.authors.authors);

    console.log(courseData)


    return (
        <CourseForm CourseAuthors={CourseAuthors} authorsList={authorsList} courseData={courseData} setCourseAuthors={setCourseAuthors} setCourseData={setCourseData}/>
    )
}

export default AddCourse