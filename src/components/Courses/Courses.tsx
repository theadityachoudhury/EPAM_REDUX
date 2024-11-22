import Button from "../../common/Button/Button";
import "./Courses.css";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatCreationDate } from "../../helpers/formatCreationDate";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { getAuthorsname } from "../../helpers/getAuthorsname";
import { Course } from "../../store/courses/types";
import { Author } from "../../store/authors/types";

const Courses = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Select courses and authors from the Redux store
    const courses: Course[] = useSelector((state: RootState) => state.courses.courses);
    const authors: Author[] = useSelector((state: RootState) => state.authors.authors);
    const loading: boolean = useSelector((state: RootState) => state.courses.loading);
    const { role } = useSelector((state: RootState) => state.user);


    // Local state for filtered courses
    const [filteredCourses, setFilteredCourses] = useState(courses);

    // Fetch courses and authors on component mount


    // Update filtered courses when courses or searchQuery changes
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCourses(courses); // Reset to all courses if search query is empty
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = courses.filter(
                (course) =>
                    course.title.toLowerCase().includes(lowercasedQuery) ||
                    course.id.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredCourses(filtered);
        }
    }, [courses, searchQuery]);

    const handleSearchInputChange = (query: string) => {
        setSearchQuery(query); // Update search query as the user types
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!searchQuery && filteredCourses.length === 0) {
        return <EmptyCourseList />;
    }
    return (
        <div className="container coursePage__container">
            <div className="coursePage__header">
                <div className="coursePage__searchBar__container">
                    <SearchBar onChange={handleSearchInputChange} onSearch={() => { }} />
                </div>
                {role === 'admin' && <Link to="/courses/add">
                    <Button title="Add New Course" onClick={() => { }} />
                </Link>}
            </div>
            <div>
                {filteredCourses.length !== 0 && filteredCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        description={course.description}
                        creationDate={formatCreationDate(course.creationDate)}
                        duration={getCourseDuration(course.duration)}
                        authors={getAuthorsname(course.authors, authors)} // Pass authors from the store
                    />
                ))}
            </div>
            {
                searchQuery && filteredCourses.length === 0 && <div>
                    <p className="coursePage__NoCourses">No courses found</p>
                </div>
            }
        </div>
    );
};

export default Courses;
