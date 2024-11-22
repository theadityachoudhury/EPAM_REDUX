import { useEffect, useState } from "react";
import CourseForm from "../CourseForm/CourseForm"
import { Course } from "../../store/courses/types";
import { Author } from "../../store/authors/types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const UpdateCourse = () => {
    const { id } = useParams<{ id: string }>();

    const data = useSelector((state: RootState) => state.courses.courses).filter(course => course.id === id)[0];
    const authorsList = useSelector((state: RootState) => state.authors.authors);
    const loading = useSelector((state: RootState) => state.courses.loading);


    //course data
    const [courseData, setCourseData] = useState<Course>({ id: "", title: "", description: "", creationDate: new Date().toLocaleDateString(), duration: 0, authors: [] });

    //course authors
    //filter the authors list to only include the authors that are in the course data
    const [CourseAuthors, setCourseAuthors] = useState<Author[]>([]);

    const [updatedAuthorsList, setUpdatedAuthorsList] = useState<Author[]>([]);


    useEffect(() => {
        if (!loading) {
            if (data)
                setCourseData({ id: data.id, title: data.title, description: data.description, creationDate: data.creationDate, duration: data.duration, authors: data.authors });

            if (data) {
                setCourseAuthors(authorsList.filter(author => data.authors.includes(author.id)))
                setUpdatedAuthorsList(authorsList.filter(author => !data.authors.includes(author.id)))
            }

        }
    }, [data, authorsList, loading]);



    if (!!courseData && !!CourseAuthors && !!authorsList) {

        return (
            <CourseForm CourseAuthors={CourseAuthors} authorsList={updatedAuthorsList} courseData={courseData} setCourseAuthors={setCourseAuthors} setCourseData={setCourseData} buttonText="Update Course" update />
        )
    }
    return <h1>Loading...</h1>

}
export default UpdateCourse;