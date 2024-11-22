import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./CourseForm.css";
import { mockedAuthorsListType } from "../../constants";
import AuthorItem from "./components/AuthorItem/AuthorItem";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Author } from "../../store/authors/types";
import { Course } from "../../store/courses/types";
import { addCourseToServer, updateCourseOnServer } from "../../store/courses/thunk";
import { addAuthorToServer } from "../../store/authors/thunk";

const CourseForm = ({ courseData, setCourseData, CourseAuthors, setCourseAuthors, authorsList, buttonText = "Create Course", update = false }: {
    courseData: Course,
    setCourseData: React.Dispatch<React.SetStateAction<Course>>,
    CourseAuthors: Author[],
    setCourseAuthors: React.Dispatch<React.SetStateAction<Author[]>>,
    authorsList: Author[],
    buttonText?: string,
    update?: boolean
}) => {
    const navigate = useNavigate();

    const [AuthorsList, setAuthorsList] = useState<Author[]>(authorsList);
    const [newAuthor, setNewAuthor] = useState<Author>();

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        duration: "",
        authors: ""
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setAuthorsList(authorsList);
    }, [authorsList])

    const handleAddAuthor = (author: mockedAuthorsListType) => {
        //remove author from AuthorsList
        setAuthorsList(AuthorsList.filter((item) => item.id !== author.id));
        //add author to CourseAuthors
        CourseAuthors.push(author);
        setCourseData({ ...courseData, authors: [...courseData.authors, author.id] });
    }

    const handleRemoveAuthor = (author: mockedAuthorsListType) => {
        //remove author from CourseAuthors
        setCourseAuthors(CourseAuthors.filter((item) => item.id !== author.id));
        //remove author from CourseData
        setCourseData({ ...courseData, authors: courseData.authors.filter((item) => item !== author.id) });
        //add author to AuthorsList
        AuthorsList.push(author);
    }

    const handleAddNewAuthor = () => {
        if (newAuthor) {
            dispatch(addAuthorToServer(newAuthor.name));
            // setAuthorsList([...AuthorsList, newAuthor]);
            setNewAuthor(undefined);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "authors") {
            setNewAuthor({ id: v4(), name: value });
        } else {
            if (name === "duration") {
                setCourseData({ ...courseData, [name]: +value });
                if (parseInt(value) <= 0) {
                    setErrors({ ...errors, duration: "Duration must be greater than 0" });
                    return
                } else {
                    setErrors({ ...errors, duration: "" });
                }
            } else {
                setCourseData({ ...courseData, [name]: value });
            }

        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { title: "", description: "", duration: "", authors: "" };

        if (!courseData.title || courseData.title.trim() === "" || courseData.title.trim().length < 2) {
            newErrors.title = "Title is required";
            formIsValid = false;
        }
        if (!courseData.description || courseData.description.trim() === "" || courseData.description.trim().length < 2) {
            newErrors.description = "Description is required";
            formIsValid = false;
        }
        if (courseData.duration <= 0) {
            newErrors.duration = "Duration must be a positive number";
            formIsValid = false;
        }
        if (CourseAuthors.length === 0) {
            newErrors.authors = "At least one author is required";
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            if (update) {
                dispatch(updateCourseOnServer(courseData));
            } else {
                dispatch(addCourseToServer(courseData));
            }
            alert(`Course ${update ? "updated" : "created"} successfully`);
            // reset the form
            !update && setCourseData({ id: v4(), title: "", description: "", creationDate: new Date().toLocaleDateString(), duration: 0, authors: [] });
            !update && navigate("/courses");
        } else {
            console.log("Form validation failed");
        }
    }

    return (
        <div className="courseForm__container">
            <h1 className="container">
                Course Edit/Create page
            </h1>

            <form className="container space-y-2" onSubmit={handleSubmit}>
                <div className="courseForm">
                    <h2>Main Info</h2>
                    <div className="CourseForm__mainInfo">
                        <Input label={
                            {
                                show: true,
                                text: "Title"
                            }
                        } type="text" onChange={handleChange}
                            metaData={
                                {
                                    placeholder: "Enter Title",
                                    name: "title",
                                    error: errors.title,
                                    value: courseData.title
                                }
                            } />

                        <Input label={
                            {
                                show: true,
                                text: "Description"
                            }
                        } type="textarea" onChange={handleChange}
                            metaData={
                                {
                                    placeholder: "Enter Description",
                                    name: "description",
                                    error: errors.description,
                                    value: courseData.description
                                }
                            } />


                        <h2>Duration</h2>
                        <div className="courseForm__duration">

                            <div>
                                <Input label={
                                    {
                                        show: true,
                                        text: "Duration"
                                    }
                                } type="number" onChange={handleChange}
                                    metaData={
                                        {
                                            placeholder: "Enter Duration",
                                            name: "duration",
                                            error: errors.duration,
                                            value: courseData.duration.toString()
                                        }
                                    } />
                            </div>
                            <p><strong>{getCourseDuration(courseData?.duration)}</strong> hours</p>


                        </div>

                        <div>
                            <div className="flex">
                                <div className="min-w-50 flex-grow">
                                    <h2>Authors</h2>
                                    <div className="flex space-x-3">
                                        <Input label={
                                            {
                                                show: true,
                                                text: "Authors"
                                            }
                                        } type="text" onChange={handleChange}
                                            metaData={
                                                {
                                                    placeholder: "Enter Authors",
                                                    name: "authors",
                                                    error: errors.authors,
                                                }
                                            } />
                                        <div className="w-full py-7">
                                            <Button title="Create Author" onClick={handleAddNewAuthor} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-semibold">Course Authors</h3>
                                    <div>
                                        {CourseAuthors.length > 0 ? CourseAuthors.map((author) => <AuthorItem key={author.id} authorName={author.name} onDeleteClick={() => handleRemoveAuthor(author)} />) : <p>Author's list is empty</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2>Author's List</h2>
                                {AuthorsList.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        authorName={author.name}
                                        onAddClick={() => handleAddAuthor(author)} // Pass the author object here
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button title="Cancel" onClick={() => { }} />
                    <Button title={buttonText} type="submit" />
                </div>
            </form>
        </div>
    )
}

export default CourseForm